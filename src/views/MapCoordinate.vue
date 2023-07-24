<template>
    <div>
        <div v-if="!show" class="row">
            <div class="col-12">
                <WeatherHeader/>
            </div>
        </div>

        <div>
            <v-btn v-if="!show" color="primary" elevation="2" @click="openBox()" x-large> {{ $t('start') }} </v-btn>

            <div v-if="inputing" class="container" style="height: 250px; width: 1000px;">
                <v-row align="center">
                    <v-col cols="6">
                        <h2> {{ $t('details') }} </h2>     
                        <div class="input-margin_top">
                            <v-select v-model="selectedCountry" :items="countries" item-text="countryName" item-value="countryName" :label="$t('selectCountry')"
                                outlined
                                filled
                                hide-details
                                menu-props="auto"
                                @input="getCountryDetails()"
                            ></v-select>
                        </div>
                        <div class="input-margin_top">
                            <v-text-field v-model="capitalCity" class="custom-label-color" :label="$t('capital')" outlined filled readonly></v-text-field>
                        </div>
                        <h3 v-if="this.dayOfWeek && this.time">{{ this.dayOfWeek +', '+ this.time}}</h3>            
                        <h3 v-if="this.timeZone">{{ $t('timeZone') }} : {{ this.timeZone }}</h3>            
                        <div class="input-margin_top">
                            <v-text-field v-model="coordinate" class="custom-label-color" :label="$t('coordinate')" outlined filled readonly></v-text-field>
                        </div>
                        
                    </v-col>
                    <v-col cols="6">
                        <div id="map" class="map-container"></div>
                    </v-col>
                </v-row>                    
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import L from 'leaflet';
    import 'leaflet/dist/leaflet.css';
    import WeatherHeader from '../components/weather/WeatherHeader.vue';

    import markerIcon from '@/assets/img/marker-icon.png';
    import markerShadow from '@/assets/img/marker-shadow.png';  

    export default {
        name: "MapCoordinate",
        components: {
            WeatherHeader,
        },
        data() {
            return {
                show: false,
                inputing: false,
                
                countries: [],
                selectedCountry: '',
                capitalCity: '',
                coordinate: '',
                latitude: null,
                longitude: null,
                map: null,

                dayOfWeek: null,
                time: null,
                timeZone: null,
            }
        },
        mounted() {
            this.getCountries();
            this.displayMap();
        },
        methods: {
            showAlert(message) {
                this.$swal.fire({
                    title: 'Error',
                    text: message,
                    icon: 'error',
                });
            },

            openBox(){
                this.inputing = true
                this.show = !this.show
            },

            async getCountries() {
                try {
                    const response = await axios.get(
                        `http://api.geonames.org/countryInfoJSON?username=quezera`
                    );
                    this.countries = response.data.geonames;                    
                } catch (error) {
                    this.showAlert(error);
                    console.error(error);
                }
            },
            async getCountryDetails() {
                try {
                    const responseCountry = await axios.get(
                        `http://api.geonames.org/searchJSON?q=${this.selectedCountry}&maxRows=1&username=quezera`
                    );
                        
                    this.countryDetails = responseCountry.data.geonames[0];
                    this.countryCode = this.countryDetails.countryCode ?? null;

                    if(this.countryCode){
                        const responseCapitalCity = await axios.get(
                            `http://api.geonames.org/countryInfoJSON?country=${this.countryCode}&username=quezera`
                        );
                        this.selectedCountryDetails = responseCapitalCity.data.geonames[0];
                        this.capitalCity = this.selectedCountryDetails.capital ?? null;

                        if(this.capitalCity){
                            const responseCoordinate = await axios.get(
                                `http://api.geonames.org/searchJSON?q=${this.capitalCity}&maxRows=1&username=quezera`
                            );

                            this.coordinateDetails = responseCoordinate.data.geonames[0];
                            this.latitude = this.coordinateDetails.lat ?? null;
                            this.longitude = this.coordinateDetails.lng ?? null;

                            if(this.latitude && this.longitude){
                                const responseTime = await axios.get(
                                    `https://timeapi.io/api/Time/current/coordinate?latitude=${this.latitude}&longitude=${this.longitude}`
                                );

                                this.timeDetails = responseTime.data;
                                this.dayOfWeek = this.timeDetails.dayOfWeek;
                                this.time = this.timeDetails.time;
                                this.timeZone = this.timeDetails.timeZone;
                            }

                            this.coordinate = `Latitude: ${this.latitude}, Longitude: ${this.longitude}`

                            this.displayMap();
                        }
                    }


                } catch (error) {
                    this.showAlert(error);
                    console.error(error);
                }
            },
            displayMap() {
                if (this.latitude && this.longitude) {
                    if (!this.map) {
                        this.map = L.map('map').setView([this.latitude, this.longitude], 13);
                        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
                            maxZoom: 18,
                        }).addTo(this.map);
                    }

                    if (this.marker) {
                        this.map.removeLayer(this.marker);
                    }

                    this.marker = L.marker([this.latitude, this.longitude], {
                        icon: L.icon({
                            iconUrl: markerIcon,
                            shadowUrl: markerShadow,
                        }),
                    }).addTo(this.map);

                    this.map.setView([this.latitude, this.longitude], 13);
                }
            },
        }
    };
</script>

<style>
    .input-margin_top {
        margin-top: 30px;
    }
    .map-container {
        height: 400px;
        width: 100%;
    }
</style>
  