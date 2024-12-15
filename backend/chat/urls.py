from django.urls import path
from .views import ListChatsView, CreateChatView, RetrieveChatMessagesView, SendMessageView

urlpatterns = [
    path('chats/', ListChatsView.as_view(), name='list_chats'),
    path('chats/create/', CreateChatView.as_view(), name='create_chat'),
    path('chats/<int:chat_id>/messages/', RetrieveChatMessagesView.as_view(), name='retrieve_chat_messages'),
    path('chats/<int:chat_id>/messages/send/', SendMessageView.as_view(), name='send_message'),
]
