import styles from './Paragraph.module.scss';
import classNames from 'classnames/bind'

let cx = classNames.bind(styles);

const Paragraph = ({ children, marginBottom }) => {
    let paragraphClasses = cx({
		paragraph: true,
        [`mb-${marginBottom}`]: marginBottom
	});

    return <p className={`${paragraphClasses}`}>{children}</p>
}

export default Paragraph;