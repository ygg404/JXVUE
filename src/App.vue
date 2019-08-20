<template>
  <router-view></router-view>
</template>

<script>
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'

export default {
  name: 'App',
  components: {
    'home' : Home,
    'login' : Login
  }
}
</script>
