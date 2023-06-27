<template>
  <v-app>
   <div id="app">
      <div class="row">
        <div class="col-12">
          <div class="float-left">
              <button-header router_link="/">{{ $t('home') }}</button-header>
              <button-header router_link="/map-coordinate">{{ $t('coordinate') }}</button-header>
              <button-header router_link="/prayer-time">{{ $t('prayerTime') }}</button-header>
          </div>
          <div class="float-right pr-10">
            <v-select :menu-props="{ zIndex: 9999 }" v-model="selectedLanguage" :items="languages" item-text="name" item-value="code" @change="changeLanguage()" outlined filled>
            </v-select>
          </div>
        </div>
      </div>
      <router-view></router-view>
   </div>
  </v-app>
</template>

<script>
  import ButtonHeader from '../src/components/button/ButtonHeader.vue';
  import { languages } from './i18n/languages.js';

  export default {
    data() {
      return {
        languages,
        selectedLanguage: 'en',
      };
    },
    name: 'App',
    components: {
      ButtonHeader,
    },
    methods: {
      changeLanguage() {
        this.$i18n.locale = this.selectedLanguage;
      },
    },
  };
</script>

<style scoped>

  #app{
    background: url('./assets/img/background-weather.jpg') no-repeat center center fixed;
    background-size: cover;
    text-align: center;
    animation: change 20s infinite none;
  }


  @keyframes change{
    0% {
      background: url('./assets/img/background-weather.jpg') no-repeat center center fixed
    }
    20% {
      background: url('./assets/img/background1.jpg') no-repeat center center fixed
    }
    40% {
      background: url('./assets/img/background2.jpg') no-repeat center center fixed
    }
    60% {
      background: url('./assets/img/background-weather.jpg') no-repeat center center fixed
    }
    80% {
      background: url('./assets/img/background1.jpg') no-repeat center center fixed
    }
    100% {
      background: url('./assets/img/background2.jpg') no-repeat center center fixed
    }
  }
</style>
