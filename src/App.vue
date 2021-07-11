<template>
  <v-app>
    <v-app-bar
        app
        color="primary"
        dark
    >
      <div class="tw-container tw-mx-auto tw-flex tw-justify-between tw-items-center">
        <span> {{ $vuetify.lang.t('$vuetify.titleApp') }}</span>
        <div class="tw-inline-flex tw-items-center tw-p-2 tw-w-24" style="transform: translateY(12px);">
          <v-select
              v-model="language"
              :items="languages"
              dense
              solo
          ></v-select>
        </div>
      </div>
    </v-app-bar>
    <v-main class="">
      <div class="tw-container tw-mx-auto tw-py-3">
        <div>
          <v-text-field
              class="tw-mb-2"
              :label="$vuetify.lang.t('$vuetify.cityName')"
              :rules="cityNameRules"
              hide-details="auto"
              v-model="cityName"
          ></v-text-field>
          <div class="tw-flex tw-flex-col md:tw-flex-row">
            <div v-if="searchedCity" class="md:tw-w-1/2">
              <div class="tw-py-4 tw-px-5 tw-bg-blue-500 tw-text-white">
                <div class="tw-font-semibold">{{$vuetify.lang.t('$vuetify.weatherIn')}} {{ cityInfo.title }}</div>
                <div class="tw-mt-3 tw-flex tw-flex-nowrap items-center tw-flex-col lg:tw-flex-row">
                  <div class="tw-flex">
                    <div class="temparature tw-font-semibold tw-text-5xl tw-flex tw-items-center">{{
                        cityInfo.main.temp
                      }}&#176;
                    </div>
                    <img class="tw-h-24" src="https://openweathermap.org/img/wn/03d@2x.png" alt="">
                  </div>
                  <div class="tw-flex tw-justify-center tw-flex-col tw-mb-2 sm:tw-mb-0">
                    <div>{{ cityInfo.weather[0].description }}</div>
                    <div>{{$vuetify.lang.t('$vuetify.feelsLike')}} <span class="temparature">{{ cityInfo.main.feels_like }}&#176;</span></div>
                  </div>
                </div>
                <div class="tw-flex tw-flex-wrap tw-transform tw--translate-x-2">
                  <v-tooltip bottom>
                    <template v-slot:activator="{on, attrs}">
                  <span
                      class="hover:tw-bg-blue-400 tw-p-2 tw-rounded-sm"
                      v-bind="attrs"
                      v-on="on">Min {{ cityInfo.main.temp_min }}&#176;</span>
                    </template>
                    <span>{{$vuetify.lang.t('$vuetify.minTemperature')}}</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{on, attrs}">
                  <span
                      class="hover:tw-bg-blue-400 tw-p-2 tw-rounded-sm"
                      v-bind="attrs"
                      v-on="on">Min {{ cityInfo.main.temp_max }}&#176;</span>
                    </template>
                    <span>{{$vuetify.lang.t('$vuetify.maxTemperature')}}</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{on, attrs}">
                  <span
                      class="tw-inline-flex tw-items-center hover:tw-bg-blue-400 tw-p-2 tw-rounded-sm"
                      v-bind="attrs"
                      v-on="on">
                    <inline-svg
                        class="tw-inline-block tw-mr-1"
                        width="20"
                        height="20"
                        :src="require('@/assets/icons/weather/humidity.svg')"></inline-svg>
                    {{ cityInfo.main.humidity }}
                  </span>
                    </template>
                    <span>{{$vuetify.lang.t('$vuetify.humidity')}}</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{on, attrs}">
                  <span
                      class="tw-inline-flex tw-items-center hover:tw-bg-blue-400 tw-p-2 tw-rounded-sm"
                      v-bind="attrs"
                      v-on="on">
                    <inline-svg
                        class="tw-inline-block tw-mr-1"
                        width="20"
                        height="20"
                        :src="require('@/assets/icons/weather/pressure.svg')"></inline-svg>
                    {{ cityInfo.main.pressure }}
                  </span>
                    </template>
                    <span>{{$vuetify.lang.t('$vuetify.pressure')}}</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{on, attrs}">
                  <span
                      class="tw-inline-flex tw-items-center hover:tw-bg-blue-400 tw-p-2 tw-rounded-sm"
                      v-bind="attrs"
                      v-on="on">
                    <inline-svg
                        class="tw-inline-block tw-mr-1"
                        width="20"
                        height="20"
                        :src="require('@/assets/icons/weather/wind.svg')"></inline-svg>
                    {{ cityInfo.wind.speed }} {{$vuetify.lang.t('$vuetify.windSpeed')}}, {{ cityInfo.wind.direction }}
                  </span>
                    </template>
                    <span>{{$vuetify.lang.t('$vuetify.wind')}}</span>
                  </v-tooltip>
                </div>
              </div>
            </div>
            <div
                :class="{'md:tw-w-1/2': searchedCity !== ''}"
                class="tw-flex tw-flex-grow tw-flex-col tw-bg-gray-600 tw-text-white tw-p-3 tw-mt-2 md:tw-mt-0"
            >
              <div class="tw-mb-3">{{ $vuetify.lang.t('$vuetify.previousRequests') }}</div>
              <div class="tw-flex tw-flex-wrap">
                <div
                    v-for="(city) of citiesHistory" :key="city.id"
                    @click="cityName = city.name"
                    class="tw-p-1 tw-w-full">
                  <div
                      class="tw-break-all tw-px-3 tw-py-2 tw-transition-all hover:tw-bg-gray-700 tw-cursor-pointer tw-rounded-sm tw-bg-gray-500 tw-block">
                    {{ city.name }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
// https://api.openweathermap.org/data/2.5/weather?q=Novosibirsk&appid=84e2a9ad0b2bca1922b23252454cc8a2&units=metric&lang=ru

import backend from "@/services/backend";
import {debounce} from "@/utils/debounce";
import compass from "@/utils/compass";

export default {
  name: 'App',
  data: () => ({
    cityName: '',
    cityNameRules: [],
    searchedCity: '',
    cityInfo: null,
    citiesHistory: [],
    languages: ['ru', 'en'],
    language: null,
  }),
  created() {
    debugger;
    this.language = localStorage.getItem('lang');
    if (!this.language) this.language = 'ru';
    this.citiesHistory = JSON.parse(localStorage.getItem('citiesHistory'));
    if (!this.citiesHistory) this.citiesHistory = [];
  },
  mounted() {
    this.getWeather = debounce(this.getWeather.bind(this), 1000);
  },
  watch: {
    language: {
      handler() {
        localStorage.setItem('lang', this.language);
        this.$vuetify.lang.current = this.language;

        // пробуем получить погоду
        if (this.cityName) {
          this.getWeather(this.cityName);
        }
      }
    },
    cityName() {
      this.cityNameRules = [];
      // пробуем получить погоду
      if (this.cityName) {
        this.getWeather(this.cityName);
      }
    },
    searchedCity() {
      if (this.searchedCity.length === 0) return;

      // сохраняем в историю найденный город
      this.citiesHistory.unshift({id: Math.round(Math.random() * 100000), name: this.cityName});
      if (this.citiesHistory.length > 5) {
        this.citiesHistory.splice(5, 1);
      }
    },
    citiesHistory() {
      localStorage.setItem('citiesHistory', JSON.stringify(this.citiesHistory));
    }
  },
  methods: {
    getWeather(city) {
      backend.getWeather(city, this.$vuetify.lang.current).then((response) => {
        this.searchedCity = city;
        this.cityInfo = response;

        // Описание погоды
        const weatherDescription = this.cityInfo.weather[0].description;
        this.cityInfo.weather[0].description = weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);

        // Температуры
        Object.keys(this.cityInfo.main).forEach((key) => {
          if (key === 'pressure' || key === 'humidity') return;

          this.cityInfo.main[key] = Math.floor(this.cityInfo.main[key]);
          this.cityInfo.main[key] = this.cityInfo.main[key] > 0 ? `+${this.cityInfo.main[key]}` : `-${Math.abs(this.cityInfo.main[key])}`
        });

        // Ветер
        this.cityInfo.wind.direction = compass.getDirection(this.cityInfo.wind.deg, this.$vuetify.lang.current);

        // Название города
        // если в названии присутствуют русские буквы
        if (this.cityInfo.name.match(/^[а-яё]+$/i)) {
          const vowels = ['а', 'у', 'о', 'ы', 'и', 'э', 'я', 'ю', 'ё', 'е'];
          if (vowels.includes(this.cityInfo.name[this.cityInfo.name.length - 1])) {
            this.cityInfo.title = this.cityInfo.name.slice(0, -1) + 'e';
          } else {
            this.cityInfo.title = this.cityInfo.name + 'e';
          }
        } else {
          this.cityInfo.title = this.cityInfo.name;
        }
      }).catch((error) => {
        if (error.response.status === 404) {
          this.cityNameRules = ['Такого города не существует'];
        }
      });
    }
  }
};
</script>

<style scoped>
::v-deep .v-toolbar__content {
  padding: 0;
}
</style>
