from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer,ProfileSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.generics import GenericAPIView, RetrieveAPIView
from .models import Profile
from rest_framework.response import Response
from rest_framework import status

# Create your views here.


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
class UserInfoAPIView(RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer
    
    def get_object(self):
        return self.request.user    
    
class UserProfileView(GenericAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def put(self, request):
        queryset = Profile.objects.get(user=self.request.user)
        profiledata = request.data
        serializer = self.serializer_class(data=profiledata,instance=queryset,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'data': serializer.data, 'message': 'Profile updated successfully', 'success': '1'}, status=status.HTTP_200_OK)
        return Response({'error': serializer.errors, 'message': 'Could not update profile', 'success': '0'}, status=status.HTTP_400_BAD_REQUEST)
    

class ProfileDeleteView(generics.DestroyAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        return Profile.objects.filter(user=user)
            