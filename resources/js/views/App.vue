<template>
<v-app>
    <v-navigation-drawer app>

        <v-content>

            <v-container fluid>
                <router-link tag="li" to="/">Home</router-link>
                <router-link tag="li" to="/about">About</router-link>
            </v-container>

            <router-view></router-view>
        </v-content>

    </v-navigation-drawer>
</v-app>
</template>

<script>
export default {
name: "App"
}
</script>

<style scoped>

</style>
