
from pathlib import Path
import os
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-r-iv&ksfr*427&f&&)5o^x0l$mh4%#)ljh(&(+jn-o71+0(wsa'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework', # เพิ่มบรรทัดนี้
    'sheets_service', 
    'rest_framework.authtoken', # <--- ต้องมีบรรทัดนี้
    'corsheaders',

]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.2/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get("POSTGRES_DB", "postgres_cn334_final_project"),
        'USER': os.environ.get("POSTGRES_USER", "postgres_cn334_final_project_user"),
        'PASSWORD': os.environ.get("POSTGRES_PASSWORD", "aeafa3YAzIeYMxees6adnY22EEY8TVOC"),
        'HOST': os.environ.get("POSTGRES_HOST", "dpg-d0jjbp63jp1c73a0gm7g-a.singapore-postgres.render.com"),
        'PORT': os.environ.get("POSTGRES_PORT", "5432"),
        'OPTIONS': {
            'sslmode': 'require'
        }
    }
}


AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


STATIC_URL = 'static/'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'sheets_service.authentication.ExpiringTokenAuthentication', # สมมติว่าไฟล์ชื่อ authentication.py
        'rest_framework.authentication.SessionAuthentication', # อาจจะยังคง Session Auth ไว้ก็ได้
        'rest_framework.authentication.BasicAuthentication', # อาจจะยังคง Basic Auth ไว้ก็ได้
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated', # ตัวอย่าง: กำหนด default ให้ต้องล็อกอิน
    ],
    # ... การตั้งค่าอื่นๆ ของ DRF ...
}

AUTH_TOKEN_MODEL = 'sheets_service.ExpiringToken'


TOKEN_EXPIRY_TIME = 86400

CORS_ALLOW_ALL_ORIGINS = True