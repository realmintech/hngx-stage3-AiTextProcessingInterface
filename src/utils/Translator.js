// Translator.js
class Translator {
  constructor() {
    this.isServiceAvailable = false;
    this.checkServiceAvailability();
  }

  async checkServiceAvailability() {
    try {
      if ("ai" in self && "translator" in self.ai) {
        await self.ai.translator.capabilities();
        this.isServiceAvailable = true;
        console.log("Translation service is available");
      } else {
        console.warn("Translator API is not available.");
        this.isServiceAvailable = false;
      }
    } catch (error) {
      console.error("Error initializing translation service:", error);
      this.isServiceAvailable = false;
    }
  }

  async translate(message, targetLanguage) {
    if (!this.isServiceAvailable) {
      console.warn("Translation service is not available.");
      return "Translation service not available.";
    }

    if (!targetLanguage || typeof targetLanguage !== "string") {
      console.error("Invalid target language:", targetLanguage);
      return "Error: Invalid target language.";
    }

    try {
      console.log(`Creating translator for: ${targetLanguage}`);

      const translator = await self.ai.translator.create({
        sourceLanguage: "en",
        targetLanguage: targetLanguage,
        monitor(m) {
          m.addEventListener("downloadprogress", (e) => {
            console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
          });
        },
      });

      console.log("Translator instance created successfully.");
      const translatedText  = await translator.translate(message);
      console.log(`Translation result: ${translatedText}`);
      return translatedText;
    } catch (error) {
      console.error("Translation failed:", error);
      return "Translation error.";
    }
  }
}

export default Translator;
