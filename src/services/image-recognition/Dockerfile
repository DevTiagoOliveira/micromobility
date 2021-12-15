FROM python:3
ENV FLASK_ENV = production
WORKDIR /app
COPY requirements.txt /app/
RUN pip install -r requirements.txt --no-cache-dir
COPY . /app
CMD [ "python", "./app.py" ]