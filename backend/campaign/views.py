from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated,AllowAny
from .models import Campaign,Category
from .serializers import CampaignSerializer,CategorySerializer
from useraccounts.serializers import ProfileSerializer
from useraccounts.models import Profile
from .pagination import CampaignPagination
import cloudinary


class AddCampaignView(GenericAPIView):
    serializer_class = CampaignSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        required_fields = ['title', 'description', 'target', 'initial', 'image', 'start_date', 'end_date']
        missing_fields = [field for field in required_fields if field not in request.data]

        if missing_fields:
            return Response(
                {"error": f"Missing fields: {', '.join(missing_fields)}"},
                status=status.HTTP_400_BAD_REQUEST
            )

        title = request.data.get('title')
        description = request.data.get('description')
        target = request.data.get('target')
        initial = request.data.get('initial')
        image = request.data.get('image')
        start_date = request.data.get('start_date')
        end_date = request.data.get('end_date')
        campaign_status = 'active'
        user_id = self.request.user.id
        # print(user_id)

        try:
            uploaded_image = cloudinary.uploader.upload(image,folder="crowdfunding")
            image_url = uploaded_image.get("url")
        except Exception as e:
            return Response(
                {"error": "Failed to upload image to Cloudinary", "details": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
        if(Campaign.objects.filter(title=title)):
            return Response({'message':'Duplicate title name found'},status.HTTP_400_BAD_REQUEST)
        else:
            campaign_data = {
            'title': title,
            'description': description,
            'target_amount': target,
            'initial_amount': initial,
            'start_date': start_date,
            'end_date': end_date,
            'status': campaign_status,
            'creator': user_id,
            'image': image_url
        }
        serializer = self.serializer_class(data=campaign_data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(
                {'data': serializer.data, 'message': 'Campaign entry was added successfully', 'success': '1'},
                status=status.HTTP_201_CREATED
            )

        return Response(
            {'data': serializer.errors, 'message': 'Adding campaign entry failed', 'success': '0'},
            status=status.HTTP_400_BAD_REQUEST
        )

class ViewCampaignsByUser(GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CampaignSerializer
    
    def get(self, request):
        user = self.request.user
        campaigns = Campaign.objects.filter(creator=user.id)
        
        if campaigns.exists():
            serializer = self.serializer_class(campaigns, many=True)
            return Response(
                {'data': serializer.data, 'message': 'List of campaigns by user', 'success': '1'},
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                {'message': 'No campaigns created by the user', 'success': '0'},
                status=status.HTTP_404_NOT_FOUND
            )

class DeleteCampaign(GenericAPIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request, slug):
        slug = slug 
        user = self.request.user
        campaign = Campaign.objects.filter(slug=slug, creator=user.id)
        if campaign:
            campaign.delete()
            return Response(
                {'message': 'Campaign deleted successfully', 'success': '1'},
                status=status.HTTP_200_OK
            )
        return Response(
                {'message': 'could not delete campaign', 'success': '0'},
                status=status.HTTP_400_BAD_REQUEST
        )  
            
class RetriveCampaignAndUpdate(GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CampaignSerializer
    
    def get(self, request, slug):
        slug = slug
        user = self.request.user
        campaign = Campaign.objects.filter(slug=slug, creator=user.id)
        if campaign:
            serializer = self.serializer_class(campaign.first())
            return Response(
                {'data': serializer.data, 'message': 'Campaign details', 'success': '1'},
                status=status.HTTP_200_OK
            )
        return Response(
                {'message': 'Campaign not found', 'success': '0'},
                status=status.HTTP_404_NOT_FOUND
            )
        
    def put(self, request, slug):
        slug = slug
        user = self.request.user
        data = request.data
        campaign = Campaign.objects.filter(slug=slug, creator=user.id)
        if campaign:
            if 'image' in request.FILES:
                
                image = request.FILES['image']
                upload_result = cloudinary.uploader.upload(image)
                data['image'] = upload_result['url']
            serializer = self.serializer_class(campaign.first(), data=request.data,partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(
                    {'data': serializer.data, 'message': 'Campaign updated successfully', 'success': '1'},
                    status=status.HTTP_200_OK
                )
            return Response(
                {'data': serializer.errors, 'message': 'Campaign update failed', 'success': '0'},
                status=status.HTTP_400_BAD_REQUEST
            )
        return Response(
                {'message': 'Campaign not found', 'success': '0'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        
class ViewAllCampaigns(GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CampaignSerializer
    pagination_class = CampaignPagination

    def get(self, request):
        try:
            campaigns = Campaign.objects.all().order_by('-created_at')
            
            if not campaigns.exists():
                return Response(
                    {'message': 'No campaigns available', 'success': '0'},
                    status=status.HTTP_404_NOT_FOUND
                )

            paginator = self.pagination_class()
            
            paginated_campaigns = paginator.paginate_queryset(campaigns, request)
            
            serializer = self.serializer_class(paginated_campaigns, many=True)
            
            return paginator.get_paginated_response({
                'data': serializer.data,
                'message': 'List of all campaigns',
                'success': '1'
            })
        
        except Exception as e:
            return Response(
                {'message': 'An error occurred while fetching campaigns', 'success': '0'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
            
class ViewCampaignBuyslug(GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CampaignSerializer
    profile_class = ProfileSerializer
    
    def get(self, request, slug):
        try:
            campaign = Campaign.objects.get(slug=slug)
        except Campaign.DoesNotExist:
            return Response(
                {'message': 'Campaign not found', 'success': '0'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        user = self.request.user
        try:
            profile = Profile.objects.get(user=user)
        except Profile.DoesNotExist:
            return Response(
                {'message': 'Profile not found', 'success': '0'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        try:
            campaign_serializer = self.serializer_class(campaign)
        except ValidationError as e:
            return Response(
                {'message': 'Error serializing campaign data', 'errors': e.detail, 'success': '0'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            profile_serializer = self.profile_class(profile)
        except ValidationError as e:
            return Response(
                {'message': 'Error serializing profile data', 'errors': e.detail, 'success': '0'},
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(
            {
                'data': {
                    'campaign': campaign_serializer.data,
                    'profile': profile_serializer.data
                },
                'message': 'Campaign and Profile details',
                'success': '1'
            },
            status=status.HTTP_200_OK
        )
        
# category details , CRUD        

class CategoryListView(GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = CategorySerializer


    def get(self, request):
        queryset = Category.objects.all()
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            'status': 'success',
            'data': serializer.data,
            'message': 'Categories retrieved successfully'
        }, status=status.HTTP_200_OK)
        
        
class CategoryBasedView(GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = CampaignSerializer
    
    def get(self, request, slug):
        try:
            category = Category.objects.get(slug=slug)
        except Category.DoesNotExist:
            return Response({
                'error': 'Category not found',
                'success': 0,
                'message': 'The specified category does not exist'
            }, status=status.HTTP_404_NOT_FOUND)
        
        queryset = Campaign.objects.filter(category_id=category_id)
        
        if not queryset.exists():
            return Response({
                'data': [],
                'count': 0,
                'success': 0,
                'message': 'No campaigns found for this category'
            }, status=status.HTTP_200_OK)
        
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            'data': serializer.data,
            'status': status.HTTP_200_OK,
            'success': 1,
            'count': queryset.count(),
            'message': 'Campaigns in this category retrieved successfully'
        }, status=status.HTTP_200_OK)