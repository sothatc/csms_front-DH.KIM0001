import styles from './Button.module.scss';
const { IconImage } = require("..");


const Button = (props) => {
	const { name, value, image, onClickEvent, active=false, disabled=false, color='white', backgroundColor='default' } = props;
	const className = `${styles.btn} ${styles[`btn--background-${backgroundColor}`]}`;

	const onClickEventHandler = (e) => {
		onClickEvent && onClickEvent(name);
		e.target.blur();
	}

	return (
		<button
			id        = {name}
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