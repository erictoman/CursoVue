<template>
  <div id="app">
    <div class="section">
      <button
        :disabled="prev === '' || prev == null"
        class="button is-medium"
        @click="obtenerData(prev)"
      >
        Atras
      </button>
      <button
        :disabled="next === '' || next == null"
        class="button is-medium"
        @click="obtenerData(next)"
      >
        Adelante
      </button>
      <div class="section"><img :src="imagen" width="200" height="200" /></div>
      <div class="section">
        <b-table
          @click="
            (row) => {
              setImagen(row.image);
            }
          "
          :data="data"
        >
          <b-table-column label="Nombre" v-slot="props">
            {{ props.row.name }}
          </b-table-column>
          <b-table-column label="Genero" v-slot="props">
            {{ props.row.gender }}
          </b-table-column>
          <b-table-column label="Especie" v-slot="props">
            {{ props.row.species }}
          </b-table-column>
          <b-table-column label="Imagen" v-slot="props">
            <b-image :src="props.row.image" responsive></b-image>
          </b-table-column>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      personajes: [],
      imagen: "",
      next: "",
      prev: "",
      data: [],
    };
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
    obtenerData(pagina = "https://rickandmortyapi.com/api/character") {
      fetch(pagina)
        .then((response) => response.json())
        .then((data) => {
          this.personajes = data.results;
          this.data = data.results;
          this.next = data.info.next;
          this.prev = data.info.prev;
        });
    },
    setImagen(url) {
      this.imagen = url;
    },
  },
  computed: {},
  beforeMount() {
    this.obtenerData();
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
