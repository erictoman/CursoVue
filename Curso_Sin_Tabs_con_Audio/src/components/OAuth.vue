<template>
  <div class="section">
    <div class="section has-text-centered">
      <Player
        v-if="this.duracion"
        :Player="this.player"
        :duracion="this.duracion"
      />
      <!--<div class="section">Procesando: {{ this.code }}</div>-->
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
import Player from "./HelloWorld";
export default {
  data() {
    return {
      code: null,
      query: "",
      token: "",
      data: null,
      spotify: new SpotifyAPI(),
      player: null,
      device: null,
      duracion: null,
    };
  },
  components: { Player },
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
        const player = new window.Spotify.Player({
          name: "Cliente VUE",
          getOAuthToken: (cb) => {
            cb(this.token);
          },
        });
        // Error handling
        player.on("initialization_error", (e) => console.error(e));
        player.on("authentication_error", (e) => {
          console.error(e.message);
        });
        player.on("account_error", (e) => console.error(e));
        player.on("playback_error", (e) => console.error(e));
        // Playback status updates
        player.on("player_state_changed", (state) => {
          this.duracion = state.duration;
          this.player = player;
          this.player.pause();
        });
        // Ready
        player.on("ready", (data) => {
          console.log("Ready with Device ID", data.device_id);
          this.device = data.device_id;
        });
        // Connect to the player!
        player.connect();
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
            this.spotify.setAccessToken(respuesta.access_token);
            this.persistencia(respuesta.access_token, respuesta.refresh_token);
          }
        });
    },
    play(uri) {
      fetch(
        `https://api.spotify.com/v1/me/player/play?device_id=${this.device}`,
        {
          method: "PUT",
          body: JSON.stringify({
            uris: [uri],
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
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
    },
    persistencia(token, refresh_token) {
      localStorage.setItem("token", token);
      localStorage.setItem("refresh_token", refresh_token);
    },
    reproducir(uri) {
      this.play(uri);
    },
  },
};
</script>
