import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const source = ts.transpileModule(fs.readFileSync("src/lib/site-origin.ts", "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;

function config(SITE_URL, NODE_ENV = "production") {
  const exports = {};
  vm.runInNewContext(source, { exports, URL, process: { env: { SITE_URL, NODE_ENV } }, require: () => ({}) });
  return exports;
}

test("development alone can use a non-indexable localhost fallback", () => {
  assert.equal(config(undefined, "development").siteUrl.origin, "http://localhost:3000");
  assert.equal(config(undefined, "development").isIndexable, false);
  assert.throws(() => config(undefined), /Set SITE_URL/);
  assert.throws(() => config("  "), /Set SITE_URL/);
});

test("production rejects insecure/local origins and non-origin URLs", () => {
  for (const origin of ["http://portfolio.example", "https://localhost", "https://localhost.", "https://preview.localhost", "https://127.0.0.2", "https://[::1]", "https://0.0.0.0", "https://portfolio.example/path", "https://portfolio.example?q=1", "https://portfolio.example#fragment", "https://user:pass@portfolio.example", "file:///tmp", "invalid"]) {
    assert.throws(() => config(origin), origin);
  }
});

test("the deployment origin is normalized and available for metadata", () => {
  const result = config(" https://portfolio.example/ ");
  assert.equal(result.siteUrl.origin, "https://portfolio.example");
  assert.equal(result.isIndexable, true);
  assert.equal(new URL("/de/work", result.siteUrl).href, "https://portfolio.example/de/work");
});
