<template>
  <div>
    <!-- 海報 banner -->
    <div class="banner">
      <img class="img-fluid" src="../assets/images/banner.jpeg" alt="" />
    </div>

    <!-- features 特色 -->
    <div class="container mt-4">
      <div class="row">
        <div class="feature col-12 col-md-4">
          <div class="title"><i class="fas fa-medal mr-1"></i>優良品質</div>
          <div class="sutbtitle">High quality</div>
          <div class="description">
            Schon
            當代空間的家具工廠為義大利頂級家具品牌認可的工藝品質，目前外銷各大國家如日本、比利時、美國、新加坡、等居家、精品店以及國際連鎖五星級飯店御用之品質。
          </div>
        </div>
        <div class="feature col-12 col-md-4">
          <div class="title"><i class="fas fa-crop-alt mr-1"></i>原創設計</div>
          <div class="sutbtitle">Original design</div>
          <div class="description">
            我們搭配每一樣家具產品為國際知名家具設計師研發，並提供給客戶最舒適的生活體驗以及空間美學。­
          </div>
        </div>
        <div class="feature col-12 col-md-4">
          <div class="title">
            <i class="far fa-money-bill-alt mr-1"></i>高 CP 值
          </div>
          <div class="sutbtitle">It’s good value</div>
          <div class="description">「有些夢想遙不可及，有些夢想垂手可得」­</div>
          <div class="description">
            我們提供透明且實在的價格，讓您輕鬆打造屬於自己的設計之家。
          </div>
        </div>
      </div>
    </div>

    <!-- 關注我們 -->
    <div class="social-links mt-5">
      <div class="container d-flex justify-content-center text-center">
        <div class="row">
          <div class="col-12 col-md-6 d-flex flex-column justify-content-center mb-4">
            <div class="subtitle">關注我們</div>
            <div class="links d-flex justify-content-center">
              <a href="#"><i class="fab fa-twitter-square"></i></a>
              <a href="#"><i class="fab fa-facebook-square"></i></a>
              <a href="#"><i class="fas fa-envelope"></i></a>
              <a href="#"><i class="fab fa-instagram-square"></i></a>
              <a href="#"><i class="fab fa-snapchat-ghost"></i></a>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <img class="img-fluid" src="../assets/images/living_room.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>

    <!-- 熱門產品分類 -->
    <div class="container mt-5">
      <div class="title text-center mb-5">熱門產品分類</div>
      <div class="categories row">
        <routerLink to="/products?category=沙發" class="col-12 col-md-4 category sofa">
          <div class="subtitle">沙發</div>
        </routerLink>
        <routerLink to="/products?category=書桌" class="col-12 col-md-4 category desk">
          <div class="subtitle">書桌</div>
        </routerLink>
        <routerLink to="/products?category=單椅" class="col-12 col-md-4 category chair">
          <div class="subtitle">單椅</div>
        </routerLink>
        <routerLink to="/products?category=茶几" class="col-12 col-md-4 category teatable">
          <div class="subtitle">茶几</div>
        </routerLink>
        <routerLink to="/products?category=燈具" class="col-12 col-md-4 category lamp">
          <div class="subtitle">燈具</div>
        </routerLink>
        <routerLink to="/products?category=門" class="col-12 col-md-4 category door">
          <div class="subtitle">門</div>
        </routerLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .title {
    font-size: 24px;
    font-weight: bold;
  }

  .subtitle {
    color: #aaaaaa;
  }

  .description {
    color: #777777;
  }

  .feature+.feature {
    margin-top: 20px;
  }

  /* 關注我們 social-links */
  .social-links .subtitle {
    margin-bottom: 20px;
    font-size: 36px;
    color: #7ab3b3;
  }

  .links a {
    color: #7ab3b3;
  }

  .links a i {
    margin-right: 10px;
    font-size: 28px;
    color: #7ab3b3;
  }

  /* 熱門產品分類 */
  .category {
    position: relative;
    transition: 0.3s all;
  }

  .category:hover {
    transform: translateY(-20px);
  }

  .category .subtitle {
    font-size: 24px;
    color: #000;
  }
/* 熱門產品分類 放置背景圖片*/
  .categories > * {
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    height: 150px;
  }
  .door {
    background-image: url(../assets/images/door/door-2815723__340.png);
  }
  .sofa {
    background-image: url(../assets/images/sofa/lounger-3912970_960_720.png);
  }
  .desk {
    background-image: url(../assets/images/table/52488.png);
  }
  .chair {
    background-image: url(../assets/images/chair/chair-4616978_960_720.png);
  }
  .lamp {
    background-image: url(../assets/images/lamp/table-lamp-2320606_1280.png);
  }
  .teatable {
    background-image: url(../assets/images/teatable/Console_Table.png);
  }

  /* @media screen and (min-width: 992px) {
        .banner {
          max-width: 1200px;
        }
      } */
</style>
