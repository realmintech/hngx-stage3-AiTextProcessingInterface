const Summarizer = async() => {
  const options = {
  sharedContext: sharedContext,
  type: "key-points",
  format: "markdown",
  length: "medium",
};

const available = (await self.ai.summarizer.capabilities()).available;
let summarizer;
if (available === "no") {
  console.log("The Summarizer API isn't usable.");
  
  return;
}
if (available === "readily") {
   console.log("The Summarizer API can be used immediately .");
  summarizer = await self.ai.summarizer.create(options);
} else {
  console.log("The Summarizer API can be used after the model is downloaded.");
  
  summarizer = await self.ai.summarizer.create(options);
  summarizer.addEventListener("downloadprogress", (e) => {
    console.log(e.loaded, e.total);
  });
  await summarizer.ready;
}

let result = "";
let previousChunk = "";
for await (const chunk of stream) {
  const newChunk = chunk.startsWith(previousChunk)
    ? chunk.slice(previousChunk.length)
    : chunk;
  console.log(newChunk);
  result += newChunk;
  previousChunk = chunk;
}
console.log(result);

}
export default Summarizer;