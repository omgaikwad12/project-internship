document.addEventListener('DOMContentLoaded', () => {
    // Get all 'Learn More' buttons
    const learnMoreButtons = document.querySelectorAll('.btn-learn-more');
    
    // Get all modals
    const modals = document.querySelectorAll('.modal');

    // Function to open a modal
    const openModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('show');
            // Close modal if escape key is pressed
            document.addEventListener('keydown', handleEscKey);
        }
    };

    // Function to close a modal
    const closeModal = (modal) => {
        if (modal) {
            modal.classList.remove('show');
            document.removeEventListener('keydown', handleEscKey);
        }
    };

    // Function to handle Escape key press
    const handleEscKey = (event) => {
        if (event.key === 'Escape') {
            const openModal = document.querySelector('.modal.show');
            if (openModal) {
                closeModal(openModal);
            }
        }
    };

    // Add click event to each 'Learn More' button
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', () => {
            const plantName = button.getAttribute('data-plant');
            openModal(`${plantName}-modal`);
        });
    });

    // Add click event to all modals for closing
    modals.forEach(modal => {
        // Find the close button inside the modal
        const closeButton = modal.querySelector('.close-button');
        
        // Close when the 'x' button is clicked
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                closeModal(modal);
            });
        }

        // Close when the background is clicked
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal(modal);
            }
        });
    });
});
