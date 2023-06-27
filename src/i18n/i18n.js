import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
  en: {
    title: 'Weather Application',
    home: 'Home',
    coordinate: 'Coordinate',
    prayerTime: 'Prayer Time',
    start: 'Start',
    search: 'Search',
    reset: 'Reset',
    close: 'Close',
    details: 'Details',

    selectCountry: 'Select a country',
    selectState: 'Select a state',
    selectZon: 'Select a zone',
    country: 'Country',
    placeholderCountry: 'Enter Country',
    capital: 'Capital City',
    timeZone: 'Time Zone',
  },
  my: {
    title: 'Aplikasi Cuaca',
    home: 'Laman Utama',
    coordinate: 'Koordinasi',
    prayerTime: 'Waktu Solat',
    start: 'Mula',
    search: 'Cari',
    reset: 'Set Semula',
    close: 'Tutup',
    details: 'Butiran',
    
    selectCountry: 'Pilih satu negara',
    selectState: 'Pilih satu negeri',
    selectZon: 'Pilih satu zon',
    country: 'Negara',
    placeholderCountry: 'Masukkan Negara',
    capital: 'Ibu Kota',
    timeZone: 'Zona Masa',
  },
  zh: {
    title: '天气应用',
    home: '首页',
    coordinate: '坐标',
    prayerTime: '伊斯兰教拜时',
    start: '开始',
    search: '搜索',
    reset: '重置',
    close: '关闭',
    details: '细节',
    
    selectCountry: '选择一个国家',
    selectState: '选择一个州/省',
    selectZon: '选择一个区域',
    country: '国家',
    placeholderCountry: '输入国家',
    capital: '首都',
    timeZone: '时区',
  },
};

const i18n = new VueI18n({
  locale: 'en',
  messages,
});

export default i18n;
