import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const exports = {};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('src/components/lightningTrigger.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText, { exports });
const { advanceLightning: step, newLightningVisit: fresh } = exports;

test('one down strike, one return strike, then exhausted despite repeated scrolling', () => {
  let state = fresh();
  for (const [progress, expected] of [[0,0], [.49,0], [.51,1], [.8,1], [.49,2], [1,2], [0,2], [1,2], [0,2]]) {
    state = step(state, progress);
    assert.equal(state.count, expected);
  }
});
test('small reversals around halfway do not spend the return strike', () => {
  let state = step(step(fresh(), 0), .51);
  for (const progress of [.49,.52,.48,.55,.47]) state = step(state, progress);
  assert.equal(state.count, 1);
  state = step(step(state, .6), .48);
  assert.equal(state.count, 2);
});
test('large scroll jumps work and busy return is deferred', () => {
  let state = step(step(fresh(), 0), .9);
  assert.equal(state.count, 1);
  state = step(state, .1, true);
  assert.equal(state.count, 1);
  state = step(state, .1, false);
  assert.equal(state.count, 2);
});
test('deep restored position alone does not fire and a new visit gets a fresh allowance', () => {
  assert.equal(step(fresh(), .8).count, 0);
  let state = step(step(step(fresh(), 0), .8), .1);
  assert.equal(state.count, 2);
  state = step(step(fresh(), 0), .8);
  assert.equal(state.count, 1);
});
