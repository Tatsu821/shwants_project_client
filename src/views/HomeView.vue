<template>
  <v-app>
    <app-bar />
    <hello-world />
  </v-app>
</template>

<script>
import HelloWorld from "../components/HelloWorld";
import AppBar from "../components/AppBar";

export default {
  name: "HomeView",

  components: {
    HelloWorld,
    AppBar,
  },
};
</script>
