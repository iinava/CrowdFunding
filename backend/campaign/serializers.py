from rest_framework import serializers
from .models import Campaign

class CampaignSerializer(serializers.ModelSerializer):
    class Meta:
        model=Campaign
        fields='__all__'
    def Create (self,validated_data):
        return Campaign.objects.create(**validated_data)          
    
