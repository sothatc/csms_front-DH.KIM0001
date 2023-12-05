import styles from './Checkbox.module.scss';


const Checkbox = (props) => {
	const {name, label, checked} = props;
	const {index=0, keyProp='_defalut', disabled=false, onChangeEvent} = props;

  const onChangeHandler = ({ target }) => {
		onChangeEvent && onChangeEvent(name, target.checked);
	};

	return (
    <div className={`${styles['shape__input--check']}`}>
      <input
        id={`${name}_${index}`}
        className={`${styles['a11y-hidden']}`}
        type='checkbox'
				value    = {keyProp}
				checked  = {checked}
				disabled = {disabled}
				onChange = {onChangeHandler}
      />
      <label htmlFor={`${name}_${index}`}>
        <div>
          {/* <span className='a11y-hidden'>{label}</span> */}
        </div>
        <span>{label}</span>
      </label>
    </div>
	);
}

export { Checkbox };