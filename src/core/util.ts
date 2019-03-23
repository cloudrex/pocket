const atomicTypes: string[] = ["string", "number", "boolean"];

/**
 * Represents simple data types which cannot be broken down
 * further.
 */
export type Atom = string | number | boolean;

/**
 * Utility method collection.
 */
export default abstract class Util {
    /**
     * Determine whether input value is atomic, or being a string,
     * number or boolean.
     */
    public static isAtomic(value: any): boolean {
        return atomicTypes.includes(typeof value);
    }
}
