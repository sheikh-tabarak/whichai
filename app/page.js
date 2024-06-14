'use client'
import Header from "@/components/header";
import HomePage from "../pages/HomePage";
import { useEffect, useState } from "react";
// import Search from "@/pages/Search";
import AddCategory from "@/components/AddCategory";
import AIToolManagementSystem from "@/components/AIToolManagementSystem";
import Search from "./search/page"

export default function Home() {

  return (
    <>
      <div>
        {/* <AIToolManagementSystem />
        <AddCategory /> */}
        <HomePage/>
        {/* <Search/> */}
      </div>
    </>



  );
}
