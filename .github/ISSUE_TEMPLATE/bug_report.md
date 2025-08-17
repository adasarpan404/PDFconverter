---
name: Bug report
about: Create a report to help us fix a bug in converter-pdf-html
title: "Bug: "
labels: bug
assignees: []
---

Before opening a bug, please check the README and existing issues. The README explains usage, API and testing: https://github.com/adasarpan404/PDFconverter#readme

**Describe the bug**
A clear and concise description of what the bug is and what you expected to happen.

**Minimal, reproducible example**
Provide a minimal snippet that reproduces the issue. Include the HTML template, the `doc` object (html, data, type, path if used) and any options you passed to `convert(doc, options)`.

Example:
```javascript
const doc = {
  html: '<p>{{greeting}}</p>',
  data: { greeting: 'Hello' },
  type: 'buffer'
};
convert(doc, {})
  .then(() => {})
  .catch(console.error);
```

If possible, include a small `template.html` file and sample data JSON.

**To reproduce**
Steps to reproduce the behavior:
1. Checkout the repository or install `converter-pdf-html`.
2. Run the minimal example above (include exact commands).
3. Observe the error or unexpected output.

**Logs and stack traces**
Paste full error messages and stack traces. If you are seeing stdout/stderr from html-pdf or phantomjs, include those logs.

**Environment (please complete the following information):**
 - OS: [e.g. macOS, Windows, Linux]
 - Node version: [e.g. 18.x]
 - Package version: [e.g. 1.0.1]
 - html-pdf version: [e.g. 3.0.1]
 - handlebars version: [e.g. 4.7.7]

**Tests / CI**
If you can reproduce the bug in the repository, please add or modify a test under `test/` (this project uses Mocha/Chai and nyc). Indicate whether the failure occurs locally or in CI (GitHub Actions).

**Workarounds tried**
List any steps you tried to work around the issue.

**Additional context**
Add any other context about the problem here (screenshots, lcov output, links to related issues).
