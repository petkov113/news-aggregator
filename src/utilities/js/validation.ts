export const validateAuthor = (author: null | string): string => {
  const authorBlacklist = new RegExp(/.*arxiv.*/)
  return author && !authorBlacklist.test(author) ? author.toUpperCase() : ''
}

export const validateDescription = (description: null | string): string =>
  description ? description : ''

export const validateImgSrc = (url: null | string): string => {
  const imagesBlacklist = new RegExp(
    /(.*kubrick.*)|(.*wthr.*)|(.*nydailynews.*)|(.*statesman.*)|(.*arabnews.*)|(.*washingtonpost.*)/
  )
  return url && !imagesBlacklist.test(url) ? url : './placeholder.jpg'
}
