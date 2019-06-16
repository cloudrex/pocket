import Item from "../core/item";
import Store from "../core/store";
import {Id} from "../core/id";
import {IModel} from "../core//model";
import {IDbOptions, defaultDbOptions} from "./options";
import {InstanceTracker} from "../core/instanceTracker";
import {EventEmitter} from "events";

export type PipeReceiver = (item: Item, event: DbEvent) => void;

/**
 * Possible item events done by the database.
 */
export enum DbEvent {
    ItemCreated = "itemCreated",
    ItemAdded = "itemAdded",
    ItemRemoved = "itemRemoved",
    ItemModelUpdated = "itemUpdated",
    ReadonlyModeChanged = "readonlyModeChanged"
}

/**
 * A database instance.
 */
export default class Db<T extends IModel = any> extends EventEmitter {
    public readonly store: Store<T>;

    public readonly options: IDbOptions;

    public readonly instanceId: number;

    /**
     * The name representing this database.
     */
    protected readonly dbName: string

    protected activePipe?: PipeReceiver;

    protected readonly: boolean;

    /**
     * @param options Options for this database instance.
     */
    public constructor(name: string, options?: Partial<IDbOptions>) {
        super();

        this.options = {
            ...defaultDbOptions,
            ...options
        };

        this.dbName = name;
        this.activePipe = undefined;
        this.readonly = false;
        this.store = new Store();

        // Register instance and save instance id.
        this.instanceId = InstanceTracker.register(this);
    }

    /**
     * Specify whether items cannot be updated
     * or added, only retrieved.
     */
    public setReadonly(readonly: boolean): this {
        this.readonly = readonly;

        // Emit the readonly mode changed event.
        this.emit(DbEvent.ReadonlyModeChanged, this.readonly);

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
        item.save();

        // Emit the item created event.
        this.emit(DbEvent.ItemCreated, item);

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

    public getOrDefault(id: Id, defaultItem: Item<T>): Item<T> {
        return this.get(id) || defaultItem;
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

        // Emit the item model updated event.
        this.emit(DbEvent.ItemModelUpdated, model);

        return this;
    }

    /**
     * Remove an item from the database.
     * @return {boolean} Whether the item was successfully removed.
     */
    public remove(id: Id): boolean {
        const result: boolean = this.store.remove(id);

        // Emit the item removed event.
        this.emit(DbEvent.ItemRemoved, id);

        return result;
    }

    /**
     * Find an item by its properties.
     * Returns null if no matching item was found.
     */
    public find(query: Partial<T>): Item<T> | null {
        const result: T | null = this.store.find(query);

        if (result !== null) {
            return this.create(result);
        }

        return null;
    }
}
