import winkNLP from 'wink-nlp';

describe('how to use wink', () => {
  it('should load and response correctly', () => {
    // Load english language model — light version.
    const model = require('wink-eng-lite-web-model');
    // Instantiate wink-nlp.
    const { readDoc, learnCustomEntities } = winkNLP(model);

    // Code for Hello World!
    const text = `Apollo 11 was the spaceflight that first landed humans on the Moon. 
Commander Neil Armstrong and lunar module pilot Buzz Aldrin formed the 
American crew that landed the Apollo Lunar Module Eagle. The Lunar Module 
or LM-5 Eagle was manufactured by Grumman Corporation, which later merged
with Northrop Corporation in 1995 and became Northrop Grumman Corporation.`;

    const patterns = [
      {
        name: 'nounPhrase',
        patterns: ['[PROPN] [|PROPN] [|PROPN] [|PROPN]'],
      },
      {
        name: 'nounPhrase',
        patterns: ['[PROPN] [ADJ|PROPN] [|PROPN] [|PROPN]'],
      },
      {
        name: 'nounPhrase',
        patterns: ['[PROPN|ADJ] [PROPN]'],
      },
      {
        name: 'nounPhrase',
        patterns: ['[PROPN] [CARDINAL]'],
      },
      {
        name: 'simpleADJ',
        patterns: ['[ADJ]'],
      },
    ];

    const patternCount = learnCustomEntities(patterns, { matchValue: false, useEntity: true, usePOS: true });
    const doc = readDoc(text);
    console.log(doc.customEntities().out());
    // -> Hello   World!
  });
});
