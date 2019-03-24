import Db from "../db/db";
import {performance} from "perf_hooks";
import {IDbModel} from "../core/model";
import {Item} from "..";

export type StepCallback = () => void;

export interface IBenchmarkModel extends IDbModel {
    readonly data: any;
}

export default class Benchmark {
    protected readonly db: Db<IBenchmarkModel>;

    /**
     * The amount of times steps will be invoked.
     */
    public readonly samples: number;

    public constructor(samples: number = 100) {
        this.db = new Db("benchmark");
        this.samples = samples;
    }

    /**
     * Perform the write operation in the database.
     * @return {number} The time that took to complete the operation in milliseconds.
     */
    public write(amount: number = 1000): number {
        let avg: number = 0;

        // Invoke samples.
        for (let s: number = 0; s < this.samples; s++) {
            // Invoke and record step.
            avg += this.step(() => {
                for (let i: number = 0; i < amount; i++) {
                    this.db.create({
                        id: i,
                        data: "Hello world!"
                    });
                }
            });
        }

        // Compute and return average.
        return avg / this.samples;
    }

    /**
     * Perform the read operation in the database.
     * @return {number} The time that took to complete the operation in milliseconds.
     */
    public read(amount: number = 1000): number {
        let avg: number = 0;

        // Invoke samples.
        for (let s: number = 0; s < this.samples; s++) {
            // Invoke and record step.
            avg += this.step(() => {
                for (let i: number = 0; i < amount; i++) {
                    this.db.get(i);
                }
            });
        }

        // Compute and return average.
        return avg / this.samples;
    }

    /**
     * Perform an operation and record the time
     * taken to complete.
     * @return {number} The time that took to complete the operation in milliseconds.
     */
    public step(callback: StepCallback): number {
        const start: number = performance.now();

        callback();

        return performance.now() - start;
    }
}
