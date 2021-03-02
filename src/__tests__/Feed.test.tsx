import { renderWithRedux, createTestArticles } from './utilities/utils'
import { initialState as profileState } from '../redux/reducers/profileReducer'
import { screen, waitFor, cleanup } from '@testing-library/react'
import Feed, { categoriesList } from '../Components/Containers/Feed/Feed'
import { atriclesAxios } from '../axios/axios'
import { RootState } from '../redux/reducers/rootReducer'
import { Article } from '../redux/types/ReducersTypes'
import MockAdapter from 'axios-mock-adapter'
import user from '@testing-library/user-event'
import React from 'react'

type ServerResponse = {
  news: [] | Article[]
  status: string
}

const response: ServerResponse = {
  news: createTestArticles(2),
  status: 'ok',
}

new MockAdapter(atriclesAxios)
  .onGet(/\/latest-news\?.*/)
  .replyOnce(200, { news: [] } as ServerResponse)
  .onGet(/\/latest-news\?.*/)
  .replyOnce(500)
  .onGet(/\/latest-news\?.*/)
  .reply(200, response)
  .onGet(/\/search\?.*/)
  .replyOnce(200, response)

const searchSetup = () => {
  const searchField = screen.getByPlaceholderText(/search/i)
  user.type(searchField, 'test')
}

const categoryChangeSetup = () => {
  const button = screen.getByText(new RegExp(`${categoriesList[1]}`, 'i'))
  user.click(button)
}

const stateWithAuth = {
  initialState: {
    profile: { ...profileState, isAuth: true },
  } as RootState,
}

describe('FEED', () => {
  beforeEach(() => {
    renderWithRedux(<Feed />)
  })

  it('shows error if no articles have been found', async () => {
    await waitFor(() => expect(screen.queryAllByText(/title.*/i)).toHaveLength(0))
    await waitFor(() => expect(screen.getByText(/nothing has been found/i)).toBeInTheDocument())
  })

  it('shows error message on a bad request', async () => {
    await waitFor(() => expect(screen.getByText(/server error/i)))
  })

  it('renders the header with categories and the footer on desktop', () => {
    expect(screen.getByText(/latest news/i)).toBeInTheDocument()
    expect(screen.getByText(/powered by/i)).toBeInTheDocument()
    categoriesList.forEach((category) =>
      expect(screen.getByText(new RegExp(`${category}`, 'i'))).toBeInTheDocument()
    )
  })

  it('shows articles after the initial mount', async () => {
    // useEffect
    await waitFor(() => expect(screen.getAllByText(/title.*/i)).toHaveLength(response.news.length))
  })

  it('shows buttons only if the user is authenthiphicated', async () => {
    expect(screen.queryAllByRole('checkbox')).toHaveLength(0)
    cleanup()
    renderWithRedux(<Feed />, stateWithAuth)
    await waitFor(() => expect(screen.getAllByRole('checkbox')).toHaveLength(response.news.length))
  })

  it('removes the old articles after the category change', async () => {
    categoryChangeSetup()
    await waitFor(() => expect(screen.queryAllByText(/title.*/i)).toHaveLength(0)) // old
    await waitFor(() => expect(screen.getAllByText(/title.*/i)).toHaveLength(response.news.length)) // new
  })

  it('shows 8 placeholders during loading', async () => {
    categoryChangeSetup()
    await waitFor(() => expect(screen.getAllByTestId('post-placeholder')).toHaveLength(8)) // appearing
    await waitFor(() => expect(screen.queryAllByTestId('post-placeholder')).toHaveLength(0)) // disappearing
  })

  it('removes the old articles after the search-form submit', async () => {
    searchSetup()
    await waitFor(() => expect(screen.queryAllByText(/title.*/i)).toHaveLength(0))
  })

  it('saves the article on "save" button click', async () => {
    cleanup()
    renderWithRedux(<Feed />, stateWithAuth)
    await waitFor(() => {
      const btn = screen.getAllByRole('checkbox')[1]
      expect(btn).not.toBeChecked()
      user.click(btn)
      expect(btn).toBeChecked()
    })
  })

  it('shows categories on mobile devices after the burger btn click', async () => {
    global.innerWidth = 800
    user.click(screen.getByTestId('burger'))
    await waitFor(() => {
      categoriesList.forEach((category) =>
        expect(screen.getByText(new RegExp(`${category}`, 'i'))).toBeVisible()
      )
    })
  })

})
