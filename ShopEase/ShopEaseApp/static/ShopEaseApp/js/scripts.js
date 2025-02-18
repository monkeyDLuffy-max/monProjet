// ShopEase/ShopEaseApp/static/ShopEaseApp/js/scripts.js

document.addEventListener('DOMContentLoaded', function () {
    console.log('Page chargée !');

    // Exemple : Ajouter un effet au survol des boutons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.05)';
            button.style.transition = 'transform 0.2s ease';
        });
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });
    });

    // Exemple : Afficher une alerte lors du clic sur un lien de la navbar
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            alert(`Vous allez être redirigé vers : ${link.textContent}`);
            window.location.href = link.href; // Redirection réelle
        });
    });
});