import React, { useEffect } from 'react';
import { FlexRow } from '@react/headless';
import { signalState } from '@presource/react';
import { ImageBox } from '@react/material';
import { Filebin } from '@library/cloud';
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

    images[stashId] ||= {};

    const stashImages = images[stashId];

    // Even if list length is 0, refresh the gallery
    if (!list.length) {
        refreshGallery(data);
    }
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < list.length; i++) {
        // Extracting files
        const { filename, filesize, created, updated } = list[i];
        const durationSeconds = (new Date(updated).getTime() - new Date(created).getTime()) / 1000;

        // Checking File Listing
        if (!stashImages[filename] || (stashImages[filename] && !stashImages[filename].blob)) {
            stashImages[filename] = {
                agent: filename.split('_')[0],
                duration: Math.ceil(durationSeconds),
                blob: null
            };

            // Only attempt to load if file size is greater than 100
            if (filesize > 100) {
                const result = JSON.parse(await filebin.download(filename));
                stashImages[filename].blob = `data:image/png;base64,${result.data}`;
            }
            refreshGallery(data);
        }
    }

    setTimeout(() => {
        checkImageStash(data);
    }, 3000);
};

export const ImagePanelWidget = React.memo((props: ImagePanelWidgetProps) => {
    const { data } = props;
    const { stashId } = data;
    refreshGallery();

    useEffect(() => {
        checkImageStash(data);
    }, []);

    const stashImages = images[stashId] || {};
    const stashImagesKeys = Object.keys(stashImages);

    return (
        <FlexRow padding={2} wrap={'wrap'} justify={'flex-start'}>
            {stashImagesKeys.length ? null : `No images found... for stash: ${stashId}`}
            {stashImagesKeys.map((name, key) => {
                // Extracting the blob url
                const { agent, duration, blob } = stashImages[name];
                return <ImageBox source={blob} key={key} text={`${agent} (${duration})`} />;
            })}
        </FlexRow>
    );
});
