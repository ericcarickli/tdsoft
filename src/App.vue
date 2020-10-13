<template>
  <v-app>
    <Navbar />
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'
import Climate from './services/getClimate'

export default {
  name: 'App',
  components: { Navbar},
  data: () => ({
    //
  })
};
</script>
