import React, { useEffect } from 'react';
import { FlexColumn, FlexRow } from '@react/headless';
import { Badge, Chip } from '@mui/material';
import { Filebin, parseComfyAgentStatuses } from '@presource/web';
import { signalState } from '@presource/react';
import { stringSwitch } from '@presource/core';
import { CloudDownload, DoNotDisturbAltOutlined, Help } from '@mui/icons-material';

// Creating a signal
const agents = signalState({} as ReturnType<typeof parseComfyAgentStatuses>);

const repeatingCall = () => {
    const filebin = new Filebin({ bin: 'kaggle_test_agent' });

    filebin.list().then((list) => {
        const result = parseComfyAgentStatuses(list);
        // Updating agent
        agents(result);
        // Repeat the call

        setTimeout(() => {
            repeatingCall();
        }, 0);
    });
};

const images: any = {};
const refreshGallery = signalState({});
const checkImageStash = async () => {
    const filebin = new Filebin({ bin: 'kaggle_test_stash' });
    const list = await filebin.list();
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < list.length; i++) {
        const { filename } = list[i];
        if (!images[filename]) {
            // Download the image
            // TODO This doesn't returns the content of the file, but the landing page
            const { data } = JSON.parse(await filebin.download(filename));
            images[filename] = { blob: `data:image/png;base64,${data}` };
            refreshGallery({});
        }
    }
};

const ImageGallery = React.memo(() => {
    refreshGallery();

    return (
        <FlexRow wrap={'wrap'}>
            {Object.keys(images).map((name, key) => {
                // Extracting the blob url
                const { blob } = images[name];
                return <img width="10%" key={key} src={blob} alt={name} />;
            })}
        </FlexRow>
    );
});

export const ComfyAgentDashboard = React.memo(() => {
    const list = agents();

    useEffect(() => {
        repeatingCall();
        checkImageStash();
    }, []);

    return (
        <FlexRow>
            <FlexColumn>
                <ImageGallery />
            </FlexColumn>
            <FlexColumn>
                <FlexRow>
                    {Object.keys(list).map((name, key) => {
                        const { status, duration, details } = list[name];

                        const chipProps: any = {
                            label: `${name}:${details}`,
                            variant: 'outlined'
                        };

                        // Solving icon
                        stringSwitch(status, {
                            busy: () => {
                                Object.assign(chipProps, {
                                    icon: <DoNotDisturbAltOutlined />,
                                    color: 'error'
                                });
                            },
                            setup: () => {
                                Object.assign(chipProps, {
                                    icon: <CloudDownload />,
                                    color: 'warning'
                                });
                            },
                            default: () => {
                                Object.assign(chipProps, {
                                    icon: <Help />
                                });
                            }
                        });

                        return (
                            <Badge badgeContent={duration} max={9999} color={'success'}>
                                <Chip key={key} {...chipProps} />
                            </Badge>
                        );
                    })}
                </FlexRow>
            </FlexColumn>
        </FlexRow>
    );
});
