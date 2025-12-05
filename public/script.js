// Fonction pour l'envoi du formulaire de réinitialisation
function handleResetPassword(event) {
    event.preventDefault();
    const emailInput = event.target.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    
    if (!email) {
        alert('Veuillez entrer votre adresse email');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Veuillez entrer une adresse email valide');
        return;
    }
    
    // Simulation de l'envoi
    const button = event.target.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    button.textContent = 'Envoi en cours...';
    button.disabled = true;
    
    setTimeout(() => {
        alert('Un lien de réinitialisation a été envoyé à ' + email + '\n\nVérifiez votre boîte mail. Le lien sera valide pendant 1 heure.');
        button.textContent = originalText;
        button.disabled = false;
        emailInput.value = '';
    }, 1500);
}

// Fonction pour l'envoi du message de contact
function handleContactForm(event) {
    event.preventDefault();
    const form = event.target;
    const message = form.querySelector('textarea').value.trim();
    const email = form.querySelector('input[type="email"]').value.trim();
    
    if (!message) {
        alert('Veuillez entrer votre message');
        return;
    }
    
    if (!email) {
        alert('Veuillez entrer votre adresse email');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Veuillez entrer une adresse email valide');
        return;
    }
    
    // Simulation de l'envoi
    const button = form.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    button.textContent = 'Envoi en cours...';
    button.disabled = true;
    
    setTimeout(() => {
        alert('Votre message a été envoyé avec succès !\n\nNous vous répondrons dans moins de 5 minutes pendant les heures d\'ouverture.');
        button.textContent = originalText;
        button.disabled = false;
        form.reset();
    }, 1500);
}

// Fonction de validation d'email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Fonction pour afficher le badge en plein écran
function showBadgeFullscreen() {
    const badgeCard = document.querySelector('.bg-white.rounded-lg.shadow-lg');
    if (!badgeCard) return;
    
    // Créer un conteneur plein écran
    const fullscreenContainer = document.createElement('div');
    fullscreenContainer.id = 'fullscreen-badge';
    fullscreenContainer.className = 'fixed inset-0 bg-white z-50 flex items-center justify-center p-4 overflow-auto';
    fullscreenContainer.innerHTML = `
        <div class="max-w-2xl w-full">
            ${badgeCard.innerHTML}
            <button onclick="closeFullscreen()" class="mt-4 w-full bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors">
                Fermer
            </button>
        </div>
    `;
    
    document.body.appendChild(fullscreenContainer);
    document.body.style.overflow = 'hidden';
}

// Fonction pour fermer le plein écran
function closeFullscreen() {
    const fullscreenContainer = document.getElementById('fullscreen-badge');
    if (fullscreenContainer) {
        fullscreenContainer.remove();
        document.body.style.overflow = '';
    }
}

// Fermer avec la touche Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeFullscreen();
    }
});

// Fonction pour télécharger uniquement le QR code en PDF
function downloadBadgePDF(event) {
    const qrCodeContainer = document.getElementById('qrCodeContainer');
    if (!qrCodeContainer) {
        alert('Erreur : QR Code introuvable');
        return;
    }
    
    // Créer un canvas pour le PDF
    const button = event.target.closest('button');
    const originalText = button.innerHTML;
    button.innerHTML = '<span>Téléchargement...</span>';
    button.disabled = true;
    
    // Utiliser html2canvas et jsPDF pour créer le PDF
    if (typeof html2canvas === 'undefined' || typeof window.jspdf === 'undefined') {
        alert('Erreur : Bibliothèques de génération PDF non disponibles');
        button.innerHTML = originalText;
        button.disabled = false;
        return;
    }
    
    html2canvas(qrCodeContainer, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: qrCodeContainer.offsetWidth,
        height: qrCodeContainer.offsetHeight
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        // Centrer le QR code sur la page
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = 80; // Taille du QR code en mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        // Centrer horizontalement et verticalement
        const x = (pageWidth - imgWidth) / 2;
        const y = (pageHeight - imgHeight) / 2;
        
        pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
        pdf.save('qr-code-badge.pdf');
        
        button.innerHTML = originalText;
        button.disabled = false;
        alert('QR Code téléchargé avec succès !');
    }).catch(error => {
        console.error('Erreur lors de la génération du PDF:', error);
        alert('Erreur lors de la génération du PDF');
        button.innerHTML = originalText;
        button.disabled = false;
    });
}


// Initialisation quand le DOM est chargé
document.addEventListener('DOMContentLoaded', function() {
    // Formulaire de réinitialisation
    const resetForm = document.getElementById('resetForm');
    if (resetForm) {
        resetForm.addEventListener('submit', handleResetPassword);
    }
    
    // Formulaire de contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Bouton plein écran
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', showBadgeFullscreen);
    }
    
    // Bouton télécharger PDF
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(event) {
            event.preventDefault();
            downloadBadgePDF(event);
        });
    }
});

