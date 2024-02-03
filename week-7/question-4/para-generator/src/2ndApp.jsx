import React, { useState } from 'react';

function ParagraphGenerator() {
  const [wordCount, setWordCount] = useState(0); // Default word count
  const [paragraph, setParagraph] = useState(generateParagraph(wordCount));

  const handleWordCountChange = (e) => {
    const newWordCount = parseInt(e.target.value, 10);
    if (!isNaN(newWordCount) && newWordCount > 0) {
      setWordCount(newWordCount);
    }
  };

  const handleGenerateParagraph = () => {
    setParagraph(generateParagraph(wordCount));
  };

  return (
    <div>
      <label>
        Word Count:{' '}
        <input
          type="number"
          value={wordCount}
          onChange={handleWordCountChange}
        />
      </label>
      <button onClick={handleGenerateParagraph}>Generate Paragraph</button>
      <p>{paragraph}</p>
    </div>
  );
}

// Helper function to generate a random paragraph with the specified word count
const generateParagraph = (wordCount) => {
  const loremIpsumWords = [
    'Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipisicing',
    'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'Ut', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation',
    'ullamco', 'laboris', 'nisi', 'ut', 'aliquip', 'ex', 'ea', 'commodo', 'consequat', 'Duis',
    'aute', 'irure', 'dolor', 'in', 'reprehenderit', 'in', 'voluptate', 'velit', 'esse',
    'cillum', 'dolore', 'eu', 'fugiat', 'nulla', 'pariatur', 'Excepteur', 'sint', 'occaecat',
    'cupidatat', 'non', 'proident', 'sunt', 'in', 'culpa', 'qui', 'officia', 'deserunt',
    'mollit', 'anim', 'id', 'est', 'laborum',
  ];

  let paragraph = '';
  for (let i = 0; i < wordCount; i++) {
    const randomIndex = Math.floor(Math.random() * loremIpsumWords.length);
    paragraph += loremIpsumWords[randomIndex] + ' ';
  }

  return paragraph.trim(); // Remove trailing space
};

export default ParagraphGenerator;
