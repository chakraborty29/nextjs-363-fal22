import { useState } from 'react';
import RestaurantItem from '../components/RestaurantItem';
import Layout from "../components/Layout";
import Showcase from "../components/Showcase";
import { getAllRestaurants } from '../lib/api'
import Container from '../components/Container';
import Grid from '../components/Grid';

export async function getStaticProps() {
  const restaurants = await getAllRestaurants();
 
  return {
    props: {
      restaurants
    }, // will be passed to the page component as props
  }
}

const HomePage = ({restaurants}) => {
  const [restaurantsList, setRestaurantsList] = useState(restaurants);
  
  // {
  //   restaurantsList.map((restaurant, index) => {
  //     const {title} = restaurant.node;
  //     console.log(title);
  //     // return <p key={index}>{title}</p>
  //   })
  // }

  return <Layout>
    <Showcase 
      title="A Guide to the Best Restaurants in Syracuse"
      description="WIth over 100 restaurants in Syracuse, it can be hard to find the best ones. We've done the research for you."
      cta="View Restaurants"
    />
    <section>
      <Container>
        <Grid data={restaurants}/>
      </Container>
    </section>
    
  </Layout>
}

export default HomePage;


{/* <section>
    <h1>Syracuse Restaurants</h1>
      {
        restaurants.map((restaurant, index) => {
          return (
            <RestaurantItem key={index} data={restaurant} />
          )
        })
      }
    </section> */}