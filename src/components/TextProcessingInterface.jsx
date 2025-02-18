import React, { useState } from "react";
import { IoPaperPlane } from "react-icons/io5";

const TextProcessingInterface = () => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [language, setLanguage] = useState("en");

  // Function to detect language using AI Detector API (if available)
  const detectLanguageLocally = async (text) => {
    if (!("ai" in self) || !("languageDetector" in self.ai)) {
      console.warn("AI Language Detector API is not available.");
      return null; // Fallback to external API
    }

    try {
      const languageDetectorCapabilities =
        await self.ai.languageDetector.capabilities();
      const canDetect = languageDetectorCapabilities.capabilities;
      let detector;

      if (canDetect === "no") {
        return null; // Fallback if not usable
      }

      if (canDetect === "readily") {
        detector = await self.ai.languageDetector.create();
      } else {
        detector = await self.ai.languageDetector.create({
          monitor(m) {
            m.addEventListener("downloadprogress", (e) => {
              console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
            });
          },
        });
        await detector.ready;
      }

      const results = await detector.detect(text);
      return results.length > 0 ? results[0].detectedLanguage : "Unknown";
    } catch (error) {
      console.error("Error detecting language locally:", error);
      return null;
    }
  };

  // Function to send message
  const sendMessage = async () => {
    if (!inputText.trim()) {
      alert("Please enter some text.");
      return;
    }

    const newMessage = { text: inputText, language: "Detecting..." };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputText("");

    try {
      let detectedLanguage = await detectLanguageLocally(inputText);

      if (!detectedLanguage) {
        // If AI Language Detector is not available, use external API
        const response = await fetch(
          "https://chrome-ai-api-url/language-detect",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: inputText }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        detectedLanguage = data.language || "Unknown";
      }

      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.text === newMessage.text
            ? { ...msg, language: detectedLanguage }
            : msg
        )
      );
    } catch (error) {
      console.error("Error detecting language:", error);
      alert(
        "Failed to detect language. Please check your connection and try again."
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-xl font-semibold text-center mb-4">
          AI-Powered Text Processor
        </h1>

        <div className="space-y-4 overflow-y-auto max-h-96 p-4 border rounded-lg bg-gray-50">
          {messages.map((msg, index) => (
            <div key={index} className="p-2 bg-gray-200 rounded shadow">
              <p>{msg.text}</p>
              <small className="text-gray-600">Language: {msg.language}</small>
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="en">English</option>
            <option value="pt">Portuguese</option>
            <option value="es">Spanish</option>
            <option value="ru">Russian</option>
            <option value="tr">Turkish</option>
            <option value="fr">French</option>
          </select>
          <button className="bg-blue-500 text-white p-2 rounded">
            Translate
          </button>
        </div>

        <div className="mt-4 flex gap-2">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="border p-2 w-full rounded"
            placeholder="Enter text..."
          ></textarea>
          <button
            onClick={sendMessage}
            className="bg-green-500 text-white p-2 rounded"
          >
            <IoPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextProcessingInterface;
