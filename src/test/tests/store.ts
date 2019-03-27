import {unit, test, target, Assert} from "unit";
import Store from "../../core/store";
import {IDbModel} from "../../core/model";

const testModel: IDbModel = {
    id: 0
};

const store: Store = new Store();

@unit("Store")
export default class {
    @test("should be initially empty")
    public init() {
        Assert.equal(store.size, 0);
    }

    @test("should add an item")
    @target(Store.prototype.put)
    public put() {
        store.put(testModel);
        
        // Assert.
        Assert.true(store.has(testModel.id));
        Assert.equal(store.get(testModel.id)!, testModel);
    }
}
