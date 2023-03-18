<template>
  <v-app>
    <v-main>
      <!-- <router-link to="/">HOME</router-link>
      <router-link to="/about">ABOUT</router-link> -->
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
