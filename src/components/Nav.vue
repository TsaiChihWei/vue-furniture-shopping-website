<template>
    <div>
        <div class="container">
            <div class="d-flex w-100 justify-content-between mt-2">
                <a href="#">
                    <img src="../assets/images/logo.png" alt="logo">
                </a>
                <a class="menu-btn" data-toggle="collapse" href="#collapseMenu" role="button" aria-expanded="false"
                    aria-controls="collapseExample">
                    <i class="fas fa-bars"></i>
                </a>
            </div>

            <div class="collapse" id="collapseMenu">
                <nav class="nav flex-column text-center">
                    <a class="nav-link active" href="#">首頁</a>
                    <a class="nav-link" href="#">產品項目</a>
                    <a class="nav-link" href="#">後臺管理</a>
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Nav',
        methods: {

        },
    }
</script>

<style lang="scss">
    .menu-btn {
        color: #000;
    }
    .menu-btn:hover {
        color: #000;
    }
    .fas.fa-bars {
        font-size: 40px;
        cursor: pointer;
    }
</style>