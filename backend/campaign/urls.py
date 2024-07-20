from django.contrib import admin
from django.urls import path,include
from .views import AddCampaignView,ViewCampaignsByUser,DeleteCampaign,RetriveCampaignAndUpdate,ViewAllCampaigns,ViewCampaignBuyslug

urlpatterns = [
   path("addcampaign/", AddCampaignView.as_view(), name="addcampaign"),
   path("viewcampaign/", ViewCampaignsByUser.as_view(), name="viewcampaign"),
   path("deletecampaign/<slug>/", DeleteCampaign.as_view(), name="deletecampaign"),
   path("retriveandupdate/<slug>/", RetriveCampaignAndUpdate.as_view(), name="retriveandupdate"),
   path("viewallcampaigns/", ViewAllCampaigns.as_view(), name="viewallcampaigns"),
   path("viewcampaign/<slug:slug>", ViewCampaignBuyslug.as_view(), name="viewcampaign"),
]
