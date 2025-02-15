document.addEventListener('DOMContentLoaded', function() {
    emailjs.init('1_9lrPS1IktYIG7UD'); // Ensure this is your correct EmailJS user ID

    const btn = document.getElementById('button');
    const responseMessage = document.getElementById('responseMessage');
    const notification = document.getElementById('notification');
    const loadingSpinner = document.getElementById('loadingSpinner');

    // Function to validate name (only letters and spaces)
    function validateName(name) {
        const regex = /^[A-Za-z\s]+$/; // Only allows letters and spaces
        return regex.test(name);
    }

    // Function to validate email format
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation
        return regex.test(email);
    }

    // Function to update character count
    window.updateCharCount = function(inputId, countId) {
        const input = document.getElementById(inputId);
        const countDisplay = document.getElementById(countId);
        countDisplay.textContent = `${input.value.length}/${input.maxLength}`;
    };

    // Function to handle form submission
    document.getElementById('form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const name = document.getElementById('nameID').value;
        const email = document.getElementById('emailID').value;

        // Clear previous error messages
        document.getElementById('nameError').textContent = '';
        document.getElementById('emailError').textContent = '';
        responseMessage.textContent = '';

        // Validate name
        if (!validateName(name)) {
            document.getElementById('nameError').textContent = 'Name can only contain letters and spaces.';
            return; // Prevent form submission
        }

        // Validate email
        if (!validateEmail(email)) {
            document.getElementById('emailError').textContent = 'Please enter a valid email address.';
            return; // Prevent form submission
        }

        // Show email preview
        const emailPreview = `<p>Preview:</p><p>Name: ${name}</p><p>Email: ${email}</p>`;
        const emailPreviewElement = document.getElementById('emailPreview');
        emailPreviewElement.innerHTML = emailPreview;
        emailPreviewElement.style.display = 'block';
        emailPreviewElement.classList.add('fade-in'); // Add fade-in animation

        // Confirm submission
        if (confirm("Do you want to send this email?")) {
            btn.value = 'Sending...'; // Change button text to indicate sending
            loadingSpinner.style.display = 'block'; // Show loading spinner

            const serviceID = 'service_w5jjxj8'; // Replace with your service ID
            const templateID = 'template_lt7sihh'; // Replace with your template ID

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    // Hide loading spinner immediately after sending
                    loadingSpinner.style.display = 'none'; // Hide spinner

                    // Trigger swipe animation
                    notification.classList.add('swipe-in');

                    // Show notification
                    notification.textContent = 'Email has been sent!';
                    notification.style.opacity = 1;

                    // Clear the form fields
                    document.getElementById('form').reset();

                    // Fade out notification after 3 seconds
                    setTimeout(() => {
                        notification.style.opacity = 0;
                        notification.classList.remove('swipe-in'); // Remove swipe class for next use
                    }, 3000);

                    // Show success message
                    responseMessage.textContent = 'Email sent successfully!';
                    responseMessage.className = 'response-message success fade-in'; // Add fade-in animation
                    responseMessage.style.opacity = 1;

                    // Fade out response message after 3 seconds
                    setTimeout(() => {
                        responseMessage.style.opacity = 0;
                    }, 3000);

                    // Reset button text after sending
                    btn.value = 'Send Email'; // Reset button text

                    // Log message to console
                    console.log('Thanks for your info, loser'); // Console log message

                    // Reset email preview after 5 seconds
                    setTimeout(() ```javascript
                    () => {
                        emailPreviewElement.style.display = 'none'; // Hide email preview
                    }, 5000);
                }, (err) => {
                    // Reset button text in case of error
                    btn.value = 'Send Email'; // Reset button text
                    loadingSpinner.style.display = 'none'; // Hide spinner
                    responseMessage.textContent = 'Failed to send the email. Please try again later.'; // Show error message
                    responseMessage.className = 'response-message error fade-in'; // Add fade-in animation
                    responseMessage.style.opacity = 1; // Make error message visible
                });
        }
    });
});
