# Giới thiệu:

Đây là repo về backend cho đề tài **"DỰ ĐOÁN KẾT QUẢ HỌC TẬP CỦA NGƯỜI HỌC VÀ ĐƯA RA CẢNH BÁO SỚM TRÊN NỀN TẢNG MOOCS"** cho môn học "CS313 - Khai thác dữ liệu và ứng dụng".

## 💡 Ý tưởng đề tài

Trong thời đại giáo dục trực tuyến bùng nổ, đặc biệt với các Khóa học Trực tuyến Mở Rộng (MOOCs), việc hỗ trợ học viên đạt được kết quả học tập tốt nhất là một thách thức lớn. Dự án này mang đến một giải pháp tiên phong, sử dụng các mô hình học máy và học sâu để:
*   🔮 **Dự đoán hiệu suất học tập** của học viên.
*   ⚠️ **Cung cấp cảnh báo sớm** cho những học viên có nguy cơ.
*   ✨ **Tối ưu hóa trải nghiệm học tập** tổng thể.
*   👤 **Cá nhân hóa lộ trình và hỗ trợ học tập**.

Bằng cách kết hợp công nghệ hiện đại và phân tích dữ liệu hành vi, chúng tôi hướng tới việc giảm tỷ lệ bỏ học và nâng cao chất lượng giáo dục trực tuyến.

# ⚙️ Cài đặt

## 📥 Tải source code về máy

```python
git clone https://github.com/nth4002/DataMining-API.git
```
Sau đó mở terminal, và chuyển hướng tới thư mục chứa source code

```python
cd DataMining-API
```

## 🚀 Cách chạy 

- Tải các packages cần thiết 
```python
npm install
```

- Khởi động frontend server
```python
npm run dev
```
## 📄 Cấu hình file env
```bash
# Cấu hình kết nối PostgreSQL
DB_USER=your_db_user          # Tên người dùng cơ sở dữ liệu
DB_HOST=your_db_host          # Host của cơ sở dữ liệu
DB_DATABASE=your_database     # Tên cơ sở dữ liệu
DB_PASSWORD=your_db_password  # Mật khẩu cơ sở dữ liệu
DB_PORT=your_DB_port          # Cổng của cơ sở dữ liệu

# Cấu hình server
PORT=your_API_server_port     # Cổng mà API server sẽ lắng nghe

```

# Framework + Công nghệ sử dụng:
1. 🟢 Node.js với ✨ Express.js
- Node.js: Là một môi trường thực thi JavaScript phía server, xây dựng trên engine V8 của Chrome. Nó cho phép chạy JavaScript bên ngoài trình duyệt.
  - **Vai trò**: Cung cấp nền tảng non-blocking, I/O-bound hiệu quả cho việc xây dựng các ứng dụng mạng và API.
- Express.js: Là một framework web nhỏ gọn, linh hoạt và tối giản cho Node.js, cung cấp một bộ tính năng mạnh mẽ để phát triển ứng dụng web và API.
  - **Vai trò**: Xử lý routing (định tuyến), middleware, quản lý request/response HTTP, giúp tổ chức code backend một cách rõ ràng và hiệu quả.
Lý do chọn: Cộng đồng lớn, hệ sinh thái npm phong phú, hiệu năng tốt cho các ứng dụng cần xử lý nhiều kết nối đồng thời, dễ dàng xây dựng RESTful APIs.
2. 🐘 Cơ sở dữ liệu: PostgreSQL
- **Mô tả**: Một hệ quản trị cơ sở dữ liệu quan hệ đối tượng (ORDBMS) mã nguồn mở mạnh mẽ, nổi tiếng với độ tin cậy, tính toàn vẹn dữ liệu và các tính năng phong phú.
- **Vai trò**: Lưu trữ toàn bộ dữ liệu của hệ thống, bao gồm thông tin người học, thông tin khóa học, dữ liệu hành vi tương tác (xem video, làm bài tập), kết quả dự đoán từ mô hình ML, và các dữ liệu cấu hình khác.
- **Lý do chọn**: Tính ổn định cao, hỗ trợ ACID, khả năng mở rộng tốt, hỗ trợ các kiểu dữ liệu phức tạp và các tính năng SQL nâng cao, phù hợp cho việc lưu trữ dữ liệu có cấu trúc và đảm bảo tính nhất quán.
