'use strict';

module.exports = function () {
  var normalizeClassesChildElements = function normalizeClassesChildElements(node, blockName) {
    if (!node.content) {
      return;
    }
    node.content.forEach(function (node) {
      if (node.attrs && node.attrs.class) {
        // stop walking when it detects a new block.
        if (node.attrs.class.trim().split(/\s+/).find(function (clazz) {
          return (/^_[a-zA-Z0-9]/.test(clazz)
          );
        })) {
          return;
        }
        var normalizeClasses = node.attrs.class.trim().split(/\s+/).map(function (clazz) {
          if (/^(__|--)[a-zA-Z0-9]/.test(clazz)) {
            return '' + blockName + clazz;
          }
          return clazz;
        });
        node.attrs.class = normalizeClasses.join(' ');
      }
      normalizeClassesChildElements(node, blockName);
    });
  };
  return function (tree) {
    tree.match({ attrs: { class: /(\s|^)_[a-zA-Z0-9]/ } }, function (node) {
      var blockName = void 0;
      var normalizeClasses = node.attrs.class.trim().split(/\s+/).map(function (clazz) {
        if (/^_[a-zA-Z0-9]/.test(clazz)) {
          blockName = clazz.replace(/^_/, '');
          return blockName;
        }
        return clazz;
      });
      normalizeClasses = normalizeClasses.map(function (clazz) {
        if (/^--[a-zA-Z0-9]/.test(clazz)) {
          return '' + blockName + clazz;
        }
        return clazz;
      });
      node.attrs.class = normalizeClasses.join(' ');
      normalizeClassesChildElements(node, blockName);
      return node;
    });
    return tree;
  };
};