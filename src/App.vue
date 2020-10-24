<template>
  <div id="app">
    <button class="button is-medium" @click="snackbar">
      Lanzar snackbar
    </button>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  components: {},
  methods: {
    llamadaEventoCustom(texto) {
      console.log("Texto recibido: " + texto);
    },
    snackbar() {
      this.$buefy.snackbar.open({
        message: "Snackbar presionado",
        type: "is-primary",
        position: "is-bottom",
        actionText: "Lanzar toast",
        indefinite: true,
        onAction: () => {
          this.$buefy.toast.open({
            message: "Action pressed",
            queue: false,
          });
        },
      });
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
