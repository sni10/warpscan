<template>
    <div>
        <div>
            <page-header class="page--header"></page-header>
        </div>
        <div>
            <app-toolbar class="app--toolbar"></app-toolbar>
        </div>
    </div>
</template>
<script>
import menu from '../api/menu';
import PageHeader from "../components/PageHeader";
import AppToolbar from '../components/AppToolbar';
import { mapState } from "vuex" // , mapGetters, mapActions
export default {
  name: 'app-drawer',
  components: {
      PageHeader,
      AppToolbar,
  },
  data: () => ({
    mini: false,
    drawer: true,
    menus: menu,
    scrollSettings: {
      maxScrollbarLength: 160
    }
  }),
  computed: {
    ...mapState(["site"]),

    computeGroupActive () {
      return true;
    },
    computeLogo () {
      return '/static/m.png';
    },

    sideToolbarColor () {
      return this.$vuetify.options.extra.sideNav;
    }
  },
  created () {
    window.getApp.$on('APP_DRAWER_TOGGLED', () => {
      this.drawer = (!this.drawer);
    });
  },
  methods: {
    genChildTarget (item, subItem) {
      if (subItem.href) return;
      if (subItem.component) {
        return {
          name: subItem.component,
        };
      }
      return { name: `${item.group}/${(subItem.name)}` };
    },
  }
};
</script>

