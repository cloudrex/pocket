import fs from "fs";
import path from "path";
import {Id} from "./id";

export interface IStorageEntry {
    readonly id: Id;
    readonly data: Buffer;
}

/**
 * Manages file-based database storage.
 */
export default class Storage {
    /**
     * The base directory containing all database
     * entries.
     */
    public static basePath: string = ".pocket";

    /**
     * The file extension to use for entry files.
     */
    public static entryExt: string = "entry";
    
    /**
     * Name of the associated database.
     */
    protected readonly dbName: string;

    /**
     * The absolute, resolved database entry path.
     */
    protected readonly path: string = path.resolve(path.join(Storage.basePath, this.dbName));

    /**
     * @param {string} name The name of the associated database. This will be used as the database entry directory name.
     */
    public constructor(name: string) {
        this.dbName = name;
    }

    /**
     * Whether the database entry exists.
     */
    public get exists(): boolean {
        return fs.existsSync(this.dbName);
    }

    /**
     * Determine whether an entry exists.
     */
    public hasEntry(id: Id): boolean {
        return fs.existsSync(this.getEntryPath(id));
    }

    /**
     * Resolve the absolute path of an entry by its id.
     */
    public getEntryPath(id: Id): string {
        return path.join(this.path, `${id}.${Storage.entryExt}`);
    }

    /**
     * Write or update an entry.
     */
    public write(entry: IStorageEntry): void {
        fs.writeFileSync(this.getEntryPath(entry.id), )
    }

    /**
     * Read an entry. Returns null if such entry does not exist,
     * or if the database entry itself does not exist.
     */
    public read(id: Id): IStorageEntry | null {
        // The database entry does not exist.
        if (!this.exists) {
            return null;
        }
        // Otherwise, ensure the entry exists.
        else if (!this.hasEntry(id)) {
            return null;
        }

        // Create the file handle.
        const handle: number = fs.openSync(this.getEntryPath(id), "r");


    }

    /**
     * Create database entry. No action will be taken
     * if such entry already exists.
     * @param {boolean} [force=false] Whether to throw an error if creation fails (or entry already exists).
     */
    public create(force: boolean = false): this {
        if (this.exists) {
            // If action is forced, throw an error.
            if (force) {
                throw new Error("Unable to create database entry because such entry already exists");
            }

            // Otherwise, terminate function.
            return this;
        }
        
        // Create the database entry directory.
        fs.mkdirSync(this.path);

        return this;
    }
}
