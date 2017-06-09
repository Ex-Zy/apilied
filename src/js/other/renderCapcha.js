function renderCaptcha() {
    let siteKey = '6LcJIiAUAAAAAC4BLXKsV0as16wKvS2Dj6Htc3_1';

    if($('.g-recaptcha').length && grecaptcha) {
        $('.g-recaptcha').each(function() {
            grecaptcha.render($(this).attr('id'), {
                'sitekey' : siteKey,
                callback: onSuccess
            });
        });
    }
}

module.exports = renderCaptcha;
