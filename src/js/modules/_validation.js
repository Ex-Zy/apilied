// _isValidate: function () {
//     let that = this;
//     let patternMail = /.+@.+\..+/i;
//     let patternWebmoney = /^[Rr]\d{12}$/;
//     let email = this.mailCheckIn;
//     let password = this.passwordCheckIn;
//     let confirm = this.confirmCheckIn;
//     let webmoney = this.fieldWebMoney.find('input');
//
//     email.on('input blur', function () {
//         let formRow = $(this).closest('.form__row');
//         let field = formRow.find('.field');
//
//         if ($(this).val() != '') {
//             //Если поле email заполнено
//             if (patternMail.test($(this).val())) {
//                 //Если соответствует строка формату email адреса - валидно, подчеркиваем белой рамкой
//                 formRow.addClass('is-success');
//                 tooltip($(this)).remove();
//                 that._checkSuccess([email, password, confirm]);
//             } else {
//                 //Если неправильный - выводим сообщение об ошибке
//                 formRow.removeClass('is-success');
//                 tooltip($(this), 'Адрес электронной почты должен быть в формате "name@domain.com"').add();
//                 that._checkSuccess([email, password, confirm]);
//             }
//         } else {
//             // Поле пустое, выводим предупреждающее сообщение
//             formRow.removeClass('is-success');
//             tooltip($(this), 'Это поле обязательно').add();
//             that._checkSuccess([email, password, confirm]);
//         }
//     });
//
//     password.on('input blur', function () {
//         let formRow = $(this).closest('.form__row');
//         let field = formRow.find('.field');
//
//         if ($(this).val() != '') {
//             // Поле не пустое
//             if ($(this).val().length >= 6) {
//                 // От 6-ти символов валидно
//                 formRow.addClass('is-success');
//                 tooltip($(this)).remove();
//                 that._checkSuccess([email, password, confirm]);
//                 that._checkDone();
//             } else {
//                 formRow.removeClass('is-success');
//                 tooltip($(this), 'Не менее 6 символов').add();
//                 that._checkSuccess([email, password, confirm]);
//             }
//         } else {
//             // Поле пустое, выводим предупреждающее сообщение
//             formRow.removeClass('is-success');
//             tooltip($(this), 'Это поле обязательно').add();
//             that._checkSuccess([email, password, confirm]);
//         }
//     });
//
//     confirm.on('input blur', function () {
//         let formRow = $(this).closest('.form__row');
//         let field = formRow.find('.field');
//
//         if ($(this).val() != '') {
//             //Если не пустое
//             if ($(this).val() !== password.val()) {
//                 //Если не ровно полю password
//                 formRow.removeClass('is-success');
//                 tooltip($(this), 'Пароли не совпадают').add();
//                 that._checkSuccess([email, password, confirm]);
//             } else {
//                 // валидно, подчеркиваем белой рамкой
//                 formRow.addClass('is-success');
//                 tooltip($(this)).remove();
//                 that._checkSuccess([email, password, confirm]);
//             }
//         } else {
//             // Поле пустое, выводим предупреждающее сообщение
//             formRow.removeClass('is-success');
//             tooltip($(this), 'Это поле обязательно').add();
//             that._checkSuccess([email, password, confirm]);
//         }
//     });
//
//     webmoney.on('input blur', function () {
//         let formRow = $(this).closest('.form__row');
//         let field = formRow.find('.field');
//         let step = $(this).closest('.js-content-item');
//
//         if ($(this).val() != '') {
//             //Если не пустое
//             if (patternWebmoney.test($(this).val()) && !captchaIsError()) {
//                 //Ввод верный
//                 formRow.addClass('is-success');
//                 tooltip($(this)).remove();
//                 that._checkSuccess([webmoney]);
//                 console.log("Капча и паттерн верны");
//             } else if (patternWebmoney.test($(this).val())) {
//                 formRow.addClass('is-success');
//                 tooltip($(this)).remove();
//                 console.log("Патерн верен");
//             } else {
//                 //Если неправильный - выводим сообщение об ошибке
//                 formRow.removeClass('is-success');
//                 tooltip($(this), 'Кошелек должен иметь символ "R" + 12 цифр').add();
//                 that._checkSuccess([webmoney]);
//             }
//         } else {
//             // Поле пустое, выводим предупреждающее сообщение
//             formRow.removeClass('is-success');
//             tooltip($(this), 'Это поле обязательно').add();
//             that._checkSuccess([webmoney]);
//         }
//     });
//
// };
// _checkSuccess: function (elements) {
//     if (!elements) return;
//     let len = elements.length;
//     let ok = true;
//
//     for (let i = 0; i < len; i++) {
//         var row = elements[i].closest('.form__row');
//         var step = elements[i].closest('.js-content-item');
//
//         if (!row.hasClass('is-success')) {
//             ok = false;
//             break;
//         }
//     }
//
//     if (ok == true) {
//         step.addClass('is-done');
//         this._checkDone();
//     } else {
//         step.removeClass('is-done');
//         step.find(this.btnNextStep).attr('disabled', true);
//         step.find(this.submit).attr('disabled', true);
//     }
// },

