import Link from "next/link";
import { useRouter } from "next/router";
import Container from "../../components/Container";
import Layout from "../../components/Layout/index";
import ProductsList from "../../components/ProductsList";
import { getCategories, getCategory } from "../../utils/api";
import FeaturedSection from "../../components/Sections/FeaturedSection";

const CategoryPage = ({ category = [] }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading category...</div>;
  }

  return (
    <Layout title={category.name}>
      <Container className="my-6">
        <div className=" bg-white rounded-md ">
          <div className=" px-4 border-b flex justify-between items-center">
            <nav className="bg-grey-light  rounded font-sans w-full m-4">
              <ol className="list-reset flex text-grey-dark">
                <li>
                  <Link href="/">
                    <a className="text-gray-400 ">Home</a>
                  </Link>
                </li>
                <li>
                  <span className="mx-2">/</span>
                </li>
                <li>
                  <Link href="#">
                    <a className="text-gray-400 ">Shop</a>
                  </Link>
                </li>
                <li>
                  <span className="mx-2">/</span>
                </li>
                <li>{category.name}</li>
              </ol>
            </nav>
            {/* <div className="lg:w-2/5">
              <label class="text-gray-700 flex " for="animals">
                Sort by:
                <select
                  id="animals"
                  class="block w-52 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  name="animals"
                >
                  <option value="" >
                    Select an option
                  </option>
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                  <option value="hamster">Hamster</option>
                  <option value="parrot">Parrot</option>
                  <option value="spider">Spider</option>
                  <option value="goldfish">Goldfish</option>
                </select>
              </label>
            </div> */}
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
        params: { slug: _category.slug }
      };
    }),
    fallback: true
  };
}
