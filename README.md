#### PocketDB

A pocket-sized Node.js, NoSQL database.

#### Installation

```shell
$ npm install --save pocket
```

#### Features

* **Tiny** -- Small package size, 0 depedencies.
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

// Sync the item from the database.
item.sync();
```

#### Benchmarks

*Coming soon!*
