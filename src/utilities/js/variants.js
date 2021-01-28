export const savedVariants = {
  hidden: { opacity: 0, x: '-100%' },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'tween',
      staggerChildren: 0.03,
    },
  },
}

export const readerVariants = {
  hidden: { x: '+100%' },
  visible: {
    x: 0,
    transition: {
      type: 'tween',
    },
  },
  exit: {x: '+100%', transition: {
    type: 'tween'
  }}
}
