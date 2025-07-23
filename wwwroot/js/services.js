document.addEventListener('DOMContentLoaded', function() {
    // Modal handling
    const serviceButtons = document.querySelectorAll('.service-btn');
    const modals = document.querySelectorAll('.service-modal');
    const closeButtons = document.querySelectorAll('[data-modal-close]');

    // Open modal when clicking service button
    serviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceCard = this.closest('.service-card');
            const serviceType = serviceCard.getAttribute('data-service');
            const modal = document.getElementById(`${serviceType}Modal`);
            if (modal) {
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal when clicking close button or outside
    function closeModal(modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.service-modal');
            closeModal(modal);
        });
    });

    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this);
            }
        });
    });

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('show')) {
                    closeModal(modal);
                }
            });
        }
    });

    // Form handling
    const invitationForm = document.getElementById('invitationForm');
    const visaForm = document.getElementById('visaForm');
    const translatorForm = document.getElementById('translatorForm');

    // Invitation form
    if (invitationForm) {
        const customerTypeInputs = invitationForm.querySelectorAll('[name="customer_type"]');
        const priceSpan = document.getElementById('invitationPrice');

        customerTypeInputs.forEach(input => {
            input.addEventListener('change', function() {
                priceSpan.textContent = this.value === 'existing' ? '0' : '200';
            });
        });

        invitationForm.addEventListener('submit', handleFormSubmit);
    }

    // Visa form
    if (visaForm) {
        const serviceTierInputs = visaForm.querySelectorAll('[name="service_tier"]');
        const hasInvitationInputs = visaForm.querySelectorAll('[name="has_invitation"]');
        const invitationField = document.getElementById('visaInvitationField');
        const priceSpan = document.getElementById('visaPrice');

        serviceTierInputs.forEach(input => {
            input.addEventListener('change', function() {
                priceSpan.textContent = this.value === 'normal' ? '350' : '550';
            });
        });

        hasInvitationInputs.forEach(input => {
            input.addEventListener('change', function() {
                invitationField.style.display = this.value === 'yes' ? 'block' : 'none';
            });
        });

        visaForm.addEventListener('submit', handleFormSubmit);
    }

    // Translator form
    if (translatorForm) {
        const periodTypeInputs = translatorForm.querySelectorAll('[name="period_type"]');
        const daysInput = translatorForm.querySelector('input[type="number"]');
        const priceSpan = document.getElementById('translatorPrice');

        function updateTranslatorPrice() {
            const basePrice = document.querySelector('[name="period_type"]:checked').value === 'normal' ? 150 : 300;
            const days = parseInt(daysInput.value) || 1;
            priceSpan.textContent = basePrice * days;
        }

        periodTypeInputs.forEach(input => {
            input.addEventListener('change', updateTranslatorPrice);
        });

        daysInput.addEventListener('input', updateTranslatorPrice);
        translatorForm.addEventListener('submit', handleFormSubmit);
    }

    // Generic form submit handler
    function handleFormSubmit(e) {
        e.preventDefault();
        // Here you would typically send the form data to your server
        // For now, we'll just show a success message
        alert('تم إرسال طلبك بنجاح! سنتواصل معك قريباً.');
        const modal = this.closest('.service-modal');
        closeModal(modal);
        this.reset();
    }
}); 