import React, { useEffect, useState } from "react";
import { IoPaperPlane } from "react-icons/io5";
import Translator from "../utils/Translator";
import { summarizeText } from "../utils/Summarizer";
import BgImg from "../assets/whatsappBg.jpg";

const TextProcessingInterface = () => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [language, setLanguage] = useState("en");
  const [translator, setTranslator] = useState(null);

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

  const countWords = (text) =>
    text.trim() ? text.trim().split(/\s+/).length : 0;

  const sendMessage = () => {
    if (!inputText.trim()) {
      alert("Please enter some text.");
      return;
    }

    const newMessage = {
      originalText: inputText,
      originalLanguage: "English",
      wordCount: countWords(inputText),
      translatedText: null,
      translatedLanguage: null,
      summary: null,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputText("");
  };

  const handleTranslate = async () => {
    if (messages.length === 0) {
      alert("No messages to translate.");
      return;
    }

    const lastMessageIndex = 0;
    const lastMessage = messages[lastMessageIndex];

    if (!translator) {
      console.warn("Translator is not initialized yet.");
      return;
    }

    try {
      const translatedText = await translator.translate(
        lastMessage.originalText,
        language
      );
      setMessages((prevMessages) =>
        prevMessages.map((msg, index) =>
          index === lastMessageIndex
            ? { ...msg, translatedText, translatedLanguage: language }
            : msg
        )
      );
    } catch (error) {
      console.error("Translation failed:", error);
      alert("Translation failed.");
    }
  };

  const handleSummarize = async (index) => {
    const message = messages[index];
    if (!message || message.wordCount <= 150) return;

    const summary = await summarizeText(message.originalText);
    setMessages((prevMessages) =>
      prevMessages.map((msg, i) => (i === index ? { ...msg, summary } : msg))
    );
  };

  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${BgImg})` }}
    >
      <div className="flex-1 h-[calc(100vh-140px)] overflow-y-auto px-4 pt-8 pb-4">
        <h1 className="text-xl font-bold text-center shadow-lg rounded-lg my-4 py-4 bg-green-900 text-white">
          AI-Powered Text Processing Interface
        </h1>
        {messages.map((msg, index) => (
          <div
            key={index}
            className="mb-4 p-4 bg-white/35 backdrop-blur-lg rounded-lg shadow-lg"
          >
            <p className="font-semibold text-gray-900">
              Initial Text ({msg.originalLanguage}):
              <span className="text-blue-700"> {msg.originalText}</span>
            </p>
            <p className="text-gray-600 text-sm">
              Word Count: <span className="font-bold">{msg.wordCount}</span>
            </p>

            {msg.wordCount > 150 && !msg.summary && (
              <button
                className="mt-2 bg-green-900 text-white px-3 py-1 text-sm rounded-lg shadow cursor-pointer"
                onClick={() => handleSummarize(index)}
              >
                Summarize
              </button>
            )}

            {msg.summary && (
              <p className="font-semibold mt-2">
                Summary: <span className="text-red-700">{msg.summary}</span>
              </p>
            )}

            {msg.translatedText && (
              <p className="font-semibold mt-1">
                Translated Text ({msg.translatedLanguage}):{" "}
                <span className="text-green-700">{msg.translatedText}</span>
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-lg shadow-lg p-4">
        <div className="flex gap-2">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full border-0 p-2 rounded-lg bg-white shadow-sm"
          >
            <option value="en">English</option>
            <option value="pt">Portuguese</option>
            <option value="es">Spanish</option>
            <option value="ru">Russian</option>
            <option value="tr">Turkish</option>
            <option value="fr">French</option>
          </select>
          <button
            className="bg-green-900 text-white px-4 py-2 rounded-lg shadow cursor-pointer"
            onClick={handleTranslate}
          >
            Translate
          </button>
        </div>

        <div className="mt-4 flex gap-2">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="border-0 p-3 w-full rounded-lg bg-gray-50 shadow-lg focus:ring-2 focus:ring-blue-300"
            placeholder="Enter text..."
          ></textarea>
          <button
            onClick={sendMessage}
            className="bg-green-900 text-white px-4 py-2 rounded-lg shadow cursor-pointer"
          >
            <IoPaperPlane size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextProcessingInterface;
