# Victor — Portfolio

Trang giới thiệu cá nhân của Phạm Anh Tuấn (Victor), xây bằng Next.js 16 +
Tailwind CSS, theme Spidey (đỏ/đen/kem, mascot pixel-art).

## Chạy thử trên localhost

**Yêu cầu**: Node.js 20+ (khuyến nghị bản LTS mới nhất).

1. Cài dependency:

   ```bash
   npm install
   ```

2. (Tuỳ chọn nhưng nên làm) Cấu hình widget commit-streak GitHub — nếu bỏ
   qua bước này, trang vẫn chạy bình thường, riêng thẻ streak ở section
   "Chuỗi Cam Kết" sẽ hiện card placeholder (nhện đang ngủ, không có số
   liệu thật) thay vì streak thật:

   - Tạo token tại
     [github.com/settings/tokens](https://github.com/settings/tokens)
     (classic token, scope `read:user`).
   - Tạo file `.env.local` ở thư mục gốc project với nội dung:

     ```bash
     GITHUB_TOKEN=your_token_here
     GITHUB_USERNAME=ahtuan171
     ```

3. Chạy dev server:

   ```bash
   npm run dev
   ```

4. Mở trình duyệt tại **[http://localhost:3000](http://localhost:3000)**.

   Xem riêng SVG do widget tạo ra tại
   [http://localhost:3000/api/pet](http://localhost:3000/api/pet).

Dev server tự reload khi bạn sửa code. Dừng bằng `Ctrl+C` trong terminal.

## Xem bản build production tại localhost

Để kiểm tra sát với bản thật sẽ deploy (khác với `next dev` ở cách build/tối
ưu):

```bash
npm run build
npm run start
```

Cũng mở tại [http://localhost:3000](http://localhost:3000).

## Các lệnh khác

```bash
npx eslint .   # lint — next lint đã bị bỏ ở Next 16
```

## Cấu trúc & quy ước

Xem [CLAUDE.md](CLAUDE.md) — tài liệu đầy đủ về stack, design system, bảng
màu Spidey, cách mascot hoạt động, và nội dung nào là thật/còn placeholder.
