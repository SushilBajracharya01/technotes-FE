import { Outlet } from "react-router-dom";
import DashFooter from "../DashFooter";
import DashHeader from "../DashHeader";

/**
 *
 */
export default function DashLayout() {
  return (
    <>
      <DashHeader />
      <div className="container bg-white sm:rounded p-4 sm:p-16 mx-auto mt-4 mb-4">
        <Outlet />
      </div>
      <DashFooter />
    </>
  );
}
