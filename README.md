# Random đề thi thử môn Tin Học

Website tĩnh giúp học sinh random đề thi thử môn Tin Học, mở link đề Azota, sao chép mật khẩu, lưu trạng thái đã làm và đánh dấu đề yêu thích ngay trên trình duyệt.

## Chức năng chính

- Random ngẫu nhiên một đề thi thử môn Tin Học.
- Hiển thị danh sách đầy đủ 12 đề thi.
- Mở đề thi Azota trong tab mới.
- Sao chép mật khẩu đề thi.
- Đánh dấu đề đã làm hoặc chưa làm.
- Đánh dấu đề yêu thích.
- Lưu trạng thái bằng `localStorage`, không mất dữ liệu khi tải lại trang.
- Chuyển đổi giao diện sáng/tối và lưu lựa chọn.
- Thống kê tổng số đề, số đề Azota, số đề đã làm, chưa làm và yêu thích.
- Lọc theo tất cả, Azota, đã làm, chưa làm, yêu thích.
- Tìm kiếm theo tên đề hoặc mô tả đề.
- Responsive trên điện thoại, máy tính bảng và laptop.

## Cấu trúc thư mục

```text
.
├── index.html
├── style.css
├── script.js
└── README.md
```

## Cách thêm đề thi mới

Mở file `script.js`, tìm khu vực:

```js
// ================================
// THÊM LINK ĐỀ THI TẠI ĐÂY
// ================================
```

Thêm một object mới vào mảng `exams` theo mẫu:

```js
{
  id: 13,
  title: "Đề thi thử Tin Học số 13",
  description: "Đề thi thử tốt nghiệp THPT môn Tin Học.",
  type: "Azota",
  url: "https://azota.vn/de-thi/...",
  password: "giaimakienthucTNTHPTtinhoc",
  completed: false,
  favorite: false
}
```

Lưu ý: `id` của mỗi đề cần khác nhau để chức năng lưu trạng thái hoạt động chính xác.

## Cách chạy website trên máy tính

Cách đơn giản nhất:

1. Tải toàn bộ file về cùng một thư mục.
2. Mở file `index.html` bằng trình duyệt.
3. Sử dụng website trực tiếp, không cần cài server hoặc database.

## Cách deploy lên GitHub Pages

Bước 1: Tạo repository mới trên GitHub.

Bước 2: Upload các file index.html, style.css, script.js, README.md.

Bước 3: Vào Settings.

Bước 4: Chọn Pages.

Bước 5: Ở phần Build and deployment, chọn Deploy from a branch.

Bước 6: Chọn branch main và thư mục /root.

Bước 7: Nhấn Save.

Bước 8: Chờ GitHub Pages tạo link website.

## Tác giả

Trương Minh Khiêm  
Lớp 12A6  
Trường THPT Võ Văn Kiệt  
Tỉnh Cà Mau
