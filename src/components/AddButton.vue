<template>
  <div class="text-center">
    <v-btn
      class="mx-2"
      fab
      dark
      color="indigo"
      :loading="isSelecting"
      @click="handleFileImport"
    >
      <v-icon dark> mdi-plus </v-icon>
    </v-btn>
    <!-- <form enctype="multipart/form-data"> -->
    <input
      ref="uploader"
      class="d-none"
      type="file"
      name="file"
      @change="onUploadImage"
    />
    <!-- </form> -->
    <!-- <div class="preview_zone">
      <img :src="url" alt="ここにプレビューが表示されます" />
    </div> -->
  </div>
</template>

<script>
import axios from "axios";

const endpoint = "http://localhost";

export default {
  name: "AddBottun",
  components: {
    // HelloWorld,
  },
  data: () => ({
    isSelecting: false,
    selectedFile: "",
    url: "",
  }),
  methods: {
    addPhoto: async function () {
      let data = await (await fetch(this.endpoint)).json();
      console.log(data);
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

    onFileChanged(e) {
      this.selectedFile.push(e.target.files[0]);
      console.log(this.selectedFile);
      this.url = URL.createObjectURL(this.selectedFile[0]);
      console.log(this.url);
      // Do whatever you need with the file, liek reading it with FileReader
    },

    onUploadImage(e) {
      console.log(e.target.formAction);
      let url = e.target.formAction;
      let season = url.split('/')[4];
    
      this.selectedFile = e.target.files[0];
      console.log(this.selectedFile);
      this.url = URL.createObjectURL(e.target.files[0]);
      console.log(this.url);
      var params = new FormData();
      params.append("image", this.selectedFile);

      if (season == "summer") {
        console.log("sum");
        params.append("season", season);
      }
      else if (season == "autumn") {
        console.log("sum");
        params.append("season", season);
      }
      else if (season == "winter") {
        console.log("sum");
        params.append("season", season);
      }
      else if (season == "spring") {
        console.log("sum");
        params.append("season", season);
      }

      console.log(params.getAll("season"));
      // // Axiosを用いてFormData化したデータをFlaskへPostしています。
      axios.post(`${endpoint}/upload`, params).then(function (response) {
        console.log(response);
      });
    },
  },
};
</script>
