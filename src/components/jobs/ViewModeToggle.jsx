import React from "react";
import { List, Grid3X3 } from "lucide-react";
import Button from "../shared/Button"; // your custom Button component

const ViewModeToggle = ({ viewMode, onViewModeChange }) => {
  return (
    <div className="flex items-center border rounded-md overflow-hidden">
      <Button
        variant={viewMode === "list" ? "emerald" : "ghost"}
        size="small"
        onClick={() => onViewModeChange("list")}
        className="rounded-r-none"
      >
        <List className="w-4 h-4" />
      </Button>
      <Button
        variant={viewMode === "grid" ? "primary" : "ghost"}
        size="small"
        onClick={() => onViewModeChange("grid")}
        className="rounded-l-none"
      >
        <Grid3X3 className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default ViewModeToggle;
