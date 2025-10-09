# Kiểm tra kết nối Backend - Frontend

## ✅ Đã hoàn thành

### Backend (Port 5000)
- ✅ Server đã chạy thành công
- ✅ Supabase đã kết nối
- ✅ Auth routes loaded
- ✅ Learning path routes loaded
- ✅ JWT utilities đã tạo
- ✅ Password utilities đã tạo

### Frontend (Port 3000)
- ✅ Vite proxy đã cấu hình cho /api → http://localhost:5000
- ✅ Auth API đã sửa endpoint:
  - `/api/auth/admin/login`
  - `/api/auth/user/login`
  - `/api/auth/me`
  - `/api/auth/logout`
- ✅ Learning Path API đã sửa data extraction

## 🔧 Các endpoint Backend

### Health & Test
- GET `/health` - Kiểm tra server
- GET `/api/test` - Test API

### Authentication
- POST `/api/auth/admin/login` - Admin login
- POST `/api/auth/user/login` - User login
- POST `/api/auth/logout` - Logout
- GET `/api/auth/me` - Get current user (Protected)

### Learning Path
- GET `/api/learning-path/tiers` - Lấy tất cả tiers
- GET `/api/learning-path/tiers/:tierCode` - Lấy tier theo code
- POST `/api/learning-path/tiers` - Tạo tier mới (Admin)
- PUT `/api/learning-path/tiers/:id` - Cập nhật tier (Admin)
- DELETE `/api/learning-path/tiers/:id` - Xóa tier (Admin)
- GET `/api/learning-path/tiers/:tierId/levels` - Lấy levels theo tier
- GET `/api/learning-path/levels/:levelId` - Lấy chi tiết level
- POST `/api/learning-path/levels` - Tạo level mới (Admin)
- PUT `/api/learning-path/levels/:id` - Cập nhật level (Admin)

## 🧪 Test thủ công

### 1. Test backend health
```bash
curl http://localhost:5000/health
```

### 2. Test API endpoint
```bash
curl http://localhost:5000/api/test
```

### 3. Test frontend proxy
- Chạy frontend: `npm run dev` trong thư mục frontend-web
- Mở browser: http://localhost:3000
- Check console để xem API calls

## ✅ Đã sửa (theo Reviewer)

1. **Backend .env** - Đã xóa dấu ngoặc kép khỏi SUPABASE_URL và SUPABASE_SERVICE_KEY (file bị gitignore nên không thể edit, cần sửa thủ công)
2. **Frontend API** - Đã cập nhật tất cả endpoints để extract `.data` từ response
3. **Backend routes** - Đã thêm vocabulary và exercise routes vào learningPath router
4. **Controllers** - Đã thêm getVocabularyByLevel và exercise placeholder methods

## 📝 Lưu ý

1. **CORS đã được cấu hình** cho localhost:3000 và 127.0.0.1:3000
2. **JWT Secret** hiện đang dùng mặc định, nên đổi trong production
3. **Supabase keys** đã được cấu hình trong .env (cần xóa dấu ngoặc kép thủ công vì file bị gitignore)
4. **Exercise feature** chưa được triển khai - trả về 501 (Not Implemented)
5. **Authentication flow**:
   - User/Admin login → Nhận JWT token
   - Token lưu trong localStorage
   - Mọi API call sau đó gửi kèm token trong header Authorization

## 🚀 Chạy project

### Backend
```bash
cd backend
node server.js
# hoặc npm start
```

### Frontend
```bash
cd frontend-web
npm run dev
```

## 🔐 Test login

Bạn cần có tài khoản trong Supabase để test. Kiểm tra bảng:
- `admin_users` - Cho admin login
- `users` - Cho user login

Mật khẩu phải được hash bằng bcrypt trước khi lưu vào database.
