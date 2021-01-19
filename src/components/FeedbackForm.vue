<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <div v-if="isLoading" id="loadingBackground">
      <v-progress-circular
        indeterminate
        id="progress"
        :size="100"
      ></v-progress-circular>
    </div>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          class="text-center">
          <h1>
            Обращение по работе транспорта
          </h1>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          md="4"
          offset-md="4"
          sm="6"
          offset-sm="3"
          xs="12"
        >
          <v-select
            v-model="category"
            :items="items"
            :rules="[(v) => !!v || 'Выбор категории обязателен']"
            label="Категория"
            color="grey darken-4"
            required
          ></v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          md="4"
          offset-md="4"
          sm="6"
          offset-sm="3"
          xs="12"
        >
          <v-text-field
            v-model="routeNumber"
            label="Номер маршрута"
            color="grey darken-4"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          md="4"
          offset-md="4"
          sm="6"
          offset-sm="3"
          xs="12"
          class="whiteSpacePre"
        >
          <v-text-field
            @click="phoneClick"
            v-mask="'+7 (###) ###-##-##'"
            v-model="phoneNumber"
            :rules="phoneRules"
            label="+7 (- - -)  - - -  - -  - -"
            color="grey darken-4"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          md="4"
          offset-md="4"
          sm="6"
          offset-sm="3"
          xs="12"
        >
          <v-btn
            id="submit"
            width="100%"
            @click="validate"
          >
            Отправить обращение
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <success-modal v-if="isSuccessMessage" :dialog="isSuccessMessage" @close="closeSuccessMessage"/>
  </v-form>
</template>

<script>
import axios from 'axios';
import SuccessModal from '@/components/SuccessModal';

const getLocation = () => new Promise((resolve, reject) => {
  if (!('geolocation' in navigator)) {
    reject(new Error('Geolocation is not available.'));
  }

  navigator.geolocation.getCurrentPosition((pos) => {
    resolve(pos);
  }, () => {
    resolve({});
  }, {
    timeout: 5000,
  });
});

export default {
  name: 'FeedbackForm',
  components: {
    SuccessModal,
  },
  data: () => ({
    valid: false,
    routeNumber: '',
    phoneNumber: '',
    phoneRules: [(v) => {
      if (v.length === 0) {
        return true;
      }
      return (/^((\+7 ))(\(?\d{3}\)[- ]?)?[\d\- ]{10}$/.test(v)) || 'Введите корректный номер';
    }],
    category: null,
    items: [
      'Добавить количество автобусов',
      'Изменить вместимость автобусов',
      'Нарушение схемы движения по маршруту автобуса',
      'Водитель не принял банковскую карту',
      'Водитель не принял карту Стрелка',
      'Не работает валидатор',
      'Водитель вел себя некорректно',
      'В салоне не работает печка',
      'В салоне грязно',
      'Автобус в технически неисправном состоянии',
      'Отсутствует информация для пассажиров в салоне',
      'Водитель завышает стоимость проезда',
      'Нарушение графика движения по маршруту автобуса',
    ],
    isSuccessMessage: false,
    isLoading: false,
  }),
  methods: {
    phoneClick() {
      if (this.phoneNumber === '' || this.phoneNumber !== '+7 (') {
        this.phoneNumber = '+7 (';
      }
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.getAppealData();
      }
    },
    async getAppealData() {
      this.isLoading = true;
      const location = await getLocation();
      const appealData = {
        category: this.category,
        routeNumber: this.routeNumber,
        phoneNumber: this.phoneNumber.slice(1),
        geoLatitude: location?.coords?.latitude,
        geoLongitude: location?.coords?.longitude,
      };
      await axios
        .post('https://mtdimo.ru/feedback', appealData);
      this.isLoading = false;
      this.isSuccessMessage = true;
    },
    closeSuccessMessage() {
      this.isSuccessMessage = false;
    },
  },
};
</script>

<style lang="scss">
$yellow: #fdce1c;

#submit {
  background-color: $yellow;
}

#progress {
  color: $yellow;
}

#loadingBackground {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.whiteSpacePre label{
  white-space: pre!important;
}
</style>
