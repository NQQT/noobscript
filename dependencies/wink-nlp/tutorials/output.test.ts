import winkNLP from 'wink-nlp';
import model from 'wink-eng-lite-web-model';

describe('how to use wink nlp outputs method', () => {
  it('should returns list of item', () => {
    const exampleText = 'Hello World🌎! How are you?';
    const { readDoc, its, as } = winkNLP(model);
    // Reading example text
    const doc = readDoc(exampleText);

    // getting natural sentences
    expect(doc.sentences().out()).toStrictEqual(['Hello World🌎!', 'How are you?']);

    console.log(doc.entities().out(its.detail));
    // Getting as type and frequency.
    expect(doc.tokens().out(its.type, as.freqTable)).toStrictEqual([
      ['word', 5],
      ['punctuation', 2],
      ['emoji', 1],
    ]);
  });
});
