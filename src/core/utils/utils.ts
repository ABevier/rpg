import { option } from 'fp-ts'
import { reduce } from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
import { getMonoid } from 'fp-ts/lib/Option'
import { first } from 'fp-ts/lib/Semigroup'

type Option<V> = option.Option<V>

const or = function <V>(...list: Option<V>[]): Option<V> {
  const M = getMonoid<V>(first())
  return pipe(list, reduce(option.none, M.concat))
}

export const Utils = { or }
