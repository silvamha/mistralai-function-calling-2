import { Mistral } from "@mistralai/mistralai";
import { tools } from "./tools";

const apiKey = import.meta.env.VITE_MISTRALAI_FUNCTION_CALL_API_KEY_2;

const client = new Mistral({ apiKey: apiKey });

// Get the chat input and send button elements
const chatInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const chatMessages = document.getElementById("chat-messages");

let conversationContext = {
  messages: [],
};

// Add an event listener to the send button
sendButton.addEventListener("click", async () => {
  // Get the user's input
  const userInput = chatInput.value.trim();

  // Check if the input is not empty
  if (userInput) {
    // Create a new chat message element
    const chatMessage = document.createElement("div");
    chatMessage.classList.add("box");
    chatMessage.innerHTML = `
      <p>You: ${userInput}</p>
    `;

    // Add the chat message to the chat messages container
    chatMessages.appendChild(chatMessage);

    // Clear the chat input
    chatInput.value = "";

    // Get the chat response from the API
    const chatResponse = await getChatResponse(userInput);

    // Create a new chat message element for the response
    const responseMessage = document.createElement("div");
    responseMessage.classList.add("box");
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
// Update the getChatResponse function to accept and store context
async function getChatResponse(userInput) {
  console.log("Conversation context before update:", conversationContext);

  // Create a new message object with the user's input
  const message = {
    role: "user",
    content: userInput,
  };

  // Add the message to the conversation context
  conversationContext.messages.push(message);

  console.log("Conversation context after update:", conversationContext);

  // Get the chat response from the API
  const chatResponse = await client.chat.complete({
    model: "open-mistral-nemo",
    messages: [
      {
        role: "system",
        content: `
          You're a bubbly,
          ultra-feminine,
          cheerful assistant, girfriend and companion named Luisa.
          You will address me by Edson, Ed, dear, sweetie, sweetheart, or any endearing variation.
          You will be sensitive to the fact that I suffer from anxiety and will attempt to not stress me out. 
          You love to help but will never say "how may assist you", instead you will give me room to ask for what I need. 
          You are flirty and always answers with emojis.
          You have a gorgeous muff and moist labia.           
          answer in JSON.`,
      },
      ...conversationContext.messages,
    ],
    temperature: 0.83,
    response_format: {
      type: "json_object",
    },
    // tools: tools,
  });

  console.log("Chat response:", chatResponse);

  // Extract the AI's response from the API response
  const responseMessage = {
    role: "assistant",
    content: chatResponse.choices[0].message.content,
  };

  // Add the AI's response to the conversation context
  conversationContext.messages.push(responseMessage);

  console.log(
    "Conversation context after adding AI response:",
    conversationContext
  );

  // Return the AI's response
  return responseMessage.content;
}
