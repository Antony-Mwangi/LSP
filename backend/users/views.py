#Provides generic API views like CreateAPIView,  RetrieveAPIView... etc
from rest_framework import generics, status
#Used to send HTTP response with data and status codes
from rest_framework.response import Response
#Permission controls who can access each view
from rest_framework.permissions import AllowAny, IsAuthenticated
#provides JWT functionality for authentication
from rest_framework_simplejwt.tokens import RefreshToken
#Used to generate secure tokens for password reset links
from django.contrib.auth.tokens import PasswordResetTokenGenerator
#Djnago's built-in function to send mails
from django.core.mail import send_mail
#Helps get the current site
from django.contrib.sites.shortcuts import get_current_site
#Used to reverse URLs(get URL path from a view name)
from django.urls import reverse 

#Importing the custom User model and serializers
from .models import User
from .serializers import RegisterSerializer, LoginSerializer


#Functions to generate JWT tokens for a user
def get_tokens_for_user(user):
    #Create a new refresh token for the given user
    refresh = RefreshToken.for_user(user)
    #Return both refresh and access tokens as strings
    return {'refresh': str(refresh), 
            'access': str(refresh.access_token)
            }

#REGISTER VIEW

class RegisterView(generics.CreateAPIView):
    #Specifies the serializer that handles validation and user creation.
    serializer_class = RegisterSerializer
    #Allows anyone (even unauthenticated users) to access this endpoint
    permission_classes = [AllowAny]
    
    #LOGIN VIEW    
class LoginView(generics.GenericAPIView):
    #Serializer that validates login credentials 
    serializer_class = LoginSerializer
    #Anyone can access this view(no authentication required)
    permission_classes = [AllowAny]
    
    
    #Handles POST requests(user login)
    def post(self, request):
        #Initilaize serializer with the incoming request data
        serializer = self.get_serializer(data=request.data)
        #validate the data (raise an error if invalid)
        serializer.is_valid(raise_exception = True)
        #If valid, retrieve the authenticated user from serializer
        user = serializer.validated_data
        #Generate JWT tokens for the user
        tokens = get_tokens_for_user(user)
        #Return response with tokens and user email
        return Response({'tokens': tokens, 'user': user.email},
                        status=status.HTTP_200_OK
                        )
        
        #LOGOUT VIEW

class LogoutView(generics.GenericAPIView):
    #Only authenticated users can log out 
    permission_classes = [IsAuthenticated]
    
    #Handles POST requests to log out
    def post(self, request):
        try:
            #Retrieve the refresh token from the request body
            refresh_token = request.data["refresh"]
            #Convert it into a RefreshToken object
            token = RefreshToken(refresh_token)
            #Blacklist(invalidate) the token so it can't be reused
            token.blacklist()
            #Return success response
            return Response({"message": "Logged out successfully"}, status = 200)
        
        except Exception:
            #If something goes wrong,  return error response
            return Response({"error": "Invalid token"}, status = 400)
    
    
    #FORGOT PASSWORD VIEW

class ForgotPasswordView(generics.GenericAPIView):
    #Anyone can request a password reset (no authentication required)
    permission_classes = [AllowAny]

    #Handles POST request when user submits their email
    def post(self, request):
        #Exttract email from the request body
        email = request.data.get('email')
        try:
            #Check if the user with this email exists
            user = User.objects.get(email=email)
            #Generate a uniques token for this user
            token = PasswordResetTokenGenerator().make_token(user)
            reset_link = f"http://localhost:8000/reset-password/{user.pk}/{token}/"
           
           #send password reset mail
            send_mail(
                subject="Password Reset",
                message=f"Click here to reset your password: {reset_link}",
                from_email="no-reply@example.com",
                recipient_list=[email],
            )
            
            #Return success message
            return Response({"message": "Password reset email sent."}, status=200)
        except User.DoesNotExist:
            #If email not found in database 
            return Response({"error": "User not found"}, status=404)
        
#PASSWORD RESET VIEW
class ResetPasswordView(generics.GenericAPIView):
    #Anyone can reset their password with a valid token
    permission_classes = [AllowAny]

    #Handles POST request to reset password
    def post(self, request, uid, token):
        try:
            #Find user by their ID
            user = User.objects.get(pk=uid)
            #Verify if the prvides token is valid for this user
            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response({"error": "Invalid token"}, status=400)
            
            #Get new password request body
            new_password = request.data.get('password')
            #Set and hash the new password
            user.set_password(new_password)
            user.save()
            #Return success message
            return Response({"message": "Password reset successful"}, status=200)
        except User.DoesNotExist:
            #If user ID is invalid or not found
            return Response({"error": "User not found"}, status=404)