<template>
    <div class="mt-4 d-flex justify-content-center">
        <div class="container row">
            <div class="footer-item col-12 col-md-4">
                <img src="../assets/images/logo2.png" alt="logo">
                <p class="footer-info mt-2">歡迎預約參訪 ! 此平台提供優質的服務及居家品項
                    <br>
                    “用一杯品茶的時光，乘坐體驗在那有手作溫度的座椅上，細細觀看那如詩畫般的夕陽午後，人生不過如此“
                </p>
            </div>
            <div class="footer-item col-12 col-md-4 d-flex flex-column align-items-center">
                <div class="subtitle mb-2">聯絡我們</div>
                <div class="contact d-flex flex-column">
                    <a class="contact-item" href="https://www.google.com/maps/place/110%E5%8F%B0%E5%8C%97%E5%B8%82%E4%BF%A1%E7%BE%A9%E5%8D%80%E4%BF%A1%E7%BE%A9%E8%B7%AF%E4%BA%94%E6%AE%B57%E8%99%9F/@25.033976,121.5623502,17z/data=!3m1!4b1!4m5!3m4!1s0x3442abb6da9c9e1f:0x1206bcf082fd10a6!8m2!3d25.033976!4d121.5645389"><i class="fas fa-map-marker-alt"></i>台北市信義區信義路五段7號</a>
                    <a class="contact-item" href="mailto:schon@gmail.com"><i class="fas fa-envelope"></i>schon@gmail.com</a>
                    <a class="contact-item" href="tel:+886-666-888"><i class="fas fa-phone-volume"></i>+886-666-888</a>
                </div>
            </div>
            <div class="footer-item col-12 col-md-4 d-flex flex-column">
                <div class="subtitle subscribe-btn mb-2 text-center">訂閱電子報</div>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="請輸入信箱" aria-label="Recipient's username" aria-describedby="button-addon2">
                    <div class="input-group-append">
                      <button class="btn btn-outline-secondary" type="button" id="button-addon2">訂閱</button>
                    </div>
                  </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .footer-info {
        color: #aaaaaa;
    }
    .subtitle {
        color: #aaaaaa;
        font-size: 24px;
        font-weight: bold;
    }
    .footer-item + .footer-item {
        margin-top: 20px;
    }
    .contact-item + .contact-item {
        margin-top: 10px;
    }
    .contact-item {
        color: #aaaaaa;
        text-decoration: none;
    }
    .contact-item i {
        margin-right: 5px;
    }
    @media screen and (min-width: 768px) {
        .footer-item + .footer-item {
            margin-top: 0;
        }
    }
</style>