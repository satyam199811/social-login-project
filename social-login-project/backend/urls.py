from django.contrib import admin
from django.urls import path, include, re_path
from django.shortcuts import redirect

urlpatterns = [
    path('admin/', admin.site.urls),

    path('accounts/profile/', lambda request: redirect('/admin/')),

    path('api/', include('accounts.urls')),

    re_path(r'^auth/', include('social_django.urls', namespace='social')),
    re_path(r'^auth/', include('drf_social_oauth2.urls', namespace='drf')),
]
