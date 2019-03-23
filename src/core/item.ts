import Db from "./db";
import {Id} from "./id";

/**
 * A database model.
 */
export interface IDbModel {
    readonly id: Id;
}

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
     * Does not apply changes to the database.
     */
    public update(changes: Partial<T>): this {
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
     */
    public sync(): this {
        return this;
    }

    /**
     * Set the model.
     * Does not apply changes to the database.
     */
    public set(model: T): this {
        this.update(model);

        return this;
    }

    /**
     * Retrieve the model.
     */
    public get(): Readonly<T> {
        return this.model;
    }
}
