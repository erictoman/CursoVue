<template>
  <div class="section">
    <div class="section">
      <label class="label">Iconos</label>
      <div class="section">
        <b-field label="Simple">
          <b-slider
            v-model="value"
            :max="this.cancion.duracion"
            :custom-formatter="this.minutosSegundos"
          ></b-slider>
        </b-field>
        <unicon
          v-if="!isplaying"
          @click="
            () => {
              this.toggleplay();
              this.play();
            }
          "
          name="play"
          fill="royalblue"
        />
        <unicon
          v-if="isplaying"
          @click="this.toggleplay"
          name="pause"
          fill="royalblue"
        />
        <unicon @click="this.stop" name="square-full" fill="royalblue" />
      </div>
    </div>
  </div>
</template>

<script>
import { Howl } from "howler";
import cancion from "../Canciones/cancion.mp3";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      isplaying: false,
      value: 0,
      cancion: {
        titulo: "Cancion 1",
        artista: "Artista 1",
        duracion: 60,
      },
      player: null,
    };
  },
  beforeMount() {
    this.player = new Howl({ src: [cancion] });
  },
  methods: {
    toggleplay() {
      this.isplaying = !this.isplaying;
    },
    play() {
      if (this.isplaying) {
        this.player.pause();
        setTimeout(async () => {
          this.value++;
          this.play();
        }, 1000);
      }
      this.player.play();
    },
    stop() {
      this.player.stop();
      if (this.isplaying) {
        this.toggleplay();
      }
      this.value = 0;
    },
    minutosSegundos(val) {
      var minutos = parseInt(val / 60);
      var segundos = val % 60 < 10 ? "0" + (val % 60) : val % 60;
      return minutos + ":" + segundos;
    },
  },
};
</script>
