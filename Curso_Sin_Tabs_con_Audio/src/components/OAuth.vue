<template>
  <div class="section">
    <div class="section has-text-centered">
      <div class="section">Procesando: {{ this.code }}</div>
    </div>
  </div>
</template>

<script>
const url = "https://freesound.org/apiv2/oauth2/access_token/";
export default {
  data() {
    return {
      code: null,
    };
  },
  beforeMount() {
    this.code = this.$route.query.code;
    this.intercambiar();
  },
  methods: {
    intercambiar() {
      /*
      var data = {
        client_id: "Azk196NWwiPosN9Sclpj",
        client_secret: "HqXUXX2vkuBw5q95KtWXb2R5tjZzC4e1i3nwdVc2",
        grant_type: "authorization_code",
        code: this.code,
      };*/
      var formData = new FormData();
      formData.append("client_id", "Azk196NWwiPosN9Sclpj");
      formData.append(
        "client_secret",
        "HqXUXX2vkuBw5q95KtWXb2R5tjZzC4e1i3nwdVc2"
      );
      formData.append("grant_type", "authorization_code");
      formData.append("code", this.code);
      fetch(url, { method: "POST", body: formData })
        .then((response) => response.json())
        .catch((error) => console.error("Error:", error))
        .then(async (respuesta) => {
          const url2 = "https://freesound.org/apiv2/sounds/14854/download/";
          const auth = "Bearer " + respuesta.access_token;
          const audio = await fetch(url2, {
            method: "GET",
            headers: {
              Authorization: auth,
            },
          })
            .then(async (response) => {
              let reader = response.body.getReader();
              return reader.read().then((result) => {
                return result;
              });
            })
            .catch((error) => console.error("Error:", error));
          var blob = new Blob([audio.value], { type: "audio/mp3" });
          var url = window.URL.createObjectURL(blob);
          window.audio = new Audio();
          window.audio.src = url;
          window.audio.play();
        });
    },
  },
};
</script>
