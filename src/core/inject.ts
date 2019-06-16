import {InstanceTracker} from "./instanceTracker";

/**
 * Injects a database instance onto the target.
 */
export default function inject(instanceId: number): any {
    return function (target: any): any {
        return class extends target {
            public readonly db: any = InstanceTracker.get(instanceId);
        };
    };
}
