"""
Django settings for crowdseq project.

Generated by 'django-admin startproject' using Django 4.0.3.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.0/ref/settings/
"""

import os
from dotenv import load_dotenv
from pathlib import Path

from corsheaders.defaults import default_methods, default_headers

# Build paths inside the project like this: BASE_DIR / 'subdir'.
PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
if "SECRET_KEY" not in os.environ:
    load_dotenv()
SECRET_KEY = os.environ.get('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.getenv('DJANGO_APP_DEBUG', False)

ALLOWED_HOSTS = os.getenv('HOSTS').split(',')


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'api',
]

MIDDLEWARE = [
    'django_prometheus.middleware.PrometheusBeforeMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django_prometheus.middleware.PrometheusAfterMiddleware',
]

CORS_ORIGIN_WHITELIST = os.getenv('CORS_HOSTS').split(',')
CSRF_TRUSTED_ORIGINS = os.getenv('CORS_HOSTS').split(',')

CORS_ALLOW_METHODS = list(default_methods)
CORS_ALLOW_HEADERS = list(default_headers)

ROOT_URLCONF = 'crowdseq.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(PROJECT_DIR, '..', 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'crowdseq.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases

DATABASES = {
    # 'default': {
    #     "ENGINE": 'djongo',
    #     "NAME": os.environ.get('DJANGO_APP_DB_NAME'),
    #     "ENFORCE_SCHEMA": False,
    #     "CLIENT": {
    #         'host': os.environ.get('DJANGO_APP_DB_HOST'),
    #         'port': int(os.environ.get('DJANGO_APP_DB_PORT')),
    #         'username': os.environ.get('DJANGO_APP_DB_USER'),
    #         'password': os.environ.get('DJANGO_APP_DB_PASSWORD'),
    #         'authSource': os.environ.get('DJANGO_APP_DB_NAME')
    #     },
    # }
    'default': {
        'ENGINE': 'django.db.backends.' + os.environ.get('DJANGO_APP_DB_ENGINE', 'postgresql_psycopg2'),
        'NAME': os.environ.get('DJANGO_APP_DB_NAME'),
        'USER': os.environ.get('DJANGO_APP_DB_USER'),
        'HOST': os.environ.get('DJANGO_APP_DB_HOST'),
        'PORT': os.environ.get('DJANGO_APP_DB_PORT'),
        'PASSWORD': os.environ.get('DJANGO_APP_DB_PASSWORD'),
        'CONN_MAX_AGE': 600,
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Sessions
SESSION_EXPIRE_AT_BROWSER_CLOSE = True


# Internationalization
# https://docs.djangoproject.com/en/4.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


### STATIC FILES
STATICFILES_DIRS = [
    os.path.join(PROJECT_DIR, "static"),
]
STATIC_ROOT = os.environ.get('STATIC_ROOT', os.path.join(BASE_DIR, 'static'))
STATIC_URL = os.getenv('DJANGO_APP_STATIC_URL', '/static/')

# Default primary key field type
# https://docs.djangoproject.com/en/4.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

WEBSITE_NAME = "Crowdseq"
