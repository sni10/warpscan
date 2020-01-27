// define default sidebar menu
export default [
  {
    name: 'Menu item',
    url: '/',
    icon: 'icon-home',
  },
  {
    name: 'Test',
    url: '/test',
    icon: 'icon-home',
  },
  {
    name: 'Home',
    url: '/home',
    icon: 'icon-home',
  },
  {
    name: 'About PAge',
    url: '/about',
    icon: 'icon-home',
  },
  {
    name: 'Apartments',
    url: '/apartments',
    icon: 'icon-home',
    children: [
      {
        name: 'Organization.vue',
        url: '/organization',
        icon: 'icon-home',
      },
      {
        name: 'Organization.vue',
        url: '/buildings',
        icon: 'icon-home',
      }
    ]
  },
  {
    name: 'Exit',
    url: '/logout',
    icon: 'icon-door',
  },
]
