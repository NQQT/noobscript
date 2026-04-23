import React, { useEffect } from 'react';
import { AgentPanelWidget } from './AgentPanelWidget';
import { FlexRow } from '@react/headless';
import { signalState } from '@presource/react';
import { ImageBox } from '@react/material';
import { Filebin } from '@presource/web';
import { ComfyAgentDashboardStore } from '../context';

const images: any = {};
const refreshGallery = signalState({});

export type ImagePanelWidgetProps = {
    data: ComfyAgentDashboardStore['data'];
};

const checkImageStash = async (data: ImagePanelWidgetProps['data']) => {
    const { bin, stashId } = data;
    const filebin = new Filebin({ bin: `${bin}_${stashId}` });
    const list = (await filebin.list()) || [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < list.length; i++) {
        // Extracting files
        const { filename, filesize } = list[i];

        // Checking File Listing
        if (!images[filename] || (images[filename] && !images[filename].blob)) {
            // Only attempt to load if file size is greater than 100
            if (filesize > 100) {
                const result = JSON.parse(await filebin.download(filename));
                images[filename] = {
                    agent: filename.split('_')[0],
                    blob: `data:image/png;base64,${result.data}`
                };
            } else {
                // images[filename] = { blob: null };
            }

            refreshGallery(data);
        }
    }

    setTimeout(() => {
        checkImageStash(data);
    }, 0);
};

export const ImagePanelWidget = React.memo((props: ImagePanelWidgetProps) => {
    const { data } = props;
    refreshGallery();

    useEffect(() => {
        checkImageStash(data);
    }, []);

    return (
        <FlexRow padding={2} wrap={'wrap'} justify={'flex-start'}>
            {Object.keys(images).map((name, key) => {
                // Extracting the blob url
                const { agent, blob } = images[name];
                return <ImageBox source={blob} key={key} text={agent} />;
            })}
        </FlexRow>
    );
});
