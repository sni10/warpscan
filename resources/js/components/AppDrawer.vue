<template>
    <page-header class="page-header">
        <template></template>
    </page-header>
</template>
<script>
import menu from '../api/menu';
import PageHeader from "../components/PageHeader";
import { mapState } from "vuex" // , mapGetters, mapActions
export default {
  name: 'app-drawer',
  components: {
      PageHeader
  },
  props: {
    expanded: {
      type: Boolean,
      default: true
    },
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
    // window.getApp.$on('APP_DRAWER_TOGGLED', () => {
    //   this.drawer = (!this.drawer);
    // });
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

