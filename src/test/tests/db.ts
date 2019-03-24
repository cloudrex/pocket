import {unit, test, Assert} from "unit";
import Db from "../../db/db";
import {defaultDbOptions} from "../../db/options";

@unit("Db")
export default class {
    @test("should have default options")
    public db() {
        const db: Db = new Db("test");

        Assert.equal(db.options.strategy, defaultDbOptions.strategy);
    }
}
