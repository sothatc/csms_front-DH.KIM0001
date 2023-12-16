import { IconImage } from '..';
import styles from './Button.module.scss';


const Button = (props) => {
	const { key, name, value, image, onClickEvent, active=false, disabled=false, color='white', backgroundColor='default' } = props;
	const classNames = `${styles.btn} ${styles[`btn--background-${backgroundColor}`]}`;

	const onClickEventHandler = (e) => {
		onClickEvent && onClickEvent(name);
		e.target.blur();
	}

	return (
		<button
			id        = {name}
      key       = {key}
			onClick   = {onClickEventHandler}
			disabled  = {disabled}
			className = {classNames}
		>
			{image && <IconImage icon={image} />}
			{value && value}
		</button>
	)
}

export { Button };