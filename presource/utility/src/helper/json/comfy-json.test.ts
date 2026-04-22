import { comfyJson } from './comfy-json';

describe('how to use comfyJson Configuration', () => {
    it('should able to generate a proper object', () => {
        // Modifying the json configuration
        json('CLIP Text Encode (Positive Prompt)').inputs('text', 'input changed');

        // We just changed the input
        expect(json()['7860:74']).toStrictEqual({
            inputs: {
                text: 'input changed',
                clip: ['7860:71', 0]
            },
            class_type: 'CLIPTextEncode',
            _meta: {
                title: 'CLIP Text Encode (Positive Prompt)'
            }
        });
    });

    it('should able to define new options', () => {
        json('CLIP Text Encode (Positive Prompt)').option('text');
        expect(json()['7860:74']).toStrictEqual({
            inputs: {
                text: 'input changed',
                clip: ['7860:71', 0]
            },
            class_type: 'CLIPTextEncode',
            _meta: {
                title: 'CLIP Text Encode (Positive Prompt)',
                options: {
                    text: {
                        type: 'text'
                    }
                }
            }
        });
    });

    it('should returns the option list', () => {
        expect(json.configs()).toStrictEqual({
            ['CLIP Text Encode (Positive Prompt)']: {
                inputs: {
                    text: 'input changed',
                    clip: ['7860:71', 0]
                },
                options: {
                    text: {
                        type: 'text'
                    }
                }
            }
        });
    });
});

// Json configuration
const json = comfyJson({
    '7862': {
        inputs: {
            images: ['7860:65', 0]
        },
        class_type: 'SaveImageWebsocket',
        _meta: {
            title: 'Save Image'
        }
    },
    '7860:65': {
        inputs: {
            samples: ['7860:112', 0],
            vae: ['7860:72', 0]
        },
        class_type: 'VAEDecode',
        _meta: {
            title: 'VAE Decode'
        }
    },
    '7860:74': {
        inputs: {
            text: 'A young girl, 5-year-old, looking directly at the viewer',
            clip: ['7860:71', 0]
        },
        class_type: 'CLIPTextEncode',
        _meta: {
            title: 'CLIP Text Encode (Positive Prompt)'
        }
    }
});
