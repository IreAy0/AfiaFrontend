
import ProductsList from "../components/ProductsList";
import { getProducts, getBanners, getPopulars, getFeatured } from "../utils/api";

import Image from 'next/image'
import Button from '../components/Button'
import Carousel from '../components/Carousel'
import Container from '../components/Container'
import Layout from '../components/Layout/index'
import styles from '../styles/Home.module.css';
import FeaturedSection from "../components/Sections/FeaturedSection";


const HomePage = ({ products, banners, popular, features }) => {

  return (
    <Layout title="Home" >
    <Container className=" ">
      <Carousel banners={banners} products={products}/>
       </Container>
    <Container className=" my-6 ">
    <FeaturedSection sectionTitle="popular products" myProducts={popular} />
    </Container>
    <Container className=" my-6 ">
    <FeaturedSection  sectionTitle="featured products" myProducts={features}/>
    </Container>
    </Layout>
    
  );
};

export async function getStaticProps() {
  const products = await getProducts();
  const banners = await getBanners();
  const popular = await getPopulars();
  const features = await getFeatured();
  return { props: { banners , products, popular, features } };
}

export default HomePage;
