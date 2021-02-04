<template>
    <div>
        <Nav></Nav>
        <div class="banner">
        </div>
        <div class="navbar">
            <div class="title text-center">產品項目：單椅</div>
            <ul class="nav nav-pills">
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">產品分類</a>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" href="#">Something else here</a>
                  </div>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">價格</a>
                </li>
              </ul>
        </div>
    </div>
</template>

<script>
    import Nav from '../Nav'
    export default {
    components: {
      Nav,
    },
    name: 'BrowseProducts',
    data() {
      return {

      }
    },
  }
</script>

<style lang="scss" scoped>
    .banner {
        height: 150px;
        background-image: url(../../assets/images/banner2.jpg);
        background-size: cover;
        background-position: center bottom;
    }
    .navbar {
        display: flex;
        justify-content: space-between;
    }
    .title {
        color: #7ab3b3;
        font-size: 18px;
        font-weight: bold;
    }
    .nav {
        justify-content: flex-end;
    }
    .nav-link {
        font-weight: bold;
    }
</style>