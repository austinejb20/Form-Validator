const form = document.getElementById("registration-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

// Optional: live email validation
email.addEventListener("input", () => checkEmail(email));

form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Check required fields first
    const isRequiredValid = checkRequired([username, email, password, confirmPassword]);

    let isFormValid = isRequiredValid;

    if (isFormValid) {
        const isUsernameValid = checkLength(username, 3, 15);
        const isEmailValid = checkEmail(email);
        const isPasswordValid = checkLength(password, 6, 25);
        const isPasswordsMatch = checkPasswordsMatch(password, confirmPassword);

        // Correctly update outer isFormValid
        isFormValid = isUsernameValid && isEmailValid && isPasswordValid && isPasswordsMatch;
    }

    if (isFormValid) {
        alert("Registration successful!");
        form.reset();

        document.querySelectorAll(".form-group").forEach(group => {
            group.className = "form-group";
        });
    }
});


// Check required
function checkRequired(inputs) {
    let valid = true;
    inputs.forEach(input => {
        if (input.value.trim() === "") {
            showError(input, `${formatFieldName(input)} is required`);
            valid = false;
        } else {
            showSuccess(input);
        }
    });
    return valid;
}

// Check length
function checkLength(input, min, max) {
    if (input.value.trim().length < min) {
        showError(input, `${formatFieldName(input)} must be at least ${min} characters`);
        return false;
    } else if (input.value.trim().length > max) {
        showError(input, `${formatFieldName(input)} must be less than ${max} characters`);
        return false;
    } else {
        showSuccess(input);
        return true;
    }
}

// Check email
function checkEmail(email) {
    // Basic email regex ending with .com or .org
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|org)$/i;

    if (emailRegex.test(email.value.trim())) {
        showSuccess(email);
        return true;
    } else {
        showError(email, "Email is not valid");
        return false;
    }
}

// Check password match
function checkPasswordsMatch(pw1, pw2) {
    if (pw1.value !== pw2.value) {
        showError(pw2, "Passwords do not match");
        return false;
    } else {
        showSuccess(pw2);
        return true;
    }
}

// Capitalize field name
function formatFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Show error
function showError(input, message) {
    const formGroup = input.parentElement;
    formGroup.className = "form-group error";
    const small = formGroup.querySelector("small");
    small.innerText = message;
}

function showSuccess(input) {
    const formGroup = input.parentElement;
    formGroup.className = "form-group success";
}
