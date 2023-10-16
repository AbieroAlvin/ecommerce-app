import ProductCard from "./ProductCard";

const ProductList = ({ data }) => {
  return (
    <div className="lg:px-[80px] md:px-[60px] px-[40px] grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 md:gap-12 place-items-center justify-center">
      {data?.map((item, index) => (
        <ProductCard item={item} key={index} />
      ))}
    </div>
  );
};

export default ProductList;
