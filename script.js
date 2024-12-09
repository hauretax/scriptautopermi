
// Sélection du bouton et du message d'alerte
const buttonId = "ea-etape-recherche-creneau-bouton";
const alertSelector = "div[role='alert'] h3.fr-alert__title";
const alertMessage = "Aucun créneau n’est disponible sur ce département.";
let intervalClick, intervalSound;

// Fonction pour générer un bip sonore directement dans le navigateur
function playBeep() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'square'; // Type de son pour un effet bip
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // Fréquence en Hz (440 Hz est la note A)
    oscillator.connect(audioContext.destination);
    oscillator.start();
    setTimeout(() => {
        oscillator.stop();
        audioContext.close();
    }, 100); // Durée du bip en millisecondes (ici 100 ms)
}

// Fonction de vérification et de clic avec délai
function checkAndClick() {
    // Tente de cliquer sur le bouton
    const button = document.getElementById(buttonId);
    if (button) {
        button.click();
        console.log("Bouton cliqué !");
        
        // Attendre 5 secondes avant de vérifier le message d'alerte
        setTimeout(() => {
            const alertElement = document.querySelector(alertSelector);

            if (!alertElement) {
                // Si l'élément d'alerte n'est pas trouvé, un créneau est disponible
                console.log("Aucun message d'alerte détecté, un créneau est probablement disponible !");
                clearInterval(intervalClick);
                intervalSound = setInterval(playBeep, 1000); // Bip toutes les secondes
                return;
            }

            console.log(alertElement);
            console.log(alertElement.textContent);

            if (alertElement.textContent !== alertMessage) {
                // Si le message d'alerte est différent, arrêter les clics et démarrer les bips
                console.log("Message d'alerte différent, arrêt des clics et début des bips.");
                clearInterval(intervalClick);
                intervalSound = setInterval(playBeep, 1000); // Bip toutes les secondes
            }
        }, 5000); // Délai de 5 secondes pour laisser le contenu se charger
    } else {
        console.warn("Bouton non trouvé.");
    }
}

// Lancement du clic toutes les 5 minutes
intervalClick = setInterval(checkAndClick, 300000); // 5 minutes = 300000 ms
