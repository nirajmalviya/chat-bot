document.getElementById("send-btn").addEventListener("click", async () => {
    const userInput = document.getElementById("user-input").value;
    if (!userInput) return;
  
    // Append user message to chat
    const chatMessages = document.getElementById("chat-messages");
    const userMessage = document.createElement("div");
    userMessage.className = "message user-message";
    userMessage.textContent = userInput;
    chatMessages.appendChild(userMessage);
  
    // Clear input field
    document.getElementById("user-input").value = "";
  
    // Call API to get bot response
    try {
      const response = await fetch("https://your-backend.onrender.com/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userInput }),
      });
  
      const data = await response.json();
  
      // Append bot response to chat
      const botMessage = document.createElement("div");
      botMessage.className = "message bot-message";
      botMessage.textContent = data.response;
      chatMessages.appendChild(botMessage);
  
      // Scroll to the bottom of chat
      chatMessages.scrollTop = chatMessages.scrollHeight;
    } catch (error) {
      console.error("Error:", error);
    }
  });
  
