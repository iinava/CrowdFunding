import { Button, Link } from "@nextui-org/react";
import React from "react";
import ProgressBar from "./ProgressBar";

export default function ProjectCard({ProjectsCardData}) {

const tags = ['sustainabilty','crypto','donation']
  return (
    <div className=" rounded-2xl overflow-hidden">
      <img
        alt="Laptop"
        src={ProjectsCardData.image}
        className="h-[250px] w-full rounded-t-2xl object-cover "
      />
      <div className="p-4 rounded-2xl bg-neutral-900 relative bottom-10 duration-700 hover:-translate-y-8">
        <h1 className="inline-flex items-center text-lg font-semibold">
          {ProjectsCardData.title}
        </h1>
        <p className="mt-3 text-sm line-clamp-2">{ProjectsCardData.details}</p>
        {tags.length > 0 && (
          <div className="mt-4 text-black">
            {tags.map((item, index) => (
              <span
                key={index}
                className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold"
              >
                {item}
              </span>
            ))}
          </div>
        )}
        <ProgressBar  progress={20} />
        <Button   as={Link} href={ProjectsCardData.href} className="w-full mt-4">View</Button>
      </div>
    </div>
  );
}
