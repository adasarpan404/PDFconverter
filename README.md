# converter-pdf-html — HTML to PDF converter

A small utility that converts HTML templates into PDF files using Handlebars for templating and html-pdf for PDF generation.

## Installation

Install the package from npm:

```bash
npm install converter-pdf-html --save
```

## Usage

Require the package and call `convert(doc, options)`. The function returns a Promise that resolves with the generated output (Buffer, Stream or file info) or rejects on error.

```javascript
const pdf = require('converter-pdf-html');

const doc = {
  html: '<p>{{message}}</p>',
  data: { message: 'Hello world' },
  // path is used when producing a file (default behavior)
  path: './output.pdf',
  // type can be 'buffer', 'stream' or omitted for a file
  type: 'buffer'
};

const options = {
  format: 'A4',
  orientation: 'portrait',
  border: '10mm'
};

pdf
  .convert(doc, options)
  .then((result) => {
    // when type === 'buffer' -> result is a Buffer
    // when type === 'stream' -> result is a Readable stream
    // when omitted -> result is an object containing the written file path
    console.log('Success:', result);
  })
  .catch((err) => console.error('Error:', err));
```

## API

convert(doc, options) -> Promise

- doc (object, required)
  - html (string) — Handlebars-compatible HTML template. Required.
  - data (object) — Data passed to the template. Required.
  - path (string) — Output file path when creating a file (default behavior).
  - type (string) — One of:
    - `'buffer'` — resolve with a Buffer containing the PDF data.
    - `'stream'` — resolve with a readable stream of the PDF data.
    - omitted or any other value — write a file at `doc.path` and resolve with file info.

- options (object, optional) — pdf generation options passed to html-pdf. Common options:
  - `format` — e.g. 'A3', 'A4', 'A5', 'Legal', 'Letter', 'Tabloid'.
  - `width` / `height` — custom dimensions (e.g. '8in', '210mm').
  - `orientation` — 'portrait' or 'landscape'.
  - `border` — margins, e.g. '10mm'.
  - `header` and `footer` — objects with `height` and `contents` (string or object) as supported by html-pdf.

Refer to html-pdf documentation for the full list of available options: https://github.com/marcbachmann/node-html-pdf

## Examples

1) Create a file (default):

```javascript
const doc = { html, data: { users }, path: './users.pdf' };
pdf.convert(doc, { format: 'A4' })
  .then(info => console.log('Written:', info))
  .catch(console.error);
```

2) Get a Buffer instead of writing a file:

```javascript
const doc = { html, data: { users }, type: 'buffer' };
pdf.convert(doc)
  .then(buffer => {
    // write buffer to disk, send over network, etc.
  })
  .catch(console.error);
```

## Testing

To run the test suite locally:

```bash
npm install
npm test
```

The project includes unit tests that check error cases and a successful buffer generation using a stub for the underlying PDF renderer.

## Contributing

Contributions, issues and feature requests are welcome. Please open an issue or submit a pull request on GitHub.

## License

This project is MIT licensed — see the `LICENSE` file for details.