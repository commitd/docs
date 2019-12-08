import { Item } from '../types'

export const firstUrl = (item: Item) => {
  return firstInfo(item).url
}

export const firstInfo = ({ items, info }: Item) => {
  if (info) {
    return info
  } else {
    if (items.length === 0) {
      throw new Error('All leaf nodes should have info')
    } else {
      return firstInfo(items[0])
    }
  }
}
