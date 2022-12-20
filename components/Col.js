import styles from './Col.module.scss';
import classNames from 'classnames/bind';

let cx = classNames.bind(styles);
const Col = ({ children, width }) => {
    let colClasses = cx({
        col: true,
        [`col-${width}`]: width
    });
    return (
        <div className={colClasses}>
            {children}
        </div>
    )
}

export default Col;