# Backend/Dockerfile
FROM python:3.10-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# สร้าง working dir
WORKDIR /app

# คัดลอก requirements.txt และติดตั้ง dependencies
COPY ./requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

#คัดลอกโฟลเดอร์ backend/ ทั้งหมด (ที่มี manage.py, backend/, sheets_service/)
COPY ./backend ./backend

# เปลี่ยน working dir ไปยังที่อยู่ของ manage.py
WORKDIR /app/backend

# รัน migrate, collectstatic, และ gunicorn
CMD ["sh", "-c", "python manage.py migrate && python manage.py collectstatic --noinput && gunicorn backend.wsgi:application --bind 0.0.0.0:8000"]
