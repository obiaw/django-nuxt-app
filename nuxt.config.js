module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Nuxt Playground app',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt playground app for learning purpose' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'bootstrap-vue/nuxt'
  ],
  axios: {
    baseURL: 'http://127.0.0.1:8000/api/'
  },
  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          required: true,
          type: 'Token'
        },
        tokenName: 'Authorization',
        user: {
          property: 'user',
          autoFetch: true
        },
        endpoints: {
          login: { url: 'auth/', method: 'post', propertyName: 'token' },
          user: { url: 'users/', method: 'get', propertyName: 'user', 
          credentials: true, auth: this.token },
          logout: false
        }
      }
    }
  },
  plugins: ['~/plugins/bootstrap.js',],
}

