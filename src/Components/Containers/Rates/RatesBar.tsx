import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { disconnectRates, requestRates } from '../../../redux/actions/websocketActions'
import { RootState } from '../../../redux/reducers/rootReducer'
import './RatesBar.scss'

const RatesBar = () => {
  const dispatch = useDispatch()
  const state = useSelector((state: RootState) => state.currencies)

  useEffect(() => {
    dispatch(requestRates())
    return () => {
      dispatch(disconnectRates())
    }
  }, [dispatch])

  return (
    <section className="RatesBar">
      <i className="RatesBar__icon fab fa-bitcoin" />
      <span className="RatesBar__rate">{state.bitcoin?.toFixed(2)}</span>
      <i className="RatesBar__icon fab fa-monero" />
      <span className="RatesBar__rate">{state.monero?.toFixed(2)}</span>
      <i className="RatesBar__icon fab fa-ethereum" />
      <span className="RatesBar__rate">{state.ethereum?.toFixed(2)}</span>
    </section>
  )
}

export default RatesBar
