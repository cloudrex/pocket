import {Id} from "./id";
import {IDbModel} from "./model";

export default class Store<T extends IDbModel> {
    protected readonly models: Map<Id, T>;
    protected readonly values: T[];

    public constructor() {
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
     * Save or overwrite a model onto the
     * store.
     */
    public put(model: T): this {
        // Save in the map.
        this.models.set(model.id, model);
        
        // Save the item into the cache.
        this.values.push(model);

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

        return this;
    }

    // TODO: find() should be based from findMany().
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
        return this.models.delete(id);
    }
}
