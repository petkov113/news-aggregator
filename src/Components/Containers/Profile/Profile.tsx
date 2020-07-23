import React, { FC, ChangeEvent, useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import {
  auth,
  sendRegion,
  logout,
  sendName,
  setName,
  getUserData,
  sendLanguage
} from '../../../redux/actions/profileActions'
import { MapStateTypes, MapDispatchTypes } from './ProfileTypes'
import { routerVariants } from '../../../utilities/variants'
import { RootState } from '../../../redux/reducers/rootReducer'
import { Region, Language } from '../../../redux/reducers/ReducersTypes'
import { motion } from 'framer-motion'
import { Input } from '../../UI/Input/Input'
import AuthForm from '../../Form/AuthForm'
import Button from '../../UI/Button/Button'
import Select from '../../UI/Select/Select'
import './Profile.scss'
import Loader from '../../UI/Loader/Loader'

const regions: Region[] = [
  { label: 'USA', value: 'US' },
  { label: 'Russia', value: 'RU' },
  { label: 'Europe', value: 'EU' },
]

const languages: Language[] = [
  { label: 'English', value: 'en' },
  { label: 'Русский', value: 'ru' },
  { label: 'German', value: 'de' },
]

export const Profile: FC<ProfileProps> = ({
  isAuthentiphicated,
  auth,
  loading,
  logout,
  sendRegion,
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
    const region = regions.find((el) => el.value === e.target.value) as Region
    sendRegion(region)
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
                label='Select your region'
                defValue={regions.find((el) => user.region.label === el.label)!}
                name='countries'
                items={regions}
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
                <li>Select the region and news language</li>
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
    region: state.profile.region,
  },
})

const mapDispatchToProps: MapDispatchTypes = {
  auth,
  sendRegion,
  logout,
  sendName,
  setName,
  getUserData,
  sendLanguage,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ProfileProps = ConnectedProps<typeof connector>

export default connector(Profile)
