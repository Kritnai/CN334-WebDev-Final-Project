# Dockerfile
FROM python:3.10-slim

# Set workdir
WORKDIR /code

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy entire backend
COPY . . 

# Run migration + start server
CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]


# # Dockerfile
# FROM python:3.10-slim

# # Set working directory
# WORKDIR /code

# # ใส่ ENV แบบถาวร
# ENV POSTGRES_DB=postgres_cn334_final_project
# ENV POSTGRES_USER=postgres_cn334_final_project_user
# ENV POSTGRES_PASSWORD=aeafa3YAzIeYMxees6adnY22EEY8TVOC
# ENV POSTGRES_HOST=dpg-d0jjbp63jp1c73a0gm7g-a.singapore-postgres.render.com
# ENV POSTGRES_PORT=5432

# # ติดตั้ง dependencies
# COPY requirements.txt .
# RUN pip install --no-cache-dir -r requirements.txt

# # คัดลอก source code ทั้งหมด
# COPY . .

# # รัน migrate + runserver
# CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
