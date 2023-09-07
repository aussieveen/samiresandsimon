import { hide, show } from '../utils';

export function init() {
    const messageForm = document.querySelector('.js-message-form');
    const messageSubmit = document.querySelector('.js-message-submit');
    const messageError = document.querySelector('.js-message-error');
    const originalButtonText = messageSubmit.innerHTML;

    messageForm.addEventListener('submit', (event) => {
        event.preventDefault();

        hide(messageError);

        const currentUrl = window.location.href;
        let lang = '';
        if(currentUrl.includes('/pt/')){
            lang = 'pt/';
            messageSubmit.innerHTML = "Enviando...";
        }else{
            messageSubmit.innerHTML = "Sending...";
        }

        const formData = new FormData(messageForm);
        const plainFormData = Object.fromEntries(formData.entries());
    
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(plainFormData),
        };

        fetch('/.netlify/functions/message', fetchOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.success === true) {
                    window.location.replace(messageForm.action + lang);
                } else {
                    show(messageError);
                }
                messageSubmit.innerHTML = originalButtonText;
            })
            .catch((error) => {
                show(messageError);
                messageSubmit.innerHTML = originalButtonText;
            });
    });
}
