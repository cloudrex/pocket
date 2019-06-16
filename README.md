#### PocketDB

A pocket-sized Node.js, easy-to-use, NoSQL database.

#### Installation

```shell
$ npm install --save pocket
```

#### Features

* **Tiny** &mdash; Small package size (8.3 KB zipped), 0 depedencies.
* **Performant** &mdash; Uses efficient algorithms and data structures under the hood.
* **Dynamic** &mdash; Can be used in-memory, or as a persistent data storage.
* **Extensible** &mdash; Built with modularity in mind.
* **Interactive** &mdash; Simply, chain-able, and predictable API.

#### Usage

```ts
// Import the database class.
import Db, {IModel, IProvider} from "pocket";

class ExampleProvider implements IProvider {
    // ...
}

interface IExampleModel extends IModel {
    message: string;
}

// Initialization.
const db = new Db<IExampleModel>("example");

// Use a custom provider (ex. JSON file).
db.use(new ExampleProvider());

// Create and store a record.
let item = db.create({
    // Required property, used for identification.
    id: 0,

    message: "Hello world!"
});

// Update the record.
item.update({
    message: "Fortune favors the brave."
});

// Apply the update's changes onto the database.
item.save();

// Sync (load) the record from the database.
item.sync();

// Find the record by its 'message' property.
item = db.find({
    message: "Hello world!"
})!;
```

#### Benchmarks

100 samples (iterations) are used in all benchmarks in order to get accurate, average readings.

```shell
# Write
1K items   : ~0.06037225998938084ms avg.
100K items : ~0.09036524929106235ms avg.
1M items   : ~0.8414506393671036ms avg.
100M items : ~82.79549079969526ms avg.

# Read
1K items   : ~0.04259479962289334ms avg.
100K items : ~0.32166273042559623ms avg.
1M items   : ~2.9804238600283863ms avg.
100M items : ~311.5762038500607ms (~0.3s) avg.
```
