import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import Profile from '../../Components/Containers/Profile/Profile'
import Feed from '../../Components/Containers/Feed/Feed'
import Saved from '../../Components/Containers/Saved/Saved'

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

export const useRoutes = (isAuth: boolean) => {
  const noAuthRoutes = [
    <Route path="/profile" component={Profile} key="profile" />,
    <Route path="/" exact component={Feed} key="feed" />,
  ]

  const authRoutes = [...noAuthRoutes, <Route path="/saved" component={Saved} key="saved" />]

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [routes, setRoutes] = useState(noAuthRoutes)

  useEffect(() => {
    if (isAuth === isAuthenticated) return
    if (isAuth) {
      setRoutes(authRoutes)
      setIsAuthenticated(true)
    } else {
      setRoutes(noAuthRoutes)
      setIsAuthenticated(false)
    }
  }, [isAuth, noAuthRoutes, authRoutes, isAuthenticated])

  return routes
}
