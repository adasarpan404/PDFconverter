---
name: Feature request
about: Suggest a new feature or improvement for converter-pdf-html
title: "Feature: "
labels: enhancement
assignees: []
---

Before filing a feature request, please read the README and existing issues. This repository converts Handlebars HTML templates into PDFs using html-pdf. Helpful context can be found in the README (usage, API and testing): https://github.com/adasarpan404/PDFconverter#readme

**What is the motivation or use-case for this feature?**
Describe the real problem this feature solves and who benefits from it. For example: improve performance for large documents, add support for other template engines, enable direct streaming to HTTP responses, provide TypeScript type definitions, add a Docker image for consistent rendering, etc.

**Describe the solution you'd like**
Be specific about the API changes or new behavior. If this affects the public API, include:
- Proposed function signature or options (example: `convert(doc, options)` additions)
- New `doc` fields or `options` keys and their types/semantics
- Examples of expected usage (short code snippet)

Example:
- Add `engine: 'handlebars' | 'ejs'` to `doc` so callers can switch template engines.
- New option `streamDirect: true` to return a stream that can be piped into an Express response.

**Backwards compatibility**
Will this change break existing users? If so, please suggest a migration path or how to keep compatibility (e.g. new option defaults to current behavior).

**Tests & Validation**
Describe tests you expect to be added. This repo has unit tests in `test/convert.test.js` and uses Mocha/Chai and nyc for coverage. Please include at least one unit test and update coverage if applicable.

**Documentation**
List the README sections that must be updated (Usage, API, Examples, Testing, CI). If the feature affects publishing/CI, note required workflow changes (the repo uses a GitHub Actions publish workflow and enforces coverage).

**Alternatives considered**
Describe other approaches you considered and why you prefer the proposed solution.

**Implementation notes (optional)**
If you plan to implement this feature, include an outline of the implementation steps, files to modify (e.g. `index.js`, tests, README), and any third-party libraries you would add.

**Additional context / links**
Add any other context, screenshots, or links (issues, external libs, RFCs) that help explain the request.

Thank you — contributors: please add the label `enhancement` and link related issues or PRs.
