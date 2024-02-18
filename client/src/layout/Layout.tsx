import { Outlet } from "react-router-dom";
import { DashboardNavBar } from "../components/DashboardNavBar";

export const Layout = () => {
  return (
    <div>
      <DashboardNavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
