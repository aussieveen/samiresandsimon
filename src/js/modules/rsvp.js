import { hide, show, disable, enable } from '../utils';

export function init() {
    const rsvpSelectsSelector = '.js-rsvp-select input';
    const mealSelectSelector = '.js-meal-select input';
    const guestInlineName = '.js-name-inline';
    const rsvpForm = document.querySelector('.js-rsvp-form');
    const continueButton = document.querySelector('.js-continue');
    const mealChoiceSection = document.querySelector('.js-meal-choices');
    const mealChoiceHeader = document.querySelector('.js-meal-choice-header');
    const rsvpSelects = document.querySelectorAll(rsvpSelectsSelector);
    const mealSelects = document.querySelectorAll(mealSelectSelector);
    const confirmButton = document.querySelector('.js-confirm');
    const rsvpValidation = document.querySelector('.js-validation-1');
    const guestValidation = document.querySelector('.js-validation-2');
    const mealValidation = document.querySelector('.js-validation-3');
    const rsvpError = document.querySelector('.js-rsvp-error');
    const continuePress = false;
    const guestSelectSelector = '.js-guest-select input[value$="-yes"]:checked';
    const guestName = document.querySelector('.js-guest-name');
    const guestNameInput = document.querySelector('.js-guest-name-input');

    const state = {
        guestCount: 0,
        checkedCount: 0,
        acceptedCount: 0,
    };

    const setState = (key, value) => {
        state[key] = value;
        return state[key];
    };

    const updateGuestCount = () => {
        return setState('guestCount', [...new Set([...rsvpSelects].map((el) => el.name))].length);
    };

    const updateCheckedCount = () => {
        const checkedRsvps = document.querySelectorAll(`${rsvpSelectsSelector}:checked`);
        return setState('checkedCount', checkedRsvps.length);
    };

    const updateAcceptedCount = () => {
        const acceptedRsvps = document.querySelectorAll(`${rsvpSelectsSelector}[value$="-yes"]:checked`);
        return setState('acceptedCount', acceptedRsvps.length);
    };

    const checkRsvpCount = () => {
        return state.checkedCount == state.guestCount;
    };

    // Set inline text with new guest name
    const setGuestName = (event) => {
        document.querySelector(`${guestInlineName}[data-id="${guestNameInput.id}"]`)?.innerHTML = event.target.value;
        return setState('guestName', event.target.value);
    };

    const validateGuestName = () => {
        return state.guestName && state.guestName !== '';
    };

    const checkPlus1Available = () => {
        const guestSelect = document.querySelectorAll(`.js-rsvp-select:not(.js-guest-select) input[value$="-yes"]:checked`).length
        return guestSelect === 1;
    };

    const checkPlus1Selected = () => {
        const guestSelect = document.querySelector(guestSelectSelector);
        if (guestSelect) {
            return true;
        }
        return false;
    };

    const showPlus1Select = (plus1Available) => {
        const guestSelect = document.querySelector('.js-guest-select');
        if (plus1Available) {
            show(guestSelect);
        } else {
            hide(guestSelect);
            hide(guestName);
        }
    };

    const checkGuests = () => {
        const validState = false;

        const plus1Available = checkPlus1Available();
        const plus1Selected = checkPlus1Selected();

        showPlus1Select(plus1Available);

        if (plus1Selected){
            show(guestName);
            validState = validateGuestName();
        } else {
            hide(guestName);
            validState = true;
        }
        
        return validState;
    };

    const validateRsvps = () => {
        updateGuestCount();
        updateCheckedCount();
        updateAcceptedCount();

        const validGuests = checkGuests();
        const validRsvps = checkRsvpCount();
        
        hide(rsvpValidation);
        hide(guestValidation);
        
        if (validGuests && validRsvps) {
            enable(continueButton);
        } else {
            disable(continueButton);
            if(!validGuests) {
                show(guestValidation);
            } else {
                show(rsvpValidation);
            }
            continuePress = false;
            show(continueButton);
            hide(mealChoiceSection);
        }

        checkVisibleMealChoices();
    };

    const checkVisibleMealChoices = () => {
        let selectedCount = 0;
        [...new Set([...rsvpSelects].map((el) => el.name))].forEach((select) => {
            document.querySelectorAll(`[name="${select}"]:checked`).forEach((input) => {
                selectedCount++;
                if(input.value.includes('yes')) {
                    show(document.querySelector(`.js-meal-${select}`));
                } else {
                    hide(document.querySelector(`.js-meal-${select}`));
                }
            });
            
            if (state.acceptedCount == 0 && checkRsvpCount()) {
                hide(mealChoiceHeader);
            } else {
                show(mealChoiceHeader);
            }

            if (continuePress === false && state.acceptedCount == 0 && checkRsvpCount()) {
                hide(continueButton);
                show(mealChoiceSection);
            } else if (continuePress === false) {
                show(continueButton);
                hide(mealChoiceSection);    
            } else if (continuePress) {
                show(mealChoiceSection);
            }
        });
        validateMealChoices();
    }

    const validateMealChoices = () => {
        const selectedCount = 0;
        disable(confirmButton);
        show(mealValidation);
        
        document.querySelectorAll(`${rsvpSelectsSelector}[value$="-yes"]:checked`).forEach((select) => {
            if (document.querySelector(`[name="${select.name.replace('attend', 'meal')}"]:checked`)) selectedCount++;
        });

        if (selectedCount == state.acceptedCount || mealSelects.length === 0) {
            enable(confirmButton); 
            hide(mealValidation);
        }
    }

    const continueButtonClick = () => {
        continuePress = true;
        hide(continueButton);
        show(mealChoiceSection);
    };

    const showFormError = () => {
        hide(mealValidation);
        show(rsvpError);
        confirmButton.innerHTML = confirmButton.dataset.originalText;
    };

    const rsvpSubmit = (event) => {
        event.preventDefault();
    
        hide(rsvpError);

        confirmButton.dataset.originalText = confirmButton.innerHTML;
        confirmButton.innerHTML = "Checking...";

        const formData = new FormData(rsvpForm);
        const plainFormData = Object.fromEntries(formData.entries());
    
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(plainFormData),
        };

        fetch('/.netlify/functions/rsvp', fetchOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.success === true && data.type) {
                    window.location.replace(`/${data.inviteCode}/thank-you/${data.type}/`); 
                } else {
                    showFormError();
                }
            })
            .catch((error) => {
                showFormError();
                console.error(error);
            });
    };
    
    const setEventHandlers = () => {
        // show continue button
        rsvpSelects.forEach((select) => {
            select?.addEventListener('mousedown', validateRsvps);
            select?.addEventListener('change', validateRsvps);
        }); 

        guestNameInput?.addEventListener('keyup', setGuestName);
        guestNameInput?.addEventListener('change', setGuestName);

        guestNameInput?.addEventListener('keyup', validateRsvps);
        guestNameInput?.addEventListener('change', validateRsvps);
        
        // show meal choice section on press of continue button
        continueButton?.addEventListener('click', continueButtonClick);

        // show confirm button
        mealSelects.forEach((select) => {
            select?.addEventListener('mousedown', validateMealChoices);
            select?.addEventListener('change', validateMealChoices);
        }); 

        rsvpForm?.addEventListener('submit', rsvpSubmit);
    };

    validateRsvps();
    setEventHandlers();
}