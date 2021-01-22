<template>
  <div class="section">
    <div class="section has-text-centered">
      <div class="section">
        <b-button @click="this.redirect" type="is-primary"
          >Iniciar Sesion</b-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      datos: false,
    };
  },
  beforeMount() {},
  methods: {
    redirect() {
      const scopes = ["streaming", "user-read-email", "user-read-private"];
      window.location = `https://accounts.spotify.com/authorize?client_id=144a532590174190845706166bcbaee3&response_type=code&redirect_uri=http://localhost:8080/auth&scope=${scopes.join(
        "%20"
      )}`;
    },
  },
};
</script>
