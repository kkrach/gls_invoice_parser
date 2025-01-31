# GLS Invoice Parser
The GLS Invoide Parser adds a new text-box to the webpage of the GLS Bank, and copies from there IBAN, amount, subject, etc to the fields of the cash transfer form

## Testing

The tests can be performed with `nodejs tests/parser-tests.mjs`.

## Release

To release a new version, the following steps have to be performed:

 - Update version in manifest.json
 - Update CHANGELOG
 - Commit changes
 - Create tag with e.g. `git tag v0.3`
 - Push changes with `git push` and `git push --tags`
 - Create XPI file
 - Upload the XPI file to https://addons.mozilla.org/en-US/firefox/
