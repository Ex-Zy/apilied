//jquery
window.$ = require('jquery');
window.jQuery = require('jquery');

//для формы регистрации
window.onSuccess = require('./other/onSuccessRegistrForm.js');
window.renderCaptcha = require('./other/renderCapcha.js');

// svg polyfil
import svg4everybody from 'svg4everybody';
svg4everybody();

// custom scrollbar
import './lib/perfect-scrollbar.jquery.min.js';

//common scripts
import './_index.js';
