<!-- filepath: .github/PULL_REQUEST_TEMPLATE.md -->

## Summary
One-sentence summary of the change and the motivation (why this change is needed for converter-pdf-html).

## Type of change
- [ ] Bugfix
- [ ] Feature
- [ ] Documentation
- [ ] Tests
- [ ] Refactor
- [ ] Chore / CI / Release

## Related issues
Closes/Fixes # (issue number) — link any related issues or feature requests.

## Proposed changes
Short description of what you changed and why. If the change affects the public API, describe the exact API changes (e.g. new `doc` fields or `options` keys) and provide example usage.

## Backwards compatibility / Migration
State whether this is backward compatible. If not, include migration steps and examples to help users upgrade.

## Tests added or updated
List tests added/updated and where. This repository uses Mocha/Chai (`test/convert.test.js`). Include at least one unit test for the change and keep nyc coverage at 100%.

## CI / Publishing impact
If the change affects CI or publishing, list required updates:
- Update `.github/workflows/publish.yml` if publish behavior changes.
- Ensure `NPM_TOKEN` secret is set for publish jobs.
- Running `npm run coverage` (nyc) is required in CI and will fail if coverage < 100%.

## Checklist (required)
- [ ] I added/updated unit tests and they pass: `npm test`
- [ ] Coverage remains at 100% locally: `npm run coverage`
- [ ] I updated README.md where applicable (Usage, API, Examples, Testing)
- [ ] If relevant, I updated or added GitHub Actions workflow(s)
- [ ] For publish changes: bumped package version and added release notes
- [ ] I added migration notes for breaking changes

## How to test locally
1. Install dependencies: `npm ci`
2. Run tests: `npm test`
3. Run coverage and enforce thresholds: `npm run coverage`
4. (Optional) Manual smoke test example:
   - Create a small HTML template and run:
     ```bash
     node -e "require('./index').convert({ html: '<p>{{msg}}</p>', data: { msg: 'hi' }, type: 'buffer' }) .then(r => console.log('ok', Buffer.isBuffer(r))) .catch(console.error)"
     ```

## Additional notes for reviewers
- Highlight any potential breaking changes, performance impacts, or security implications.
- If the PR touches packaging/publishing, confirm the version bump and NPM_TOKEN secret.

---
Please request reviews from maintainers when ready.
