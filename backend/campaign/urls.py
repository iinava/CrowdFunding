from django.urls import path
from .views import *

urlpatterns = [
   path("addcampaign/", AddCampaignView.as_view(), name="addcampaign"),
   path("viewcampaign/", ViewCampaignsByUser.as_view(), name="viewcampaign"),
   path("deletecampaign/<slug>/", DeleteCampaign.as_view(), name="deletecampaign"),
   path("retriveandupdate/<slug>/", RetriveCampaignAndUpdate.as_view(), name="retriveandupdate"),
   path("viewallcampaigns/", ViewAllCampaigns.as_view(), name="viewallcampaigns"),
   path("viewcampaign/<slug:slug>", ViewCampaignBuyslug.as_view(), name="viewcampaign"),
   path('categories/', CategoryListView.as_view(), name='categories'),
   path('category/<int:category_id>', CategoryBasedView.as_view(), name='category-list'),
]
