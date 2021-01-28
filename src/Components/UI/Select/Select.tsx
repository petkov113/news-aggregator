import { ChangeEvent } from 'react'
import './Select.scss'

type DeferTypeInference<T> = [T][T extends any ? 0 : never]

export type SelectProps<T extends { label: string; value: string }> = {
  label: string
  name: string
  items: T[]
  onChange: (e: ChangeEvent<HTMLSelectElement> & { target: { value: T } }) => void
  defValue: DeferTypeInference<T>
}

const Select = <T extends { label: string; value: string }>({
  label,
  name,
  items,
  onChange,
  defValue,
}: SelectProps<T>) => {
  return (
    <div className='Select'>
      <label className='Select__label' htmlFor={name}>
        {label}:
      </label>
      <select
        className='Select__options'
        name={name}
        id={name}
        onChange={onChange}
        defaultValue={defValue.value}>
        {items.map((item) => (
          <option value={item.value} key={item.value} data-testid='select-option'>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
