import Util, {Atom} from "./util";

export type EntryData = Atom | {};

/**
 * A single, file-based entry.
 */
export default class StorageEntry {
    public static serialize(data: EntryData): EntryData {
        // Data is in atomic form, do not proceed.
        if (Util.isAtomic(data)) {
            return data;
        }
        // Data is in object form, serialize it.
        else if (typeof data === "object") {
            return JSON.stringify(data);
        }

        // Otherwise, an invalid data was provided.
        throw new Error("Invalid data provided");
    }
}
