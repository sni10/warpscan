<template>
    <v-app id="inspire" class="app">
        <app-drawer class="app--drawer"></app-drawer>
        <v-content>
            <v-container
                class="fill-height"
                fluid
            >
                <v-row
                    align="center"
                    justify="center"
                >
                    <transition>
                        <keep-alive>
                            <router-view :key="$route.fullpath"></router-view>
                        </keep-alive>
                    </transition>
                </v-row>
            </v-container>
        </v-content>

        <v-btn
            bottom
            color="pink"
            dark
            fab
            fixed
            right
            @click="dialog = !dialog"
        >
            <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-dialog
            v-model="dialog"
            width="800px"
        >
            <v-card>
                <v-card-title class="grey darken-2">
                    Create contact
                </v-card-title>
                <v-container>
                    <v-row class="mx-2">
                        <v-col
                            class="align-center justify-space-between"
                            cols="12"
                        >
                            <v-row
                                align="center"
                                class="mr-0"
                            >
                                <v-avatar
                                    size="40px"
                                    class="mx-3"
                                >
                                    <img
                                        src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                                        alt=""
                                    >
                                </v-avatar>
                                <v-text-field
                                    placeholder="Name"
                                />
                            </v-row>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                prepend-icon="mdi-account-card-details-outline"
                                placeholder="Company"
                            />
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                placeholder="Job title"
                            />
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                prepend-icon="mdi-mail"
                                placeholder="Email"
                            />
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                type="tel"
                                prepend-icon="mdi-phone"
                                placeholder="(000) 000 - 0000"
                            />
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                prepend-icon="mdi-text"
                                placeholder="Notes"
                            />
                        </v-col>
                    </v-row>
                </v-container>
                <v-card-actions>
                    <v-btn
                        text
                        color="primary"
                    >More</v-btn>
                    <v-spacer />
                    <v-btn
                        text
                        color="primary"
                        @click="dialog = false"
                    >Cancel</v-btn>
                    <v-btn
                        text
                        @click="dialog = false"
                    >Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app>
</template>

<script>

import AppDrawer from '../../components/AppDrawer';

export default {
props: {
    source: String,
},
components: {
    AppDrawer
},
data: () => ({
    dialog: false,
    drawer: null,
    items: [
        { icon: 'mdi-contacts', text: 'Contacts' },
        { icon: 'mdi-history', text: 'Frequently contacted' },
        { icon: 'mdi-content-copy', text: 'Duplicates' },
        {
            icon: 'mdi-chevron-up',
            'icon-alt': 'mdi-chevron-down',
            text: 'Labels',
            model: true,
            children: [
                { icon: 'mdi-plus', text: 'Create label' },
            ],
        },
        {
            icon: 'mdi-chevron-up',
            'icon-alt': 'mdi-chevron-down',
            text: 'More',
            model: false,
            children: [
                { text: 'Import' },
                { text: 'Export' },
                { text: 'Print' },
                { text: 'Undo changes' },
                { text: 'Other contacts' },
            ],
        },
        { icon: 'mdi-settings', text: 'Settings' },
        { icon: 'mdi-message', text: 'Send feedback' },
        { icon: 'mdi-help-circle', text: 'Help' },
        { icon: 'mdi-cellphone-link', text: 'App downloads' },
        { icon: 'mdi-keyboard', text: 'Go to the old version' },
    ],
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
<style>
    .app {
        font-family: 'Nunito', sans-serif !important;
    }
</style>
