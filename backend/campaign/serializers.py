from rest_framework import serializers
from .models import Campaign,Category

class CampaignSerializer(serializers.ModelSerializer):
    class Meta:
        model=Campaign
        fields='__all__'
    def Create (self,validated_data):
        return Campaign.objects.create(**validated_data)          
    

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']