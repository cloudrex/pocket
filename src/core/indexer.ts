export default class Indexer {
    /**
     * Hash a value of type string, number or object into
     * a unique numeric identifier.
     */
    public static hash(value: any): number {
        // Value already in the form of a number.
        if (typeof value === "number") {
            return value;
        }

        let stringValue: string = value;

        // Stringify object into a string if value is an object.
        if (typeof value === "object") {
            stringValue = JSON.stringify(value);
        }
        // An invalid value was provided.
        else if (typeof value !== "string") {
            throw new Error("Expected value to be either a number, string or object");
        }

        return Indexer.hashString(stringValue);
    }

    /**
     * Hash a string value into he sum of its character
     * code values.
     */
    public static hashString(str: string): number {
        if (typeof str !== "string" || str.length === 0) {
            throw new Error("Expected value to be a string with a length larger than 0")
        }

        let result: number = 0;

        for (let i: number = 0; i < str.length; i++) {
            result += str.charCodeAt(i);
        }

        return result;
    }

    /**
     * Index a hash value to a relatively unique
     * index within 0 to the size provided.
     */
    public static index(hash: number, size: number): number {
        return hash % size;
    }

    protected readonly indexes: any[];

    public constructor() {
        this.indexes = [];
    }

    public index(value: any): this {
        // TODO: this.indexes.length is the populated size.
        this.indexes[Indexer.index(Indexer.hash(value), this.indexes.length)] = value;

        return this;
    }

    public binarySearch(index: number): any | null {
        let middle = 0;
        let end = this.indexes.length - 1;

        while (middle <= end) {
            const k = (end + middle) >> 1;
            const comparison = index - this.indexes[k];

            if (comparison > 0) {
                middle = k + 1;
            }
            else if (comparison < 0) {
                end = k - 1;
            }
            else {
                return k;
            }
        }

        return -middle - 1;
    }
}
