<template>
  <v-app>
    <app-bar />
    <v-container fluid>
      <v-row dense>
        <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
          <v-hover v-slot="{ hover }">
            <v-card :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }">
              <v-img
                :src="card.src"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="400px"
                @click="check(card.title)"
              >
                <v-card-title v-text="card.title"></v-card-title>
              </v-img>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>

                <v-btn icon>
                  <v-icon>mdi-bookmark</v-icon>
                </v-btn>

                <v-btn icon>
                  <v-icon>mdi-share-variant</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
// import axios from "axios";
// const endpoint = "http://localhost";

import AppBar from "../components/AppBar";

export default {
  components: {
    // HelloWorld,
    AppBar,
  },

  data: () => ({
    cards: [
      {
        title: "Spring",
        // src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
        src: require('../background_image/6FBF055E-234D-45FD-9DB6-D62F55A6BA31_1_201_a.jpeg'),
        flex: 6,
      },
      {
        title: "Summer",
        src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
        flex: 6,
      },
      {
        title: "Autumn",
        // src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
        src: require('../background_image/90C9BCD8-8A7C-4E08-8588-D6EBF31C3881_1_201_a.jpeg'),
        flex: 6,
      },
      {
        title: "Winter",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
        flex: 6,
      },
    ],
  }),

  methods: {
    check: function (title) {
      console.log(title);
      if (title == "Summer") {
          this.$router.push("/summer");
      }
      else if (title == "Autumn") {
          this.$router.push("/autumn");
      }
      else if (title == "Winter") {
          this.$router.push("/winter");
      }
      else if (title == "Spring") {
          this.$router.push("/about");
      }
      //   if (link == "Favorite") {
      //     this.$router.push("/favorite");
      //   }
    },
  },
};
</script>

<style scoped>
.v-card {
  opacity: 1;
  transition: opacity 0.4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.7;
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
</style>
