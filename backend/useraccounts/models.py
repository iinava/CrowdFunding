from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    legal_name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    country = models.CharField(max_length=20)
    city = models.CharField(max_length=20)
    address = models.CharField(max_length=255)
    is_verified = models.BooleanField(default=False)
    upi_id = models.CharField(max_length=255,default='Not provided')
    account_number = models.CharField(max_length=100)
    ifsc_code = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.legal_name



