import classnames from 'classnames/bind';
import Link from 'next/link';
import styles from './Button.module.scss'

let cx = classnames.bind(styles);

const Button = ({ 
    label = "Default label",
    path,
    type, 
    clickHandler 
}) => {
    let buttonClass = cx({
        btn: true,
        primary: type === "primary",
        secondary: type === "secondary"
    });
    return ( 
        path 
            ?
            <Link className={buttonClass} href={path}>
              {label}  
            </Link>
            : 
            <button className={buttonClass} onClick={clickHandler}> {label} </button> 
    )
}

export default Button;