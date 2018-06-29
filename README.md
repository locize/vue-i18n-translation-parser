# Introduction

This is a module to parse an vue-i18n translation string into an AST and back to a string.

# Getting started

Source can be loaded via [npm](https://www.npmjs.com/package/vue-i18n-translation-parser) or downloaded from this repo.

```
# npm package
$ npm install vue-i18n-translation-parser
```

# Sample

```js
import { parse, stringify } from 'vue-i18n-translation-parser';

const AST = parse('<div>test</div>');
// will return
/*
[
  {
    "type": "tag",
    "name": "div",
    "voidElement": false,
    "attrs": {},
    "children": [
      {
        "type": "text",
        "content": "test"
      }
    ]
  }
]
*/
stringify(AST); // -> '<div>test</div>'

parse('test {{val}} text {{- encoded}} with {{val, format}} some $t{nesting} help');
// will return
/*
[
  {
    "type": "text",
    "content": "test "
  },
  {
    "type": "interpolation",
    "raw": "{{val}}",
    "prefix": "{{",
    "suffix": "}}",
    "content": "val",
    "variable": "val"
  },
  {
    "type": "text",
    "content": " text "
  },
  {
    "type": "interpolation_unescaped",
    "raw": "{{- encoded}}",
    "prefix": "{{-",
    "suffix": "}}",
    "content": " encoded",
    "variable": "encoded"
  },
  {
    "type": "text",
    "content": " with "
  },
  {
    "type": "interpolation",
    "raw": "{{val, format}}",
    "prefix": "{{",
    "suffix": "}}",
    "content": "val, format",
    "variable": "val, format"
  },
  {
    "type": "text",
    "content": " some "
  },
  {
    "type": "nesting",
    "raw": "$t{nesting}",
    "prefix": "$t{",
    "suffix": "}",
    "content": "nesting",
    "variable": "nesting"
  },
  {
    "type": "text",
    "content": " help"
  }
]
*/
```
