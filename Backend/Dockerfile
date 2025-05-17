# Dockerfile
FROM python:3.10-slim

# Set workdir
WORKDIR /code

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy entire backend
COPY . . 

RUN python manage.py collectstatic --noinput

# Run migration + start server
# CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000"]