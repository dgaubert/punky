## How to release

- On `develop` branch, `npm test`, fix if broken before proceeding.
- Ensure `CHANGELOG.md` section exists for the new version, review it, and update release date.
- Merge `develop` to `master`.
- On `master`, release new version `npm version [major|minor|patch|premajor] -m 'Bumped to %s'`
- On tag `vX.Y.Z`, `npm publish`
