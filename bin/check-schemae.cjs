const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Ajv = require("ajv");
const Ajv2020 = require("ajv/dist/2020");
const root = path.resolve(__dirname, "..");
const schemas = new Map();
const ajv = new Ajv({ strict: true });
const ajv2020 = new Ajv2020({ strict: true });
const validators = new Map();
for (const name of fs.readdirSync(path.join(root, "schemae"))) {
  if (!name.endsWith(".json")) continue;
  assert.match(name, /^allstar-[a-z]+\.json$/);
  const schema = JSON.parse(fs.readFileSync(path.join(root, "schemae", name), "utf8"));
  assert.equal(schema.$id, "https://json.schemastore.org/" + name);
  schemas.set(schema.$id, schema);
  const validator = schema.$schema === "https://json-schema.org/draft/2020-12/schema"
    ? ajv2020
    : ajv;
  validator.addSchema(schema);
  validators.set(schema.$id, validator);
}
const seen = new Set();
const titles = new Set();
for (const name of fs.readdirSync(path.join(root, "catalog"))) {
  if (!name.endsWith(".json")) continue;
  const entry = JSON.parse(fs.readFileSync(path.join(root, "catalog", name), "utf8"));
  assert(schemas.has(entry.url), entry.url);
  assert(!seen.has(entry.url), entry.url);
  assert(!titles.has(entry.name), entry.name);
  seen.add(entry.url);
  titles.add(entry.name);
  assert.deepEqual(entry.fileMatch || [], name === "allstar.catalog.json" ? ["allstar.json"] : []);
}
assert.equal(seen.size, schemas.size);
for (const id of schemas.keys()) assert(validators.get(id).getSchema(id), id);
const branch = ajv.getSchema("https://json.schemastore.org/allstar-branch.json#/definitions/StatusCheck");
for (const appID of [null, 1]) assert(branch({context: "test", appID}));
for (const appID of ["1", 1.5, false]) assert(!branch({context: "test", appID}));
const scorecard = ajv.getSchema("https://json.schemastore.org/allstar-scorecard.json#/definitions/RepoConfig");
for (const checks of [null, [], ["test"]]) assert(scorecard({checks}));
for (const checks of ["test", [1], false]) assert(!scorecard({checks}));
const day = ajv2020.getSchema("https://json.schemastore.org/allstar-allstar.json#/definitions/Day");
for (const value of ["monday", "saturday", "wednesday"]) assert(day(value));
for (const value of ["mon", ["monday"], null]) assert(!day(value));
console.log("SchemaStore compatibility checks passed.");
