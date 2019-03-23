import {DbStrategy} from "./strategy";

export interface IDbOptions {
    /**
     * The data storage strategy to use.
     * Defaults to in-memory strategy.
     */
    readonly strategy: DbStrategy;
}

export const defaultDbOptions: IDbOptions = {
    strategy: DbStrategy.InMemory
};
