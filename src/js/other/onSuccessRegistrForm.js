let onSuccess = function(response) {
    let errorDivs = document.getElementsByClassName("recaptcha-error");
    let submit = document.querySelector('#main-form .js-submit');
    let webmaster = document.getElementById('input-user').getAttribute('value') === 'webmaster';
    let webmoneySuccess = document.querySelector('.js-toggle-visibility.is-success');
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

module.exports = onSuccess;
