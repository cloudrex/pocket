import Item, {IDbModel} from "./item";
import Store from "./store";

export type PipeReceiver = (item: Item, event: DbEvent) => void;

/**
 * Possible item events done by the database.
 */
export enum DbEvent {
    Add,
    Remove,
    Update
}

/**
 * A database instance.
 */
export default class Db {
    protected activePipe?: PipeReceiver;
    protected readonly: boolean;
    protected store: Store;

    public constructor() {
        this.activePipe = undefined;
        this.readonly = false;
        this.store = new Store();
    }

    /**
     * Specify whether items cannot be updated
     * or added, only retrieved.
     */
    public setReadonly(readonly: boolean): this {
        this.readonly = readonly;

        return this;
    }

    /**
     * Whether the database is in read-only mode.
     */
    public get readonlyMode(): boolean {
        return this.readonly;
    }

    /**
     * Specify the receiver which will be invoked
     * every time an item is added, updated, or removed.
     */
    public pipe(receiver: PipeReceiver): this {
        this.activePipe = receiver;

        return this;
    }

    /**
     * Add or update an item onto the database.
     * No action will be taken if the database
     * is in read-only mode.
     */
    public put(item: Item): this {
        // Do not take any actions if in read-only mode.
        if (this.readonly) {
            return this;
        }

        // Retrieve the model from the item, and save it.
        this.store.put(item.get());

        return this;
    }

    /**
     * Find an item by its properties.
     * Returns null if no matching item was found.
     */
    public find<T extends IDbModel = any>(query: Partial<T>): Item | null {
        // TODO: Implement.
        throw new Error("Not yet implemented");

        return null;
    }
}
