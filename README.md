#### PocketDB

A pocket-sized Node.js, NoSQL database.

#### Installation

```shell
$ npm install --save pocket
```

#### Features

* **Tiny** -- Small package size (8.3 KB zipped), 0 depedencies.
* **Performant** -- Uses efficient algorithms and data structures under the hood.
* **Dynamic** -- Can be used in-memory, or as a persistent data storage.
* **Extensible** -- Built with modularity in mind.
* **Interactive** -- Simply, chain-able, and predictable API.

#### Usage

##### Basic Example
```ts
// Import the database class.
import Db from "pocket";

// Initialization.
const db = new Db("example");

// Create and store an item.
const item = db.create({
    // Required property, used for identification.
    id: 0,

    message: "Hello world!"
});

// Update the item.
item.update({
    message: "Fortune favors the brave."
});

// Apply the update's changes onto the database.
item.save();

// Sync (load) the item from the database.
item.sync();
```

#### Benchmarks

100 samples (iterations) are used in all benchmarks in order to get accurate average readings.

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
