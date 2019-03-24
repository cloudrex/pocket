import Benchmark from "./benchmark";

const benchmark: Benchmark = new Benchmark();

console.log("--- Write ---");
console.log(`Write 1K items (${benchmark.samples} samples): ~${benchmark.write(1_000)}ms avg.`);
console.log(`Write 100K items (${benchmark.samples} samples): ~${benchmark.write(100_000)}ms avg.`);
console.log(`Write 1M items (${benchmark.samples} samples): ~${benchmark.write(1_000_000)}ms avg.`);
console.log(`Write 100M items (${benchmark.samples} samples): ~${benchmark.write(100_000_000)}ms avg.`);

console.log("\n--- Read ---");
console.log(`Read 1K items (${benchmark.samples} samples): ~${benchmark.read(1_000)}ms avg.`);
console.log(`Read 100K items (${benchmark.samples} samples): ~${benchmark.read(100_000)}ms avg.`);
console.log(`Read 1M items (${benchmark.samples} samples): ~${benchmark.read(1_000_000)}ms avg.`);
console.log(`Read 100M items (${benchmark.samples} samples): ~${benchmark.read(100_000_000)}ms avg.`);
