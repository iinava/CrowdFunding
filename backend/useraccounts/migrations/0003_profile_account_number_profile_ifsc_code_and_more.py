# Generated by Django 5.0.7 on 2024-07-16 14:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('useraccounts', '0002_profile_is_verified'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='account_number',
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='profile',
            name='ifsc_code',
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='profile',
            name='upi_id',
            field=models.CharField(default='Not provided', max_length=255),
        ),
    ]
