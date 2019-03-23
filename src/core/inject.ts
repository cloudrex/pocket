import {DbInstanceTracker} from "./dbInstanceTracker";

/**
 * Injects a database instance onto the target.
 */
export default function inject(instanceId: number): any {
    return function (target: any): any {
        return class extends target {
            public readonly db: any = DbInstanceTracker.get(instanceId);
        };
    };
}
