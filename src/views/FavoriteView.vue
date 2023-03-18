<template>
  <v-app>
    <app-bar />
    <body></body>
    <div class="full-image-wrap" v-if="fullImage">
      <v-img class="full-image" position="center" :src="currentImageUrl"></v-img>
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
            @click="dialog = !dialog"
          >
            <v-icon>mdi-heart</v-icon>

            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-text>
                  <v-text-field label="File name"></v-text-field>

                  <small class="grey--text">* This doesn't actually save.</small>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn text color="primary" @click="dialog = false"> Submit </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-btn>
        </v-sheet>
      </div>
    </div>
    <v-main class="v-main">
      <div class="title"><h1>FAVORITE PHOTOS</h1></div>
      <!-- <div>  -->
      <section v-for="(link, index) in pathList" :key="link">
        <h2>{{ "Part" + (index + 1) }}</h2>
        <div class="img-wrap">
          <v-img class="img" v-bind:src="link" @click="imageClick(link)"></v-img>
        </div>
      </section>
      <!-- </div> -->
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "../components/AppBar";

import axios from "axios";
const endpoint = "http://localhost";

export default {
  components: {
    // HelloWorld,
    AppBar,
    // AddButton,
  },

  data: () => ({
    dialog: false,
    hidden: false,
    path: "",
    list: [],
    pathList: [],
    links: ["Dashboard", "Messages", "Profile", "Updates"],
    fullImage: false,
    currentImageUrl: "",
  }),

  async mounted() {
    this.path = await axios.get(`${endpoint}/favorite/get`);
    for (let i = 0; i < this.path.data.length; i++) {
      let element = this.path.data[i].split("/");
      let fixPath = require("../../../backend/favorite_files/" + element[2]);
      this.list.push(fixPath);
    }
    this.pathList = this.list;
    // console.log("test");
    console.log(this.pathList);
  },

  updated() {
    let imagesItems = [...document.querySelectorAll(".img-wrap")];
    console.log(imagesItems);

    let titles = [...document.querySelectorAll("h2")];
    let titleMessage = document.querySelectorAll(".title");
    console.log(titleMessage);

    let setItemActive = (entries) => {
      //   console.log(entries);
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        } else {
          entry.target.classList.remove("active");
        }
      });
    };

    let options = {};

    let observer = new IntersectionObserver(setItemActive, options);
    observer.observe(titleMessage[0]);

    imagesItems.map((item, index) => {
      console.log(item, index);
      // item.children[0].style.backgroundImage = 'url(./img/20230207_140447A4724DE3-ADB5-4166-ABA0-94A131B926BA_1_105_c.jpeg)';
      index % 2 == 0 ? (item.style.left = "55%") : (item.style.left = "4%");
      observer.observe(item);
    });

    titles.map((title, index) => {
      index % 2 == 0 ? (title.style.left = "45%") : (title.style.left = "50%");
      observer.observe(title);
    });
  },

  methods: {
    imageClick(url) {
      // this.currentImageIndex = index;
      console.log("test");
      this.fullImage = true;
      this.currentImageUrl = url;
    },

    dispDown() {
      this.fullImage = false;
    },

    check: async function (n) {
      console.log(n);

      var result = confirm("この写真を削除しますか？");
      if (result) {
        var param = n;
        this.delpath = await axios.post(`${endpoint}/favorite/delete`, param);
        console.log(this.delpath);
        // window.location.reload();
      } else {
        alert("削除中止");
      }
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: white;
}

.v-main {
  height: 80%;
  width: 100%;

  /* background-color: gray; */
  background-image: url(../background_image/FF8CEFE5-CAD1-4EBD-97F3-28993AB56B19_1_201_a.jpeg);
  background-size: cover;
  background-position: 50% 10%;
  background-attachment: fixed;
}

body {
  content: "";
  position: absolute;
  background-color: black;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0.5;
}

.title {
  position: absolute;
  top: 1%;
  left: 50%;
  transform: translatex(-50%);
  z-index: 1;
  font-size: 4rem;
  opacity: 0;
}

.title.active {
  opacity: 1;
  transition: all 3s;
}

section {
  position: relative;
  height: 80vh; /*100vh*/
  width: 100%;
  overflow: hidden;
  z-index: 1;
  margin-top: -50px;
  /* margin: 30px, -30px; */
}
.img-wrap {
  position: relative;
  top: 40%;
  height: 55%; /*40%*/
  width: 1px;
  overflow: hidden;
}

.img-wrap.active {
  width: 40vw;
  opacity: 1;
  transition: opacity 1s, width 2s;
}

.img {
  position: absolute;
  top: 0;
  left: 0;
  width: 60vw;
  height: 100%;
  /* background-image: url(./img/20230207_140447A4724DE3-ADB5-4166-ABA0-94A131B926BA_1_105_c.jpeg); */
  /* background-size: cover; */
  /* background-position: center; */
  transform: scale(1);
}

.img-wrap.title.active > .img {
  transform: scale(1);
  transition: 1s ease-out;
}

h2 {
  position: absolute;
  font-size: 2.3rem;
  top: 70%;
  z-index: 2;
  letter-spacing: 2px;
  opacity: 0;
  transition: all 0.2s;
}

h2.active {
  opacity: 1;
  transition: opacity 3s;
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
  z-index: 3;
}

.pop {
  position: fixed;
  top: 84%;
  left: 41.3%;
}
</style>
