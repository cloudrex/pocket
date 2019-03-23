#### PocketDB

A pocket-sized Node.js, NoSQL database.

#### Installation

```shell
$ npm install --save pocket
```

#### Usage

```ts
import Db from "pocket";

// Initialization.
const db = new Db();

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

#### Features

* **Tiny** -- Small package size, 0 depedencies.
* **Performant** -- Uses efficient algorithms and data structures under the hood.
* **Dynamic** -- Can be used in-memory, or as a persistent data storage.
* **Extensible** -- Built with modularity in mind.
* **Interactive** -- Simply, chain-able, and predictable API.

#### Benchmarks

*Coming soon!*
