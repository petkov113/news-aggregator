import React, { ChangeEvent } from 'react';
import './Select.scss';

type DeferTypeInference<T> = [T][T extends any ? 0 : never];

type SelectProps<T extends string> = {
  title: string;
  name: string;
  items: T[];
  onChange: (e: ChangeEvent<HTMLSelectElement> & { target: { value: T } }) => void;
  defValue: DeferTypeInference<T>;
};

const Select = <T extends string>({ title, name, items, onChange, defValue }: SelectProps<T>) => {
  return (
    <div className='Select'>
      <label className='Select__label' htmlFor={name}>
        {title}:
      </label>
      <select className='Select__options' name={name} onChange={onChange} defaultValue={defValue}>
        {items.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
