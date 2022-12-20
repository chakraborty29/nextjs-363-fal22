import styles from './MenuOverlay.module.scss';
import ButtonUI from './ButtonUI';
const MenuOverlay = ({
    closeHandler, 
    icon
}) => {
    return (
        <div className={styles.menuOverlay}>
            <h1>Menu Overlay</h1>
            <ButtonUI clickHandler={closeHandler} icon={icon}/>
        </div>
    );
}

export default MenuOverlay;