import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchcampaigndetails } from "../../features/CampaignDetails";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  Chip,
  Tab,
  Tabs,
} from "@nextui-org/react";
import CircularProgressBar from "../../components/shared/CircularProgress";
import TableDonations from "../../components/Table";
import { CheckIcon } from "../../components/shared/CheckIcon";

export default function CampaignDetails() {
  const campaigndetails = useSelector(
    (state) => state.campaigndetails.campaigndetails
  );
  const creatordetails = useSelector(
    (state) => state.campaigndetails.creatordetails
  );
  const loading = useSelector((state) => state.campaigndetails.loading);
  const error = useSelector((state) => state.campaigndetails.error);

  const { slug } = useParams();
  console.log(slug);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchcampaigndetails(slug));
  }, [dispatch]);

  if (error)
    return (
      <>
        <p className="text-center">Some error occured loadig profile</p>
      </>
    );
  else
    return (
      <div className="min-h-screen">
        <Breadcrumbs color="success" className="mb-3 text-white">
          <BreadcrumbItem>Campaigns</BreadcrumbItem>
          <BreadcrumbItem>{slug}</BreadcrumbItem>
        </Breadcrumbs>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
          <div
            className="h-[30vh]  md:h-[60vh] border border-neutral-800 rounded-lg bg-cover  bg-center bg-no-repeat lg:col-span-2 flex justify-start items-end"
            style={{
              backgroundImage: `url(${campaigndetails.image})`,
            }}
          >
            <h1 className=" font-extrabold text-3xl relative ">
              {campaigndetails.title}{" "}
              <span className="text-sm">by {creatordetails.legal_name}</span>
              <div className="gap-2 py-3 flex justify-start items-center flex-wrap">
                <span>
                  {!creatordetails.is_verified ? (
                    <Chip
                      startContent={<CheckIcon size={18} />}
                      variant="faded"
                      color="danger"
                    >
                      not verified
                    </Chip>
                  ) : (
                    <Chip
                      startContent={<CheckIcon size={18} />}
                      variant="faded"
                      color="success"
                    >
                      verified profile
                    </Chip>
                  )}
                </span>
              </div>
            </h1>
          </div>
          <div className="space-y-2">
            <CircularProgressBar
              total={campaigndetails.target_amount}
              current={campaigndetails.initial_amount}
            />
            <Card className="h-[30vh] rounded-lg bg-neutral-900 flex flex-col p-3 ">
              <CardBody>
                <Chip variant="dot" className="my-2">
                  Raised By {creatordetails.legal_name}
                </Chip>
                <Chip variant="dot" className="my-2">
                  From {creatordetails.city},{creatordetails.country}
                </Chip>
                <Chip variant="dot" className="my-2">
                  Contact {creatordetails.phone}
                </Chip>
              </CardBody>
              <Button className="bg-green-500 text-black">Donate Now</Button>
            </Card>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-1 mt-2">
            <div className="h-[30vh] rounded-lg  lg:col-span-2 ">
              <Tabs aria-label="Options">
                <Tab key="photos" title="Photos">
                  <Card>
                    <CardBody>{campaigndetails.description}</CardBody>
                  </Card>
                </Tab>
                <Tab key="donations" title="Donations">
                  <Card>
                    <CardBody>
                      <TableDonations />
                    </CardBody>
                  </Card>
                </Tab>
                <Tab key="videos" title="Videos">
                  <Card>
                    <CardBody>
                      Excepteur sint occaecat cupidatat non proident, sunt in
                      culpa qui officia deserunt mollit anim id est laborum.
                    </CardBody>
                  </Card>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    );
}
