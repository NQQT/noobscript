type Config = {};

type Callback = () => Promise<boolean | void>;

export type ScriptManager = (config?: Config) => {
    (script: Callback): void;
    // Kill the process
    kill: () => void;
};

// Script manager
export const scriptManager: ScriptManager = (config = {}) => {
    // TODO Maybe add a tracking here, ensuring all the script are executed correctly

    const handler = (script: Callback) => {
        //  TODO Base on the .test requirement, script should executed async
        //   if script returns false, it should retry until successfully
        //   Do not use while loop. It must be event driven
    };

    Object.assign(handler, {
        kill: () => {
            // TODO Kill the script manager
            //  Once kill, adding any script to handler will not run
            //  It should kill all the currently running script
        }
    });
};
