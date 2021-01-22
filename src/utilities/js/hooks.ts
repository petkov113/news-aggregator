import { useEffect, useState } from 'react'

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('NEWSIUM/theme') as Theme) || Theme.LIGHT
  })

  const changeTheme = () => {
    theme === Theme.LIGHT ? setTheme(Theme.DARK) : setTheme(Theme.LIGHT)
  }

  useEffect(() => {
    localStorage.setItem('NEWSIUM/theme', theme)
  }, [theme])

  return { theme, changeTheme }
}
