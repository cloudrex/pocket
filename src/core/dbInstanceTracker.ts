import Db from "./db/db";

/**
 * Keeps track of class instances.
 */
export abstract class DbInstanceTracker {
    // Start at -1 to initially increment to 0.
    protected static counter: number = -1;

    protected static readonly instances: Db[] = [];

    /**
     * The amount of existing instances.
     */
    public static get count(): number {
        return this.counter + 1;
    }

    /**
     * Register instance and retrieve the instance
     * counter.
     */
    public static register(instance: Db): number {
        this.instances.push(instance);

        return this.counter++;
    }

    /**
     * Retrieve a stored instance by the instance
     * id.
     */
    public static get(instanceId: number): Db {
        return this.instances[instanceId];
    }
}
