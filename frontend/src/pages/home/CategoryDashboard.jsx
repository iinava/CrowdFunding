import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CategoryDashboard() {
 const {category} = useParams()
  return (
    <div className="w-full flex flex-col ">
     
      <Breadcrumbs  color="success" className="mb-3 text-white">
          <BreadcrumbItem>Campaigns</BreadcrumbItem>
          <BreadcrumbItem>Categorys</BreadcrumbItem>
          <BreadcrumbItem>{category}</BreadcrumbItem>
        </Breadcrumbs>
      <h1 className="text-left text-3xl font-bold"><span>Showing results for</span> {category}</h1>
     
    </div>
  );
}
