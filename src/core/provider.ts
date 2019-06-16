import {IModel} from "./model";
import {Id} from "./id";

export interface IProvider<T extends IModel = IModel> {
    sync(): void;
    put(item: T): void;
    get(id: Id): T | null;
}
