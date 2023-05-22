const tree = `
CK-CMS
├── README.md
├── auto-imports.d.ts
├── commitlint.config.js
├── components.d.ts
├── env.d.ts
├── index.html
├── package-lock.json
├── package.json
├── pnpm-lock.yaml
├── public
│   ├── King.jpg
│   ├── favicon.ico
│   └── favicon.png
├── src
│   ├── App.vue
│   ├── assets
│   │   ├── img
│   │   │   ├── login-bg.svg
│   │   │   └── logo.png
│   │   ├── style
│   │   │   ├── common.less
│   │   │   ├── index.less
│   │   │   ├── reset.less
│   │   │   ├── theme.less
│   │   │   └── transition.less
│   │   └── svg
│   │       ├── dark-theme.svg
│   │       ├── exit.svg
│   │       ├── jump.svg
│   │       ├── key-down.svg
│   │       ├── key-enter.svg
│   │       ├── key-esc.svg
│   │       ├── key-up.svg
│   │       ├── loading.svg
│   │       ├── logo.svg
│   │       ├── palette.svg
│   │       └── white-theme.svg
│   ├── base-ui
│   │   ├── king-breadcurmb
│   │   │   ├── index.ts
│   │   │   ├── src
│   │   │   │   └── king-breadcurmb.vue
│   │   │   └── types
│   │   │       └── types.ts
│   │   ├── king-card
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       └── king-card.vue
│   │   ├── king-descriptions
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       └── king-descriptions.vue
│   │   ├── king-echarts
│   │   │   ├── hook
│   │   │   │   └── useInitEcharts.ts
│   │   │   ├── index.ts
│   │   │   ├── map
│   │   │   │   ├── china.json
│   │   │   │   └── coordinate-data.ts
│   │   │   ├── src
│   │   │   │   └── king-echarts.vue
│   │   │   ├── types
│   │   │   │   └── types.ts
│   │   │   └── utils
│   │   │       └── convert-data.ts
│   │   ├── king-editor
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       └── king-editor.vue
│   │   ├── king-icon
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       └── king-icon.vue
│   │   ├── not-found
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       ├── not-found.vue
│   │   │       └── style
│   │   │           └── 404.less
│   │   └── svg-icon
│   │       ├── index.ts
│   │       └── src
│   │           └── svg-icon.vue
│   ├── components
│   │   ├── count-card
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       └── count-card.vue
│   │   ├── nav-header
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       ├── cpns
│   │   │       │   └── header-bar.vue
│   │   │       └── nav-header.vue
│   │   ├── nav-menu
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       ├── cpns
│   │   │       │   └── sub-menu.vue
│   │   │       └── nav-menu.vue
│   │   ├── nav-operation
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       ├── cpns
│   │   │       │   ├── contact.vue
│   │   │       │   ├── message.vue
│   │   │       │   └── search.vue
│   │   │       └── nav-operation.vue
│   │   ├── nav-setting
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       ├── personal-center.vue
│   │   │       └── theme-config.vue
│   │   ├── page-content
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       └── page-content.vue
│   │   ├── page-echarts
│   │   │   ├── index.ts
│   │   │   ├── src
│   │   │   │   ├── bar-echart.vue
│   │   │   │   ├── line-echart.vue
│   │   │   │   ├── map-echart.vue
│   │   │   │   ├── pie-echart.vue
│   │   │   │   └── rose-echart.vue
│   │   │   └── types
│   │   │       └── index.ts
│   │   ├── page-modal
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       └── page-modal.vue
│   │   └── page-search
│   │       ├── index.ts
│   │       └── src
│   │           └── page-search.vue
│   ├── global
│   │   ├── constants.ts
│   │   ├── index.ts
│   │   └── register-baseui.ts
│   ├── hooks
│   │   ├── usePageContent.ts
│   │   ├── usePageModal.ts
│   │   ├── usePageSearch.ts
│   │   └── usePermissions.ts
│   ├── main.ts
│   ├── router
│   │   ├── index.ts
│   │   ├── local
│   │   │   └── localRoutes.ts
│   │   └── main
│   │       ├── analysis
│   │       │   ├── dashboard
│   │       │   │   └── dashboard.ts
│   │       │   └── overview
│   │       │       └── overview.ts
│   │       ├── product
│   │       │   ├── category
│   │       │   │   └── category.ts
│   │       │   └── goods
│   │       │       └── goods.ts
│   │       ├── story
│   │       │   ├── chat
│   │       │   │   └── chat.ts
│   │       │   └── list
│   │       │       └── list.ts
│   │       ├── system
│   │       │   ├── department
│   │       │   │   └── department.ts
│   │       │   ├── menu
│   │       │   │   └── menu.ts
│   │       │   ├── role
│   │       │   │   └── role.ts
│   │       │   └── user
│   │       │       └── user.ts
│   │       └── test1
│   │           └── test2
│   │               └── test3
│   │                   └── test3.ts
│   ├── service
│   │   ├── config
│   │   │   └── config.ts
│   │   ├── index.ts
│   │   ├── login
│   │   │   └── login.ts
│   │   ├── main
│   │   │   ├── analysis
│   │   │   │   └── analysis.ts
│   │   │   ├── main.ts
│   │   │   └── system
│   │   │       └── system.ts
│   │   ├── request
│   │   │   ├── index.ts
│   │   │   └── type.ts
│   │   └── types
│   │       ├── index.ts
│   │       ├── login.ts
│   │       └── main.ts
│   ├── store
│   │   ├── index.ts
│   │   ├── login
│   │   │   └── login.ts
│   │   ├── main
│   │   │   ├── analysis
│   │   │   │   ├── analysis.ts
│   │   │   │   └── type.ts
│   │   │   ├── main.ts
│   │   │   └── system
│   │   │       ├── system.ts
│   │   │       └── type.ts
│   │   └── setting
│   │       └── setting.ts
│   ├── types
│   │   ├── components.ts
│   │   ├── index.ts
│   │   ├── login.ts
│   │   └── service.ts
│   ├── utils
│   │   ├── cache.ts
│   │   ├── crypto.ts
│   │   ├── format.ts
│   │   ├── index.ts
│   │   └── map-menus.ts
│   └── views
│       ├── login
│       │   ├── config
│       │   │   └── account-config.ts
│       │   ├── cpns
│       │   │   ├── login-panel.vue
│       │   │   ├── panel-account.vue
│       │   │   └── panel-phone.vue
│       │   └── login.vue
│       ├── main
│       │   ├── analysis
│       │   │   ├── dashboard
│       │   │   │   └── dashboard.vue
│       │   │   └── overview
│       │   │       ├── config
│       │   │       │   ├── dependencies.ts
│       │   │       │   ├── devDependencies.ts
│       │   │       │   ├── projectStandard.ts
│       │   │       │   ├── projectTree.ts
│       │   │       │   └── technologyStacks.ts
│       │   │       └── overview.vue
│       │   ├── main.vue
│       │   ├── product
│       │   │   ├── category
│       │   │   │   ├── category.vue
│       │   │   │   └── config
│       │   │   │       ├── content.config.ts
│       │   │   │       ├── modal.config.ts
│       │   │   │       └── search.config.ts
│       │   │   └── goods
│       │   │       ├── config
│       │   │       │   ├── content.config.ts
│       │   │       │   ├── modal.config.ts
│       │   │       │   └── search.config.ts
│       │   │       └── goods.vue
│       │   ├── story
│       │   │   ├── chat
│       │   │   │   └── chat.vue
│       │   │   └── list
│       │   │       ├── config
│       │   │       │   ├── content.config.ts
│       │   │       │   ├── modal.config.ts
│       │   │       │   └── search.config.ts
│       │   │       └── list.vue
│       │   ├── system
│       │   │   ├── department
│       │   │   │   ├── config
│       │   │   │   │   ├── content.config.ts
│       │   │   │   │   ├── modal.config.ts
│       │   │   │   │   └── search.config.ts
│       │   │   │   └── department.vue
│       │   │   ├── menu
│       │   │   │   ├── config
│       │   │   │   │   ├── content.config.ts
│       │   │   │   │   └── modal.config.ts
│       │   │   │   └── menu.vue
│       │   │   ├── role
│       │   │   │   ├── config
│       │   │   │   │   ├── content.config.ts
│       │   │   │   │   ├── modal.config.ts
│       │   │   │   │   └── search.config.ts
│       │   │   │   └── role.vue
│       │   │   └── user
│       │   │       ├── config
│       │   │       │   ├── content.config.ts
│       │   │       │   ├── modal.config.ts
│       │   │       │   └── search.config.ts
│       │   │       └── user.vue
│       │   └── test1
│       │       └── test2
│       │           └── test3
│       │               └── test3.vue
│       └── not-found
│           └── index.vue
├── test
│   ├── components
│   │   └── zizuj.vue
│   ├── index.vue
│   ├── service
│   │   └── request.ts
│   ├── test.html
│   └── utils
├── tsconfig.config.json
├── tsconfig.json
└── vite.config.ts
`

export default tree
