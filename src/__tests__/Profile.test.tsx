import { initialState as profileState } from '../redux/reducers/profileReducer'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import { renderWithRedux } from './utilities/utils'
import { RootState } from '../redux/reducers/rootReducer'
import Profile from '../Components/Containers/Profile/Profile'
import React from 'react'
import user from '@testing-library/user-event'
import MockAdapter from 'axios-mock-adapter'
import { authAxios, userAxios } from '../axios/axios'
import { UserData } from '../redux/actions/ActionsTypes'

const userData: UserData = {
  name: 'test',
  language: { label: 'German', value: 'de' },
  region: { label: 'Russia', value: 'RU' },
}

const stateWithAuth = {
  initialState: {
    profile: {
      ...profileState,
      isAuth: true,
      userId: 'test',
      ...userData,
    },
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

const createSuccesResponse = (data = {}) => ({
  data,
  status: 200,
  statusText: 'ok',
})

new MockAdapter(authAxios)
  .onPost()
  .replyOnce(200, createSuccesResponse())
  .onPost()
  .replyOnce(400, { error: { message: 'EMAIL_EXISTS' } })
  .onPost()
  .replyOnce(400, { error: { message: 'EMAIL_NOT_FOUND' } })
  .onPost()
  .replyOnce(400, { error: { message: 'other error' } })

new MockAdapter(userAxios).onGet().reply(200, userData).onPatch().reply(200)

describe('PROFILE', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

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

  it('should logout after the logout-button press', async () => {
    renderWithRedux(<Profile />, stateWithAuth)
    await waitFor(() => {
      user.click(screen.getByRole('button', { name: /logout/i }))
      expect(screen.queryByRole('heading', { name: /settings/i })).not.toBeInTheDocument()
      expect(screen.getByRole('heading', { name: /newsium/i })).toBeInTheDocument()
      expect(screen.getByRole('form')).toBeInTheDocument()
    })
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

  it('shows the inputs values in accordance to the state', async () => {
    renderWithRedux(<Profile />, stateWithAuth)
    await waitFor(() => {
      expect(screen.getByDisplayValue(userData.region!.label)).toBeInTheDocument()
      expect(screen.getByDisplayValue(userData.language.label)).toBeInTheDocument()
      expect(screen.getByDisplayValue(userData.name!)).toBeInTheDocument()
    })
  })

  it('shows the settings page if the form signin is succesfull', async () => {
    formSetup(true)
    const login = screen.getByRole('button', { name: /login/i })

    fireEvent.click(login)
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /settings/i })).toBeInTheDocument()
    })
  })

  it('shows registration error if the email is already registered', async () => {
    formSetup(true)
    const login = screen.getByRole('button', { name: /login/i })
    fireEvent.click(login)
    await waitFor(() => {
      expect(screen.getByText(/this email is already registered/i)).toBeInTheDocument()
    })
  })

  it('shows signin error if the email is not registered', async () => {
    formSetup(true)
    const login = screen.getByRole('button', { name: /login/i })

    fireEvent.click(login)
    await waitFor(() => {
      expect(screen.getByText(/this email hasn't been registered yet/i)).toBeInTheDocument()
    })
  })

  it('shows error if the email or the password is incorrect', async () => {
    formSetup(true)
    const login = screen.getByRole('button', { name: /login/i })

    fireEvent.click(login)
    await waitFor(() => {
      expect(screen.getByText(/email or password is incorrect/i)).toBeInTheDocument()
    })
  })

  it('shows loader if state is loading', () => {
    renderWithRedux(<Profile />, stateWithAuth)
    expect(screen.getByTestId('loader')).toBeInTheDocument()
  })

  it('changes the select region values', async () => {
    renderWithRedux(<Profile />, stateWithAuth)
    await waitFor(() => {
      screen.getByLabelText(/.*region.*/i)
    })
    fireEvent.change(screen.getByLabelText(/.*region.*/i), { target: { value: 'RU' } })
    await waitFor(() => {
      const options = screen.getAllByTestId('select-option') as HTMLOptionElement[]
      expect(options[0].selected).toBeFalsy()
      expect(options[1].selected).toBeTruthy()
      expect(options[2].selected).toBeFalsy()
    })
  })

  it('changes the select language values', async () => {
    renderWithRedux(<Profile />, stateWithAuth)
    await waitFor(() => {
      screen.getByLabelText(/.*language.*/i)
    })
    fireEvent.change(screen.getByLabelText(/.*language.*/i), { target: { value: 'en' } })
    await waitFor(() => {
      const options = screen.getAllByTestId('select-option') as HTMLOptionElement[]
      expect(options[0].selected).toBeFalsy()
      expect(options[1].selected).toBeTruthy()
      expect(options[2].selected).toBeFalsy()
    })
  })

  it('changes the name value', async () => {
    renderWithRedux(<Profile />, stateWithAuth)
    await waitFor(() => {
      screen.getByLabelText(/.*name.*/i)
    })
    const input = screen.getByLabelText(/.*name.*/i)
    user.type(input, 'test')
    await waitFor(() => {
      expect(screen.getByDisplayValue(/test/i))
    })
  })
})
