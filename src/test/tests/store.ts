import {unit, test, target, Assert} from "unit";
import Store from "../../core/store";
import {IDbModel} from "../../core/model";

const testModel: IDbModel = {
    id: 1
};

const store: Store = new Store();

@unit("Store")
export default class {
    @test("should be initially empty")
    public init() {
        Assert.equal(store.size, 0);
    }

    @test("should add a model")
    @target(Store.prototype.put)
    public put() {
        Assert.equal(store.put(testModel), store);
    }

    @test("should determine if a model is contained")
    @target(Store.prototype.has)
    public has() {
        Assert.true(store.has(testModel.id));
    }

    @test("should retrieve a model from its id")
    @target(Store.prototype.get)
    public get() {
        Assert.equal(store.get(testModel.id)!, testModel);
    }

    @test("should overwrite existing models")
    @target(Store.prototype.put)
    public put_overwrite() {
        Assert.equal(store.put(testModel), store);
        Assert.equal(store.size, 1);
        Assert.equal(store.get(testModel.id)!, testModel);
    }

    @test("should remove existing models")
    @target(Store.prototype.remove)
    public remove() {
        Assert.true(store.remove(testModel.id));

        // Re-populate for upcoming tests.
        store.put(testModel);
    }

    @test("should find an item by its id")
    @target(Store.prototype.find)
    public find() {
        Assert.equal(store.find({
            id: testModel.id
        }), testModel);
    }

    @test("should add multiple models")
    @target(Store.prototype.putMany)
    public putMany() {
        const testModel2: IDbModel = {
            id: 2
        };

        const testModel3: IDbModel = {
            id: 3
        };

        Assert.equal(store.putMany([testModel2, testModel3]), store);
        Assert.equal(store.size, 3);

        // Assert second and third models.
        Assert.equal(store.get(testModel2.id)!, testModel2);
        Assert.equal(store.get(testModel3.id)!, testModel3);
    }
}
