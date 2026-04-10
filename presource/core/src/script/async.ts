type Input = {
    shouldContinue?: () => Promise<boolean>;
};

type Configs = {};

type Callback = () => Promise<boolean | void>;

export type ScriptAsync = (configs?: Configs) => {
    append: (callback: Callback) => ReturnType<ScriptAsync>;
    // Processing
    process: (input?: Input) => Promise<void>;
};

type Task = {
    callback: Callback;
    flags: {
        pending: boolean;
        completed: boolean;
    };
    counter: {
        retries: number;
    };
};

// Executing multiple threads together
export const scriptAsync: ScriptAsync = (configs = {}) => {
    // Queue listing
    const tasks: Task[] = [];

    // The handler function
    const handler: ReturnType<ScriptAsync> = {
        append: (callback) => {
            // Adding New Tasks
            tasks.push({
                callback,
                flags: {
                    pending: true,
                    completed: false
                },
                counter: {
                    retries: 0
                }
            });

            // Ensuring the handler function
            return handler;
        },
        process: async (input) => {
            let killed = false;

            // Resolves when there are no more pending tasks (or killed)
            let notifyDrained: () => void;
            const drained = new Promise<void>((resolve) => {
                notifyDrained = resolve;
            });

            const runTask = async (task: Task): Promise<void> => {
                if (killed || !task.flags.pending) return;

                const success = await task.callback();
                if (killed) return;

                // success can either be true or undefined (which inferred as success)
                if (success !== false) {
                    task.flags.pending = false;
                    task.flags.completed = true;

                    // This defines whether the entire task list should continue or not
                    // The user can terminate the entire process

                    let keepGoing = true;

                    // if shouldContinue function is defined.
                    if (input?.shouldContinue) {
                        keepGoing = await input.shouldContinue();
                    }

                    if (!keepGoing) {
                        killed = true;
                        notifyDrained();
                        return;
                    }
                } else {
                    // TODO Should retry until successful
                }

                // After each task settles, check if everything is done
                if (getRemainingTaskPending(tasks) === 0) {
                    notifyDrained();
                }
            };

            // Kick off all currently pending tasks
            const kickoff = () => {
                const pending = tasks.filter((t) => t.flags.pending);

                if (pending.length === 0) {
                    notifyDrained();
                    return;
                }

                pending.forEach((task) => runTask(task));
            };

            kickoff();
            await drained;

            if (!killed) {
                //
            }
        }
    };

    // Return the handler
    return handler;
};

const getRemainingTaskPending = (tasks: Task[]) => {
    return tasks.filter((task) => task.flags.pending).length;
};
