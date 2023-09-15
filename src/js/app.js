import '../sass/app.scss';

const dynamicModules = [...document.querySelectorAll('[data-module]')].map((module) => module.dataset.module);
if (dynamicModules.includes('countdown')) {
    import("./modules/countdown").then(function (countdown) {
        countdown.init();
    });
}

if (dynamicModules.includes('rsvp')) {
    import("./modules/rsvp").then(function (rsvp) {
        rsvp.init();
    });
}

if (dynamicModules.includes('login')) {
    import("./modules/login").then(function (login) {
        login.init();
    });
}

if (dynamicModules.includes('message')) {
    import("./modules/message").then(function (message) {
        message.init();
    });
}

if (dynamicModules.includes('gifting')) {
    import("./modules/gifting").then(function (gifting) {
        gifting.init();
    });
}

if (dynamicModules.includes('translate')) {
    import("./modules/translate").then(function (translate) {
        translate.init();
    });
}

if (dynamicModules.includes('homelink')) {
    import("./modules/homelink").then(function (homelink) {
        homelink.init();
    });
}

if (dynamicModules.includes('check-saved')) {
    const cookieValue = document.cookie
        .split('; ')
        .find((row) => row.startsWith('saved='))
        ?.split('=')[1];
    console.log(cookieValue)
    if (document.querySelector(`[data-id="${cookieValue}"]`)) {
        console.log('found');
        const rsvpButton = document.querySelector('.js-rsvp');
        const rsvpText = document.querySelector('.js-rsvp-text');
        rsvpButton?.innerHTML = rsvpButton?.innerHTML + "?";
        rsvpText?.innerHTML = rsvpText.dataset?.alt;
    }
}
