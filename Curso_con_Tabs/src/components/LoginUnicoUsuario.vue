<template>
  <div id="app">
    Usuario: <input type="text" v-model="usuario[0].nombre" /><br />
    Contraseña <input type="password" v-model="usuario[0].contraseña" /><br />
    <button @click="this.mostrarVariable">Login</button>
    <br />
    <p v-show="mensaje.length > 0" style="color: red">{{ mensaje }}</p>
    <p v-show="loginExitoso" style="color: green">Inicio de sesion correcto</p>
  </div>
</template>

<script>
var user = "admin";
var pass = "admin";
export default {
  name: "App",
  data() {
    return {
      loginExitoso: false,
      boolean: false,
      password: "",
      usuario: [{ nombre: "", contraseña: "" }],
      mensaje: "",
      animales: ["Gato", "Perro", "Gallina", "Caballo", "Conejo"],
    };
  },
  components: {},
  methods: {
    iniciarSesion() {
      if (this.camposllenos()) {
        if (this.usuario === user && this.password === pass) {
          this.mensaje = "";
          this.loginExitoso = true;
        } else {
          this.mensaje = "Usuario y contraseña incorrectos";
          this.loginExitoso = false;
        }
      } else {
        this.mensaje = "Algun campo esta vacio";
        this.loginExitoso = false;
      }
    },
    camposllenos() {
      if (this.usuario.length > 0 && this.password.length > 0) {
        return true;
      }
      return false;
    },
    camposllenos2() {
      console.log(this.usuario);
      if (this.usuario[0].nombre !== "" && this.usuario[0].contraseña !== "") {
        this.loginExitoso = true;
      } else {
        this.mensaje = "El usuario o contraseña estan vacios.";
        this.loginExitoso = false;
      }
    },
    mostrarVariable() {
      this.camposllenos2();
    },
    async fetchData() {
      //const headers = new Headers();
      /*headers.append(
        "Authorization",
        "api_key"
      );*/
      const request = new Request("https://rickandmortyapi.com/api/character", {
        method: "GET",
        /*headers,*/
        mode: "cors",
        cache: "default",
      });
      const res = await fetch(request);
      const data = await res.json();
      console.log(data);
    },
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
