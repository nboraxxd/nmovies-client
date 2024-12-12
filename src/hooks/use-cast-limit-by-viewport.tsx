import { useMediaQuery } from 'usehooks-ts'

export default function useCastLimitByViewport() {
  const is480AndUp = useMediaQuery('(min-width: 480px)')
  const is640AndUp = useMediaQuery('(min-width: 640px)')
  const is768AndUp = useMediaQuery('(min-width: 768px)')
  const is1280AndUp = useMediaQuery('(min-width: 1280px)')

  let castLimit = 0

  if (is1280AndUp) {
    castLimit = 6
  } else if (is768AndUp) {
    castLimit = 5
  } else if (is640AndUp) {
    castLimit = 4 * 2
  } else if (is480AndUp) {
    castLimit = 3 * 2
  } else {
    castLimit = 2 * 2
  }

  return castLimit
}
