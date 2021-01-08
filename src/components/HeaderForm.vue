<template>
  <v-row>
    <v-col
      md="6"
      offset-md="3"
      xs="12"
      class="d-flex justify-center"
    >
      <header
        class="d-flex justify-space-around mb-10">
        <img
          class="mr-5"
          alt="Транспорт подмосковья"
          src="../assets/transport.jpeg"
          />
        <img
          alt="Министерство транспорта и дорожной инфраструктуры Москоской области"
          src="../assets/herb.png"
        />
      </header>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style scoped>
img {
  max-height: 115px;
  max-width: 250px;
}

@media (max-width: 600px) {
  img {
    max-height: 75px;
    max-width: 150px;
  }
}
</style>
