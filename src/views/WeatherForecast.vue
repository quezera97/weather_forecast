<template>
    <div>
      <div v-if="!show" class="row">
        <div class="col-12">
          <WeatherHeader/>
        </div>
      </div>
      
      <div>        
        <v-btn v-if="!show" color="primary" elevation="2" @click="openBox()" x-large> {{ $t('start') }} </v-btn>
        
        <div class="container" style="height: 250px; width: 1000px;">
          <div class="input-margin_top">
              <v-row align="center">
                  <v-col cols="6">
                      <v-select v-model="selectedCountry" :items="countries" item-text="countryName" item-value="countryName" :label="$t('selectCountry')"
                      v-if="inputing"
                          outlined
                          filled
                          hide-details
                          menu-props="auto"
                          @input="getCountryDetails()"
                      ></v-select>
                  </v-col>

                  <v-col cols="6">
                      <v-select v-model="selectedState" :items="states" item-text="name" item-value="name" :label="$t('selectState')"
                          v-if="inputCountry"
                          outlined
                          filled
                          hide-details
                          menu-props="auto"
                          @input="getCityDetails()"
                      ></v-select>
                  </v-col>
              </v-row>
          </div>                    
          <div class="input-margin_top">
              <v-row align="center">
                  <v-col cols="12">
                      <v-text-field v-model="inputText" class="custom-label-color" :label="$t('country')" :placeholder="$t('placeholderCountry')"
                          v-if="inputing"
                          ref="weatherInput"
                          color="primary"
                          outlined
                          filled
                          @keyup.enter="getAPI()"
                          >
                      </v-text-field>
                  </v-col>
              </v-row>
          </div>
        </div>
    
        <v-btn v-if="inputing" color="primary" elevation="2" @click="getAPI()" x-large>
            {{ $t('search') }} <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn v-if="inputing" class="ml-4" color="red" elevation="2" @click="clearText()" x-large>
            {{ $t('reset') }}
        </v-btn>
    
        <v-btn v-if="show" class="ml-4" color="red" elevation="2" @click="closeBox()" x-large> {{ $t('close') }} </v-btn>
    
        <div class="input-margin_top">
            <WeatherInfo :dataAPI="dataAPI" :inputText="inputText" />
        </div>
      </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import WeatherInfo from '../components/weather/WeatherInfo.vue';
    import WeatherHeader from '../components/weather/WeatherHeader.vue';

    export default {
        name: "WeatherForecast",
        components: {
          WeatherHeader,
          WeatherInfo,
        },
        data() {
            return {
                countries: [],
                states: [],

                selectedCountry: '',
                selectedState: '',

                countryCode: '',

                show: false,
                alertBox: 'alertBox',
                inputing: false,
                inputCountry: false,
                inputText: '',
                dataAPI: null,
                rules: {
                    name: [val => (val || '').length > 0 || 'This field is required']
                }
            };
        },
        mounted() {
            this.getCountries();
        },
        methods: {
            async getCountries() {
                try {
                    const response = await axios.get(
                        'http://api.geonames.org/countryInfoJSON?username=quezera'
                        // 'https://restcountries.com/v2/all'
                    );
                    this.countries = response.data.geonames;
                } catch (error) {
                    console.error(error);
                }
            },
            async getCountryDetails() {
                try {
                    const responseCountry = await axios.get(
                        `http://api.geonames.org/searchJSON?q=${this.selectedCountry}&maxRows=1&username=quezera`
                    );

                    this.countryDetails = responseCountry.data.geonames;
                    this.geonameId = this.countryDetails[0].geonameId;
                    this.countryCode = this.countryDetails[0].countryCode;

                    const responseState = await axios.get(
                        `http://api.geonames.org/childrenJSON?geonameId=${this.geonameId}&username=quezera`
                    );

                    this.states = responseState.data.geonames

                    this.inputText = this.selectedCountry;

                    this.inputCountry = true

                } catch (error) {
                    console.error(error);
                }
            },
            getCityDetails() {
                this.inputText = this.selectedState + ', ' + this.countryCode;
            },
            clearText() {
                this.inputText = '';  
                this.selectedCountry = '';  
                this.selectedState = '';
                this.inputCountry = false;
                this.$refs.weatherInput.focus()         
            },
            showToastMessage() {
                const app = document.getElementById('app')
                const toast = document.createElement('div')
                toast.classList.add('toast')
                toast.style.animation = ''
                toast.innerHTML =  `
                    <img class="toast-icon" src="https://img.icons8.com/external-sbts2018-outline-color-sbts2018/58/000000/external-alert-emergencies-set-sbts2018-outline-color-sbts2018.png"/>
                    
                    <div class="toast-message">
                        <h2>Danger</h2>
                        <h4>There's no country by that name</h4>
                    </div>
                `
                app.appendChild(toast)

                setTimeout(() => {
                    app.removeChild(toast)
                },3000)
            },

            closeBox(){
                this.inputText = '';
                this.selectedCountry = '';
                this.selectedState = '';
                this.inputing = false
                this.inputCountry = false
                this.show = !this.show
            },

            openBox(){
                this.inputing = true
                this.show = !this.show
            },
            
            getAPI() {
                if(this.inputText == '' ) {
                    this.showToastMessage()
                    this.$refs.weatherInput.focus();           
                }
                else {
                    try {                        

                        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.inputText}&appid=70eb2934deb07909887a97e39455e336`)
                        .then(response => {
                            this.dataAPI = response.data;
                        })  
                        .catch((e) => {
                            console.log(e);
                            this.showToastMessage();          
                        });
                    }
                    catch (error) {
                    if (error.response) {
                            console.log(error.response.data);
                            console.log(error.response.status);
                            console.log(error.response.headers);
                        } else if (error.request) {
                            console.log(error.request);
                        }
                        else {
                            console.log('Error', error.message);
                        }
                    }             
                }     
            }
        }
    };
</script>

<style>
    .down-arrow{
        fill: var(--white-color);
    }

    .custom-label-color input{
        color: var(--white-color)!important;
    }

    .input-margin_top {
        margin-top: 30px;
    }

    .container{
        margin: 0 auto;
        position: relative;
    }

    .content{
        margin: 0 auto;
        width: 700px;
    }

    /* toast  */
    .toast{
        background-color: #FF4949;
        position: absolute;
        top: 20px;
        right: 10px;
        border-radius: 15px;
        height: 75px;
        width: 300px;
        display: flex;
        align-items: center;
        animation: slideIn  ease 1.5s, fadeOut linear 1s 3s;
        box-shadow: -1px 2px 10px 0px rgba(0,0,0,0.75);
    }

    .toast-message{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        color: var(--white-color);
    }

    .toast-icon{
        height: 30px;
        padding: 0 10px;
    }

    @keyframes slideIn{
        from {
            right: -40px;       
            opacity: 0;
        }
        to {
            right: 10px;
            opacity: 1;
        }
    }

    @keyframes fadeOut{
        to{
            opacity: 0;
        }
    }
</style>
  