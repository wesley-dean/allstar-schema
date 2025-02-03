# allstar-schema

This project is for drafting JSON schemae for OpenSSF's Allstar tool.  They will
eventually live somewhere else, but for now, here they are.

> [!CAUTION]
> This is VERY much in development and things may not work properly.

## Plans

Update the [JSON Schema Store](https://schemastore.org/) catalog with these
schema files so that tools (e.g., [v8r](https://github.com/chris48s/v8r/)) can
validate Allstar configuration files, potentially in conjunction with
[MegaLinter](https://megalinter.io/)'s YAML descriptors.

## Development

## Validating schema files

To validate that the schema files are valid, use:

```bash
# validate a single document
bin/validate.bash schemae/allstar.admin.schema.yaml

# validate all schema files with a .yaml extension
bin/validate.bash schemae/*.yaml

# validate all schema files by passing the schemae directory
bin/validate.bash schemae/
```

This verifies that the schema files are valid per the base schema definition
for schema files.

## Testing schema files

To test the schema files and verify that they are are able to test schema
definitions, use:

```bash
# run a single test
bin/test.bash tests/admin.01.yaml

# run all tests with a .yaml extension
bin/test.bash tests/*.yaml

# run a single collection of tests
bin/test.bash tests/*01.yaml

# run all tests
bin/test.bash tests/
```

Note: test files are named for the file that they're testing, a test collection
number, and the `.yaml` extension.  For example, `tests/outside.01.yaml` tests
the `outside` file and belongs to collection number 1.
