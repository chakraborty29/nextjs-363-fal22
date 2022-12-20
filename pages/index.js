import { useState } from 'react';
import RestaurantItem from '../components/RestaurantItem';
import Layout from "../components/Layout";
import Showcase from "../components/Showcase";
import { getAllRestaurants, getAllRestaurantTypes } from '../lib/api'
import Container from '../components/Container';
import Grid from '../components/Grid';
import Button from '../components/Button';
import Heading from '../components/Heading';
import Filters from '../components/Filters';
export async function getStaticProps() {
  const restaurants = await getAllRestaurants();
  const restaurantTypes = await getAllRestaurantTypes();
  return {
    props: {
      restaurants,
      restaurantTypes
    }, // will be passed to the page component as props
  }
}

const HomePage = ({ restaurants, restaurantTypes }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const filteredRestaurants = restaurants.filter((restaurant) => {
    if (activeCategory === "All") {
      return restaurant;
    } 
    if (restaurant.node.restaurantTypes.edges.length > 0) {
      return restaurant.node.restaurantTypes.edges[0].node.name === activeCategory ? restaurant : false;
      // restaurant.node.restaurantTypes.edges.map((edge) => {
      //   console.log(edge.node.name === activeCategory ? restaurant : false)
      //   return edge.node.name === activeCategory ? restaurant : false;
      // })
    }
  })
  return <Layout>
    <Showcase 
      title="A Guide to the Best Restaurants in Syracuse"
      description="WIth over 100 restaurants in Syracuse, it can be hard to find the best ones. We've done the research for you."
      cta="View Restaurants"
    />
    <section>
      <Container>
        <Filters 
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          categories={restaurantTypes}
        />
        <Grid data={filteredRestaurants}/>
      </Container>
    </section>
    
  </Layout>
}

export default HomePage;