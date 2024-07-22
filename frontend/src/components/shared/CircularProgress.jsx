import React from "react";
import {
  CircularProgress,
  Card,
  CardBody,
  CardFooter,
  Chip,
} from "@nextui-org/react";

export default function CircularProgressBar({ total, current }) {
  const percentage = Math.ceil((current / total) * 100);
  return (
    <Card className="h-[30vh] border-none ">
      <CardBody className="justify-center items-center pb-0">
        <CircularProgress
          classNames={{
            svg: "w-28 h-28 drop-shadow-md",
            indicator: "stroke-white",
            track: "stroke-white/10",
            value: "text-3xl font-semibold text-white",
          }}
          value={percentage}
          strokeWidth={4}
          showValueLabel={true}
        />
      </CardBody>
      <CardFooter>
        <Chip
          classNames={{
            base: "border-1 border-white/30",
            content: "text-white text-small font-semibold",
          }}
          variant="bordered"
        >
          {total} needed
        </Chip>
        <Chip
          classNames={{
            base: "border-1 border-white/30",
            content: "text-white text-small font-semibold",
          }}
          variant="bordered"
        >
          {current} collected
        </Chip>
      </CardFooter>
    </Card>
  );
}
