import { comfyJson } from '@presource/utility';
import { ClownsharKSamplerScheduler } from '@presource/structure';

export const klein9bSingleFlow = comfyJson({
    '2': {
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
            title: 'ClownsharKSampler',
            options: { sampler_name: { type: 'text' }, scheduler: { type: 'text' } }
        }
    },
    '7862': {
        inputs: { images: ['7860:65', 0] },
        class_type: 'SaveImageWebsocket',
        _meta: { title: 'Save Image' }
    },
    '7860:65': {
        inputs: { samples: ['2', 0], vae: ['7860:72', 0] },
        class_type: 'VAEDecode',
        _meta: { title: 'VAE Decode' }
    },
    '7860:74': {
        inputs: {
            text: 'A young girl, 5-year-old, looking directly at the viewer',
            clip: ['7860:71', 0]
        },
        class_type: 'CLIPTextEncode',
        _meta: { title: 'Positive Prompt', options: { text: { type: 'text' } } }
    },
    '7860:82': {
        inputs: { conditioning: ['7860:74', 0] },
        class_type: 'ConditioningZeroOut',
        _meta: { title: 'ConditioningZeroOut' }
    },
    '7860:71': {
        inputs: { clip_name: 'qwen_3_8b.safetensors', type: 'flux2', device: 'default' },
        class_type: 'CLIPLoader',
        _meta: { title: 'Load CLIP' }
    },
    '7860:72': {
        inputs: { vae_name: 'flux2-vae.safetensors' },
        class_type: 'VAELoader',
        _meta: { title: 'Load VAE' }
    },
    '7860:7832': { inputs: { seed: -1 }, class_type: 'Seed (rgthree)', _meta: { title: 'Seed (rgthree)' } },
    '7860:104': {
        inputs: {
            PowerLoraLoaderHeaderWidget: { type: 'PowerLoraLoaderHeaderWidget' },
            lora_1: { on: false, lora: 'Flux2Klein9b_Consistence_Edit_LCS.safetensors', strength: 0.25 },
            lora_2: { on: false, lora: 'Flux2Klein9b_Base_ThickCum_v1.safetensors', strength: 1 },
            lora_3: { on: true, lora: 'Flux2Klein9b_Unchained_v2.safetensors', strength: 0.4 },
            lora_4: { on: true, lora: 'Flux2Klein9b_SNOFS_v1_2.safetensors', strength: 0.6 },
            '➕ Add Lora': '',
            model: ['1', 0]
        },
        class_type: 'Power Lora Loader (rgthree)',
        _meta: { title: 'Power Lora Loader' }
    },
    '7860:66': {
        inputs: { width: 1024, height: 1024, batch_size: 1 },
        class_type: 'EmptyFlux2LatentImage',
        _meta: { title: 'Empty Flux 2 Latent' }
    },
    '1': {
        inputs: { unet_name: 'Flux-2-Klein-9B-KV-Q8_0.gguf' },
        class_type: 'UnetLoaderGGUF',
        _meta: { title: 'Unet Loader (GGUF)' }
    }
});

// Sampler Configuration

klein9bSingleFlow('ClownsharKSampler').option('sampler_name');
klein9bSingleFlow('ClownsharKSampler').option('scheduler', ClownsharKSamplerScheduler);

// Configuring that text option is editable
klein9bSingleFlow('Positive Prompt').option('text');
