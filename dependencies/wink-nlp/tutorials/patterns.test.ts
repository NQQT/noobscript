import winkNLP from 'wink-nlp';
import model from 'wink-eng-lite-web-model';

describe('How to use patterns correctly', () => {
  it('should detect custom entity correctly', () => {
    // Extracting read Doc and Learn Custom Entities
    const { readDoc, learnCustomEntities } = winkNLP(model);

    // Sample Text
    const sample = `Apollo 11 was the spaceflight that first landed humans on the Moon. 
Commander Neil Armstrong and lunar module pilot Buzz Aldrin formed the 
American crew that landed the Apollo Lunar Module Eagle. The Lunar Module 
or LM-5 Eagle was manufactured by Grumman Corporation, which later merged
with Northrop Corporation in 1995 and became Northrop Grumman Corporation.`;

    // Definining some pattern to look for

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

    // Learning
    learnCustomEntities(patterns, { matchValue: false, useEntity: true, usePOS: true });

    // Should be able to find exactly 12 custom entities
    const result = readDoc(sample).customEntities().out();
    expect(result.length).toBe(12);
    // Matching all th result.
    expect(result).toStrictEqual([
      'Apollo 11',
      'Moon',
      'Commander Neil Armstrong',
      'lunar',
      'Buzz Aldrin',
      'American',
      'Apollo Lunar Module Eagle',
      'Lunar Module',
      'LM-5 Eagle',
      'Grumman Corporation',
      'Northrop Corporation',
      'Northrop Grumman Corporation',
    ]);
  });
});
