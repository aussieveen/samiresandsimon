export function init() {
    console.log("HomeLink JS loaded");
    const homelinkButton = document.querySelector('.home__link__cta');

    homelinkButton.addEventListener('click', () => {
        disableDefault();
        history.back();
    });
}
console.log("HomeLink JS loaded");
