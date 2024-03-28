from django.contrib import admin
from api.views import CreateUserView
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/register/', CreateUserView.as_view(), name='register'),
    path('api/token/', TokenObtainPairView.as_view(), name='get_token'),
    path('api/token/refresh', TokenRefreshView.as_view(), name='refresh'),
    path('api-auth/', include('rest_framework.urls'), name='refresh'),
    path('api/', include('api.urls'), name='api'),
]
