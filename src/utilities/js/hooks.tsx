import { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import Profile from '../../Components/Containers/Profile/Profile'
import Feed from '../../Components/Containers/Feed/Feed'
import Saved from '../../Components/Containers/Saved/Saved'
import axios from 'axios'

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

  return [theme, changeTheme] as const
}

const noAuthRoutes = [
  <Route path="/profile" component={Profile} key="profile" />,
  <Route path="/" exact component={Feed} key="feed" />,
]
const authRoutes = [...noAuthRoutes, <Route path="/saved" component={Saved} key="saved" />]

export const useRoutes = (isAuth: boolean) => {
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
  }, [isAuth, isAuthenticated])
  return routes
}

export const useExchangeRates = () => {
  const [currency, setCurrency] = useState('')
  const [rate, setRate] = useState('')

  const [exchangeRateArray, setExchangeRateArray] = useState<CurrencyRate[]>()

  const [counter, setCounter] = useState(0)

  useEffect(() => {
    const request = axios.CancelToken.source()
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiResponse>('https://api.exchangeratesapi.io/latest', {
          cancelToken: request.token,
        })
        const ratesArray = Object.entries(response.data.rates).reduce<CurrencyRate[]>(
          (acc, cur) => {
            return [
              ...acc,
              {
                currency: cur[0],
                rate: cur[1].toFixed(2).toString(),
              },
            ]
          },
          []
        )
        setExchangeRateArray(ratesArray)
      } catch (e) {}
    }
    fetchData()
    return () => request.cancel()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (exchangeRateArray) {
        setCurrency(exchangeRateArray[counter].currency)
        setRate(exchangeRateArray[counter].rate)
        setCounter((count) => (count < exchangeRateArray.length - 1 ? ++count : 0))
      }
    }, 3000)
    return () => clearInterval(interval)
  }, [exchangeRateArray, counter])

  return { currency, rate }
}

type ApiResponse = {
  rates: { [currency: string]: number }
  base: string
  date: string
}

export type CurrencyRate = { currency: string; rate: string }
