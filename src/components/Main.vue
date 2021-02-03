<template>
    <div>
        <!-- 海報 banner -->
      <div class="banner">
        <img class="img-fluid" src="../assets/images/banner.jpeg" alt="">
      </div>

      <!-- features 特色 -->
      <div class="container mt-4">
        <div class="row">
          <div class="feature col-12 col-md-4">
            <div class="title"><i class="fas fa-medal mr-1"></i>優良品質</div>
            <div class="sutbtitle">High quality</div>
            <div class="description">格蘭傑當代空間的家具工廠為義大利頂級家具品牌認可的工藝品質，目前外銷各大國家如日本、比利時、美國、新加坡、等居家、精品店以及國際連鎖五星級飯店御用之品質。</div>
          </div>
          <div class="feature col-12 col-md-4">
            <div class="title"><i class="fas fa-crop-alt mr-1"></i>原創設計</div>
            <div class="sutbtitle">Original design</div>
            <div class="description">我們搭配每一樣家具產品為國際知名家具設計師研發，並提供給客戶最舒適的生活體驗以及空間美學。­</div>
          </div>
          <div class="feature col-12 col-md-4">
            <div class="title"><i class="far fa-money-bill-alt mr-1"></i>高 CP 值</div>
            <div class="sutbtitle">It’s good value</div>
            <div class="description">「有些夢想遙不可及，有些夢想垂手可得」­</div>
            <div>我們提供透明且實在的價格，讓您輕鬆打造屬於自己的設計之家。</div>
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
              <img class="img-fluid" src="../assets/images/living_room.jpg" alt="">
            </div>
          </div>
        </div>
      </div>

      <!-- 熱門產品分類 -->
      <div class="container mt-5">
        <div class="title text-center">熱門產品分類</div>
        <div class="categories row">
          <a href="#" class="col-12 col-md-4 category">
            <div class="subtitle">L 型沙發</div>
            <img class="img-fluid" src="../assets/images/sofa/sofa1.jpg" alt="">
          </a>
          <a href="#" class="col-12 col-md-4 category">
            <div class="subtitle">一字型沙發</div>
            <img class="img-fluid" src="../assets/images/sofa/sofa2.jpg" alt="">
          </a>
          <a href="#" class="col-12 col-md-4 category">
            <div class="subtitle">單椅</div>
            <img class="img-fluid" src="../assets/images/chair/chair1.jpg" alt="">
          </a>
          <a href="#" class="col-12 col-md-4 category">
            <div class="subtitle">茶几</div>
            <img class="img-fluid" src="../assets/images/table/little-table.jpg" alt="">
          </a>
          <a href="#" class="col-12 col-md-4 category">
            <div class="subtitle">電視櫃</div>
            <img class="img-fluid" src="../assets/images/tv-cabinet.jpg" alt="">
          </a>
          <a href="#" class="col-12 col-md-4 category">
            <div class="subtitle">餐桌</div>
            <img class="img-fluid" src="../assets/images/table/table1.jpg" alt="">
          </a>
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
      transition: .3s all;
    }
    .category:hover {
      transform: translateY(-20px);
    }
    .category .subtitle {
      position: absolute;
      top: 40px;
      font-size: 24px;
      color: #000;
    }
    /* @media screen and (min-width: 992px) {
        .banner {
          max-width: 1200px;
        }
      } */
  </style>