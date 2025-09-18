import React from "react";
import HeroProduct from "./Product/Hero";
import Navbar from "@/Components/Navbar";
import { Head } from "@inertiajs/react";

const Product = () => {
    return (
        <>
            <Head title="Product" />
            <Navbar />
            <HeroProduct />
        </>
    );
};

export default Product;
