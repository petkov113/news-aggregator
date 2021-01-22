import React, { FC } from 'react'
import { Theme } from '../../../App'
import './ThemeToggler.scss'

type Props = {
  theme: Theme
  onChange: () => void
}

const ThemeToggle: FC<Props> = ({ theme, onChange }) => {
  let isChecked: boolean
  theme === Theme.LIGHT ? (isChecked = false) : (isChecked = true)

  return (
    <div className="toggle-wrapper">
      <input type="checkbox" checked={isChecked} id="theme-toggle" onChange={onChange} />
      <label htmlFor="theme-toggle" className="toggle">
        <span className="toggle__ray">
          <span className="ray ray--1"></span>
          <span className="ray ray--2"></span>
          <span className="ray ray--3"></span>
        </span>
        <span className="toggle__items">
          <span className="glare"></span>
          <span className="dot dot--1"></span>
          <span className="dot dot--2"></span>
          <span className="dot dot--3"></span>
        </span>
      </label>
    </div>
  )
}

export default ThemeToggle
