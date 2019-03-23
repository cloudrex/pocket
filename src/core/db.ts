import Item from "./item";
import Store from "./store";
import {Id} from "./id";
import {IDbModel} from "./model";

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
export default class Db<T extends IDbModel = any> {
    public readonly store: Store<T>;

    protected activePipe?: PipeReceiver;
    protected readonly: boolean;

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
     * Create and store an item from a model.
     */
    public create(model: T): Item<T> {
        const item: Item<T> = new Item(this, model);

        // Save the item for the first time.
        item.put();

        return item;
    }

    /**
     * Retrieve an item from the database.
     * Returns null if such item does not exist.
     */
    public get(id: Id): Item<T> | null {
        const model: T | null = this.store.get(id);

        if (model !== null) {
            return new Item(this, model);
        }

        return null;
    }

    /**
     * Add or update an item onto the database.
     * No action will be taken if the database
     * is in read-only mode.
     */
    public put(model: T): this {
        // Do not take any actions if in read-only mode.
        if (this.readonly) {
            return this;
        }

        // Save the model onto the store.
        this.store.put(model);

        return this;
    }

    /**
     * Find an item by its properties.
     * Returns null if no matching item was found.
     */
    public find(query: Partial<T>): Item<T> | null {
        // TODO: Implement.
        throw new Error("Not yet implemented");

        return null;
    }
}
