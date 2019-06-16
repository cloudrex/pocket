import {Id} from "./id";

/**
 * A database model.
 */
export interface IModel {
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
export type ModelChanges<T extends IModel> = Exclude<IModel, T>;
