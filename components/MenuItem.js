import styles from './MenuItem.module.scss';
import Image from "next/image";
import Heading from "./Heading";
import Paragraph from "./Paragraph";

const MenuItem = ({ data }) => {
    const { title, price, description, image } = data;
    return (
        <article className={styles.menuItem}>
            <Image 
                src={image.sourceUrl}
                alt={image.altText}
                width={image.mediaDetails.width}
                height={image.mediaDetails.height}
                className={styles.image}
            />
            <div className={styles.content}>
                <Heading level={3}>{title}</Heading>
                <Heading level={4}>{price}</Heading>
                <Paragraph>{description}</Paragraph>
            </div>
        </article>
    )
}

export default MenuItem