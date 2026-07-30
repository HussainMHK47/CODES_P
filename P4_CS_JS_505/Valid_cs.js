document.addEventListener('DOMContentLoaded', function() {
    try {
        const form = document.getElementById('vehicleForm');
        const regInput = document.getElementById('regNumber');
        const errorDiv = document.getElementById('errorMessage');
        const successDiv = document.getElementById('successMessage');
        const rulesList = document.getElementById('rulesList');

        if (!form || !regInput || !errorDiv || !successDiv || !rulesList) {
            throw new Error("Required HTML elements are missing.");
        }

        
        const validationRules = [
            "Must not be <strong>empty</strong>.",
            "Exact length of <strong>10 characters</strong>.",
            "First 2 chars: <strong>Uppercase Letters</strong> (State Code).",
            "Next 2 chars: <strong>Digits</strong> (District Code).",
            "Next 2 chars: <strong>Uppercase Letters</strong> (Series).",
            "Last 4 chars: <strong>Digits</strong> (Vehicle Number)."
        ];

        function renderRules() {
            rulesList.innerHTML = '';
            validationRules.forEach(rule => {
                const li = document.createElement('li');
                li.innerHTML = rule;
                rulesList.appendChild(li);
            });
        }

        renderRules();

        form.addEventListener('submit', function(event) {
            try {
                event.preventDefault();
                const input = regInput.value.trim();
                const pattern = /^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/;

                errorDiv.style.display = 'none';
                successDiv.style.display = 'none';

                if (!input) {
                    showError("Field cannot be empty.");
                    return;
                }

                if (input.length !== 10) {
                    showError("Length must be exactly 10 characters.");
                    return;
                }

                if (pattern.test(input)) {
                    showSuccess("Valid Registration Number!");
                } else {
                    showError("Format mismatch. Please check the rules above.");
                }
            } catch (submitError) {
                console.error("Validation error:", submitError);
                showError("An unexpected error occurred.");
            }
        });

        regInput.addEventListener('input', function() {
            this.value = this.value.toUpperCase();
        });

        function showError(message) {
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
        }

        function showSuccess(message) {
            successDiv.textContent = message;
            successDiv.style.display = 'block';
        }

    } catch (initError) {
        console.error("Initialization failed:", initError);
        alert("Failed to load form validation.");
    }
});   