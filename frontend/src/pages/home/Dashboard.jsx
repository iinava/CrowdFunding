import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  Pagination,
  Skeleton,
} from "@nextui-org/react";
import ProjectCard from "../../components/shared/ProjectCard";
import { useSelector, useDispatch } from "react-redux";
import { fetchPaginatedCampaigns } from "../../features/CampaignSlice";
import { CampaignSkelton } from "../../components/Skeltons";

export default function Dashboard() {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  const dispatch = useDispatch();
  const campaign = useSelector((state) => state.campaign.campaign);
  const loading = useSelector((state) => state.campaign.loading);
  const success = useSelector((state) => state.campaign.success);
  const error = useSelector((state) => state.campaign.error);

  const [ProjectsCardData, setProjectsCardData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(3);

  useEffect(() => {
    dispatch(fetchPaginatedCampaigns(currentPage));
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (success) {
      setProjectsCardData(campaign.results.data);
      setTotalPages(Math.ceil(campaign.count / 6));
    }
  }, [success, campaign]);

  const handlePageChange = (page) => {
    console.log(page, "changed");
    setCurrentPage(page);
  };
  if (error)
    return (
      <>
        <p className="text-center">Some error occured loadig Campaigns </p>
      </>
    );
  else
  return (
    <div className="w-full flex flex-col justify-center items-center sm:justify-around">
      <div className="w-full flex justify-between items-center flex-wrap-reverse gap-10 my-10">
        <div className="md:w-[45vw] space-y-3">
          <h1 className="text-4xl">
            {"ProjectName"} empowers changemakers to accept crypto donations.
          </h1>
          <p>
            Join our community-driven movement to transform the way we fund
            nonprofits and social causes using innovative crypto fundraising
            strategies.
          </p>
          <br />
          <Button>Explore projects</Button>
        </div>
        <img
          src="https://clr.fund/assets/docking_w2160-d5efc4dc.png"
          width={350}
          alt=""
        />
      </div>
      <div className="w-full flex flex-col">
        <h1 className="text-2xl m-3 ">
          Explore
          {campaign && (
            <span className="m-1 font-bold  text-sky-300">
              {campaign.count}
            </span>
          )}
          Projects
        </h1>

        <div className="w-[100%] flex flex-wrap justify-between items-center my-3">
          <div className="py-3 space-x-3">
            <Button className="rounded-3xl bg-blue-200 text-black">
              Category
            </Button>
            <Button className="rounded-3xl bg-green-600 text-black">
              Category2
            </Button>
          </div>
          <Pagination
            loop
            showControls
            color="success"
            total={totalPages}
            initialPage={1}
            onChange={(page) => handlePageChange(page)}
          />
        </div>
      </div>

      {loading ? (
        <div className="w-[90vw] grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-4 my-3">
          {[1, 2, 3].map((index) => (
            <CampaignSkelton key={index} />
          ))}
        </div>
      ) : (
        <div className="w-[90vw] grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-4">
          {ProjectsCardData.length > 0 &&
            ProjectsCardData.map((project, index) => (
              <ProjectCard key={index} ProjectsCardData={project} />
            ))}
        </div>
      )}

      <Button className="ml-auto flex justify-center h-16 w-full rounded-xl bg-neutral-800 mb-10">
        View more Active projects
      </Button>

      <Accordion variant="shadow">
        <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
          {defaultContent}
        </AccordionItem>
      </Accordion>

      {/* <Footer /> */}
    </div>
  );
}
