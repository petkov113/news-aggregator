import { Article } from '../redux/reducers/ReducersTypes'
import React from 'react'
import { screen, waitFor, cleanup } from '@testing-library/react'
import Feed, { categoriesList } from '../Components/Containers/Feed/Feed'
import { renderWithRedux } from '../utilities/utils'
import user from '@testing-library/user-event'
import MockAdapter from 'axios-mock-adapter'
import axiosInstance from '../axios/axios'
import { RootState } from '../redux/reducers/rootReducer'
import { initialState as profileState } from '../redux/reducers/profileReducer'

type ServerResponse = {
  articles: Article[]
  totalResults: number
}

const response: ServerResponse = {
  articles: [...Array(2)].map((_, index) => ({
    source: { id: null, name: '' },
    title: `title ${index}`,
    url: '',
    urlToImage: '',
    description: '',
    publishedAt: index.toString(),
    id: '',
  })),
  totalResults: 2,
}

new MockAdapter(axiosInstance)
  .onGet(/.*top-headlines\?country=.*&pageSize/).replyOnce(200, response)
  .onGet(/.*top-headlines\?country=.*&pageSize/).replyOnce(200, response)
  .onGet(/.*top-headlines\?country=.*&pageSize/).replyOnce(200, response)
  .onGet(/.*top-headlines\?country=.*&pageSize/).replyOnce(200, response)
  .onGet(/.*top-headlines\?country=.*&pageSize/).replyOnce(500)
  .onGet(/.*top-headlines\?country=.*&category/).replyOnce(200, response)
  .onGet(/.*everything.*/).replyOnce(200, response)
  .onGet(/.*everything.*/).replyOnce(200, { totalResults: 0 } as ServerResponse)

const searchSetup = () => {
  const searchField = screen.getByPlaceholderText(/search/i)
  const btn = screen.getByRole('button', { name: '' })
  user.type(searchField, 'test')
  user.click(btn)
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

  it('renders the header with categories and the footer', () => {
    expect(screen.getByText(/top news/i)).toBeInTheDocument()
    expect(screen.getByText(/powered by/i)).toBeInTheDocument()
    categoriesList.forEach((category) =>
      expect(screen.getByText(new RegExp(`${category}`, 'i'))).toBeInTheDocument()
    )
  })

  it('shows articles after the initial mount', async () => {
    // useEffect
    await waitFor(() =>
      expect(screen.getAllByText(/title.*/i)).toHaveLength(response.articles.length)
    )
  })

  it('shows buttons if the user is authenthiphicated', async () => {
    cleanup()
    renderWithRedux(<Feed />, stateWithAuth)
    await waitFor(() =>
      expect(screen.getAllByRole('button', { name: /(save)|(subscribe)/i })).toHaveLength(
        response.articles.length * 2
      )
    )
  })

  it('shows new articles after the category change', async () => {
    categoryChangeSetup()
    await waitFor(() => expect(screen.queryAllByText(/title.*/i)).toHaveLength(0)) // old
    await waitFor(() =>
      expect(screen.getAllByText(/title.*/i)).toHaveLength(response.articles.length)
    ) // new
  })

  it('shows new articles after the search-form submit', async () => {
    searchSetup()
    await waitFor(() => expect(screen.queryAllByText(/title.*/i)).toHaveLength(0))
    await waitFor(() =>
      expect(screen.getAllByText(/title.*/i)).toHaveLength(response.articles.length)
    )
  })

  it('shows error if no articles has been found', async () => {
    searchSetup()
    await waitFor(() => expect(screen.queryAllByText(/title.*/i)).toHaveLength(0))
    await waitFor(() => expect(screen.getByText(/nothing has been found/i)).toBeInTheDocument())
  })

  it('shows 8 placeholders during loading', async () => {
    categoryChangeSetup()
    await waitFor(() => expect(screen.getAllByTestId('post-placeholder')).toHaveLength(8)) // appearing
    await waitFor(() => expect(screen.queryAllByTestId('post-placeholder')).toHaveLength(0)) // disappearing
  })

  it('shows error message on a bad request', async () => {
    // useEffect
    await waitFor(() => expect(screen.getByText(/server error/i)))
  })
})
