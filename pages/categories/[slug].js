import Link from "next/link";
import { useRouter } from "next/router";
import Container from "../../components/Container";
import Layout from "../../components/Layout/index";
import ProductsList from "../../components/ProductsList";
import { getCategories, getCategory } from "../../utils/api";
import FeaturedSection from "../../components/Sections/FeaturedSection"

const CategoryPage = ({ category = []}) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading category...</div>;
  }

  return (
    <Layout title={category.name}>
       
      <Container className="my-6">
      <div className=" bg-white rounded-md ">
    <div className=" px-4 border-b flex justify-between">
    <nav className="bg-grey-light  rounded font-sans w-full m-4">
        <ol className="list-reset flex text-grey-dark">
          <li>
             <Link href="/">
          <a className="text-gray-400 ">Home</a>
          </Link> 
          </li>
          <li><span className="mx-2">/</span></li>
          <li> 
            <Link href="#">
          <a className="text-gray-400 ">Shop</a>
          </Link>
          </li>
          <li><span className="mx-2">/</span></li>
          <li>{category.name}</li>
        </ol>
      </nav>
        </div>
        </div>
     
      
      <ProductsList products={category.products} />
      </Container>
      <Container className="my-6">
        <FeaturedSection sectionTitle="You may also like" />
        </Container>
    </Layout>
  );
};

export default CategoryPage;

export async function getStaticProps({ params }) {
  const category = await getCategory(params.slug);
  return { props: { category } };
}

export async function getStaticPaths() {
  const categories = await getCategories();
  return {
    paths: categories.map((_category) => {
      return {
        params: { slug: _category.slug },
      };
    }),
    fallback: true,
  };
}
