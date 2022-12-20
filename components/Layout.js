import { Fragment } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";

const Layout = ({ children }) => {
    return <Fragment>
        <Head>
            <title>IST 363 Resturants</title>
            <meta name="description" content="This is a description  about our project" />
        </Head>
        <Header />
        <main>
            { children }
        </main>
        <Footer />
    </Fragment>
}

export default Layout;