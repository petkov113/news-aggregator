import { Provider } from 'react-redux'
import React, { ReactNode } from 'react'
import { rootReducer, RootState } from '../../redux/reducers/rootReducer'
import { createStore, Store, applyMiddleware } from 'redux'
import { ReactElement } from 'react'
import { render } from '@testing-library/react'
import thunk from 'redux-thunk'
import { Article } from '../../redux/reducers/ReducersTypes'

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

export const createTestArticles = (count: number, saved = false): Article[] => {
  return [...Array(count)].reduce((acc, _, i): Article[] => {
    const article: Article = {
      title: `title ${i}`,
      url: `url_${i}`,
      image: `image_${i}`,
      isSaved: saved,
      author: `author ${i}`,
      published: '2020-01-01',
      description: `descriprtion ${i}`,
      id: i.toString(),
    }
    return [...acc, article]
  }, [])
}
