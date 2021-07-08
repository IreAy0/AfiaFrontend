import SelectedProductsList from "../SelectedProductList/index";

const featuredSection = ({ myProducts = [], sectionTitle }) => {
  const first5 = myProducts.slice(0, 5) || [];
  return (
    <div className=" bg-white rounded-md ">
      <div className="py-3 px-8 border-b flex justify-between">
        <h2 className="section-header">{sectionTitle}</h2>
      </div>
      <div className="py-3 px-8">
        <SelectedProductsList selectedProducts={first5} />
      </div>
    </div>
  );
};

export default featuredSection;
