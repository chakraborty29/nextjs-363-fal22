import Head from "next/head";
import Layout from "../components/Layout";

const ConactPage = ({children}) => {
    return (
        <Layout>
            <Head>
                <title>Contact Us</title>
            </Head>
            <h1>Contact Us</h1>
            <h2>Phone: 555-555-5555</h2>
        </Layout>
    );
}

export default ConactPage;