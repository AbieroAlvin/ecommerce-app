import { useState, useEffect } from "react";

import Helmet from "../components/Helmet/Helmet";
import heroImg from "../assets/images/hero-img.png";
import "../styles/home.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Services from "../services/Services";
import ProductList from "../components/UI/ProductList";

import Clock from "../components/UI/Clock";

import products from "../assets/data/products";

import counterImg from "../assets/images/counter-timer-img.png";

const Home = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [bestSalesProducts, setBestSalesProducts] = useState([]);
  const [mobileProducts, setMobileProducts] = useState([]);
  const [wirelessProducts, setWirelessProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);

  const year = new Date().getFullYear();

  useEffect(() => {
    const filteredTrendingProducts = products.filter(
      (item) => item.category === "chair"
    );

    const filteredBestSalesProducts = products.filter(
      (item) => item.category === "sofa"
    );

    const filteredMobileProducts = products.filter(
      (item) => item.category === "mobile"
    );

    const filteredWirelessProducts = products.filter(
      (item) => item.category === "wireless"
    );

    const filteredPopularProducts = products.filter(
      (item) => item.category === "watch"
    );

    setTrendingProducts(filteredTrendingProducts);
    setBestSalesProducts(filteredBestSalesProducts);
    setMobileProducts(filteredMobileProducts);
    setWirelessProducts(filteredWirelessProducts);
    setPopularProducts(filteredPopularProducts);
  }, []);
  return (
    <Helmet title={"Home"}>
      <section className="hero__section w-full flex items-center justify-center">
        <div className="flex items-center justify-center">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
            <div className="col">
              <div className="hero__content ">
                <p className="hero__subtitle">Trending product in {year}</p>
                <h2>Make Your Interior More Minimalistic & Modern</h2>
                <p className="font-[500]">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Alias ut suscipit ex sapiente. Veniam illo nemo laudantium
                  omnis labore corrupti?
                </p>
                <motion.button whileTap={{ scale: 1.2 }} className="shop__btn">
                  <Link to="/shop">SHOP NOW</Link>
                </motion.button>
              </div>
            </div>

            <div className="col">
              <div className="hero__img">
                <img src={heroImg} alt="hero image" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Services />
      <section className="trending__products flex items-center justify-center">
        <div className="container">
          <div className="row">
            <div className="col text-center md:mb-6 mb-8">
              <h2 className="section__title">Trending Products</h2>
            </div>
            <ProductList data={trendingProducts} />
          </div>
        </div>
      </section>

      <section className="best__sales flex items-center justify-center">
        <div className="container">
          <div className="row">
            <div className="col text-center md:mb-6 mb-8">
              <h2 className="section__title">Best Sales</h2>
            </div>
            <ProductList data={bestSalesProducts} />
          </div>
        </div>
      </section>

      <section className="timer__count flex items-center justify-center">
        <div className="container">
          <div className="row grid md:grid-cols-2 grid-cols-1 items-center ">
            <div className="col flex flex-col items-center justify-center ">
              <div className="clock__top-content">
                <h4 className="text-white text-[24px] mb-2">Limited Offers</h4>
                <h3 className="text-white text-[20px] mb-3">
                  Qaulity Armchair
                </h3>
              </div>
              <Clock />

              <motion.button
                whileTap={{ scale: 1.2 }}
                className="shop__btn store__btn"
              >
                <Link to="/shop">Visit Store</Link>
              </motion.button>
            </div>
            <div className="col text-end flex items-center justify-center">
              <img src={counterImg} alt="/" />
            </div>
          </div>
        </div>
      </section>

      <section className="new__arrivals flex items-center justify-center">
        <div className="container">
          <div className="col text-center md:mb-6 mb-8">
            <h2 className="section__title">New Arrivals</h2>
          </div>

          <ProductList data={mobileProducts} />
        </div>
      </section>

      <section className="popular__category flex items-center justify-center">
        <div className="container">
          <div className="col text-center md:mb-6 mb-8">
            <h2 className="section__title">Popular in Category</h2>
          </div>
          <ProductList data={popularProducts} />
        </div>
      </section>
      <section className="popular__category flex items-center justify-center">
        <div className="container">
          <div className="col text-center md:mb-6 mb-8">
            <h2 className="section__title">Headphones</h2>
          </div>
          <ProductList data={wirelessProducts} />
        </div>
      </section>
    </Helmet>
  );
};

export default Home;
