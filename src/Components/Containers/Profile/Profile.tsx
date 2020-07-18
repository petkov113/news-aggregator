import React, { FC, ChangeEvent, useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import {
  auth,
  sendCountry,
  logout,
  sendName,
  setName,
  getUserData,
  sendLanguage
} from '../../../redux/actions/profileActions'
import { MapStateTypes, MapDispatchTypes } from './ProfileTypes'
import { routerVariants } from '../../../utilities/variants'
import { RootState } from '../../../redux/reducers/rootReducer'
import { Country, Language } from '../../../redux/reducers/ReducersTypes'
import { motion } from 'framer-motion'
import { Input } from '../../UI/Input/Input'
import AuthForm from '../../Form/AuthForm'
import Button from '../../UI/Button/Button'
import Select from '../../UI/Select/Select'
import './Profile.scss'
import Loader from '../../UI/Loader/Loader'

const countries: Country[] = [
  { label: 'USA', value: 'US' },
  { label: 'Russia', value: 'RU' },
  { label: 'Bulgaria', value: 'BG' },
]

const languages: Language[] = [
  { label: 'English', value: 'EN' },
  { label: 'Русский', value: 'RU' },
  { label: 'Български', value: 'BG' },
]

export const Profile: FC<ProfileProps> = ({
  isAuthentiphicated,
  auth,
  loading,
  logout,
  sendCountry,
  sendLanguage,
  sendName,
  user,
  setName,
  getUserData,
}) => {
  useEffect(() => {
    getUserData()
  }, [getUserData, isAuthentiphicated])

  const onCoutryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const country = countries.find((el) => el.value === e.target.value) as Country
    sendCountry(country)
  }

  const onLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const item = languages.find((el) => el.value === e.target.value) as Language
    sendLanguage(item)
  }

  return (
    <motion.div
      variants={routerVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
      className='Profile'>
      {isAuthentiphicated ? (
        <div className='Profile__settings'>
          <h1 className='Profile__title'>Settings</h1>
          {loading ? (
            <Loader />
          ) : (
            <div className='Profile__inputs'>
              <Select
                label='Select your country'
                defValue={countries.find((el) => user.country.label === el.label)!}
                name='countries'
                items={countries}
                onChange={onCoutryChange}
              />
              <Select
                label='Select news language'
                defValue={languages.find((el) => user.language.label === el.label)!}
                name='languages'
                items={languages}
                onChange={onLanguageChange}
              />
              <Input
                type='text'
                label='Name'
                onChange={(e) => setName(e.target.value)}
                value={user.name ?? ''}
                onBlur={sendName}
              />
              <Button btnType='primary' onClick={logout} value='Logout' />
            </div>
          )}
        </div>
      ) : (
        <>
          <div className='Profile__intro'>
            <h1 className='Profile__title'>Newsium</h1>
            <h2 className='Profile__subtitle'>News from all over the world in one place</h2>
          </div>
          <div className='Profile__form'>
            <h2 className='Profile__subtitle'>Log in to get the full access</h2>
            <AuthForm handleRegister={auth} isLoading={loading} handleLogin={auth} />
            <div className='Profile__info'>
              <span>Creating an account will give you the ability to:</span>
              <ul>
                <li>Save articles to read them later</li>
                <li>Select the country</li>
                <li>Subscribe to a particular sources</li>
              </ul>
            </div>
          </div>
        </>
      )}
    </motion.div>
  )
}

const mapStateToProps = (state: RootState): MapStateTypes => ({
  isAuthentiphicated: state.profile.isAuth,
  loading: state.profile.loading,
  user: {
    name: state.profile.name,
    language: state.profile.language,
    country: state.profile.country,
  },
})

const mapDispatchToProps: MapDispatchTypes = {
  auth,
  sendCountry,
  logout,
  sendName,
  setName,
  getUserData,
  sendLanguage,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ProfileProps = ConnectedProps<typeof connector>

export default connector(Profile)
