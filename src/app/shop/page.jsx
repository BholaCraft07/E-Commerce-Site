

'use client';
import Card from "@/component/Card";
import { useApi } from "@/context/Apidata";
import ShimmerCard from "@/Shimmer/ShimmerCard";
import React, { Suspense, useEffect, useState } from "react";

const ProductCatalog = () => {
  // Sidebar state for mobile toggle
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fetch products data
  const { fetchData } = useApi();
  const [allProduct, setProducts] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectCategory, setSelectCategory] = useState(null);



  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 12;
  // Calculate total pages
  const totalPages = Math.ceil(totalProducts / limit);

  // Generate dynamic page numbers
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const category = await fetchData(`/products/category-list`);
        setCategoryList(category);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [fetchData]);

  // /products/category/smartphones
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await fetchData(
          selectCategory
            ? `/products/category/${selectCategory}?limit=${limit}&skip=${(page - 1) * limit}`
            : `/products?limit=${limit}&skip=${(page - 1) * limit}`
        );
        setProducts(data || []);
        setTotalProducts(data.total);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [fetchData, selectCategory, page]);

  const handleCategoryClick = (category) => {
    setSelectCategory(category);
    setPage(1);
  }

  console.log("category data ", categoryList);
  console.log(allProduct)

  return (

    <div className=" max-w-[1440px] mx-auto px-2 sm:px-6 lg:px-8 mt-4">
      <div className="shadow-md bg-gray-100 dark:bg-gray-600 p-6 rounded-lg flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div>
          {/* Mobile toggle button */}
          {
            loading
              ? <ShimmerCard className="w-40 h-6 bg-gray-500 lg:hidden" />
              : (<button
                className="lg:hidden bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white py-2 px-4 rounded w-full mb-4"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                {isSidebarOpen ? "Close Filters" : "Open Filters"}
              </button>)
          }

          {/* Sidebar content */}
          {
            loading
              ? <ShimmerCard
                className={` bg-gray-500 p-4 rounded-2xl  h-20 lg:h-screen sticky top-0 ${isSidebarOpen ? "block w-[100%] px-8 py-4" : "hidden"
                  } lg:block px-4 w-50`}
              />
              : (
                <div
                  className={`bg-white text-gray-900 dark:bg-gray-800 dark:text-white p-4 rounded-2xl shadow-md h-fit lg:h-fit sticky top-0 ${isSidebarOpen ? "block w-[100%] px-8 py-4" : "hidden"
                    } lg:block px-4 w-50`}
                >
                  <h2 className="text-xl font-semibold mb-4">Categories</h2>
                  <ul className="space-y-2">
                    {categoryList.map((category, index) => (
                      <li key={index}>
                        <button
                          className={`w-full text-left text-[12px] hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer ${selectCategory === category ? "font-bold underline" : ""
                            }`}
                          onClick={() => handleCategoryClick(category)}
                        >
                          {category.toUpperCase()}
                        </button>
                      </li>
                    ))}

                  </ul>
                </div>
              )
          }
        </div>

        {/* Product Grid */}
        <div className="lg:w-3/4 w-full overflow-auto">
          {/* Sort & Filter Buttons (visible on mobile) */}
          <div className="flex justify-between items-center mb-4 lg:hidden">
            <button className="bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white py-2 px-4 rounded">
              Filters
            </button>
            <button className="bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white py-2 px-4 rounded">
              Sort
            </button>
          </div>

          {/* Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 justify-items-center mx-auto">
            {loading
              ? // Render shimmer placeholders
              Array.from({ length: 12 }).map((_, index) => (
                <ShimmerCard
                  key={index}
                  className="w-[250px] md:w-[300px] h-[520] object-contain bg-gray-200 rounded-lg"
                />
              ))
              : // Render actual product cards
              allProduct.products && allProduct.products.map((product) => (
                <div className="py-2 bg-transparent" key={product.id}>
                  <Card product={product} />
                </div>
              ))}

          </div>
        </div>
      </div>

      <div className="flex space-x-4 flex-wrap space-y-4 shadow-md bg-gray-100 dark:bg-gray-600 my-4 rounded-lg py-4 px-2 justify-center items-center ">
        <button className="rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2 dark:text-gray-100 cursor-pointer"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => setPage(pageNumber)}
            className={`py-2 px-4 border rounded cursor-pointer dark:text-w ${page === pageNumber ? "bg-gray-800 text-white" : "hover:bg-gray-300"}`}
          >
            {pageNumber}
          </button>
        ))}

        <button className="rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2 dark:text-gray-100 cursor-pointer"
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductCatalog;

