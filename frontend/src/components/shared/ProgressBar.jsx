import React, { useState } from "react";
import {Progress} from "@nextui-org/react";

export default function ProgressBar({progress}) {
const [value, setvalue] = useState(progress);


  return (
    <Progress
      aria-label="Downloading..."
      size="md"
      value={value}
      color="success"
      showValueLabel={true}
      className="max-w-md"
    />
  );
}
