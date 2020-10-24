<template>
  <div id="app">
    <div v-for="(n, i) in 5" :key="i">
      Usuario {{ n
      }}<input type="text" v-model="usuariosform.nombre[i]" /> Contraseña {{ n
      }}<input type="password" v-model="usuariosform.contraseña[i]" />
    </div>
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
      usuariosform: {
        nombre: [],
        contraseña: [],
      },
      mensaje: "",
    };
  },
  components: {},
  methods: {
    mostrarVariable() {
      this.mensaje = "";
      this.loginExitoso = false;
      for (var i = 0; i < this.usuariosform.nombre.length; i++) {
        if (
          this.usuariosform.nombre[i] === undefined ||
          this.usuariosform.contraseña[i] === undefined
        ) {
          this.mensaje =
            this.mensaje +
            "Usuario o contraseña vacios en la posicion " +
            (i + 1);
        } else {
          this.loginExitoso = true;
        }
      }
    },
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
    computed: {},
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
