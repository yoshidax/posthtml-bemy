module.exports = () => {
  const normalizeClassesChildElements = (node, blockName) => {
    if (!node.content) {
      return
    }
    node.content.forEach((node) => {
      if (node.attrs && node.attrs.class) {
        // stop walking when it detects a new block.
        if (node.attrs.class.trim().split(/\s+/).find((clazz) => /^_[a-zA-Z0-9]/.test(clazz))) {
          return
        }
        let normalizeClasses = node.attrs.class.trim().split(/\s+/).map((clazz) => {
          if (/^(__|--)[a-zA-Z0-9]/.test(clazz)) {
            return `${blockName}${clazz}`
          }
          return clazz
        })
        node.attrs.class = normalizeClasses.join(' ')
      }
      normalizeClassesChildElements(node, blockName)
    })
  }
  return (tree) => {
    tree.match({attrs: {class: /(\s|^)_[a-zA-Z0-9]/}}, (node) => {
      let blockName
      let normalizeClasses = node.attrs.class.trim().split(/\s+/).map((clazz) => {
        if (/^_[a-zA-Z0-9]/.test(clazz)) {
          blockName = clazz.replace(/^_/, '')
          return blockName
        }
        return clazz
      })
      normalizeClasses = normalizeClasses.map((clazz) => {
        if (/^--[a-zA-Z0-9]/.test(clazz)) {
          return `${blockName}${clazz}`
        }
        return clazz
      })
      node.attrs.class = normalizeClasses.join(' ')
      normalizeClassesChildElements(node, blockName)
      return node
    })
    return tree
  }
}
