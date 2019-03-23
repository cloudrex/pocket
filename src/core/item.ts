import Db from "./db";
import {Id} from "./id";

/**
 * A database model.
 */
export interface IDbModel {
    /**
     * The required property used to identify
     * this specific model.
     */
    readonly id: Id;
}

/**
 * An object containing changes to a model.
 * Changing the model's id is not permitted.
 */
export type ModelChanges<T extends IDbModel> = Exclude<IDbModel, T>;

export default class Item<T extends IDbModel = any> {
    /**
     * The database connected to this item.
     */
    public readonly db: Db;

    /**
     * The local model of the item.
     */
    protected model: T;

    public constructor(db: Db, model: T) {
        this.db = db;
        this.model = model;
    }

    /**
     * The model's unique id.
     */
    public get id(): Id {
        return this.model.id;
    }

    /**
     * Update the model.
     * Updating the model's id is not permitted.
     * Does not apply changes to the database.
     */
    public update(changes: ModelChanges<T>): this {
        this.model = {
            ...this.model,
            ...changes
        };

        return this;
    }

    /**
     * Put/update model onto the database.
     */
    public put(): this {
        return this;
    }

    /**
     * Sync model from the database.
     * @param {boolean} [force=false] Whether to throw an error if syncing fails.
     */
    public sync(force: boolean = false): this {
        const model: T | null = this.getFromDb();

        // Update the local model if remote model exists.
        if (model !== null) {
            this.model = model;
        }
        // Otherwise if action is forced, throw an error.
        else if (force) {
            throw new Error("Unable to sync when model does not exist in store");
        }

        return this;
    }

    /**
     * Set the model. Input model will be cloned to avoid
     * access by reference.
     * Does not apply changes to the database.
     */
    public set(model: T): this {
        // Clone the object to avoid access by reference.
        this.model = Object.assign({}, model);

        return this;
    }

    /**
     * Retrieve this item's corresponding
     * model from the database.
     */
    public getFromDb(): Readonly<T> | null {
        return this.db.store.get(this.model.id);
    }

    /**
     * Retrieve the model.
     */
    public get(): Readonly<T> {
        return this.model;
    }
}
