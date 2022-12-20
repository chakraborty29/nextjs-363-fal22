import Link from "next/link";

const RestaurantItem = ({index, data}) => {
    const {title, slug} = data.node;
    return (
        <div>
            <p key={index}>Restaurant - {title}</p>
            <p>
                <Link href={`/restaurants/${slug}`}>
                    View Resturant
                </Link>
            </p>
        </div>
    )
}

export default RestaurantItem;