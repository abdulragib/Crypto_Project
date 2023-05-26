import React from 'react';
import Header from "../components/Common/Header";
import MainComponent from "../components/LandingPage/MainComponent";
import Footer from "../components/Common/Footer";


const Home = () => {
    return (
        <div style={{overflowX:"hidden"}}>
            <Header/>
            <MainComponent/>
            <Footer/>
        </div>
    );
};

export default Home;