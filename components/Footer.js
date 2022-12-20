import Container from './Container';
import styles from './Footer.module.scss';
import Paragraph from './Paragraph';
const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Container>
                <Paragraph>
                    &copy; 2022-23. Syracuse Restaurants.
                </Paragraph>
            </Container>
        </footer>
    )
}

export default Footer;