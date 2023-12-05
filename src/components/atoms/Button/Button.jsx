import { IconImage } from '..';
import styles from './Button.module.scss';


const Button = (props) => {
	const { key, name, value, image, onClickEvent, active=false, disabled=false, color='white', backgroundColor='default', ext='' } = props;
	const className = `${styles.btn} ${styles[`btn--background-${backgroundColor}`]} ${ext}`;

	const onClickEventHandler = (e) => {
		onClickEvent && onClickEvent(name);
		e.target.blur();
	}
console.log(className);
	return (
		<button
			id        = {name}
      key       = {key}
			onClick   = {onClickEventHandler}
			disabled  = {disabled}
			className = {className}
		>
			{image && <IconImage icon={image} />}
			{value && value}
		</button>
	)
}

export { Button };