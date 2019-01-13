export type KeyValuePair<K> = [K, any]

export type KeyValuePairs<K> = Array<KeyValuePair<K>>

export function getDeepValue (obj: any, path: string | string[]): any {
  const [first, parts] = typeof path === 'string' ? path.split('.') : path

  if (!obj || !first) return undefined
  if (parts.length === 1) return obj[first]

  return getDeepValue(obj[first], parts.slice(1))
}

export function toPairs<T> (obj: T): KeyValuePairs<keyof T> {
  if (!obj) return []

  return Object.keys(obj).map((key) => {
    return [key, getDeepValue(obj, key)] as KeyValuePair<keyof T>
  })
}

export function match<T> (obj: any, conditions: KeyValuePairs<keyof T>) {
  for (const [key, value] of conditions) {
    if (obj[key] !== value) return false
  }

  return true
}

export function deepCopy<T> (obj: T): T {
  if (
    typeof obj === 'boolean' ||
    typeof obj === 'number' ||
    typeof obj === 'string' ||
    obj === null
  ) {
    return obj
  }

  if (obj instanceof Date) {
    return new Date(obj) as any
  }

  if (Array.isArray(obj)) {
    return obj.map((o) => deepCopy(o)) as any
  }

  if (typeof obj === 'object') {
    return Object.keys(obj).reduce(
      (newObj, key) => {
        newObj[key] = deepCopy((obj as any)[key])
        return newObj
      },
      {} as any
    )
  }

  return undefined as any
}
