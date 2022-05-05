"""crowdseq URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import re_path as url
from django.conf.urls import include

from crowdseq import views

from rest_framework import routers

from api.urls import router as api_router
from api import views as api_views

router = routers.DefaultRouter()
router.registry.extend(api_router.registry)

app_name = 'crowdseq'
urlpatterns = [
    url(r'^', include(router.urls)),
    # url('', include('django_prometheus.urls')),
    url(r'^api/search/$', api_views.search, name='api_search'),
    url(r'^readiness', views.readiness, name='readiness'),
    url(r'^liveliness', views.liveliness, name='liveliness'),
    url(r'^admin/', admin.site.urls),
]
