<template>
  <div class="section">
    <div class="section">
      <label class="label">Iconos</label>
      <div class="section">
        <b-field label="Simple">
          <b-slider
            v-model="value"
            :max="this.duracion"
            :custom-formatter="this.minutosSegundos"
            @change="this.setposition"
          ></b-slider>
        </b-field>
        <unicon
          v-if="!isplaying"
          @click="
            () => {
              this.toggleplay();
            }
          "
          name="play"
          fill="royalblue"
        />
        <unicon
          v-if="isplaying"
          @click="
            () => {
              this.toggleplay();
            }
          "
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
      },
      duracion: null,
      player: null,
    };
  },
  beforeMount() {
    this.player = new Howl({ src: [cancion] });
  },
  methods: {
    toggleplay() {
      this.play();
      this.isplaying = !this.isplaying;
    },
    contar() {
      setTimeout(async () => {
        if (this.isplaying) {
          this.value = this.player.seek();
          this.contar();
        }
      }, 1000);
    },
    play() {
      this.duracion = this.player.duration();
      if (this.isplaying) {
        this.player.pause();
      } else {
        this.contar();
        this.player.play();
      }
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
      return parseInt(minutos) + ":" + parseInt(segundos);
    },
    setposition(val) {
      this.player.seek(val);
      this.value = val;
    },
  },
};
</script>
