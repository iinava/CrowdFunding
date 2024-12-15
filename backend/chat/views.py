from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from django.contrib.auth.models import User
from .models import Chat, Message
from .serializers import ChatSerializer, MessageSerializer

class ListChatsView(GenericAPIView):
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        chats = Chat.objects.filter(Q(user1=user) | Q(user2=user)).order_by('-created_at')
        serializer = self.serializer_class(chats, many=True)

        return Response(
            {'data': serializer.data, 'success': 1, 'message': 'Chats retrieved successfully'},
            status=status.HTTP_200_OK
        )

class CreateChatView(GenericAPIView):
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        other_username = request.data.get('username')

        if not other_username:
            return Response(
                {'error': 'Username of the other participant is required', 'success': 0},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            other_user = User.objects.get(username=other_username)
        except User.DoesNotExist:
            return Response(
                {'error': 'User does not exist', 'success': 0},
                status=status.HTTP_404_NOT_FOUND
            )

        if other_user == request.user:
            return Response(
                {'error': 'Cannot create a chat with yourself', 'success': 0},
                status=status.HTTP_400_BAD_REQUEST
            )

        chat = Chat.objects.filter(
            Q(user1=request.user, user2=other_user) |
            Q(user1=other_user, user2=request.user)
        ).first()

        if chat:
            return Response(
                {'data': self.serializer_class(chat).data, 'success': 1, 'message': 'Chat already exists'},
                status=status.HTTP_200_OK
            )

        serializer = self.serializer_class(data={'user1': request.user.id, 'user2': other_user.id})
        if serializer.is_valid():
            serializer.save()
            return Response(
                {'data': serializer.data, 'success': 1, 'message': 'Chat created successfully'},
                status=status.HTTP_201_CREATED
            )
        return Response(
            {'data': serializer.errors, 'success': 0, 'message': 'Failed to create chat'},
            status=status.HTTP_400_BAD_REQUEST
        )

class RetrieveChatMessagesView(GenericAPIView):
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, chat_id):
        user = request.user
        chat = Chat.objects.filter(Q(user1=user) | Q(user2=user), id=chat_id).first()

        if not chat:
            return Response(
                {'error': 'Chat not found or unauthorized', 'success': 0},
                status=status.HTTP_404_NOT_FOUND
            )

        messages = Message.objects.filter(chat=chat).order_by('timestamp')
        serializer = self.serializer_class(messages, many=True)

        return Response(
            {'data': serializer.data, 'success': 1, 'message': 'Messages retrieved successfully'},
            status=status.HTTP_200_OK
        )

class SendMessageView(GenericAPIView):
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, chat_id):
        user = request.user

        chat = Chat.objects.filter(id=chat_id).filter(
            Q(user1=user) | Q(user2=user)
        ).first()

        if not chat:
            return Response(
                {'error': 'Chat not found or you are not a participant.', 'success': 0},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = self.serializer_class(data={'chat': chat.id, 'sender': user.id, 'text': request.data.get('text')})
        if serializer.is_valid():
            serializer.save()
            return Response(
                {'data': serializer.data, 'success': 1, 'message': 'Message sent successfully.'},
                status=status.HTTP_201_CREATED
            )
        return Response(
            {'data': serializer.errors, 'success': 0, 'message': 'Failed to send message.'},
            status=status.HTTP_400_BAD_REQUEST
        )
