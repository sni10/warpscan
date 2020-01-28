<template>
    <v-app id="inspire"class="app" >
            <app-drawer class="app--drawer"></app-drawer>
            <main class="py-4">
                <transition>
                    <keep-alive>
                        <router-view :key="$route.fullpath"></router-view>
                    </keep-alive>
                </transition>
            </main>
    </v-app>
</template>
<script>

import AppDrawer from '../../components/AppDrawer';

export default {
components: {
    AppDrawer
},
data: () => ({
    expanded: true,
    rightDrawer: false,
    snackbar: {
        show: false,
        text: '',
        color: '',
    }
}),

computed: {

},

created () {

},
methods: {

},

};
</script>
