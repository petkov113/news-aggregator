import { screen, waitFor } from '@testing-library/react'
import { createTestArticles } from './utilities/utils'
import { renderWithRedux } from './utilities/utils'
import { userAxios } from '../axios/axios'
import MockAdapter from 'axios-mock-adapter'
import Saved from '../Components/Containers/Saved/Saved'
import React from 'react'
import user from '@testing-library/user-event'
import { CommentType } from '../Components/Comments/Comments'

const testArticles = createTestArticles(1, true)
const comment: CommentType = {
  author: 'comment author',
  id: 'comment id',
  message: 'comment message',
  date: 'comment date',
}

const userClick = () => {
  const card = screen.getAllByRole('img', { name: /article/i })[0]
  user.click(card)
}

new MockAdapter(userAxios)
  .onGet(/.*users.*/)
  .replyOnce(200, null)
  .onGet(/.*users.*/)
  .reply(200, testArticles)
  .onGet(/.*comments.*/)
  .reply(200, [comment])
  .onPatch(/.*users.*/)
  .reply(200)
  .onPost(/.*comments.*/)
  .reply(200)

describe('FEED', () => {
  beforeEach(() => {
    renderWithRedux(<Saved />)
  })

  it('shows only the message and neither cards nor reader if no articles were saved', async () => {
    expect(screen.getByText(/you haven't saved anything yet/i)).toBeInTheDocument()
    await waitFor(() => {
      testArticles.forEach((article) => {
        expect(screen.queryByText(new RegExp(`${article.title}`))).not.toBeInTheDocument()
      })
    })
  })

  it('shows only the cards and no message if there are saved articles', async () => {
    expect(screen.queryByText(/you haven't saved anything yet/i)).not.toBeInTheDocument()
    const testArticle = testArticles[0]
    await waitFor(() => {
      expect(screen.getByText(new RegExp(`${testArticle.title}`))).toBeInTheDocument()
    })
    expect(screen.getAllByText(new RegExp(`${testArticle.title}`))).toHaveLength(1)
  })

  it('shows the reader with the card title, author and description after a card click', async () => {
    userClick()
    await waitFor(() => {
      expect(screen.getAllByText(testArticles[0].title)).toHaveLength(2)
      expect(screen.getByText(testArticles[0].description)).toBeInTheDocument()
      expect(screen.getByText(testArticles[0].author)).toBeInTheDocument()
    })
  })

  it('shows the comments section after a card click', async () => {
    userClick()
    await waitFor(() => {
      expect(screen.getByText(/comments/i)).toBeInTheDocument()
      expect(screen.getByText(/comment author/i)).toBeInTheDocument()
      expect(screen.getByText(/comment date/i)).toBeInTheDocument()
      expect(screen.getByText(/comment message/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
    })
  })

  it('shows social buttons after a card click', async () => {
    userClick()
    await waitFor(() => {
      expect(screen.getByTestId(/social/i)).toBeInTheDocument()
    })
  })

  it('deletes the article after a deletion button click', async () => {
    const btn = screen.getAllByRole('button')[0]
    const article = screen.getByText(/title.*/i)
    user.click(btn)
    await waitFor(() => {
      expect(article).not.toBeInTheDocument()
    })
  })

  it('renders the input correctly', () => {
    userClick()
    const input = screen.getByRole('textbox')
    user.type(input, 'test')
    expect(screen.getByDisplayValue(/test/i)).toBeInTheDocument()
  })

  it('shows loader if the comments are updating', async () => {
    userClick()
    const input = screen.getByRole('textbox')
    const btn = screen.getByRole('button', { name: /submit/i })
    user.type(input, 'test')
    user.click(btn)
    await waitFor(() => {
      expect(screen.getByTestId('loader')).toBeInTheDocument()
    })
    await waitFor(() => {
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
    })
  })
})
