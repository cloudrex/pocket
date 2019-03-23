import Util, {Atom} from "./util";

export type EntryData = Atom | {};

/**
 * A single, file-based entry.
 */
export default class StorageEntry {
    public static serializeData(data: EntryData): string {
        // Data is in atomic form, convert to a string.
        if (Util.isAtomic(data)) {
            return data.toString();
        }
        // Data is in object form, serialize it.
        else if (typeof data === "object") {
            return JSON.stringify(data);
        }

        // Otherwise, an invalid data was provided.
        throw new Error("Invalid data provided");
    }
}
