# mergin

Merges files together using a best-effort merge. Returns false if it doesn't know how to merge the files

## Supported files

- Markdown files
- JSON files
- YAML files
- .gitignore
- .npmignore
- package.json (doesn't handle scripts yet)

## Install

```bash
npm install mergin
```

## Usage

```js
let merge = require('mergin')
let merged = merge('md', '# original', '# update')
```

See the tests for more examples.

## Contributing

100% open to adding new file types. Pull requests > Feature requests.

## Test

```
npm test
```

## License

MIT
