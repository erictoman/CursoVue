<template>
  <div id="app">
    <div class="section">
      <div class="section">
        <button class="button is-medium" @click="snackbar">
          Lanzar snackbar
        </button>
        <button class="button is-medium" @click="obtenerData()">
          Obtener informacion
        </button>
      </div>
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
      </div>
      <div class="section"><img :src="imagen" width="200" height="200" /></div>
      <div class="d-flex flex-column">
        <table class="table">
          <thead class="thead-dark">
            <th>Nombre</th>
            <th>Genero</th>
            <th>Especie</th>
            <th>Imagen</th>
          </thead>
          <tbody>
            <tr v-for="(item, index) in personajes" :key="index">
              <td>{{ item.name }}</td>
              <td>{{ item.gender }}</td>
              <td>{{ item.species }}</td>
              <td @click="setImagen(item.image)">
                Da clic aqui para ver imagen del personaje
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="section">
        <img class="image" :src="imagen" width="200" height="200" />
        <b-table
          @click="
            (row) => {
              setImagen(row.image);
            }
          "
          :data="data"
          :columns="columns"
        ></b-table>
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
      columns: [
        {
          field: "name",
          label: "Nomnbre",
        },
        {
          field: "gender",
          label: "Genero",
        },
        {
          field: "species",
          label: "Especie",
        },
        {
          field: "image",
          label: "Imagen",
        },
      ],
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
