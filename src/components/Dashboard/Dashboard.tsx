import React from "react";
import type { DashboardProps } from "../../types";

export const Dashboard: React.FC<DashboardProps> = ({ children }) => {
    return (
      <div className="p-4 flex flex-col gap-6 w-full max-w-4xl mx-auto">
        {children}
      </div>
    );
  };