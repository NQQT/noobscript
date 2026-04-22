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
        json('CLIP Text Encode (Positive Prompt)').option('inputs.text');
        expect(json()['7860:74']).toStrictEqual({
            inputs: {
                text: 'input changed',
                clip: ['7860:71', 0]
            },
            class_type: 'CLIPTextEncode',
            _meta: {
                title: 'CLIP Text Encode (Positive Prompt)',
                options: {
                    ['inputs.text']: {
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
    },
    '7860:82': {
        inputs: {
            conditioning: ['7860:74', 0]
        },
        class_type: 'ConditioningZeroOut',
        _meta: {
            title: 'ConditioningZeroOut'
        }
    },
    '7860:71': {
        inputs: {
            clip_name: 'qwen_3_8b.safetensors',
            type: 'flux2',
            device: 'default'
        },
        class_type: 'CLIPLoader',
        _meta: {
            title: 'Load CLIP'
        }
    },
    '7860:72': {
        inputs: {
            vae_name: 'flux2-vae.safetensors'
        },
        class_type: 'VAELoader',
        _meta: {
            title: 'Load VAE'
        }
    },
    '7860:112': {
        inputs: {
            eta: 0.5,
            sampler_name: 'linear/euler',
            scheduler: 'beta57',
            steps: 4,
            steps_to_run: -1,
            denoise: 1,
            cfg: 1,
            seed: ['7860:7832', 0],
            sampler_mode: 'standard',
            bongmath: true,
            model: ['7860:104', 0],
            positive: ['7860:74', 0],
            negative: ['7860:82', 0],
            latent_image: ['7860:66', 0]
        },
        class_type: 'ClownsharKSampler_Beta',
        _meta: {
            title: 'ClownsharKSampler'
        }
    },
    '7860:7832': {
        inputs: {
            seed: -1
        },
        class_type: 'Seed (rgthree)',
        _meta: {
            title: 'Seed (rgthree)'
        }
    },
    '7860:104': {
        inputs: {
            PowerLoraLoaderHeaderWidget: {
                type: 'PowerLoraLoaderHeaderWidget'
            },
            lora_1: {
                on: false,
                lora: 'Flux2Klein9b_Consistence_Edit_LCS.safetensors',
                strength: 0.25
            },
            lora_2: {
                on: false,
                lora: 'Flux2Klein9b_Base_ThickCum_v1.safetensors',
                strength: 1
            },
            lora_3: {
                on: true,
                lora: 'Flux2Klein9b_Unchained_v2.safetensors',
                strength: 0.4
            },
            lora_4: {
                on: true,
                lora: 'Flux2Klein9b_SNOFS_v1_2.safetensors',
                strength: 0.6
            },
            '➕ Add Lora': '',
            model: ['7860:7861', 0]
        },
        class_type: 'Power Lora Loader (rgthree)',
        _meta: {
            title: 'Power Lora Loader (rgthree)'
        }
    },
    '7860:66': {
        inputs: {
            width: 1024,
            height: 1024,
            batch_size: 1
        },
        class_type: 'EmptyFlux2LatentImage',
        _meta: {
            title: 'Empty Flux 2 Latent'
        }
    },
    '7860:7861': {
        inputs: {
            unet_name: 'Flux-2-Klein-9B-KV-Q8_0.gguf'
        },
        class_type: 'UnetLoaderGGUF',
        _meta: {
            title: 'Unet Loader (GGUF)'
        }
    }
});
