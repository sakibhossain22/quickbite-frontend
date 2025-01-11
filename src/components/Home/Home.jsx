import { Helmet } from "react-helmet";
import AppDownload from "../AppDownload/AppDownload";
import Banner from "../Banner/Banner";
import Invite from "../Invite/Invite";
import TopFood from "../TopFood/TopFood";
import Choose from "./Choose/Choose";
import FoodReviews from "./FoodReview/FoodReview";
import Chiefs from "./Chief/Chief";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>QuickBite || Home</title>
            </Helmet>
            <Banner></Banner>
            <TopFood></TopFood>
            <Choose></Choose>
            <FoodReviews></FoodReviews>
            <Chiefs></Chiefs>
            <Invite></Invite>
            <AppDownload></AppDownload>
        </div>
    );
};

export default Home;