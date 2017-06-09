import {WIN, POPUP} from '../_global.js';

let key   = $(location)[0].search.slice(1, 6);
let value = $(location)[0].search.slice(7);

WIN.on('load', () => {
    if(key === 'popup' && value){
        POPUP
            .filter('[data-popup="' + value + '"]')
            .addClass('is-active');
    }
});