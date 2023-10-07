import styles from './Checkbox.module.scss';

const Checkbox = (props) => {
    const {name, label, checked} = props;
    const {index = 0, keyProp = '_default', disabled=false, onChangeEvent} = props;
    
    const onChangeHandler = ({ target }) => {
        onChangeEvent && onChangeEvent(name, target.checked);
    };
    
    return (
        <div className = {'${styles.chk}'}>
            <input
                id    = {'${name}_${index}'}
                name  = {name}
                type  = "checkbox"
                checked = {checked}
                disabled = {disabled}
                onChange = {onChangeHandler}
            />

            <label
                htmlFor = {'${name}_${index}'}
                className = {'${styles.chk__label}'}
            >
                {label}
            </label>

        </div>
    );
}

export { Checkbox };