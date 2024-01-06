const sentence =
  "This    is   an   example    sentence    with unnecessary   whitespaces.";
const cleanSentence = sentence.replace(/\s+/g, " ");

console.log(cleanSentence);
