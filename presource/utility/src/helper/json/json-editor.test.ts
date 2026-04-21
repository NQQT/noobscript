import { jsonEditor } from './json-editor';

describe('How to use jsonEditor Configuration', () => {
    it('should able to analyse json data', () => {
        const json = jsonEditor({
            name: 'John',
            age: 45,
            children: {
                son: 'Luke'
            }
        });

        // Assigning Options to Name
        json.assign('name', {
            type: 'select',
            options: ['John', 'Jane', 'George']
        });

        json.assign('children.son', {
            type: 'radio',
            options: ['Luke', 'Han', 'Eric']
        });

        // Json Configuration
        expect(json()).toStrictEqual({
            // The json data goes here
            data: {
                name: 'John',
                age: 45,
                children: {
                    son: 'Luke'
                }
            },
            // Options Configuration
            options: {
                name: {
                    type: 'select',
                    options: ['John', 'Jane', 'George']
                },
                ['children.son']: {
                    type: 'radio',
                    options: ['Luke', 'Han', 'Eric']
                }
            }
        });
    });
});
