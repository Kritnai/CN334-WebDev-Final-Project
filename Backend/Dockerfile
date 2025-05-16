# Backend/Dockerfile
FROM python:3.10-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

# ติดตั้ง dependencies
COPY ./backend/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# คัดลอก source code ทั้ง backend + app
COPY ./backend/backend ./backend/backend
COPY ./sheets_service/sheets_service ./sheets_service/sheets_service

WORKDIR /app/backend

# CMD รัน migrate, collectstatic แล้ว start server
CMD ["sh", "-c", "python manage.py migrate && python manage.py collectstatic --noinput && gunicorn backend.wsgi:application --bind 0.0.0.0:8000"]
