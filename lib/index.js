'use strict';

module.exports = function (opts) {
  var optsDefault = {
    bem: {
      blockPrefix: '_',
      elementPrefix: '__',
      modifirePrefix: '--'
    },
    suitecss: {
      blockPrefix: '_',
      elementPrefix: '-',
      modifirePrefix: '--'
    }
  };
  if (!opts) {
    opts = optsDefault.bem;
  } else if (opts.preset && Object.keys(optsDefault).includes(opts.preset)) {
    opts = optsDefault[opts.preset];
  }
  var patternBlock = new RegExp('(^| )' + opts.blockPrefix + '(?!' + opts.blockPrefix.slice(0, 1) + ')([^\\s]+)');
  var patternModifire = new RegExp('(^| )(' + opts.modifirePrefix + '(?!' + opts.modifirePrefix.slice(0, 1) + ')[^\\s]+)', 'g');
  var patternElement = new RegExp('(^| )(' + opts.elementPrefix + '(?!' + opts.elementPrefix.slice(0, 1) + ')[^\\s]+)');

  var walk = function walk(node, blockName) {
    if (!node.content) {
      return;
    }
    var existClass = !!node.attrs && !!node.attrs.class;
    var isBlock = existClass && patternBlock.test(node.attrs.class);
    var isElement = existClass && patternElement.test(node.attrs.class);

    if (isBlock) {
      blockName = blockName || node.attrs.class.match(patternBlock)[2];
      node.attrs.class = node.attrs.class.replace(patternBlock, '$1$2');
      node.attrs.class = node.attrs.class.replace(patternModifire, '$1' + blockName + '$2');
    }
    if (isElement) {
      var element = node.attrs.class.match(patternElement)[2];
      node.attrs.class = node.attrs.class.replace(patternElement, '$1' + blockName + '$2');
      node.attrs.class = node.attrs.class.replace(patternModifire, '$1' + blockName + element + '$2');
    }
    node.content.forEach(function (node) {
      var isBlock = node.attrs && node.attrs.class && patternBlock.test(node.attrs.class);
      if (!isBlock) {
        walk(node, blockName);
      }
    });
  };
  return function (tree) {
    tree.match({ attrs: { class: patternBlock } }, function (node) {
      walk(node);
      return node;
    });
    return tree;
  };
};