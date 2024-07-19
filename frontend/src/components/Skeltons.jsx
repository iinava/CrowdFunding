import { Button, Card, Skeleton } from "@nextui-org/react";
import React from "react";


export function ProfileSkelton () {
  return (
    <div className=" md:w-[400px] flex flex-col gap-2">
      <Skeleton className="h-10 w-3/5 rounded-lg" />
      <Skeleton className="h-10 w-5/5 rounded-lg" />
      <Skeleton className="h-10 w-4/5 rounded-lg" />
      <Skeleton className="h-10 w-3/5 rounded-lg" />
      <Skeleton className="h-10 w-2/5 rounded-lg" />
    </div>
  );
};

export function CampaignSkelton (){
  return (
    <Card className=" space-y-5 p-4" radius="lg">
      <Skeleton className="rounded-lg">
        <div className=" rounded-lg bg-default-300 h-[250px]"></div>
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
      <Skeleton>
        <Button></Button>
      </Skeleton>
    </Card>
  );
};
