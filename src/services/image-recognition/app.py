#!/usr/bin/env python
# coding: utf-8

# ## Imports

# In[1]:


from flask import Flask, request, redirect, url_for, flash, jsonify
from flasgger import Swagger
import flasgger


# ## Define constants

# In[2]:


HOST = '0.0.0.0'
PORT = 1001


# ## Setup microservice

# In[3]:


app = Flask(__name__)

app.config['SWAGGER'] = {
    'specs_route': '/api-docs/',
    'title': 'Image Recognition Service',
    'description': 'RESTful Web API documentation',
    'version': '1.0.0'
}

Swagger(app)


# ## Define microservice routes

# In[4]:


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
    return '', 200


# ## Start microservice

# In[ ]:


if __name__ == '__main__':
    app.run(host = HOST, port = PORT)

