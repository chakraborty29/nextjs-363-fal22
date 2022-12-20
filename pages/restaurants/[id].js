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
    const { phoneNumber, emailAddress } = contact;
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
                            <a href={`mailto:${emailAddress}`}>{emailAddress}</a>
                        </Paragraph>
                        <Heading level="2" marginBottom="1">Hours</Heading>
                        <Paragraph marginBottom={2}>
                            {
                                monday.openTime 
                                ?
                                    <Fragment>Monday: {monday.openTime} - {monday.closeTime}<br /></Fragment>
                                :
                                    <Fragment>Monday: Closed<br /></Fragment>

                            }
                            {
                                tuesday.openTime 
                                ?
                                    <Fragment>Tuesday: {tuesday.openTime} - {tuesday.closeTime}<br /></Fragment>
                                :
                                    <Fragment>Tuesday: Closed<br /></Fragment>

                            }
                            {
                                wednesday.openTime 
                                ?
                                    <Fragment>Wednesday: {wednesday.openTime} - {wednesday.closeTime}<br /></Fragment>
                                :
                                    <Fragment>Wednesday: Closed<br /></Fragment>

                            }
                            {
                                thursday.openTime 
                                ?
                                    <Fragment>Thursday: {thursday.openTime} - {thursday.closeTime}<br /></Fragment>
                                :
                                    <Fragment>Thursday: Closed<br /></Fragment>

                            }
                            {
                                friday.openTime 
                                ?
                                    <Fragment>Friday: {friday.openTime} - {friday.closeTime}<br /></Fragment>
                                :
                                    <Fragment>Friday: Closed<br /></Fragment>

                            }
                            {
                                saturday.openTime 
                                ?
                                    <Fragment>Saturday: {saturday.openTime} - {saturday.closeTime}<br /></Fragment>
                                :
                                    <Fragment>Saturday: Closed<br /></Fragment>

                            }
                            {
                                sunday.openTime 
                                ?
                                    <Fragment>Sunday: {sunday.openTime} - {sunday.closeTime}<br /></Fragment>
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



