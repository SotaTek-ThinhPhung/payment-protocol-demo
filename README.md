# Hướng dẫn chạy luồng Stripe payment demo
## 1. Tổng quan luồng chạy
- Ta cần tạo tài khoản Stripe để thực hiện, mỗi tài khoản sẽ có api key riêng. Backend cần dùng secret api key này để có thể gọi đến stripe
- Các sản phẩm sẽ bán qua Stripe phải được cấu hình trong dashboard với mức giá và đơn vị tiền tệ từng sản phẩm. Mỗi sản phẩm sẽ có 1 ID riêng. Trong demo chỉ có 1 sản phẩm duy nhất nên ID này sẽ không truyền từ FE mà hardcode trong BE
- BE cần mở 1 API làm webhook để Stripe gửi các thông tin transaction, từ đó lưu trữ vào db
- Luồng chạy thực tế xem tại: https://stripe.com/docs/payments/checkout/how-checkout-works#lifecycle
<br>**Lưu ý: Nếu sử dụng tất cả các thông số có sẵn trong env example thì có thể bỏ qua bước 2. Tuy nhiên webhook ở account này đã cố định là domain https://saitestproto.loca.lt/. Đây là domain tạo từ tunnel đến cổng 4242 local nên trước khi chạy cần cài đặt localtunnel bằng lệnh `npm install -g localtunnel` rồi chạy lệnh tạo tunnel `lt --port 4242 --subdomain saitestproto`**
## 2. Đăng ký và cấu hình Stripe account
- Đăng ký: https://dashboard.stripe.com/register
- Thêm sản phẩm và lưu id sản phẩm tại: https://dashboard.stripe.com/test/products?active=true
- Thêm địa chỉ webhook và lưu webhook id tại: https://dashboard.stripe.com/test/webhooks
- Lưu api key (secret) tại: https://dashboard.stripe.com/test/apikeys
- Cấu hình api key, webhook endpoint key, domain, id sản phẩm trong file .env
## 3. Chạy luồng cơ bản
- Chạy `npm install` để cài đặt
- Chạy `npm run stripe` để triển khai backend, frontend
- Truy cập vào địa chỉ `{domain}/checkout.html` với domain là địa chỉ website đã cấu hình trong file .env và cũng là domain dựng trang web (VD: https://saitestproto.loca.lt/checkout.html)
- Click vào nút checkout để thực hiện thanh toán
- Điền `4242 4242 4242 4242` với số thẻ, các thông tin khác điền tùy ý
## 