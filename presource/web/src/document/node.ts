// Returns the list of documemt nodes ancestors
export const documentNodeAncestors = (documentNode: HTMLElement) => {
    const ancestors: HTMLElement[] = [];
    while (documentNode) {
        ancestors.push(documentNode);
        documentNode = documentNode.parentNode as HTMLElement;
    }
    return ancestors;
};
