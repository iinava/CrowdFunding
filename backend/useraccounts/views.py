from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer,ProfileSerializer,GetUserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.generics import GenericAPIView, RetrieveAPIView
from .models import Profile
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

# Create your views here.


class CreateUserView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    queryset = User.objects.all()
    serializer_class = UserSerializer
    


    
    
class UserInfoAPIView(RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer
    def get_object(self):
        return self.request.user        
    
    
class UserLogoutAPIView(GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        refresh_token = request.data.get("refresh")
        
        if not refresh_token:
            return Response(
                {'error': 'Refresh token not provided', 'success': '0'},
                status=status.HTTP_400_BAD_REQUEST
            )
        try:
            token = RefreshToken(refresh_token)
            token.blacklist() 
            return Response(
                {'message': 'Logout successful', 'success': '1'},
                status=status.HTTP_205_RESET_CONTENT
            )
        except Exception as e:
            return Response(
                {'error': 'Could not logout: ' + str(e), 'success': '0'},
                status=status.HTTP_400_BAD_REQUEST
            )
    
       
class UserProfileView(GenericAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]
    def put(self, request):
        try:
            queryset = Profile.objects.get(user=self.request.user)
        except Profile.DoesNotExist:
            return Response({'error': 'Profile does not exist', 'message': 'Could not update profile', 'success': '0'}, status=status.HTTP_400_BAD_REQUEST)
        
        profiledata = request.data
        serializer = self.serializer_class(data=profiledata, instance=queryset, partial=True)
        if serializer.is_valid():
            serializer.save()
            queryset.is_verified = False  
            queryset.save()  
            return Response({'data': serializer.data, 'message': 'Profile updated successfully', 'success': '1'}, status=status.HTTP_200_OK)
        
        return Response({'error': serializer.errors, 'message': 'Could not update profile', 'success': '0'}, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):
        try:
            queryset = Profile.objects.get(user=self.request.user)
        except Profile.DoesNotExist:
            return Response({'error': 'Profile does not exist', 'message': 'Could not get profile', 'success': '0'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = ProfileSerializer(queryset)
        return Response({'data': serializer.data, 'message': 'Profile data', 'success': '1'}, status=status.HTTP_200_OK)
    
    
    
class ProfileDeleteView(generics.DestroyAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        return Profile.objects.filter(user=user)
            