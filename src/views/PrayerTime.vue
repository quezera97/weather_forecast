<template>
    <div>
        <div v-if="!show" class="row">
            <div class="col-12">
                <WeatherHeader/>
            </div>
        </div>
        <div>
            <v-btn v-if="!show" color="primary" elevation="2" @click="openBox()" x-large> {{ $t('start') }} </v-btn>
        </div>
        <div v-if="inputing" class="container" style="height: 250px; width: 1000px;">
            <v-row align="center">
                <v-select v-model="selectedZone" :items="zoneOptions" item-text="text" item-value="value" :label="$t('selectState')"></v-select>
            </v-row>
            <v-row align="center" v-for="zone in zoneOptions" :key="zone.value">
                <v-select
                    v-if="selectedZone === zone.value"
                    v-model="selectedStateZone"
                    :items="zone.items"
                    item-text="text"
                    item-value="value"
                    :label="$t('selectZon')"
                    @input="getPrayerTime()"
                ></v-select>
            </v-row>
            <v-row align="center" v-if="selectedStateZone">
                <v-col cols="12">
                    <table class="table-container">
                        <thead>
                            <tr>
                                <th>Tarikh</th>
                                <th>Tarikh Hijri</th>
                                <th>Hari</th>
                                <th>Imsak</th>
                                <th>Subuh</th>
                                <th>Syuruk</th>
                                <th>Zuhur</th>
                                <th>Asar</th>
                                <th>Maghrib</th>
                                <th>Isyak</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{{ this.date }}</td>
                                <td>{{ this.hijri }}</td>
                                <td>{{ this.day }}</td>
                                <td>{{ this.imsak }}</td>
                                <td>{{ this.fajr }}</td>
                                <td>{{ this.syuruk }}</td>
                                <td>{{ this.dhuhr }}</td>
                                <td>{{ this.asr }}</td>
                                <td>{{ this.maghrib }}</td>
                                <td>{{ this.isha }}</td>
                            </tr>
                        </tbody>
                    </table>
                </v-col>
            </v-row>            
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import { 
        johorZoneOptions,
        kedahZoneOptions,
        kelantanZoneOptions,
        melakaZoneOptions,
        negeriSembilanZoneOptions,
        pahangZoneOptions,
        perlisZoneOptions,
        pulauPinangZoneOptions,
        perakZoneOptions,
        sabahZoneOptions,
        sarawakZoneOptions,
        selangorZoneOptions,
        terengganuZoneOptions,
    } from '../components/prayer/options.js';
    import WeatherHeader from '../components/weather/WeatherHeader.vue';
    
    import { showErrorAlert } from '../components/swal/error.js';

    export default {
        name: "PrayerTime",
        components: {
            WeatherHeader,
        },
        data() {
            return {
                show: false,
                inputing: false,

                selectedZone: '',
                selectedStateZone: '',
                zoneOptions: [
                    {
                        text: 'Johor',
                        value: 'JOHOR',
                        items: johorZoneOptions,
                    },
                    {
                        text: 'Kedah',
                        value: 'KEDAH',
                        items: kedahZoneOptions,
                    },
                    {
                        text: 'Kelantan',
                        value: 'KELANTAN',
                        items: kelantanZoneOptions,
                    },
                    {
                        text: 'Melaka',
                        value: 'MELAKA',
                        items: melakaZoneOptions,
                    },
                    {
                        text: 'Negeri Sembilan',
                        value: 'NEGERI_SEMBILAN',
                        items: negeriSembilanZoneOptions,
                    },
                    {
                        text: 'Pahang',
                        value: 'PAHANG',
                        items: pahangZoneOptions,
                    },
                    {
                        text: 'Perlis',
                        value: 'PERLIS',
                        items: perlisZoneOptions,
                    },
                    {
                        text: 'Pulau Pinang',
                        value: 'PULAU_PINANG',
                        items: pulauPinangZoneOptions,
                    },
                    {
                        text: 'Perak',
                        value: 'PERAK',
                        items: perakZoneOptions,
                    },
                    {
                        text: 'Sabah',
                        value: 'SABAH',
                        items: sabahZoneOptions,
                    },
                    {
                        text: 'Sarawak',
                        value: 'SARAWAK',
                        items: sarawakZoneOptions,
                    },
                    {
                        text: 'Selangor',
                        value: 'SELANGOR',
                        items: selangorZoneOptions,
                    },
                    {
                        text: 'Terengganu',
                        value: 'TERENGGANU',
                        items: terengganuZoneOptions,
                    },
                ],
                prayerTime: [],
                date: '',
                hijri: '',
                day: '',
                imsak: '',
                fajr: '',
                syuruk: '',
                dhuhr: '',
                asr: '',
                maghrib: '',
                isha: '',
            }
        },
        methods: {
            openBox(){
                this.inputing = true
                this.show = !this.show
            },

            async getPrayerTime() {
                try {
                    const responsePrayerTime = await axios.get(
                        `https://www.e-solat.gov.my/index.php?r=esolatApi/TakwimSolat&period=today&zone=${this.selectedStateZone}`
                        // `https://www.e-solat.gov.my/index.php?r=esolatApi/TakwimSolat&period=week&zone=${this.selectedStateZone}`
                        // `https://www.e-solat.gov.my/index.php?r=esolatApi/TakwimSolat&period=year&zone=${this.selectedStateZone}`
                    );

                    this.prayerTime = responsePrayerTime.data.prayerTime[0];

                    if(this.prayerTime){
                        this.date = this.prayerTime.date ?? '-';
                        this.hijri = this.prayerTime.hijri ?? '-';
                        this.day = this.prayerTime.day ?? '-';
                        this.imsak = this.prayerTime.imsak ?? '-';
                        this.fajr = this.prayerTime.fajr ?? '-';
                        this.syuruk = this.prayerTime.syuruk ?? '-';
                        this.dhuhr = this.prayerTime.dhuhr ?? '-';
                        this.asr = this.prayerTime.asr ?? '-';
                        this.maghrib = this.prayerTime.maghrib ?? '-';
                        this.isha = this.prayerTime.isha ?? '-';
                    }
                } catch (error) {
                    console.error(error);
                    showErrorAlert(error);
                }
            },
        }
    }
</script>
<style>
  /* Table styles */
  .table-container {
    width: 100%;
    border-collapse: collapse;
    font-family: Arial, sans-serif;
  }

  .table-container th,
  .table-container td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: center;
  }

  .table-container thead {
    background-color: blue;
    color: white;
  }

  .table-container tbody {
    background-color: transparent;
  }

  .table-container tbody tr:nth-child(even) {
    background-color: transparent;
  }
</style>
