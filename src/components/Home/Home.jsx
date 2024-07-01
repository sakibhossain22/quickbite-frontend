import { Helmet } from "react-helmet";
import AppDownload from "../AppDownload/AppDownload";
import Banner from "../Banner/Banner";
import Invite from "../Invite/Invite";
import TopFood from "../TopFood/TopFood";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>QuickBite || Home</title>
            </Helmet>
            <Banner></Banner>
            <TopFood></TopFood>
            <Invite></Invite>
            <AppDownload></AppDownload>
        </div>
    );
};

export default Home;