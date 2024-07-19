from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from .models import Campaign
from .serializers import CampaignSerializer
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
        
            