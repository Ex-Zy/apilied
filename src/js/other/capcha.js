var onSuccess = function(response) {
    var errorDivs = document.getElementsByClassName("recaptcha-error");
    var submit = document.querySelector('#main-form .js-submit');
    var webmaster = document.getElementById('input-user').getAttribute('value') === 'webmaster';
    var webmoneySuccess = document.querySelector('.js-toggle-visibility.is-success');
    // Если ошибка существует - убрать, кнопку разблокировать 
    if (errorDivs.length === 1) {
        errorDivs[0].className = "";
        submit.removeAttribute('disabled');
    }
    // Изменение учётной записи на вебмастер - блокировать кнопку
    if(webmaster) {
        submit.setAttribute('disabled', 'disabled');
    }
    // Если капча пройдена и вебмани верный - разблокировать кнопку
    if(errorDivs.length === 0 && webmoneySuccess) submit.removeAttribute('disabled');

};
