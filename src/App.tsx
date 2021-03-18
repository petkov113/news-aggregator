import { FC, useEffect } from 'react'
import { Switch, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { autoLogin } from './redux/actions/profileActions'
import { RootState } from './redux/reducers/rootReducer'
import { useRoutes, useTheme } from './utilities/js/hooks'
import ThemeToggle from './Components/UI/ThemeToggler/ThemeToggle'
import Sidebar from './Components/Sidebar/Sidebar'
import './App.scss'

const App: FC = () => {
  const [theme, changeTheme] = useTheme()
  const isAuthenticated = useSelector((state: RootState) => state.profile.isAuth)
  const routes = useRoutes(isAuthenticated)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(autoLogin())
  }, [dispatch])

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

export default App
