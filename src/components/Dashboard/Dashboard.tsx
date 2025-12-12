import React from "react";
import type { DashboardProps } from "../../types";

export const Dashboard: React.FC<DashboardProps> = ({ children }) => {
    return (
      <div className="p-4 flex flex-col md:flex-row gap-4">
        {children}
      </div>
    );
  };