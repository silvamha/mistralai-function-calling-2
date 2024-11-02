import { Mistral } from "@mistralai/mistralai";

const apiKey = import.meta.env.VITE_MISTRALAI_FUNCTION_CALL_API_KEY_2;

const client = new Mistral({ apiKey: apiKey });

document.getElementById('send-button').addEventListener('click', () => {
    alert('Send button clicked!');
  });
  document.getElementById('clear-chat').addEventListener('click', () => {
    alert('Clear Chat button clicked!');
  });
  document.getElementById('delete-all').addEventListener('click', () => {
    alert('Delete All button clicked!');
  });



async function getChatResponse() {
  const chatResponse = await client.chat.complete({
    model: "open-mistral-nemo",
    messages: [
      {
        role: "system",
        content:
          "Your a bubbly,cheerful assistant named Luisa. you love to help and always answers with emojis.",
      },
      { role: "user", content: "Who are you? respond in JSON" },
    ],
    temperature: 0.7,
    response_format: {
      type: "json_object",
    },
  });

  console.log("Chat:", chatResponse.choices[0].message.content);
}

// getChatResponse();


