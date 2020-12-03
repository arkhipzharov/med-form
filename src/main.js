import './scss/base';
import Vue from 'vue';
import App from './components/App';
import './global';
import './config';
import './js/startup';

const app = new Vue({
  render: (h) => h(App),
});

app.$mount('.app');
