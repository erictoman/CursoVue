<template>
  <div>
    <input type="text" v-model="texto" />
    <p @click="this.enviarEvento">{{ texto }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      texto: "",
    };
  },
  components: {},
  methods: {
    enviarEvento() {
      console.log("Evento enviado");
      this.$emit("onEventoCustom", this.texto);
    },
  },
  computed: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
