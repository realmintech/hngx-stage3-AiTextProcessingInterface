# Text Processing Interface

## Overview
The **Text Processing Interface** is a web application that allows users to enter text, analyze word count, translate messages into different languages, and summarize long texts. The UI is inspired by chat applications, ensuring a seamless and interactive user experience.

## Features
- **Send Messages**: Users can enter text and send messages, which will be displayed in a chat-like interface.
- **Word Count**: Automatically counts the number of words in each message.
- **Text Translation**: Supports translation into multiple languages using the integrated `Translator` utility.
- **Summarization**: If a message exceeds 150 words, users can generate a summarized version of the text.
- **Scrollable Message Container**: The messages are displayed in a scrollable area, independent of the input field.
- **Fixed Input Section**: The input text area remains fixed at the bottom, ensuring easy access while scrolling messages.

## Technologies Used
- **React.js**: Frontend framework for building the UI.
- **Tailwind CSS**: For styling and responsiveness.
- **React Icons**: Used for UI icons (e.g., send button icon `IoPaperPlane`).
- **Custom Utilities**:
  - `Translator.js`: Handles text translation.
  - `Summarizer.js`: Processes text summaries.
- **Background Image**: A custom background enhances UI aesthetics.

## Installation & Setup
### Prerequisites
Ensure you have **Node.js** and **npm** installed on your machine.

### Steps
1. **Clone the repository**
   ```sh
   git clone https://github.com/realmintech/text-processing-interface.git
   cd text-processing-interface
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Run the development server**
   ```sh
   npm run dev
   ```
4. **Open in browser**
   Navigate to: `http://localhost:5173`

## File Structure
```
text-processing-interface/
│── src/
│   ├── components/
│   │   ├── TextProcessingInterface.jsx
│   ├── utils/
│   │   ├── Translator.js
│   │   ├── Summarizer.js
│   ├── assets/
│   │   ├── whatsappBg.jpg
│── public/
│── package.json
│── README.md
```

## How It Works
### Sending a Message
1. Enter text into the input field.
2. Click the **Send** button.
3. The message appears in the chat interface, displaying:
   - Original text
   - Word count

### Translating a Message
1. Select a language from the dropdown.
2. Click **Translate**.
3. The translated text appears below the original message.

### Summarizing a Message
1. If the word count **exceeds 150 words**, a **Summarize** button appears.
2. Clicking the button generates a summary of the text.

## Customization
- **Background Image**: Replace `whatsappBg.jpg` in `src/assets/` with your own image.
- **Styling**: Modify Tailwind classes in `TextProcessingInterface.jsx`.
- **Translation Languages**: Update language options in the `<select>` dropdown.

## Future Enhancements
- Add more languages for translation.
- Implement AI-based text summarization.
- Store messages using a backend database.
- Support for speech-to-text input.

## License
This project is open-source and available under the **MIT License**.

## Contact
For questions or contributions, reach out via GitHub or email `Adesinamariam7@gmail.com`.

