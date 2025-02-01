"use client";
import Groceries from "@/component/Groceries";
import { useApi } from "@/context/Apidata";
import ShimmerCard from "@/Shimmer/ShimmerCard";
import { useEffect, useState } from "react";

function CategoryShow() {
    const categoryShowData = [
        {
            slug: "groceries",
            name: "Groceries"
        },
        {
            slug: "beauty",
            name: "Beauty Products"
        },
        {
            slug: "furniture",
            name: "Furniture"
        },
        {
            slug: "laptops",
            name: "Laptop"
        },
        {
            slug: "mens-watches",
            name: "Watch"
        },
        {
            slug: "smartphones",
            name: "Mobile"
        },

    ]
    const { fetchData } = useApi();
    const [categoriesData, setCategoriesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoryPromises = categoryShowData.map(async (category) => {
                    const data = await fetchData(`/products/category/${category.slug}`);
                    return { slug: category.slug, name: category.name, products: data.products };
                });

                const results = await Promise.all(categoryPromises);
                setCategoriesData(results);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, [fetchData]);

    return (
        <>
            {loading ? (
                categoriesData.map((item) => (
                    <ShimmerCard key={item} className="lg:w-[1280px] md:w-[640px] w-[400px] h-[500px] bg-gray-500 mx-auto sm:px-6  mt-4" />
                )))
                : (
                    categoriesData.map((category) => (
                        <Groceries key={category.slug} heading={category.name} catlistname={category.slug} products={category.products} />
                    ))
                )}
        </>
    )
}

export default CategoryShow