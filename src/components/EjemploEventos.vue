<template>
  <div id="app">
    <div style="height: 80; width: 80">
      <p @click="this.mostrarConsola">Parrafo1</p>
      <p @mouseover="this.mostrarConsola">Parrafo2</p>
      <input
        type="text"
        @keyup="
          (e) => {
            this.mostrarConsolaEvento(e);
          }
        "
        @focus="this.mostrarConsola"
      />
    </div>
    <button @click="this.mostrarAlert">Oprimeme</button>
    <br />
    <div>
      <form
        @submit="
          () => {
            this.mostrarSubmit();
          }
        "
      >
        <input type="text" />
        <button type="submit">Clic</button>
      </form>
    </div>
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
    mostrarAlert() {
      alert("Boton presionado");
    },
    mostrarConsola() {
      console.log("Parrafo presionado");
    },
    mostrarConsolaEvento(e) {
      if (e.keyCode == 65) {
        console.log("Tecleaste la letra a");
      }
    },
    mostrarSubmit() {
      console.log("Hiciste submit");
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
