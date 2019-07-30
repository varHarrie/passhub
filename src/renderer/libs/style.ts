export default function style (
  property: string,
  options: string[],
  selectors: Array<string | boolean>
) {
  return selectors
    .map((selector, index) => {
      const value = options[index]
      const pair = `${property}: ${value};`

      if (typeof selector === 'string') {
        return selector ? `&:${selector} { ${pair} }` : pair
      } else if (selector === true) {
        return `&& { ${pair} }`
      } else {
        return ''
      }
    })
    .join('\n')
}
