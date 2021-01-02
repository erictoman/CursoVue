<template>
  <div id="app">
    <h1 class="title">Curso Vue 4ta semana</h1>
    <div class="section">
      <b-tabs v-model="activeTab">
        <b-tab-item label="Boton custom">
          <botoncustom />
        </b-tab-item>
        <b-tab-item label="Ejemplo eventos">
          <ejemplo />
        </b-tab-item>
        <b-tab-item label="Fetch custom table">
          <fetchtablacustom />
        </b-tab-item>
        <b-tab-item label="Fetch y tablas">
          <fetchtable />
        </b-tab-item>
        <b-tab-item label="Login unico usuario">
          <loginunicousuario />
        </b-tab-item>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import botoncustom from "./components/botonCustom";
import ejemplo from "./components/EjemploEventos";
import fetchtablacustom from "./components/FetchTableCustom";
import fetchtable from "./components/FetchYTablas";
import loginunicousuario from "./components/LoginUnicoUsuario";
export default {
  name: "App",
  data() {
    return {
      activeTab: 0,
    };
  },
  components: {
    botoncustom,
    ejemplo,
    fetchtablacustom,
    fetchtable,
    loginunicousuario,
  },
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
