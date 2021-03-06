import React, { FC, useEffect } from 'react'
import { Switch, Redirect } from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux'
import { autoLogin } from './redux/actions/profileActions'
import { requestRates } from './redux/actions/websocketActions'
import { RootState } from './redux/reducers/rootReducer'
import { useRoutes, useTheme } from './utilities/js/hooks'
import { Thunk } from './redux/types/ActionsTypes'
import ThemeToggle from './Components/UI/ThemeToggler/ThemeToggle'
import Sidebar from './Components/Sidebar/Sidebar'
import './App.scss'

const App: FC<AppProps> = ({ isAuthenticated, autoLogin, requestRates }) => {
  const [theme, changeTheme] = useTheme()
  const routes = useRoutes(isAuthenticated)

  useEffect(() => {
    autoLogin()
    requestRates()
  }, [autoLogin, requestRates])

  return (
    <div className={`App ${theme}`}>
      <Sidebar isAuthenticated={isAuthenticated}>
        <ThemeToggle theme={theme} onChange={changeTheme} />
      </Sidebar>
      <Switch>
        {routes}
        <Redirect to="/" />
      </Switch>
    </div>
  )
}

type MapState = { isAuthenticated: boolean }
const mapStateToProps = (state: RootState): MapState => ({ isAuthenticated: state.profile.isAuth })

type MapDispatch = { autoLogin: () => Thunk; requestRates: () => void }
const mapDispatchToProps: MapDispatch = { autoLogin, requestRates }

const connector = connect(mapStateToProps, mapDispatchToProps)
type AppProps = ConnectedProps<typeof connector>

export default connector(App)
