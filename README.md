# posthtml-bemy <img align="right" width="220" height="200" title="PostHTML logo" src="http://posthtml.github.io/posthtml/logo.svg">

[![NPM][npm]][npm-url]
[![Deps][deps]][deps-url]
[![Build][build]][build-badge]
[![Standard Code Style][style]][style-url]

This plugin improves the tiredness of writing HTML with [MindBEMding](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)
 using the power of posthtml.

 This plugin is a different way than respecting [posthtml-bem](https://github.com/rajdee/posthtml-bem).  
I recommend that you examine the difference of the method with posthtml-bem.

Before:
``` html
// Block appends "_" to the prefix.
// Element appends "__" to the prefix.
// Modifire appends "--" to the prefix.
// Yes!! You don't have to add "Block" to the "Element" or "Modifire" prefix!!
<div class="_block --modifire">
    <div class="__element __element--modifire">
        <div class="_block-child">
            <div class="__element-1">1</div>
            <div class="__element-2">2</div>
            <div class="__element-3">3</div>
            <div class="something">something</div>
        </div>
    </div>
</div>
```

After:

``` html
<div class="block block--modifire">
    <div class="block__element block__element--modifire">
        <div class="block-child">
            <div class="block-child__element-1">1</div>
            <div class="block-child__element-2">2</div>
            <div class="block-child__element-3">3</div>
            <div class="something">something</div>
        </div>
    </div>
</div>
```

## Install

> npm i posthtml posthtml-bemy

## Usage

``` js
const fs = require('fs');
const posthtml = require('posthtml');
const posthtmlBemy = require('posthtml-bemy');

posthtml()
    .use(posthtmlBemy())
    .process(html/*, options */)
    .then(result => fs.writeFileSync('./after.html', result.html));
```

## Options

nothing.

### License [MIT](LICENSE)

[npm]: https://img.shields.io/npm/v/posthtml.svg
[npm-url]: https://npmjs.com/package/posthtml-bemy

[deps]: https://david-dm.org/yoshidax/posthtml-bemy.svg
[deps-url]: https://david-dm.org/yoshidax/posthtml-bemy

[style]: https://img.shields.io/badge/code%20style-standard-yellow.svg
[style-url]: http://standardjs.com/

[build]: https://travis-ci.org/posthtml/posthtml.svg?branch=master
[build-badge]: https://travis-ci.org/yoshidax/posthtml-bemy?branch=master
