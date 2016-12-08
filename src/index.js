module.exports = (opts) => {
  const optsDefault = {
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
  }
  if (!opts) {
    opts = optsDefault.bem
  } else if (opts.preset && Object.keys(optsDefault).includes(opts.preset)) {
    opts = optsDefault[opts.preset]
  }
  const patternBlock = new RegExp(`(^| )${opts.blockPrefix}(?!${opts.blockPrefix.slice(0, 1)})([^\\s]+)`)
  const patternModifire = new RegExp(`(^| )(${opts.modifirePrefix}(?!${opts.modifirePrefix.slice(0, 1)})[^\\s]+)`, 'g')
  const patternElement = new RegExp(`(^| )(${opts.elementPrefix}(?!${opts.elementPrefix.slice(0, 1)})[^\\s]+)`)

  const walk = (node, blockName) => {
    if (!node.content) {
      return
    }
    const existClass = !!node.attrs && !!node.attrs.class
    const isBlock = existClass && patternBlock.test(node.attrs.class)
    const isElement = existClass && patternElement.test(node.attrs.class)

    if (isBlock) {
      blockName = blockName || node.attrs.class.match(patternBlock)[2]
      node.attrs.class = node.attrs.class.replace(patternBlock, '$1$2')
      node.attrs.class = node.attrs.class.replace(patternModifire, `$1${blockName}$2`)
    }
    if (isElement) {
      const element = node.attrs.class.match(patternElement)[2]
      node.attrs.class = node.attrs.class.replace(patternElement, `$1${blockName}$2`)
      node.attrs.class = node.attrs.class.replace(patternModifire, `$1${blockName}${element}$2`)
    }
    node.content.forEach((node) => {
      const isBlock = node.attrs && node.attrs.class && patternBlock.test(node.attrs.class)
      if (!isBlock) {
        walk(node, blockName)
      }
    })
  }
  return (tree) => {
    tree.match({attrs: {class: patternBlock}}, (node) => {
      walk(node)
      return node
    })
    return tree
  }
}
