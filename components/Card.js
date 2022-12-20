import Button from './Button';
import styles from './Card.module.scss';
import Heading from './Heading';
import Paragraph from './Paragraph';
import Image from 'next/image';

const Card = ({data}) => {
    const { title, excerpt, slug, featuredImage, restaurantTypes } = data;

    const types = restaurantTypes.edges.map((type) => type.node.name).join(', ');
    return (
        <div className={styles.card}>
            {
                featuredImage &&
                <Image 
                    src={featuredImage.node.sourceUrl} 
                    alt={featuredImage.node.altText}
                    width={featuredImage.node.mediaDetails.width}
                    height={featuredImage.node.mediaDetails.height}
                    className={styles.image} 
                />
            }
            <div className={styles.card_content}>
                {
                    types &&
                    <Heading level="4" marginBottom="1">{types}</Heading>   
                }
                <Heading level="3" marginBottom="1"> {title} </Heading>
                <Paragraph marginBottom="1">{excerpt}</Paragraph>
                <Button 
                    label='View Resturant'
                    path={`/restaurants/${slug}`}
                />
            </div>
        </div>
    )
}

export default Card;