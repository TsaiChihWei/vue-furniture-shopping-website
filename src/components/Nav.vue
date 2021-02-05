<template>
    <div class="wrapper">
        <div>
            <div class="d-flex justify-content-between">
                <routerLink to="/home">
                    <img src="../assets/images/logo.png" alt="logo">
                </routerLink>
                <a class="menu-btn" data-toggle="collapse" href="#collapseMenu" role="button" aria-expanded="false"
                    aria-controls="collapseExample">
                    <i class="fas fa-bars"></i>
                </a>
            </div>
        </div>
        <div class="collapse" id="collapseMenu">
            <nav class="nav text-center">
                <routerLink class="nav-link" to="/home">首頁</routerLink>
                <routerLink class="nav-link" to="/products">產品項目</routerLink>
                <routerLink class="nav-link" to="/admin">後臺管理</routerLink>
            </nav>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Nav',
  methods: {

  }
}
</script>

<style lang="scss" scoped>
    .wrapper {
        padding: 10px 20px;
    }

    .nav-link {
        font-size: 18px;
        font-weight: bold;
        transition: .3s all;
    }
    .nav-link:hover {
        transform: translateY(-10px);
    }
    .menu-btn {
        color: #000;
    }

    .menu-btn:hover {
        color: #000;
    }

    .nav {
        flex-direction: column;
    }

    .fas.fa-bars {
        font-size: 40px;
        cursor: pointer;
    }

    @media screen and (min-width: 768px) {
        .wrapper {
            display: flex;
            justify-content: space-between;
        }

        .menu-btn {
            display: none;
        }

        #collapseMenu {
            display: block;
        }

        .nav {
            flex-direction: row;
        }
    }
</style>
