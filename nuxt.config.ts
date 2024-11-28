// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    'nuxt-auth-utils',
    "@nuxtjs/cloudinary",
    '@vueuse/nuxt',
    '@nuxt/image'
  ],
  runtimeConfig: {
    public: {
      uploadPreset: ''
    },
    githubId: '',
    githubSecret: '',
    cloudinaryApiKey: '',
    cloudinaryApiSecret: '',
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  },
  colorMode: {
    preference: 'light'
  }
})