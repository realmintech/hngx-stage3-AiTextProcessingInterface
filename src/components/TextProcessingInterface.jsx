import React, { useEffect, useState } from "react";
import { IoPaperPlane } from "react-icons/io5";
import Translator from "../components/Translator"; 

const TextProcessingInterface = () => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [language, setLanguage] = useState("en");
  const [translator, setTranslator] = useState(null);

  // Initialize Translator on Component Mount
  useEffect(() => {
    const initTranslator = async () => {
      try {
        const translatorInstance = new Translator();
        setTranslator(translatorInstance);
      } catch (error) {
        console.error("Failed to initialize translator:", error);
      }
    };
    initTranslator();
  }, []);
  const sendMessage = async () => {
    if (!inputText.trim()) {
      alert("Please enter some text.");
      return;
    }

    const newMessage = { text: inputText, language };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputText("");
  };

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      alert("Please enter some text to translate.");
      return;
    }

    if (!translator) {
      console.warn("Translator is not initialized yet.");
      return;
    }

    if (!language) {
      console.error("No target language selected.");
      alert("Please select a language.");
      return;
    }

    try {
      console.log(`Translating to: ${language}`);
      const translatedText = await translator.translate(inputText, language);
      setMessages((prev) => [...prev, { text: translatedText, language }]);
    } catch (error) {
      console.error("Translation failed:", error);
      alert("Translation failed.");
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
          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={handleTranslate}
          >
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
