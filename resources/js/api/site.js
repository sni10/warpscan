const Site =  {
    "name": "BMS Systems",
    "locale": "en-US",
    "logo": "/static/logo.svg",
    "locale_switcher": true,
    "theme_switcher": true,
    "theme": "cosmo",
    "url": "https://github.com/wxs77577/rest-admin",
    "grid_style": 1,
    "footer1": "footer_default",
    "css": [
      "http://localhost:8088/static/custom.css"
    ],
    "menu": [
      {
        "name": "Home",
        "url": "/home",
        "exact": true,
        "icon": "icon-home"
      },
      {
        "name": "Content",
        "title": true
      },
      {
        "name": "Categories",
        "url": "/categories",
        "icon": "icon-list"
      },
      {
        "name": "Users",
        "url": "/users",
        "icon": "icon-user"
      },
      {
        "name": "System",
        "title": true
      },
      {
        "name": "Settings",
        "url": "/form/site.settings",
        "icon": "icon-settings"
      },
      {
        "name": "Restore Data",
        "url": "/page/restore",
        "icon": "icon-settings"
      },
      {
        "divider": true
      },
      {
        "name": "Logout",
        "url": "/login",
        "icon": "icon-lock"
      }
    ]
  }
;

export { Site };
