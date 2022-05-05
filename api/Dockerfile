FROM python:3.8
ENV PYTHONUNBUFFERED 0
RUN apt-get install default-libmysqlclient-dev
COPY . /code
WORKDIR /code
RUN pip install -r requirements.txt

# expose the port 8000
EXPOSE 8000