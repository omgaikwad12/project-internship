document.addEventListener('DOMContentLoaded', () => {
    // =============================
    // MODAL HANDLING
    // =============================

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
        const closeButton = modal.querySelector('.close-button');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                closeModal(modal);
            });
        }
    });

    // =============================
    // FEEDBACK FORM HANDLING
    // =============================

    const feedbackForm = document.querySelector("form"); // your footer form
    if (feedbackForm) {
        feedbackForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            // Collect input values
            const email = feedbackForm.querySelector("input[type='text'], input[type='email']").value;
            const message = feedbackForm.querySelector("textarea").value;

            if (!email || !message) {
                alert("⚠️ Please fill in both email and message.");
                return;
            }

            try {
                const res = await fetch("http://localhost:5501/api/feedback", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, message }),
                });

                const data = await res.json();

                if (res.ok) {
                    alert("✅ Feedback sent successfully!");
                    feedbackForm.reset(); // clear the form
                } else {
                    alert("❌ Error: " + (data.message || "Something went wrong"));
                }
            } catch (err) {
                console.error("Error submitting feedback:", err);
                alert("⚠️ Unable to send feedback. Check backend.");
            }
        });
    }
});
