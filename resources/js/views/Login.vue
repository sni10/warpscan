<template>
    <v-app id="inspire" class="app">
        <v-content>
            <v-container
                class="fill-height"
                fluid
            >
                <v-row
                    align="center"
                    justify="center"
                >
                    <v-col
                        cols="12"
                        sm="8"
                        md="4"
                    >
                        <v-card class="elevation-12">
                            <v-toolbar
                                color="primary"
                                dark
                                flat
                            >
                                <v-toolbar-title>Login form</v-toolbar-title>
                                <v-spacer />
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                        <v-btn
                                            href="/"
                                            icon
                                            large
                                            target="_blank"
                                            v-on="on"
                                        >
                                            <v-icon>mdi-code-tags</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Source</span>
                                </v-tooltip>
                                <v-tooltip right>
                                    <template v-slot:activator="{ on }">
                                        <v-btn
                                            icon
                                            large
                                            href="https://codepen.io/johnjleider/pen/pMvGQO"
                                            target="_blank"
                                            v-on="on"
                                        >
                                            <v-icon>mdi-codepen</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Codepen</span>
                                </v-tooltip>
                            </v-toolbar>
                            <v-card-text>
                                <v-form>

                                    <v-text-field
                                        append-icon="person"
                                        v-model="email"
                                        :error-messages="emailErrors"
                                        label="E-mail"
                                        type="text"
                                        required
                                        @input="$v.email.$touch()"
                                        @blur="$v.email.$touch()"
                                    ></v-text-field>

                                    <v-text-field
                                        append-icon="lock"
                                        v-model="password"
                                        :error-messages="passErrors"
                                        :counter="10"
                                        label="Password"
                                        type="password"
                                        required
                                        @input="$v.password.$touch()"
                                        @blur="$v.password.$touch()"
                                    ></v-text-field>

                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer />
                                <v-btn block
                                       @click="onSubmit"
                                       :loading="this.authenticating"
                                       :disabled="this.authenticating"
                                       color="primary"
                                >Login</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>

// import LocaleSwitcher from "../components/LocaleSwitcher"
import { mapState, mapGetters, mapActions } from "vuex"
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
    password: { required },
    email: { required, email },
  },

  data: () => ({
    loading: false,
    email: 'd.strelets.a@gmail.com',
    password: 'QOSfdyI6z05Foa1T',
    errors: []
  }),
  components: {
    // LocaleSwitcher
  },
  computed: {
    ...mapState(["auth", "site"]),
    ...mapGetters('auth', [
      'authenticating',
      'authenticationError',
      'authenticationErrorCode'
    ]),
    passErrors () {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.maxLength && errors.push('Name must be at most 10 characters long');
      !this.$v.password.required && errors.push('Name is required.');
      return errors
    },
    emailErrors () {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push('Must be valid e-mail');
      !this.$v.email.required && errors.push('E-mail is required');
      return errors
    }
  },
  methods: {
    ...mapActions('auth', [
      'login',
    ]),
    onSubmit: function() {

      this.$v.$touch();

      // Perform a simple validation that email and password have been typed in

     this.login({ username: this.email, password: this.password })

    },
    onSuccess: function(obj) {
      console.log( 'Success' );
    }
  }

};
</script>
<style scoped lang="css">
  #login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
</style>
