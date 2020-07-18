export const routerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { type: 'tween' } },
  exit: { opacity: 0 },
}

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
