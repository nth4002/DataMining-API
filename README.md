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
git clone https://github.com/nth4002/DataMining.git
```
Sau đó mở terminal, và chuyển hướng tới thư mục chứa source code

```python
cd DataMining
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
# Địa chỉ URL cơ sở của API backend
VITE_API_BASE_URL=http://localhost:8000/api

# Môi trường chạy (development, production)
NODE_ENV=development
```

# Framework + Công nghệ sử dụng:
1. ⚛️ **React JS (v18+)**
- **Mô tả**: Một thư viện JavaScript phổ biến để xây dựng giao diện người dùng (UI) tương tác và linh hoạt.
- **Vai trò**: Xây dựng các thành phần UI, quản lý trạng thái component và vòng đời, tạo ra trải nghiệm người dùng mượt mà và đáp ứng nhanh.
- **Lý do chọn**: Cộng đồng lớn, hệ sinh thái phong phú, hiệu năng tốt với Virtual DOM, dễ dàng tích hợp với các thư viện khác.
2. ⚡ **Vite**
- **Mô tả**: Một công cụ xây dựng (build tool) thế hệ mới, tập trung vào tốc độ và trải nghiệm phát triển (DX).
- **Vai trò**: Cung cấp server phát triển cực nhanh với Hot Module Replacement (HMR) và tối ưu hóa quá trình build cho production.
- **Lý do chọn**: Tốc độ khởi động server và build nhanh hơn đáng kể so với các bundler truyền thống như Webpack, cấu hình đơn giản.
3. 🔧 **Redux Toolkit**
- **Mô tả**: Bộ công cụ chính thức và được khuyến nghị để quản lý trạng thái (state management) ứng dụng React một cách hiệu quả với Redux.
- **Vai trò**: Quản lý trạng thái toàn cục của ứng dụng (ví dụ: thông tin người dùng, dữ liệu từ API, trạng thái UI phức tạp), giúp dữ liệu được tổ chức và dễ dàng truy cập từ bất kỳ component nào.
- **Lý do chọn**: Đơn giản hóa việc viết Redux, giảm boilerplate code, tích hợp sẵn các best practices như Immer cho immutable updates và Redux Thunk cho xử lý bất đồng bộ.
