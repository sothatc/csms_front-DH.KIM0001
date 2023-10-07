import { useState } from 'react';
import styles from './Select.module.scss';

const Select = ({ name, dataSet=[{}], onChangeEvent=()=>{}, disabled, value }) => {
  const [toggle        , setToggle]         = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const onChangeHandler = (codeVal, codeNm) => {
    onChangeEvent && onChangeEvent(name, codeVal);
    setSelectedOption(codeNm);
    setToggle(false);
  }

  return (
    <div className={styles.select}>
      <button
        className = {`${styles['select__name']} ${selectedOption && styles['select--active']}`}
        onClick   = { () =>{ !disabled && setToggle((prev) => !prev)} }
      >
        <div>
          {dataSet.filter(item => item.value === value).length > 0 ?
            dataSet.filter(item => item.value === value)[0].text
            :
            '선택해주세요'
          }
        </div>
        <div>▼</div>
      </button>
      <ul className={`${styles['select__list']} ${toggle ? styles['select__list--active'] : undefined}`}>
        {dataSet.length > 0 && dataSet.map(({text, value}, key) => (
          <li
            value   = {value}
            key     = {`${value}_${key}`}
            onClick = {() => onChangeHandler(value, text)}
          >
            {text}
          </li>
        ))}
      </ul>
    </div>
  )
}

export {Select};