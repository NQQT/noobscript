import React from 'react';
import { FlexColumn } from '@react/headless';
import { Tab, Tabs, TabsProps } from '@mui/material';
import { useStateHook } from '@presource/react';

export type TabContentProps = {
    index?: number;
    content: {
        [key: string]: React.ReactNode;
    };
};

export const TabContent = React.memo((props: TabContentProps) => {
    const { content, index } = props;
    const tabIndex = useStateHook(index || 0);
    const value = tabIndex();
    const tabsProps: TabsProps = {
        value,
        onChange: (_, newValue: number) => {
            tabIndex(newValue);
        }
    };

    const keys = Object.keys(content);

    return (
        <FlexColumn>
            <Tabs {...tabsProps}>
                {keys.map((label, key) => {
                    return <Tab label={label} key={key} />;
                })}
            </Tabs>
            {keys.map((label, key) => {
                return (
                    <TabPanel value={value} index={key}>
                        {content[label]}
                    </TabPanel>
                );
            })}
        </FlexColumn>
    );
});

type TabPanelProps = { value: number; index: number; children: React.ReactNode };

const TabPanel = React.memo((props: TabPanelProps) => {
    const { value, index, children } = props;
    if (value !== index) return null;
    return <FlexColumn>{children}</FlexColumn>;
});
