type WithoutUsePrefix<T> = T extends `use${infer P}` ? P : T;
type CleanInput<P> = { [key in Uncapitalize<string & WithoutUsePrefix<keyof P>>]: P[keyof P] };

// Reactive Component Props
export type ReactiveComponentProps<P> = { [key in keyof P]?: P[key] } & {
    [key in `use${Capitalize<string & keyof P>}`]?: (inputs: CleanInput<P>) => P[keyof P];
};
