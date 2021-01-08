<template>
  <v-dialog
    v-model="dialog"
    width="500"
  >
    <v-card>
      <v-card-title
        class="headline text-center justify-center d-flex word-break">
        Ваше обращение принято!
      </v-card-title>

      <v-card-actions
        class="d-flex justify-center">
        <v-btn
          id="close"
          @click="closeWindow"
        >
          Закрыть
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'SuccessModal',
  props: {
    dialog: Boolean,
  },
  data() {
    return {
      isOpen: this.dialog,
    };
  },
  methods: {
    closeWindow() {
      this.isOpen = false;
      this.$emit('close', this.isOpen);
    },
  },
};
</script>

<style scoped lang="scss">
$yellow: #fdce1c;

#close {
  background-color: $yellow;
}

.word-break {
  word-break: break-word;
}
</style>
