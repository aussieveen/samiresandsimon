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