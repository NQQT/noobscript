import { typeSwitch } from '../type';
import { objectProxy } from '../object';

type CallbackFunction = { [key: string]: (...inputs: any[]) => Promise<any> };
type Handler<Options> = Options & {
    <NewOptions extends CallbackFunction>(newOptions: NewOptions): Handler<Options & NewOptions>;
    (): {
        reset: () => void;
        update: (newOptions: CallbackFunction) => void;
    };
};

export type FunctionOptions = <Options extends CallbackFunction>(
    options: Options,
    parent?: FunctionOptions
) => Handler<Options>;

// Function options allows group of function to be extended
export const functionOptions: FunctionOptions = (options, parents?: FunctionOptions) => {
    const handler = ((input?: CallbackFunction) => {
        return typeSwitch(input, {
            object: ({ value: newOptions }) => {
                return functionOptions(newOptions, functionOptionsObject);
            },
            default: () => {
                return {
                    reset: () => {
                        Object.assign(handler, options);
                    },
                    update: (newOptions: CallbackFunction) => {
                        Object.assign(handler, newOptions);
                    }
                };
            }
        });
    }) as Handler<typeof options>;

    handler().reset();

    const functionOptionsObject = objectProxy(handler, {
        get: ({ object: currentObject, key }) => {
            const currentMethod = currentObject[key];
            if (currentMethod) {
                return currentMethod;
            }

            const parentMethod = (parents as any)?.[key];
            if (parentMethod) {
                return parentMethod;
            }
        }
    }) as any;

    return functionOptionsObject;
};
