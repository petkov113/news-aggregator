export const toCapital = (el: string) => {
  return el.replace(/^\w/, (l) => l.toUpperCase())
}

export const createID = () => Math.random().toString(36).substr(2, 9)
