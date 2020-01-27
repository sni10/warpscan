<template>
    <div class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
        <div class="container">
            <a class="navbar-brand" href="/">
                Laravel
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <!-- Left Side Of Navbar -->
                <ul class="navbar-nav mr-auto">

                </ul>

                <!-- Right Side Of Navbar -->
                <ul class="navbar-nav ml-auto">
                    <!-- Authentication Links -->

                    <li class="nav-item">
                        <a class="nav-link" href="">Login</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="">Register</a>
                    </li>

                </ul>
            </div>
        </div>
    </div>

    <div class="py-4">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        components: {
        },
        computed: {
        },
        created () {
        },
        methods: {
        },

    };
</script>

<!--<style lang="stylus" scoped>-->
<!--    .page-wrapper-->
<!--        min-height:calc(100vh - 64px - 50px - 81px );-->

<!--    #nprogress .bar {-->
<!--        background: #3dac00 !important;-->
<!--    }-->

<!--    /* Fancy blur effect */-->
<!--    #nprogress .peg {-->
<!--        box-shadow: 0 0 10px #3dac00, 0 0 5px #3dac00 !important;-->
<!--    }-->


<!--    #nprogress .spinner-icon {-->
<!--        border-top-color: #3dac00 !important;-->
<!--        border-left-color: #3dac00 !important;-->
<!--    }-->

<!--</style>-->
