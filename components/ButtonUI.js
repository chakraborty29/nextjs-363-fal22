import Icon from "./Icon";
import classnames from 'classnames/bind';
import styles from './ButtonUI.module.scss'

let cx = classnames.bind(styles);
const ButtonUI = ({
    clickHandler,
    icon
}) => {
    let buttonClasses = cx({
        buttonUI: true,
        close: icon === "close"
    });
    return (
        <button 
            className={buttonClasses}
            onClick={clickHandler}
        >
            <Icon type={icon} size="32" color="white" />
        </button>
    )
}

export default ButtonUI;