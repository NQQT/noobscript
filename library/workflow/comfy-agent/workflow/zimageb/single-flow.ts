import { comfyJson } from '@presource/utility';

export const zImageBaseSingleFlow = comfyJson({
    '94': {
        inputs: {
            clip_name: 'qwen_3_4b.safetensors',
            type: 'lumina2',
            device: 'default'
        },
        class_type: 'CLIPLoader',
        _meta: {
            title: 'Load CLIP'
        }
    },
    '95': {
        inputs: {
            text: 'A beautiful girl at the beach. Realism.',
            clip: ['94', 0]
        },
        class_type: 'CLIPTextEncode',
        _meta: {
            title: 'Positive Prompt'
        }
    },
    '96': {
        inputs: {
            width: 1024,
            height: 1024,
            batch_size: 1
        },
        class_type: 'EmptySD3LatentImage',
        _meta: {
            title: 'EmptySD3LatentImage'
        }
    },
    '97': {
        inputs: {
            samples: ['106', 0],
            vae: ['101', 0]
        },
        class_type: 'VAEDecode',
        _meta: {
            title: 'VAE Decode'
        }
    },
    '98': {
        inputs: {
            shift: 3,
            model: ['102', 0]
        },
        class_type: 'ModelSamplingAuraFlow',
        _meta: {
            title: 'ModelSamplingAuraFlow'
        }
    },
    '99': {
        inputs: {
            text: '',
            clip: ['94', 0]
        },
        class_type: 'CLIPTextEncode',
        _meta: {
            title: 'Negative Prompt'
        }
    },
    '101': {
        inputs: {
            vae_name: 'ae.safetensors'
        },
        class_type: 'VAELoader',
        _meta: {
            title: 'Load VAE'
        }
    },
    '102': {
        inputs: {
            unet_name: 'moodyRealMix_zitV3FP8.safetensors',
            weight_dtype: 'default'
        },
        class_type: 'UNETLoader',
        _meta: {
            title: 'Load Diffusion Model'
        }
    },
    '105': {
        inputs: {
            seed: -1
        },
        class_type: 'Seed (rgthree)',
        _meta: {
            title: 'Seed (rgthree)'
        }
    },
    '106': {
        inputs: {
            seed: ['105', 0],
            steps: 5,
            cfg: 1,
            sampler_name: 'dpmpp_2m_sde',
            scheduler: 'beta57',
            denoise: 1,
            model: ['98', 0],
            positive: ['95', 0],
            negative: ['99', 0],
            latent_image: ['96', 0]
        },
        class_type: 'KSampler',
        _meta: {
            title: 'KSampler'
        }
    },
    '107': {
        inputs: {
            images: ['97', 0]
        },
        class_type: 'SaveImageWebsocket',
        _meta: {
            title: 'Save Image'
        }
    }
});

// Configuring that text option is editable
zImageBaseSingleFlow('Positive Prompt').option('text');
zImageBaseSingleFlow('Load Diffusion Model').inputs('unet_name', 'ZBase_Moody_Wild_Mix_v3.safetensors');
