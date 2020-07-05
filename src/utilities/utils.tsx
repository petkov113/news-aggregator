import { Provider } from 'react-redux'
import React, { ReactNode } from 'react'
import { rootReducer, RootState } from '../redux/reducers/rootReducer'
import { createStore, Store, applyMiddleware } from 'redux'
import { ReactElement } from 'react'
import { render } from '@testing-library/react'
import thunk from 'redux-thunk'

type RenderOptions = {
  initialState?: Partial<RootState>
  store?: Store
}

export const renderWithRedux = (
  component: ReactElement,
  {
    initialState,
    store = createStore(rootReducer, initialState, applyMiddleware(thunk)),
    ...options
  }: RenderOptions = {}
) => {
  function Wrapper({ children }: { children?: ReactNode }) {
    return <Provider store={store}>{children}</Provider>
  }
  return {
    ...render(component, { wrapper: Wrapper, ...options }),
    store,
  }
}
