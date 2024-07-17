from django.contrib import admin
from django.urls import path,include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import CreateUserView,UserProfileView,  ProfileDeleteView,UserInfoAPIView

urlpatterns = [
   path("register/", CreateUserView.as_view(), name="register"),
   path("token/", TokenObtainPairView.as_view(), name="get_token"),
   path("refresh/", TokenRefreshView.as_view(), name="refresh"),
   path("info/", UserInfoAPIView.as_view(), name="info"),
   path("profile/", UserProfileView.as_view(), name="profile"),
   path("profile/delete/<int:pk>", ProfileDeleteView.as_view(), name="delete_profile"),
   path("api-auth/", include("rest_framework.urls")),
]
