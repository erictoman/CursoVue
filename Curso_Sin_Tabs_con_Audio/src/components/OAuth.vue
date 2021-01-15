<template>
  <div class="section">
    <div class="section has-text-centered">
      <div class="section">Procesando: {{ this.code }}</div>
      Query
      <b-input v-model="query" />
      <b-button @click="this.buscar">Buscar</b-button>
      <b-table
        v-if="data"
        @click="
          (item) => {
            this.reproducir(item.id);
          }
        "
        :data="data.data"
        :columns="data.columns"
      ></b-table>
    </div>
  </div>
</template>

<script>
const prefijo = "https://freesound.org/apiv2/";
const url = prefijo + "oauth2/access_token/";
const urlbusqueda = prefijo + "search/text/";
const urldescarga = prefijo + "sounds/";
export default {
  data() {
    return {
      code: null,
      query: "",
      token: "",
      data: null,
    };
  },
  beforeMount() {
    if (!localStorage.getItem("token")) {
      this.code = this.$route.query.code;
      this.intercambiar();
    } else {
      this.token = localStorage.getItem("token");
    }
  },
  methods: {
    intercambiar() {
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
          if (respuesta.access_token) {
            this.persistencia(respuesta.access_token);
          }
        });
    },
    buscar() {
      var urlnuevo = urlbusqueda + "?query=" + this.query;
      console.log(urlnuevo);
      fetch(urlnuevo, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + this.token,
        },
      })
        .then((response) => response.json())
        .catch((error) => console.error("Error:", error))
        .then((respuesta) => {
          var info = {
            data: respuesta.results,
            columns: [
              {
                field: "name",
                label: "Nombre",
                centered: true,
              },
            ],
          };
          this.data = info;
        });
    },
    persistencia(token) {
      localStorage.setItem("token", token);
    },
    async reproducir(id) {
      var urldescargaunico = urldescarga + id + "/download/";
      fetch(urldescargaunico, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + this.token,
        },
      })
        .then(async (response) => {
          let reader = response.body.getReader();
          var audio = await reader.read();
          console.log("AUDIO OK");
          var blob = new Blob([audio.value], { type: "audio/mp3" });
          var url = window.URL.createObjectURL(blob);
          window.audio = new Audio();
          window.audio.src = url;
          window.audio.play();
        })
        .catch((error) => console.error("Error:", error));
    },
  },
};
</script>
