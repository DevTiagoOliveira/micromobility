#!/usr/bin/env python
# coding: utf-8

# ## Imports

# In[ ]:


import numpy as np
import os
from PIL import Image
from tensorflow import keras
from flask import Flask, request, jsonify
from flasgger import Swagger


# ## Define models

# In[ ]:


genre_model = keras.models.load_model('models/genre.h5')
age_model = keras.models.load_model('models/age.h5')


# ## Define image validation routine

# In[ ]:


def allowed_file_extension(filename):
    return '.' in filename and filename.rsplit('.', 1)[1] in set(['png', 'jpg', 'jpeg', 'gif', 'tif'])


# ## Define genre and age prediction routine

# In[ ]:


def predict_genre_and_age(filepath):
    im = Image.open(filepath)
    width, height = im.size
    
    if width == height:
        im = im.resize((200, 200), Image.ANTIALIAS)
    else:
        if width > height:
            left = width/2 - height/2
            right = width/2 + height/2
            top = 0
            bottom = height
            im = im.crop((left, top, right, bottom))
            im = im.resize((200, 200), Image.ANTIALIAS)
        else:
            left = 0
            right = width
            top = 0
            bottom = width
            im = im.crop((left, top, right, bottom))
            im = im.resize((200, 200), Image.ANTIALIAS)
            
    ar = np.asarray(im)
    ar = ar.astype('float32')
    ar /= 255.0
    ar = ar.reshape(-1, 200, 200, 3)
    
    gender = np.round(genre_model.predict(ar))
    age = int(age_model.predict(ar))
    
    if gender == 0:
        gender = 'Masculine'
    elif gender == 1:
        gender = 'Feminine'
        
    return gender, age


# ## Setup microservice

# In[ ]:


app = Flask(__name__)

app.config['UPLOAD_FOLDER'] = 'uploads/'
app.config['SWAGGER'] = {
    'specs_route': '/api-docs/',
    'title': 'Image Recognition Service',
    'description': 'RESTful Web API documentation',
    'version': '1.0.0'
}

Swagger(app)


# ## Define microservice routes

# In[ ]:


@app.route('/api/v1/monitoring/probe', methods = ['GET'])
def probe():
    """
    Probes the service. Monitoring operations should use this endpoint.
    ---
    tags:
      - Monitoring
    responses:
      200:
        description: The service is running.
    """
    
    return ''

@app.route('/api/v1/prediction/human', methods = ['POST'])
def predict():
    """
    Predicts the gender and age of the specified human.
    ---
    tags:
      - Prediction
    parameters:
      - name: image
        description: The image of the human.
        enum: [ 'png', 'jpg', 'jpeg', 'gif', 'tif']
        required: true
    responses:
      200:
        description: The prediction has been sucessfully retrieved.
      400:
        description: The request is invalid.
    """
        
    if 'image' not in request.files:
        return jsonify({'error': 'The request does not include an image.'}), 400

    file = request.files['image']

    if file.filename == '':
        return jsonify({'error': 'The file name is invalid.'}), 400

    if not allowed_file_extension(file.filename):
        return jsonify({'error': 'The file extension is invalid.'}), 400

    filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)     
    file.save(filepath)
    prediction = predict_genre_and_age(filepath)

    return jsonify({
        'genre': prediction[0],
        'age': prediction[1]
    })


# ## Start microservice

# In[ ]:


if __name__ == '__main__':
    app.run(host = '0.0.0.0', port = 1001)

