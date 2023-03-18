<template>
  <v-app>
    <app-bar />
    <div class="full-image-wrap" v-if="fullImage">
      <v-img class="full-image" :src="currentImageUrl"></v-img>
      <div class="pop">
        <v-sheet
          class="px-7 pt-7 pb-4 mx-auto text-center d-inline-block"
          color="blue-grey darken-3"
          dark
        >
          <div class="grey--text text--lighten-1 text-body-2 mb-4">
            Are you sure you want to delete this album?
          </div>

          <v-btn class="ma-1" color="grey" plain @click="dispDown"> Cancel </v-btn>

          <v-btn
            class="ma-1"
            color="error"
            plain
            v-on:click="check(currentImageUrl.split('/')[2])"
          >
            Delete
          </v-btn>

          <v-btn
            class="fav-btn ma-1"
            icon
            v-bind:color="hidden ? 'pink' : 'gray'"
            @click="click(currentImageUrl.split('/')[2])"
          >
            <v-icon>mdi-heart</v-icon>
          </v-btn>
        </v-sheet>
      </div>
      <!-- <v-btn class="btn" @click="dispDown">CLOSE</v-btn>
      <v-btn v-on:click="check(currentImageUrl.split('/')[2])" class="btn2">DELETE</v-btn> -->
    </div>
    <v-main class="v-main">
      <v-container class="body">
        <v-row>
          <v-col v-for="n in pathList" :key="n" cols="4">
            <!-- <img v-bind:src="n.link" /> -->
            <!-- <v-btn text v-on:mouseover="check(n.split('/')[2])"> 削除 </v-btn> -->
            <v-img
              lazy-src="https://picsum.photos/id/11/10/6"
              max-height="300"
              max-width="600"
              v-bind:src="n"
              @click="imageClick(n)"
            ></v-img>
          </v-col>
        </v-row>
        <div class="add-button"><add-button v-on:urlList="receiveChildMessage" /></div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from "../components/HelloWorld";
import axios from "axios";
const endpoint = "http://localhost";

import AppBar from "../components/AppBar";
import AddButton from "../components/AddButton";

export default {
  components: {
    // HelloWorld,
    AppBar,
    AddButton,
  },
  data: () => ({
    hidden: false,
    path: "",
    list: [],
    pathList: [],
    delpath: "",
    // links: [
    //   {
    //     name: 1,
    //     link: require('../../../backend/uploads/A0EFBCD8-A174-4757-BF1D-D503F9F3F56C_1_105_c.jpeg'),
    //   },
    //   {
    //     name: 2,
    //     link: require('@/assets/logo.png'),
    //   },
    // ],

    fullImage: false,
    currentImageUrl: "",
  }),
  methods: {
    click: async function (n) {
      // this.dialog = !this.dialog
      this.hidden = !this.hidden;
      if (this.hidden) {
        var params = new FormData();
        params.append("filename", n);
        params.append("season", "about");
        let result = await axios.post(`${endpoint}/favorite/upload`, params);
        console.log(result);
      }
    },

    dispDown() {
      this.fullImage = false;
    },

    imageClick(url) {
      // this.currentImageIndex = index;
      console.log("test");
      this.fullImage = true;
      this.currentImageUrl = url;
    },

    check: async function (n) {
      console.log(n);

      var result = confirm("この写真を削除しますか？");
      if (result) {
        var param = n;
        this.delpath = await axios.post(`${endpoint}/delete`, param);
        console.log(this.delpath);
        // window.location.reload();
      } else {
        alert("削除中止");
      }
    },

    receiveChildMessage(e) {
      this.path = e;
      // console.log(this.path[0]);
      // this.path = await axios.get(`${endpoint}/`);
      for (let i = 0; i < this.path.length; i++) {
        let element = this.path[i].split("/");
        let fixPath = require("../../../backend/uploads/" + element[2]);
        // console.log(fixPath);
        // let test = require(fixPath);
        this.list.push(fixPath);
        // this.pathList = this.list;
      }
      this.pathList = this.list;
      // window.location.reload();
    },
  },
  async mounted() {
    this.path = await axios.get(`${endpoint}/`);
    for (let i = 0; i < this.path.data.length; i++) {
      let element = this.path.data[i].split("/");
      let fixPath = require("../../../backend/uploads/" + element[2]);
      this.list.push(fixPath);
    }
    this.pathList = this.list;
    console.log(this.pathList);
  },
};
</script>

<style scoped>
.v-main {
  background-color: gray;
}

.pop {
  position: fixed;
  top: 84%;
  left: 41.3%;
}

div.add-button {
  margin-top: 50px;
}

.full-image {
  width: 500px;
  height: auto;
  display: block;

  position: fixed;
  top: 100px;
  left: 50%;
  transform: translate(-50%);
}
.full-image-wrap {
  background-color: rgba(0, 0, 0, 0.8);
  background-size: cover;
  width: 150%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 1;
}
.body {
  z-index: 0;
}
.btn {
  position: fixed;
  top: 88%;
  left: 47%;
  transform: translate(-50%);
}
.btn2 {
  position: fixed;
  top: 88%;
  left: 52.5%;
  transform: translate(-50%);
}

/* .v-row {
  position: absolute;
  height: 220vh;
  width: 100%;
  
} */

/* .v-img-wrap {
  position: relative;
  top: 40%;
  height: 40%;
  width: 1px;

}

.v-img {
  width: 1px;
} */
</style>
