import {hide, show} from '../utils';

export function init() {
    console.log("Translate JS loaded");
/*    const enFlag = document.querySelector('.js-en-flag');
    const ptFlag = document.querySelector('.js-pt-flag');
    const en = document.querySelectorAll('.js-en');
    const pt = document.querySelectorAll('.js-pt');

    enFlag.addEventListener('click', () => {
        for (const el of en) {
            show(el);
        }
        for (const el of pt) {
            hide(el);
        }
            setCookie('lang', 'en', 365);
    }
    );

    ptFlag.addEventListener('click', () => {
        for (const el of pt) {
            show(el);
        }
        for (const el of en) {
            hide(el);
        }
        setCookie('lang', 'pt', 365);
    }
    );

    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    let cookie = document.cookie;
    console.log(cookie);
    if (cookie.includes('lang=en')) {
        for (const el of en) {
            show(el);
        }
        for (const el of pt) {
            hide(el);
        }
    }
    if (cookie.includes('lang=pt')) {
        for (const el of pt) {
            show(el);
        }
        for (const el of en) {
            hide(el);
        }
    }*/
}
