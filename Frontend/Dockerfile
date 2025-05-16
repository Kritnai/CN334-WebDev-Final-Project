# ใช้ Node.js base image
FROM node:18-alpine

# สร้าง directory สำหรับ app
WORKDIR /app

# คัดลอกไฟล์ dependency ก่อน
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอก source code ทั้งหมด
COPY . .

# Build ตัว frontend
RUN npm run build

# เปิดพอร์ตสำหรับ next start (default คือ 3000)
EXPOSE 3000

# รัน production server
CMD ["npm", "start"]
