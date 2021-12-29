import { array, record, string } from 'fp-ts'
import { pipe } from 'fp-ts/lib/function'
import { Predicate } from 'fp-ts/lib/Predicate'

const collectAndFilter = function <K extends string, V>(dict: Record<K, V>, filter: Predicate<V>): V[] {
  const collectValues = pipe((_key: string, value: V) => value, record.collect(string.Ord))
  return pipe(dict, collectValues, array.filter(filter))
}

export const Dictionary = {
  collectAndFilter,
}
