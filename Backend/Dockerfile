# Backend/Dockerfile
FROM python:3.10-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# สร้าง working directory ใน container
WORKDIR /app

# คัดลอก requirements.txt และติดตั้ง dependencies
COPY ./requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

#  คัดลอกโค้ดทั้งหมดจาก backend/
# รวมทั้ง manage.py, backend/, sheets_service/
COPY ./backend ./backend

# ตั้ง working directory เป็นที่อยู่ของ manage.py
WORKDIR /app/backend

# รัน migrate, collectstatic, แล้ว start server
CMD ["sh", "-c", "python manage.py migrate && python manage.py collectstatic --noinput && gunicorn backend.wsgi:application --bind 0.0.0.0:8000"]
