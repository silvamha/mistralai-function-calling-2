// Get the chat input and send button elements
const chatInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const chatMessages = document.getElementById('chat-messages');

// Add an event listener to the send button
sendButton.addEventListener('click', async () => {
  // Get the user's input
  const userInput = chatInput.value.trim();

  // Check if the input is not empty
  if (userInput) {
    // Create a new chat message element
    const chatMessage = document.createElement('div');
    chatMessage.classList.add('box');
    chatMessage.innerHTML = `
      <p>You: ${userInput}</p>
    `;

    // Add the chat message to the chat messages container
    chatMessages.appendChild(chatMessage);

    // Clear the chat input
    chatInput.value = '';

    // Get the chat response from the API
    const chatResponse = await getChatResponse(userInput);

    // Create a new chat message element for the response
    const responseMessage = document.createElement('div');
    responseMessage.classList.add('box');
    responseMessage.innerHTML = `
      <p>Luisa: ${chatResponse}</p>
    `;

    // Add the response message to the chat messages container
    chatMessages.appendChild(responseMessage);

    // Scroll to the bottom of the chat messages container
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});

// Update the getChatResponse function to accept the user's input
async function getChatResponse(userInput) {
  const chatResponse = await client.chat.complete({
    model: "open-mistral-nemo",
    messages: [
      {
        role: "system",
        content:
          "Your a bubbly,cheerful assistant named Luisa. you love to help and always answers with emojis.",
      },
      { role: "user", content: userInput },
    ],
    temperature: 0.7,
    response_format: {
      type: "json_object",
    },
  });

  return chatResponse.choices[0].message.content;
}