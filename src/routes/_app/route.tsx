import { createFileRoute, redirect } from "@tanstack/react-router";
import { IsAuthenticated } from "../../auth/isAuthenticated";

export const Route = createFileRoute("/_app")({
  beforeLoad: async () => {
    if (!IsAuthenticated()) {
      throw redirect({
        to: "/login",
      });
    }
  },
});
