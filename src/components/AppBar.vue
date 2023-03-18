<template>
  <!-- <v-app id="inspire"> -->
  <v-app-bar class="v-app-bar" app color="#03A9F4" flat>
    <v-container class="py-0 fill-height">
      <v-menu bottom min-width="200px" rounded offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon x-large v-on="on">
            <v-avatar size="48">
              <img v-bind:src="url" />
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-btn icon x-large @click="handleFileImport">
                <v-avatar>
                  <!-- <span class="white--text text-h5">{{ user.initials }}</span> -->
                  <img v-bind:src="url" />
                </v-avatar>
              </v-btn>
              <input
                ref="uploader"
                class="d-none"
                type="file"
                name="file"
                @change="onUploadImage"
              />
              <h3>{{ user.fullName }}</h3>
              <p class="text-caption mt-1">
                {{ user.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text> Edit Account </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text> Disconnect </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>

      <v-btn v-for="link in links" :key="link" text @click="check(link)">
        {{ link }}
      </v-btn>

      <v-spacer></v-spacer>

      <v-responsive max-width="260">
        <v-text-field class="v-text-field" outlined dense flat hide-details rounded solo-inverted></v-text-field>
      </v-responsive>
    </v-container>
  </v-app-bar>
  <!-- </v-app> -->
</template>

<script>
import axios from "axios";
const endpoint = "http://localhost";

export default {
  name: "AppBar",
  components: {
    // HelloWorld,
  },
  data: () => ({
    links: ["Memory", "Messages", "Favorite", "Updates"],
    user: {
      initials: "JD",
      fullName: "Sawa Ishibe",
      email: "swan@gmail.com",
    },
    path: "",
    url: "",
  }),

  async mounted() {
    this.path = await axios.get(`${endpoint}/addAvator`);
    let element = this.path.data[0].split("/");
    let fixPath = require("../../../backend/avatorImage/" + element[2]);
    console.log(fixPath);
    this.url = fixPath;
  },

  methods: {
    check: function (link) {
      console.log(link);
      if (link == "Favorite") {
        this.$router.push("/favorite");
      }
      else if (link == "Memory") {
        this.$router.push("/memory");
      }
    },
    editAvator: function () {
      console.log("test");
    },

    handleFileImport() {
      this.isSelecting = true;

      // After obtaining the focus when closing the FilePicker, return the button state to normal
      window.addEventListener(
        "focus",
        () => {
          this.isSelecting = false;
        },
        { once: true }
      );

      // Trigger click on the FileInput
      this.$refs.uploader.click();
    },

    onUploadImage(e) {
      this.selectedFile = e.target.files[0];
      console.log(this.selectedFile);
      this.url = URL.createObjectURL(e.target.files[0]);
      console.log(this.url);
      var params = new FormData();
      params.append("image", this.selectedFile);

      console.log(params.getAll("image"));
      // Axiosを用いてFormData化したデータをFlaskへPostしています。
      axios.post(`${endpoint}/addAvator`, params).then(function (response) {
        console.log(response);
      });
    },
  },
};
</script>

<style>
.v-text-field {
  z-index: 5;
  color: gray;

}
</style>
