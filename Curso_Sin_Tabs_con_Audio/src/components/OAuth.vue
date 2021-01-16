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
            this.reproducir(item.uri);
          }
        "
        :data="data.data"
        :columns="data.columns"
      ></b-table>
    </div>
  </div>
</template>

<script>
const intercambio = "https://accounts.spotify.com/api/token";
import SpotifyAPI from "spotify-web-api-js";
export default {
  data() {
    return {
      code: null,
      query: "",
      token: "",
      data: null,
      spotify: new SpotifyAPI(),
      player: null,
    };
  },
  beforeMount() {
    if (!localStorage.getItem("token")) {
      if (!this.$route.query.error) {
        this.code = this.$route.query.code;
        this.intercambiar();
      }
    } else {
      this.token = localStorage.getItem("token");
      this.spotify.setAccessToken(this.token);
      window.onSpotifyWebPlaybackSDKReady = () => {
        var player = window.Spotify.Player({
          name: "Web Playback SDK Quick Start Player",
          getOAuthToken: (cb) => {
            cb(this.token);
          },
        });
        player.connect().then((success) => {
          if (success) {
            console.log(
              "The Web Playback SDK successfully connected to Spotify!"
            );
          }
        });
      };
    }
  },
  methods: {
    intercambiar() {
      const data = new URLSearchParams();
      data.append("grant_type", "authorization_code");
      data.append("code", this.code);
      data.append("redirect_uri", "http://localhost:8080/auth");
      var cliend_id = "144a532590174190845706166bcbaee3";
      var client_secret = "6614e28f03a14197a11675f5f0365352";
      let token = "Basic " + btoa(`${cliend_id}:${client_secret}`);
      fetch(intercambio, {
        method: "POST",
        body: data,
        headers: {
          Authorization: token,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
        .then((response) => response.json())
        .then(async (respuesta) => {
          if (respuesta.error) {
            this.$router.push("/");
          } else {
            console.log("OK");
          }
          if (respuesta.access_token) {
            this.persistencia(respuesta.access_token, respuesta.refresh_token);
          }
        });
    },
    buscar() {
      this.spotify.searchTracks(this.query).then(
        (resultados) => {
          console.log(resultados.tracks.items);
          var info = {
            data: resultados.tracks.items,
            columns: [
              {
                field: "name",
                label: "Nombre",
                centered: true,
              },
            ],
          };
          this.data = info;
        },
        (err) => {
          console.error(err);
        }
      );
      /*
      
      */
    },
    persistencia(token, refresh_token) {
      localStorage.setItem("token", token);
      localStorage.setItem("refresh_token", refresh_token);
    },
    async reproducir(uri) {
      console.log(uri);
    },
  },
};
</script>
