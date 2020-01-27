export default [
  {
    path: '*',
    meta: {
      public: true,
    },
    redirect: {
      path: '/404'
    }
  },
  {
    path: '/404',
    meta: {
      public: true,
    },
    name: 'NotFound',
    component: () => import(

      `@/views/NotFound.vue`
    )
  },
  {
    path: '/403',
    meta: {
      public: true,
    },
    name: 'AccessDenied',
    component: () => import(
      `@/views/Deny.vue`
    )
  },
  {
    path: '/500',
    meta: {
      public: true,
    },
    name: 'ServerError',
    component: () => import(

      `@/views/Error.vue`
    )
  },

  {
    path: '/',
    redirect: {
      path: '/dashboard'
    },
    component: () => import(

      `@/views/Layout.vue`
    ),
      children: [
        {
          path: '/dashboard',
          meta: {
            breadcrumb: true,
            public: false,
            onlyGuest: false
          },
          name: 'Dashboard',
          component: () => import(
      
            `../views/Dashboard.vue`
            )
        },
        {
          path: '/organizations',
          meta: {
            breadcrumb: true,
            public: false,
            onlyGuest: false
          },
          name: 'Organizations',
          component: () => import(
      
            `@/views/Organizations.vue`
            )
        },
        {
          path: '/buildings',
          meta: {
            breadcrumb: true,
            public: false,
            onlyGuest: false
          },
          name: 'Buildings',
          component: () => import(

            `@/views/Buildings.vue`
            )
        },
        {
          path: '/components/card',
          meta: {
            breadcrumb: true,
            public: true,
            onlyGuest: false
          },
          name: 'components/cards',
          component: () => import(
      
            `@/views/ui/Cards.vue`
            )
        },
        {
          path: '/login',
          meta: {
            public: true,
          },
          name: 'Login',
          component: () => import(
      
            `@/views/Login.vue`
            )
        },
        {
          path: '/media',
          meta: { },
          name: 'Media',
          props: (route) => ({ type: route.query.type }),
          component: () => import(
      
            `@/views/Media.vue`
            )
        },
        
        {
          path: '/components/table',
          meta: {
            breadcrumb: true,
            public: false,
            onlyGuest: false
          },
          name: 'components/tables',
          component: () => import(
      
            `@/views/ui/Tables.vue`
            )
        },
        {
          path: '/components/alert',
          meta: {
            breadcrumb: true,
            public: false,
            onlyGuest: false
          },
          name: 'components/alerts',
          component: () => import(
      
            `@/views/ui/Alert.vue`
            )
        },
        {
          path: '/components/avatar',
          meta: {
            breadcrumb: true,
            public: false,
            onlyGuest: false
          },
          name: 'components/avatars',
          component: () => import(
      
            `@/views/ui/Avatar.vue`
            )
        },
        {
          path: '/components/badge',
          meta: {
            breadcrumb: true,
            public: false,
            onlyGuest: false
          },
          name: 'components/badges',
          component: () => import(
      
            `@/views/ui/Badge.vue`
            )
        },
        {
          path: '/components/button',
          meta: {
            breadcrumb: true,
            public: false,
            onlyGuest: false
          },
          name: 'components/buttons',
          component: () => import(
      
            `@/views/ui/Button.vue`
            )
        },
        {
          path: '/components/parallax',
          meta: {
            breadcrumb: true,
            public: false,
            onlyGuest: false
          },
          name: 'components/parallax',
          component: () => import(
      
            `@/views/ui/Parallax.vue`
            )
        },
        {
          path: '/components/snackbar',
          meta: {
            breadcrumb: true,
            public: false,
            onlyGuest: false
          },
          name: 'components/snackbar',
          component: () => import(
      
            `@/views/ui/Snackbar.vue`
            )
        },
        {
          path: '/components/chip',
          meta: {
            breadcrumb: true,
            public: false,
            onlyGuest: false
          },
          name: 'components/chips',
          component: () => import(
      
            `@/views/ui/Chip.vue`
            )
        },
        {
          path: '/components/carousel',
          meta: {
            breadcrumb: true,
            public: false,
            onlyGuest: false
          },
          name: 'components/carousels',
          component: () => import(
      
            `@/views/ui/Carousels.vue`
            )
        },
        {
          path: '/components/dialog',
          meta: {
            breadcrumb: true,
            public: false,
            onlyGuest: false
          },
          name: 'components/dialogs',
          component: () => import(
      
            `@/views/ui/Dialogs.vue`
            )
        },
        {
          path: '/components/icon',
          meta: {
            breadcrumb: true,
            public: false,
            onlyGuest: false
          },
          name: 'components/icons',
          component: () => import(
      
            `@/views/ui/Icon.vue`
            )
        },
        {
          path: '/components/progress',
          meta: {
            breadcrumb: true,
            public: false,
            onlyGuest: false
          },
          name: 'components/progress',
          component: () => import(
      
            `@/views/ui/Progress.vue`
            )
        },
        {
          path: '/components/slider',
          meta: {
            breadcrumb: true,
            public: false,
            onlyGuest: false
          },
          name: 'components/sliders',
          component: () => import(
      
            `@/views/ui/Slider.vue`
            )
        },
        {
          path: '/components/tooltip',
          meta: {
            breadcrumb: true,
            public: false,
            onlyGuest: false
          },
          name: 'components/tooltips',
          component: () => import(
      
            `@/views/ui/Tooltip.vue`
            )
        },
        {
          path: '/components/pagination',
          meta: {
            breadcrumb: true,
            public: false,
            onlyGuest: false
          },
          name: 'components/paginations',
          component: () => import(
      
            `@/views/ui/Pagination.vue`
            )
        },
        {
          path: '/pickers/datepicker',
          meta: {
            breadcrumb: true,
            public: false,
            onlyGuest: false
          },
          name: 'pickers/datepicker',
          component: () => import(
      
            `@/views/ui/Datepicker.vue`
            )
        },
        {
          path: '/components/typography',
          meta: {
            breadcrumb: true,
            public: false,
            onlyGuest: false
          },
          name: 'components/typography',
          component: () => import(
      
            `@/views/ui/Typography.vue`
            )
        },
        {
          path: '/components/color',
          meta: {
            breadcrumb: true,
            public: false,
            onlyGuest: false
          },
          name: 'components/color',
          component: () => import(
      
            `@/views/ui/Colors.vue`
            )
        },
        {
          path: '/pickers/timepicker',
          meta: {
            breadcrumb: true,
            public: false,
            onlyGuest: false
          },
          name: 'pickers/timepicker',
          component: () => import(
      
            `@/views/ui/Timepicker.vue`
            )
        },
        {
          path: '/layout/bottomsheets',
          meta: {
            breadcrumb: true,
            public: false,
            onlyGuest: false
          },
          name: 'components/bottom-sheets',
          component: () => import(
      
            `@/views/layout/BottomSheets.vue`
            )
        },
        {
          path: '/layout/expansion-panel',
          meta: {
            breadcrumb: true,
            public: false,
            onlyGuest: false
          },
          name: 'components/expansion-panels',
          component: () => import(
      
            `@/views/layout/ExpansionPanels.vue`
            )
        },
        {
          path: '/layout/footer',
          meta: {
            breadcrumb: true,
            public: false,
            onlyGuest: false
          },
          name: 'components/footer',
          component: () => import(
      
            `@/views/layout/Footers.vue`
            )
        },
        {
          path: '/layout/timeline',
          meta: {
            breadcrumb: true,
            public: false,
            onlyGuest: false
          },
          name: 'components/timeline',
          component: () => import(
      
            `@/views/layout/Timeline.vue`
            )
        },
        {
          path: '/layout/list',
          meta: {
            breadcrumb: true,
            public: false,
            onlyGuest: false
          },
          name: 'components/lists',
          component: () => import(
      
            `@/views/layout/Lists.vue`
            )
        },
        {
          path: '/layout/toolbar',
          meta: {
            breadcrumb: true,
            public: false,
            onlyGuest: false
          },
          name: 'components/toolbar',
          component: () => import(
      
            `@/views/layout/Toolbar.vue`
            )
        },
        {
          path: '/layout/jumbotron',
          meta: {
            breadcrumb: true,
            public: false,
            onlyGuest: false
          },
          name: 'components/jumbotrons',
          component: () => import(
      
            `@/views/layout/Jumbotrons.vue`
            )
        },
        {
          path: '/layout/menu',
          meta: {
            breadcrumb: true,
            public: false,
            onlyGuest: false
          },
          name: 'components/menus',
          component: () => import(
      
            `@/views/layout/Menus.vue`
            )
        },
        {
          path: '/layout/navigation-drawer',
          meta: {
            breadcrumb: true,
            public: false,
            onlyGuest: false
          },
          name: 'components/navigation-drawers',
          component: () => import(
      
            `@/views/layout/NavigationDrawers.vue`
            )
        },
        {
          path: '/layout/tabs',
          meta: {
            breadcrumb: true,
            public: false,
            onlyGuest: false
          },
          name: 'components/tabs',
          component: () => import(
      
            `@/views/layout/Tabs.vue`
            )
        },
        {
          path: '/forms/basic',
          meta: {
            breadcrumb: true,
            public: false,
            onlyGuest: false
          },
          name: 'components/basic-forms',
          component: () => import(
      
            `@/views/form/BasicForms.vue`
            )
        },
        {
          path: '/forms/selects',
          meta: {
            breadcrumb: true,
            public: false,
            onlyGuest: false
          },
          name: 'components/selects',
          component: () => import(
      
            `@/views/form/Selects.vue`
            )
        },
        {
          path: '/forms/editor',
          meta: {
            breadcrumb: true,
            public: false,
            onlyGuest: false
          },
          name: 'components/editors',
          component: () => import(
            `@/views/form/Editors.vue`
            )
        },
        {
          path: '/forms/selection-controls',
          meta: {
            breadcrumb: true,
            public: false,
            onlyGuest: false
          },
          name: 'components/selection-controls',
          component: () => import(
      
            `@/views/form/SelectionControls.vue`
            )
        },
        {
          path: '/forms/text-fields',
          meta: {
            breadcrumb: true,
            public: false,
            onlyGuest: false
          },
          name: 'components/text-fields',
          component: () => import(
      
            `@/views/form/TextFields.vue`
            )
        },
        {
          path: '/forms/steppers',
          meta: {
            breadcrumb: true,
            public: false,
            onlyGuest: false
          },
          name: 'components/steppers',
          component: () => import(
      
            `@/views/form/Steppers.vue`
            )
        },
        {
          path: '/widgets/social',
          meta: {
            breadcrumb: true,
            public: false,
            onlyGuest: false
          },
          name: 'components/social',
          component: () => import(
      
            `@/views/widgets/Social.vue`
            )
        },
        {
          path: '/widgets/post',
          meta: {
            breadcrumb: true,
            public: false,
            onlyGuest: false
          },
          name: 'components/widget-post',
          component: () => import(
      
            `@/views/widgets/Post.vue`
            )
        },
        {
          path: '/widgets/statistic',
          meta: {
            breadcrumb: true,
            public: false,
            onlyGuest: false
          },
          name: 'components/statistic',
          component: () => import(
      
            `@/views/widgets/Statistic.vue`
            )
        },
        {
          path: '/widgets/chart',
          meta: {
            breadcrumb: true,
            public: false,
            onlyGuest: false
          },
          name: 'components/chart',
          component: () => import(
      
            `@/views/widgets/Chart.vue`
            )
        },
        {
          path: '/widgets/list',
          meta: {
            breadcrumb: true,
            public: false,
            onlyGuest: false
          },
          name: 'components/widget-list',
          component: () => import(
      
            `@/views/widgets/List.vue`
            )
        },
    ]
  },
];
