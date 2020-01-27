<template>
  <div class="text-xs-center" v-if="site.locale_switcher">

      <v-btn
        v-for="lang in Object.keys($i18n.messages)"
        :key="lang"
        @click="changeLocale(lang)"
        flat
        small
      >{{lang | ucfirst}}
      </v-btn>

  </div>
</template>

<script>
import types from "../store/types";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["site"])
  },
  filters: {
    ucfirst(val) {
      return String(val)[0].toUpperCase()+String(val)[1].toUpperCase();
    }
  },
  methods: {
    changeLocale(locale) {
      this.$store.commit(types.SET_LOCALE, locale);
    }
  }
};
</script>

