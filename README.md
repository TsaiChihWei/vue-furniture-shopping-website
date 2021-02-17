# Scon 傢俱電商

![](https://github.com/TsaiChihWei/vue-furniture-shopping-website/blob/main/src/assets/images/forDemo/home.png?raw=true)

## Demo

https://tsaichihwei.github.io/Scon-demo/#/home

## 簡介

完整電商前後臺網站，後臺店家能夠自行上架和修改商品和查看訂單，前臺顧客能瀏覽商品、加入購物車、下單和結帳。（後端 API 由[六角學院](https://www.hexschool.com/)提供）

此作品的功能：

+ 前臺
  + 首頁：介紹公司文化及導覽。
  + 購物商場：多項商品分類且可以以價格高低篩選以及點擊商品可以進入單一商品細節，此時能直接將商品加入購物車。
  + 購物車：調整商品數量（增減、刪除）、查看購物車商品項目，購物車內容為空時引導至購物商場。（優惠券功能目前未實裝）
  + 下單訂購和訂單結帳。
  + 後臺登入頁面。（進行產品管理）

+ 後臺
  + 商品管理：新增、修改和刪除產品。（可以修改產品圖片、售價及啟用狀態等等）
  + 訂單管理：查看訂單狀況。

## 使用到的工具、插件及功能

- Vue.js
- VueCLI (2)
- VueRouter
- Vue-Axios
- VeeValidate 驗證插件
- Ajax 串接 API
- Bootstrap 4 + 手刻 CSS（後台使用 Bootstrap 模板）
- RWD
- Font Awesome
- Google Font

## Demo 快速看

### 首頁

<img src="https://github.com/TsaiChihWei/vue-furniture-shopping-website/blob/main/src/assets/images/forDemo/home.png?raw=true" style="zoom:67%;" />

品牌文化

<img src="https://github.com/TsaiChihWei/vue-furniture-shopping-website/blob/main/src/assets/images/forDemo/home_features.png?raw=true" style="zoom:67%;" />

### 購物商場

可選取分類及價格高低篩選，點擊產品可進入詳細產品頁面。

<img src="https://github.com/TsaiChihWei/vue-furniture-shopping-website/blob/main/src/assets/images/forDemo/products.png?raw=true" style="zoom:67%;" />

加入購物車回饋訊息

<img src="https://github.com/TsaiChihWei/vue-furniture-shopping-website/blob/main/src/assets/images/forDemo/addToCartFeedback.png?raw=true" style="zoom:67%;" />

### 詳細產品介紹

調整想購買的商品數量並計算出小計金額

<img src="https://github.com/TsaiChihWei/vue-furniture-shopping-website/blob/main/src/assets/images/forDemo/productDetail.png?raw=true" style="zoom:67%;" />

### 購物車

頁首的購物車圖示上面會顯示目前購物車產品品種數量（隨購物車數目變動）

![](https://github.com/TsaiChihWei/vue-furniture-shopping-website/blob/main/src/assets/images/forDemo/cartIcon.png?raw=true)

購物車頁面

+ 增減數量並計算出小計金額及總金額。
+ 點擊刪除按鈕可將商品從購物車中移除。
+ 優惠券功能未實裝，目前僅裝飾。

<img src="https://github.com/TsaiChihWei/vue-furniture-shopping-website/blob/main/src/assets/images/forDemo/cartItems.png?raw=true" style="zoom:67%;" />

如若購物車為空則引導至購物商場

<img src="https://github.com/TsaiChihWei/vue-furniture-shopping-website/blob/main/src/assets/images/forDemo/cartIsEmpty.png?raw=true" style="zoom:67%;" />

### 建立訂單頁面

<img src="https://github.com/TsaiChihWei/vue-furniture-shopping-website/blob/main/src/assets/images/forDemo/createOrder.png?raw=true" style="zoom:67%;" />

表單需經過驗證才能送出資料（必填欄位及符合 email 格式）

<img src="https://github.com/TsaiChihWei/vue-furniture-shopping-website/blob/main/src/assets/images/forDemo/formValidate.png?raw=true" style="zoom:67%;" />

### 付款頁面

<img src="https://github.com/TsaiChihWei/vue-furniture-shopping-website/blob/main/src/assets/images/forDemo/orderPay.png?raw=true" style="zoom:67%;" />

### 結帳完成

<img src="https://github.com/TsaiChihWei/vue-furniture-shopping-website/blob/main/src/assets/images/forDemo/orderPayDone.png?raw=true" style="zoom:67%;" />

### 後臺

商品管理

<img src="https://github.com/TsaiChihWei/vue-furniture-shopping-website/blob/main/src/assets/images/forDemo/ManageProducts.png?raw=true" style="zoom:67%;" />

訂單管理

<img src="https://github.com/TsaiChihWei/vue-furniture-shopping-website/blob/main/src/assets/images/forDemo/ManageOrders.png?raw=true" style="zoom:67%;" />

# 聲明

- 圖片和文字資料來源皆來自於網路。
- 本作品內的圖片與文字內容為個人練習技術使用，不做任何商業用途。