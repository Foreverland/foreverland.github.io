document
  .getElementById("subscribe-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Simple email validation
    if (!emailRegex.test(email)) {
      document.getElementById("response-message").innerText =
        "Please enter a valid email.";
      return;
    }

    // Optimistically update UI to give feedback quickly
    document.getElementById("response-message").innerText = "Processing...";

    // Send the email to the backend (AWS Lambda via API Gateway)
    try {
      const response = await fetch(
        "https://9vpx1a5sb3.execute-api.eu-north-1.amazonaws.com/prod/subscribe",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        document.getElementById("response-message").innerText =
          "Subscription successful!";
      } else {
        document.getElementById("response-message").innerText =
          "Error: " + result.message;
      }
    } catch (error) {
      document.getElementById("response-message").innerText =
        "Failed to connect to server.";
    }
  });
