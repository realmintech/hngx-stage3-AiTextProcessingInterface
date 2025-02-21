const options = {
  sharedContext: "This is a scientific article",
  type: "key-points",
  format: "markdown",
  length: "medium",
};

const initializeSummarizer = async () => {
  const available = (await self.ai.summarizer.capabilities()).available;

  if (available === "no") {
    console.warn("Summarizer API is not available.");
    return null;
  }

  let summarizer;
  if (available === "readily") {
    summarizer = await self.ai.summarizer.create(options);
  } else {
    summarizer = await self.ai.summarizer.create(options);
    summarizer.addEventListener("downloadprogress", (e) => {
      console.log(`Downloading model: ${e.loaded} / ${e.total}`);
    });
    await summarizer.ready;
  }

  return summarizer;
};

export const summarizeText = async (text) => {
  const summarizer = await initializeSummarizer();
  if (!summarizer) return "Summarization is not available.";

  try {
    return await summarizer.summarize(text);
  } catch (error) {
    console.error("Summarization failed:", error);
    return "Error: Summarization failed.";
  }
};
