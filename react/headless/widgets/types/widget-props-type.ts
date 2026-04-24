// Widget Prop Type takes data as reference
export type WidgetPropsType = {
    // The alias modification (if required)
    alias?: {
        [key: string]: string;
    };
    // The original reference data for modification
    data: {
        // Accept objects only
        [key: string]: any;
    };
};
