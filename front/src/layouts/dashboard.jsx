import React from "react";
import { Routes, Route } from "react-router-dom";
import { DashboardNavbar, Footer } from "./../widgets/layout";
import routes from "./../routes";

export function Dashboard() {

  const filteredRoutes = routes

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <div className="p-4">
        <DashboardNavbar />
        
        <Routes>
          {filteredRoutes.map(
            ({ pages }) =>
              pages.map(({ path, element }) => (
                <Route exact path={path} element={element} />
              ))
          )}
        </Routes>
        <div className="text-blue-gray-600">
          {/* <Footer /> */}
        </div>
      </div>
    </div>
  );
}
