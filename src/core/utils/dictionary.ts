import { array, option, record, string } from 'fp-ts'
import { pipe } from 'fp-ts/lib/function'
import { Predicate } from 'fp-ts/lib/Predicate'

const collectValues = function <V>(dict: Record<string, V>): V[] {
  const collect = pipe((_key: string, value: V) => value, record.collect(string.Ord))
  return pipe(dict, collect)
}

const collectAndFilter = function <V>(dict: Record<string, V>, filter: Predicate<V>): V[] {
  return pipe(dict, collectValues, array.filter(filter))
}

type DictionaryState<V> = [Record<string, V>, V]

//The state monad probably helps here:  research it: https://paulgray.net/the-state-monad/
const getOrCreate = function <K extends string, V>(
  dict: Record<K, V>,
  key: K,
  supplier: () => V,
): [Record<K, V>, V] {
  const onNone = (): DictionaryState<V> => {
    const newValue = supplier()
    return [{ ...dict, [key]: newValue }, newValue]
  }

  const onSome = (val: V): DictionaryState<V> => [dict, val]

  return pipe(dict, record.lookup(key), option.fold(onNone, onSome))
}

export const Dictionary = {
  collectValues,
  collectAndFilter,
  getOrCreate,
}
