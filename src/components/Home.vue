<template>
  <div>
    <Nav></Nav>
    <Main></Main>
  </div>
</template>

<script>
  import Nav from './Nav'
  import Main from './Main'

  export default {
    components: {
      Nav,
      Main,
    },
    name: 'Home',
    data() {
      return {

      }
    },
  }
</script>


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