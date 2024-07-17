from django.contrib import admin
from .models import Profile

class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'is_verified']
    list_filter = ['is_verified']  

    actions = ['mark_verified', 'mark_not_verified'] 
    def mark_verified(self, request, queryset):
        rows_updated = queryset.update(is_verified=True)
        self.message_user(request, f'{rows_updated} profile(s) marked as verified.')

    mark_verified.short_description = 'Mark selected profiles as verified' 
    def mark_not_verified(self, request, queryset):
        rows_updated = queryset.update(is_verified=False)
        self.message_user(request, f'{rows_updated} profile(s) marked as not verified.')

    mark_not_verified.short_description = 'Mark selected profiles as not verified'  

admin.site.register(Profile, ProfileAdmin)
