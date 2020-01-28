<template>
    <v-app-bar
        :clipped-left="$vuetify.breakpoint.lgAndUp"
        app
        color="blue darken-3"
        dark
    >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-toolbar-title
            style="width: 300px"
            class="ml-0 pl-4"
        >
            <span class="hidden-sm-and-down">Google Contacts</span>
        </v-toolbar-title>
        <v-text-field
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Search"
            class="hidden-sm-and-down"
        />
        <v-spacer />
        <v-btn icon>
            <v-icon>mdi-apps</v-icon>
        </v-btn>
        <v-btn icon>
            <v-icon>mdi-bell</v-icon>
        </v-btn>
        <v-btn
            icon
            large
        >
            <v-avatar
                size="32px"
                item
            >
                <v-img
                    src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
                    alt="Vuetify"
                /></v-avatar>
        </v-btn>
    </v-app-bar>
</template>
<script>


import { mapState  } from "vuex"
import  store from "../store"

export default {
  name: 'app-toolbar',
  components: {},
  data: () => ({
    drawer: null,
    items: [
      {
        icon: 'account_circle',
        href: '#',
        title: 'Profile',
        click: (e) => {
          console.log(e);
        }
      },
      {
        icon: 'settings',
        href: '#',
        title: 'Settings',
        click: (e) => {
          console.log(e);
        }
      },
      {
        icon: 'fullscreen_exit',
        href: '#',
        title: 'Logout',
        click: (e) => {
          store.dispatch('auth/logout')
        }
      }
    ],
  }),
  computed: {
    ...mapState(["site", "auth"]),
    toolbarColor () {
      return this.$vuetify.options.extra.mainNav;
    }
  },
  methods: {
    handleDrawerToggle () {
      window.getApp.$emit('APP_DRAWER_TOGGLED');
    },
    handleFullScreen () {
      Util.toggleFullScreen();
    }
  }
};
</script>
