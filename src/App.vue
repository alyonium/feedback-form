<template>
  <v-app>
    <v-main>
      <header-form/>
      <feedback-form/>
    </v-main>
  </v-app>
</template>

<script>
import FeedbackForm from '@/components/FeedbackForm';
import HeaderForm from '@/components/HeaderForm';

export default {
  name: 'App',

  components: {
    FeedbackForm,
    HeaderForm,
  },
};
</script>
