export const noop = (arg?: any) => arg

export function clamp (value: number, min: number, max: number) {
  return value > max ? max : value < min ? min : value
}

export function randomId () {
  return Math.random()
    .toString(36)
    .slice(2)
}
