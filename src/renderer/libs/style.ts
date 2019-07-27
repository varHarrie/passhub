export default function style (
  property: string,
  options: string[],
  selectors: Array<string | boolean>
) {
  return selectors
    .map((selector, index) => {
      const value = options[index]
      const pair = `${property}: ${value};`

      if (typeof selector === 'boolean') {
        return selector ? pair : ''
      } else if (selector) {
        return `&:${selector} { ${pair} }`
      } else {
        return pair
      }
    })
    .join('\n')
}
