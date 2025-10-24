import ProductList from "@/components/ProductList";

const ProductPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ category: string }>;
}) => {
  const category = (await searchParams).category;
  return (
    <div className="">
      <ProductList category={category} params={"homepage"} />
    </div>
  );
};

export default ProductPage;
