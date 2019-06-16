import {Id} from "./id";
import {IModel} from "./model";
import {EventEmitter} from "events";

export enum StoreEvent {
    /**
     * Emitted when a single model
     * is added into the store.
     */
    ModelSet = "modelSet",

    /**
     * Emitted when multiple models
     * are added into the store.
     */
    ModelBulkSet = "modelBulkSet",

    /**
     * Emitted once an existing model
     * is removed from the store.
     */
    ModelRemoved = "modelRemoved",

    /**
     * Emitted once all existing models
     * are cleared from the store.
     */
    ModelsCleared = "modelsCleared"
}

export default class Store<T extends IModel = IModel> extends EventEmitter {
    protected readonly models: Map<Id, T>;

    protected readonly values: T[];

    public constructor() {
        super();

        this.models = new Map();
        this.values = [];
    }

    /**
     * Retrieve all the models in a map.
     */
    public getAll(): ReadonlyMap<Id, T> {
        return this.models;
    }

    /**
     * Retrieve all the models in an array.
     */
    public getAllValues(): ReadonlyArray<T> {
        return this.values;
    }

    /**
     * Determine whether a model with the specified id exists.
     */
    public has(id: Id): boolean {
        return this.models.has(id);
    }

    /**
     * Clear all stored models from the store.
     */
    public clear(): this {
        this.models.clear();
        this.emit(StoreEvent.ModelsCleared);

        return this;
    }

    /**
     * Save or overwrite a model onto the
     * store.
     */
    public put(model: T): this {
        // Save in the map.
        this.models.set(model.id, model);

        // Save the item into the cache.
        this.values.push(model);

        // Emit new model event.
        this.emit(StoreEvent.ModelSet);

        return this;
    }

    /**
     * Save or overwrite multiple models
     * onto the store.
     */
    public putMany(models: T[]): this {
        for (const model of models) {
            this.put(model);
        }

        // Emit put bulk event.
        this.emit(StoreEvent.ModelBulkSet, models);

        return this;
    }

    // TODO: find() should NOT be based from findMany(), to allow stopping upon first matching item.
    /**
     * Find a single model by its properties.
     */
    public find(query: Partial<T>): T | null {
        // The id was provided, access it directly instead.
        if (query.id !== undefined) {
            return this.models.get(query.id) || null;
        }

        // TODO: Implement.
        throw new Error("Not yet implemented");

        return null;
    }

    /**
     * Find multiple models by their properties.
     */
    public findMany(query: Partial<T>): T[] | null {
        // TODO: Implement.
        throw new Error("Not yet implemented");

        return null;
    }

    /**
     * Retrieve a model from the store.
     * Returns null if such model does not
     * exist.
     */
    public get(id: Id): T | null {
        if (!this.models.has(id)) {
            return null;
        }

        return this.models.get(id) || null;
    }

    /**
     * Attempt to remove a model.
     * @return {boolean} Whether the model was removed.
     */
    public remove(id: Id): boolean {
        const result: boolean = this.models.delete(id);

        // Emit the model removed event.
        this.emit(StoreEvent.ModelRemoved, id);

        return result;
    }

    /**
     * The total amount of stored models.
     */
    public get size(): number {
        return this.models.size;
    }
}
