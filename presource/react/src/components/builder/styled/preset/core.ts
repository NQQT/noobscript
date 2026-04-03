import { styledComponent } from '../styled-component';

export const styledDivComponent = <T = {}>(input: Parameters<typeof styledComponent<T>>[1]) => {
    return styledComponent<T>('div', input);
};
