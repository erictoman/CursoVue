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
//import { Howl } from "howler";
//import cancion from "../Canciones/cancion.mp3";
export default {
  name: "HelloWorld",
  props: {
    Player: Object,
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
    console.log(this.Player);
    /*this.player = new Howl({ src: [cancion] });*/
  },
  methods: {
    toggleplay() {
      this.play();
      this.isplaying = !this.isplaying;
    },
    contar() {
      setTimeout(async () => {
        if (this.isplaying) {
          this.Player.getCurrentState().then((state) => {
            this.value = state.position;
          });
          this.contar();
        }
      }, 1000);
    },
    play() {
      this.Player.getCurrentState().then((state) => {
        this.duracion = state.duration;
      });
      if (this.isplaying) {
        this.Player.pause();
      } else {
        this.contar();
        this.Player.play();
      }
    },
    stop() {
      this.Player.stop();
      if (this.isplaying) {
        this.toggleplay();
      }
      this.value = 0;
    },
    minutosSegundos(val) {
      val = val * 1000;
      var minutos = parseInt(val / 60);
      var segundos = val % 60 < 10 ? "0" + (val % 60) : val % 60;
      return parseInt(minutos) + ":" + parseInt(segundos);
    },
    setposition(val) {
      this.Player.seek(val);
      this.value = val;
    },
  },
};
</script>
