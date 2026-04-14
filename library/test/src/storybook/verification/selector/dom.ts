import { documentButton, documentNode, documentText } from './components';

// Global dom selector (design for easier visual testing)
export const $dom = {
    button: documentButton,
    // Selecting a document node
    node: documentNode,
    text: documentText
};
