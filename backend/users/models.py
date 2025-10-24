from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

# AbstractBaseUser gives you the core fields and methods for a custom user (password, login, etc.)
# BaseUserManager lets you define how to create normal and super users
# PermissionsMixin adds permission-related fields (like is_superuser) and methods


#USER MANAGER CLASS

class UserManager(BaseUserManager): #Defines how users and superusers are created.
    def create_user(self, username, email, phone, password=None):
        if not email:
            raise ValueError("Users must have an email address")
        if not username:
            raise ValueError("Users must have a username")
        
        email = self.normalize_email(email) #Normalize the email
        user = self.model(username=username, email=email, phone=phone) #Create a new user instance (not yet saved to the database)
        user.set_password(password) #set and hash the user's password using Django's built-in hashing 
        user.save(using=self._db) #save the user tot he databse using the configured database
        return user #Return the newly created user
    
    
     #Method to create a superuser(admin)
    def create_superuser(self, username, email, phone, password=None):
        user = self.create_user(username, email, phone, password) #Reuse the create_user method for consistency.
        user.is_staff = True #can access Django admin
        user.is_superuser = True #Has all permissions
        user.save(using=self._db) #Save the changes to the database
        return user
   
   # USER MODEL CLASS
   
   #This defines the actual User model that replaces Django's default one.
class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, unique=True)
    
    #Account status fields
    is_active = models.BooleanField(default=True) 
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    
    
    #AUTHENTICATION CONFIGURATION
    USERNAME_FIELD = 'email' #The users will log in using their email instead of username
    REQUIRED_FIELDS = ['username', 'phone'] #These fields will be prompted for when creaitn a superuser from the commandline
    
    objects = UserManager() #Link this to the custom manager defined above
    
    def __str__(self):  #String representation(how the user will appear in the admin panel or shell)
        return self.email