// УДАЛИТЬ, скопировано для удобства
let tooltip = function(input, text) {
    text = text || 'Текст tooltip-а не передан';
    let field = input.closest('.field');

    return {
        add: function() {
            if(field.find('.warning-msg').length == 0) {
                field.append($('<div class="warning-msg">').html(text));
            } else {
                field.find('.warning-msg').html(text);
            }
        },
        remove: function() {
            field.find('.warning-msg').remove();
        }
    }
};
let unlockBtn = (btn) => {
    if(btn.attr('disabled')) {
        btn.attr('disabled', false)
    }
};
let lockBtn = (btn) =>  {
    btn.attr('disabled', true)
};
let addClassForElement = (elem, cl) => {
    if(!elem.hasClass(cl)) elem.addClass(cl);
};
let removeClassForElement = (elem, cl) => {
    if(elem.hasClass(cl)) elem.removeClass(cl);
};
let checkInputType = (elem) => {
    if(!elem) {
        throw new Error('Неверно передан input для проверки');
    }

    if(elem.attr('type') === 'email') {
        return 'email';
    } else if(elem.attr('type') === 'password') {
        if(elem.attr('type') === 'password' &&
            elem.attr('name').indexOf('confirm') != -1) {
            return 'confirm';
        } else {
            return 'password';
        }
    } else if(elem.attr('type') === 'text' && elem.attr('name') === 'wallet') {
        return 'wallet';
    } else {
        return 'text';
    }
};
let checkInputOnSuccess = (elem) => {
    if(elem.hasClass('is-success')) return true;
    return false;
};
let completeInputs = (elements) => {
    if (!elements) return;

    let flag;
    for (let i = 0; i < elements.length; i++) {
        let row = elements[i].closest('.form__row');

        if (!checkInputOnSuccess(row)) {
            flag = false;
            break;
        }
        flag = true;
    }
    return flag;
};
let stepDone = (callback, elements) => {
    let item = elements[0].closest('.js-content-item');
    let btn = item.find('.js-next-step, .js-submit');
    if(callback(elements)) {
        unlockBtn(btn);
        addClassForElement(item, 'is-done');
        return;
    }
    lockBtn(btn);
    removeClassForElement(item, 'is-done');
};
let validateInputs = (elements) => {
    for(let i = 0; i < elements.length; i++) {
        let that = this;
        let patternMail = /.+@.+\..+/i;
        let patternWebmoney = /^[Rr]\d{12}$/;

        elements[i].on('input blur', function() {
            let formRow = $(this).closest('.form__row');
            let field = formRow.find('.field');

            if ($(this).val() != '') {
                switch(checkInputType($(this))) {
                    case 'email': {
                        //Если поле email заполнено
                        if (patternMail.test($(this).val())) {
                            //Если соответствует строка формату email адреса - валидно, подчеркиваем белой рамкой
                            formRow.addClass('is-success');
                            tooltip($(this)).remove();
                            that._checkSuccess([email, password, confirm]);
                        } else {
                            //Если неправильный - выводим сообщение об ошибке
                            formRow.removeClass('is-success');
                            tooltip($(this), 'Адрес электронной почты должен быть в формате "name@domain.com"').add();
                            that._checkSuccess([email, password, confirm]);
                        }
                        break;
                    }
                    default: {
                        console.log('Неизвестный тип поля');
                        break;
                    }
                }
            } else {
                // Поле пустое, выводим предупреждающее сообщение
                formRow.removeClass('is-success');
                tooltip($(this), 'Это поле обязательно').add();
                // that._checkSuccess([email, password, confirm]);
            }
        });
    }
};
