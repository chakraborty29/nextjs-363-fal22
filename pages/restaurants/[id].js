import Head from 'next/head';
import Link from 'next/link'
import Button from '../../components/Button';
import Heading from '../../components/Heading';
import Layout from '../../components/Layout'
import Paragraph from '../../components/Paragraph';
import Showcase from '../../components/Showcase';
import Col from '../../components/Col';
import Row from '../../components/Row';
import MenuItem from '../../components/MenuItem';
import { getAllRestaurantSlugs, getSingleRestaurantBySlug } from "../../lib/api"
import Container from '../../components/Container';
import { Fragment } from 'react';

export async function getStaticPaths() {
    const restaurantSlugs = await getAllRestaurantSlugs();
    const paths = restaurantSlugs.map((restaurant) => {
        return {
            params: {
                id: restaurant.node.slug
            }
        }
    });
    return {
        paths: paths,
        fallback: false, // can also be true or 'blocking'
    }
}

export async function getStaticProps({params}) {
    const { id } = params;
    const restaurantData = await getSingleRestaurantBySlug(id);
    return {
        props: {
            restaurantData
        }, // will be passed to the page component as props
    }
}

const RestaurantPage = ({restaurantData}) => {
    const { title, excerpt, featuredImage, restaurantTypes, restaurantInformation } = restaurantData;
    const { location, contact, hours, menu } = restaurantInformation;
    const { streetAddress, city, state, zipCode } = location;
    const { phoneNumber, email } = contact;
    const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = hours;
    const types = restaurantTypes.edges.map((type) => type.node.name).join(', ');
    return (
        <Layout>
            <Head>
                <title>{title}</title>
            </Head>
            <Showcase
                // title={title}
                // description={excerpt}
                backgroundImage={featuredImage ? featuredImage.node.sourceUrl : null}
                halfHeight
            />
            <Container>
                <Row>
                    <Col width={9}>
                        <Heading level="4">{types}</Heading>
                        <Heading level="1" marginBottom="1">{title}</Heading>
                        <Paragraph marginBottom={1}>{excerpt}</Paragraph>
                        {
                            menu.menuItems &&
                            <Fragment>
                                <Heading level={2} marginBottom="1">Menu</Heading>
                                {menu.menuItems?.map((menuItemsObject) => {
                                    const { menuItem } = menuItemsObject;
                                    return <MenuItem data={menuItem}/>
                                }
                                )}
                            </Fragment>
                        }
                    </Col>
                    <Col width={3}>
                        <Button label="Order Takeout"/>
                        <Button label="Make a Reservation"/>
                        <Heading level="2" marginBottom="1" marginTop="1">Location</Heading>
                        <Paragraph marginBottom={2}>
                            {/* {streetAddress && city && zipCode && */}
                            {/* <Fragment> */}
                                {streetAddress}<br />
                                {city}, {state} {zipCode}
                            {/* </Fragment> */}
                            {/* } */}
                        </Paragraph>
                        <Heading level="2" marginBottom="1">Contact</Heading>
                        <Paragraph marginBottom={2}>
                            {phoneNumber}<br />
                            <a href={`mailto:${email}`}>{email}</a>
                        </Paragraph>
                        <Heading level="2" marginBottom="1">Hours</Heading>
                        <Paragraph marginBottom={2}>
                            {
                                monday.status 
                                ?
                                    <Fragment>Monday: {monday.open} - {monday.close}<br /></Fragment>
                                :
                                    <Fragment>Monday: Closed<br /></Fragment>

                            }
                            {
                                tuesday.status 
                                ?
                                    <Fragment>Tuesday: {tuesday.open} - {tuesday.close}<br /></Fragment>
                                :
                                    <Fragment>Tuesday: Closed<br /></Fragment>

                            }
                            {
                                wednesday.status 
                                ?
                                    <Fragment>Wednesday: {wednesday.open} - {wednesday.close}<br /></Fragment>
                                :
                                    <Fragment>Wednesday: Closed<br /></Fragment>

                            }
                            {
                                thursday.status 
                                ?
                                    <Fragment>Thursday: {thursday.open} - {thursday.close}<br /></Fragment>
                                :
                                    <Fragment>Thursday: Closed<br /></Fragment>

                            }
                            {
                                friday.status 
                                ?
                                    <Fragment>Friday: {friday.open} - {friday.close}<br /></Fragment>
                                :
                                    <Fragment>Friday: Closed<br /></Fragment>

                            }
                            {
                                saturday.status 
                                ?
                                    <Fragment>Saturday: {saturday.open} - {saturday.close}<br /></Fragment>
                                :
                                    <Fragment>Saturday: Closed<br /></Fragment>

                            }
                            {
                                sunday.status 
                                ?
                                    <Fragment>Sunday: {sunday.open} - {sunday.close}<br /></Fragment>
                                :
                                    <Fragment>Sunday: Closed</Fragment>

                            }
                        </Paragraph>
                    </Col>
                </Row>
            </Container>

            {/* <Button
                label="Back to Restaurants"
                path="/"
            /> */}
        </Layout>
    )
}
export default RestaurantPage



