import { createRootRoute, Outlet, useLocation } from "@tanstack/react-router";
import Sidebar from "../components/sidebar/sidebar";
import { useState } from "react";
import { ModalContext } from "../contexts/agendar-consulta-context";
import AdminSidebar from "../components/admin-sidebar/admin-sidebar";
import DoctorSidebar from "../components/doctor-sidebar/doctor-sidebar";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");
  const isDoctorRoute = location.pathname.startsWith("/doctor");

  const noSidebarRoutes = [
    "/login",
    "/register",
    "/error",
    "/",
    "/acesso-negado",
  ];
  const shouldShowSidebar = !noSidebarRoutes.includes(location.pathname);

  if (!shouldShowSidebar) {
    return <Outlet />;
  }

  if (isAdminRoute) {
    return (
      <section className="admin-sidebar__wrapper">
        <AdminSidebar />
        <div className="admin-content">
          <Outlet />
        </div>
      </section>
    );
  }

  if (isDoctorRoute) {
    return (
      <section className="doctor-sidebar__wrapper">
        <DoctorSidebar />
        <div className="doctor-content">
          <Outlet />
        </div>
      </section>
    );
  }

  return (
    <section className="sidebar__wrapper">
      <ModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
        <Sidebar />
        <div className="content">
          <Outlet />
        </div>
      </ModalContext.Provider>
    </section>
  );
}
