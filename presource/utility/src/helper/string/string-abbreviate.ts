// Standard String Abbreviation
export const stringAbbreviate = (input: string, delimiter = ' ') => {
    return (
        input
            // Breaking the string up by delimiter
            .split(delimiter)
            .map((word) => {
                if (!word.length) return '';
                // Return the word with uppercase
                return word[0].toUpperCase();
            })
            // Join with zero delimiter
            .join('')
    );
};
