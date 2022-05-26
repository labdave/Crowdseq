FROM python:3.8

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt update \
    && apt-get install -y postgresql-server-dev-all gcc python3-dev musl-dev
RUN pip install --upgrade pip
COPY . /code
WORKDIR /code
RUN pip install -r requirements.txt

# expose the port 8000
EXPOSE 8000