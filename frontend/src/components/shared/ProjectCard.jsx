import { Button, Card, CardBody, Chip } from "@nextui-org/react";
import React from "react";
import ProgressBar from "./ProgressBar";
import { Link } from "react-router-dom";

export default function ProjectCard({ProjectsCardData}) {
  const percentage = Math.ceil((ProjectsCardData.target_amount / ProjectsCardData.initial_amount)*100)

const tags = ['sustainabilty','crypto','donation']
  return (
    <Card className=" rounded-2xl overflow-hidden mb-2">
      <img
        alt="cmpaign-project image"
        src={ProjectsCardData.image}
        className="h-[250px] w-full rounded-t-2xl object-cover "
      />
      <CardBody className="p-4 rounded-2xl bg-neutral-900 relative bottom-10 ">
        <h1 className="inline-flex items-center text-lg font-semibold line-clamp-1">
          {ProjectsCardData.title}
        </h1>
        <p className="mt-3 text-sm line-clamp-2">{ProjectsCardData.description}</p>
        {tags.length > 0 && (
          <div className="mt-4">
            {tags.map((item, index) => (
              <Chip
                key={index}
                className="mb-2 mr-2 inline-block rounded-full bg-gray-100 text-black px-3 py-1 text-[10px] font-semibold"
              >
                {item}
              </Chip>
            ))}
          </div>
        )}
        <ProgressBar  progress={percentage} />
        <Link   as={Link} to={`/campaigns/${ProjectsCardData.slug}`} className="w-full flex justify-center items-center p-3 mt-4 bg-green-700 hover:bg-green-500 rounded-2xl">View</Link>
      </CardBody>
    </Card>
  );
}
