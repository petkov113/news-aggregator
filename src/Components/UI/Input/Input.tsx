import React, { FC, ChangeEvent } from 'react'
import './Input.scss'

type InputProps = {
  label: string
  value: string | number
  type: 'text' | 'email' | 'password' | 'textarea'
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onBlur: () => void
}

export const Input: FC<InputProps> = ({ label, type, value, onChange, onBlur }) => {
  const id = Math.random().toString(36).substr(2, 9)
  return (
    <div className='Input'>
      <label className='Input__label' htmlFor={`input${id}`}>
        {label}:
      </label>
      <input
        className='Input__field'
        onChange={onChange}
        type={type}
        value={value}
        onBlur={onBlur}
      />
    </div>
  )
}
