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
      window.location =
        "https://freesound.org/apiv2/oauth2/authorize/?client_id=Azk196NWwiPosN9Sclpj&response_type=code";
    },
  },
};
</script>
