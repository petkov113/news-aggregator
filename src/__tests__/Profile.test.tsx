import { initialState as profileState } from '../redux/reducers/profileReducer'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import { renderWithRedux } from '../utilities/utils'
import { RootState } from '../redux/reducers/rootReducer'
import Profile from '../Components/Containers/Profile/Profile'
import React from 'react'
import user from '@testing-library/user-event'
import { AxiosResponse } from 'axios'

const stateWithAuth = {
  initialState: {
    profile: { ...profileState, isAuth: true },
  } as RootState,
}

const formSetup = (valid: boolean, blur?: boolean) => {
  renderWithRedux(<Profile />)
  const emailField = screen.getByPlaceholderText(/email/i)
  const passwordField = screen.getByPlaceholderText(/password/i)

  user.type(emailField, valid ? 'test@mail.com' : blur ? '' : 'testmail.com')
  fireEvent.blur(emailField)
  user.type(passwordField, valid ? '123456' : blur ? '' : '12345')
  fireEvent.blur(passwordField)
}

jest.mock('axios', () => ({
  post: jest
    .fn()
    .mockResolvedValueOnce({ data: {}, status: 200, statusText: '' } as AxiosResponse)
    .mockResolvedValueOnce({ data: {}, status: 200, statusText: '' } as AxiosResponse)
    .mockRejectedValueOnce({
      response: { data: { error: { message: 'EMAIL_EXISTS' } } } as AxiosResponse,
    })
    .mockRejectedValueOnce({
      response: { data: { error: { message: 'EMAIL_NOT_FOUND' } } } as AxiosResponse,
    })
    .mockRejectedValueOnce({
      response: { data: { error: { message: 'other error' } } } as AxiosResponse,
    }),
}))

describe('PROFILE', () => {
  it('shows only the intro and form sections if the user in not authentiphicated', () => {
    renderWithRedux(<Profile />)

    expect(screen.getByRole('heading', { name: /newsium/i })).toBeInTheDocument()
    expect(screen.getByRole('form')).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: /settings/i })).not.toBeInTheDocument()
  })

  it('shows only the settings section if the user is authenticated', () => {
    renderWithRedux(<Profile />, stateWithAuth)

    expect(screen.getByRole('heading', { name: /settings/i })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: /newsium/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('form')).not.toBeInTheDocument()
  })

  it('should logout after the logout-button press', () => {
    renderWithRedux(<Profile />, stateWithAuth)
    user.click(screen.getByRole('button', { name: /logout/i }))
    expect(screen.queryByRole('heading', { name: /settings/i })).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /newsium/i })).toBeInTheDocument()
    expect(screen.getByRole('form')).toBeInTheDocument()
  })

  it('shows the select value in accordance to the state', () => {
    renderWithRedux(<Profile />, stateWithAuth)
    const selectElement = screen.getByRole('combobox') as HTMLSelectElement
    expect(screen.getByDisplayValue(/usa/i)).toBeInTheDocument()

    fireEvent.change(selectElement, { target: { value: 'Russia' } })
    expect(screen.getByDisplayValue(/russia/i)).toBeInTheDocument()
  })

  it('throws an error if the form field is invalid', async () => {
    formSetup(false)

    await waitFor(() => {
      expect(screen.getByText(/email must be a valid email/i)).toBeInTheDocument()
      expect(
        screen.getByText(/password should contain at least [0-9] symbols/i)
      ).toBeInTheDocument()
    })
  })

  it("doesn't throw an error if the form field is valid", async () => {
    formSetup(true)

    await waitFor(() => {
      expect(screen.queryByText(/email must be a valid email/i)).not.toBeInTheDocument()
      expect(
        screen.queryByText(/password should contain at least [0-9] symbols/i)
      ).not.toBeInTheDocument()
    })
  })

  it('throws an error if the field is empthy onblur', async () => {
    formSetup(false, true)

    await waitFor(() => {
      expect(screen.getAllByText(/the field is required/i)).toHaveLength(2)
    })
  })

  it('buttons should be disabled if the field is invalid', async () => {
    formSetup(false)

    await waitFor(() => {
      expect(screen.getAllByRole('button')[0]).toBeDisabled()
      expect(screen.getAllByRole('button')[1]).toBeDisabled()
    })
  })

  it('buttons should not be disabled if the fields are valid', async () => {
    formSetup(true)

    await waitFor(() => {
      expect(screen.getAllByRole('button')[0]).not.toBeDisabled()
      expect(screen.getAllByRole('button')[1]).not.toBeDisabled()
    })
  })

  it('should login and show settings page if the form signin is succesfull', async () => {
    formSetup(true)
    const login = screen.getByRole('button', { name: /login/i })

    fireEvent.click(login)
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /settings/i })).toBeInTheDocument()
    })
  })

  it('should login and show settings page if the registration is succesfull', async () => {
    formSetup(true)
    const login = screen.getByRole('button', { name: /register/i })

    fireEvent.click(login)
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /settings/i })).toBeInTheDocument()
    })
  })

  it('should show registration error if the email is already registered', async () => {
    formSetup(true)
    const login = screen.getByRole('button', { name: /login/i })

    fireEvent.click(login)
    await waitFor(() => {
      expect(
        screen.getByText(/this email is already registered. please, login/i)
      ).toBeInTheDocument()
    })
  })

  it('should show signin error if the email is not registered', async () => {
    formSetup(true)
    const login = screen.getByRole('button', { name: /login/i })

    fireEvent.click(login)
    await waitFor(() => {
      expect(
        screen.getByText(/this email haven't been registered yet. please, register/i)
      ).toBeInTheDocument()
    })
  })

  it('should show error if the email or the password is incorrect', async () => {
    formSetup(true)
    const login = screen.getByRole('button', { name: /login/i })

    fireEvent.click(login)
    await waitFor(() => {
      expect(screen.getByText(/email or password is incorrect/i)).toBeInTheDocument()
    })
  })
})
