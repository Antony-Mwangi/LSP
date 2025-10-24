from rest_framework import serializers #For creating serializer
from .models import User  #Import the custom User model
from django.contrib.auth import authenticate  #Used to verify user credentials during login


#REGISTER SERIALIZER

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, min_length=6) #Defines password field separately to make it write-only
    
    class Meta:  #Tell DRF which model and fields to use
        model = User
        fields = ('username', 'email', 'phone', 'password')
        
        
        #Create a new user instance using the custom User model's  'create_user' method
        # 'validated_data' contains all validated input fields.
    def create(self, validated_data):
        return User.objects.create_user(**validated_data) # Use the custom create_user() method defined in the UserManager to handle hashing


#LOGIN SERIALIZER

class LoginSerializer(serializers.Serializer):
    
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    
    def validate(self, data):
        """
        Validate the login credentials.
        - Checks if user exists and password matches.
        - Ensures the account is active.
        """

        user  = authenticate(email=data.get('email'), password=data.get('password')) # 'authenticate()' checks the given credentials against the database
        if not user: #If authentication fails, raise an error
            raise serializers.ValidationError("Invalid credentials")
        if not user.is_active: #If the account is disabled, raise an error
            raise serializers.ValidationError("Account disabled")
        return user #If validation passes, return the authenticated user object