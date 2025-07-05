import { createFileRoute, redirect } from "@tanstack/react-router";
import { IsAuthenticated } from "../auth/isAuthenticated";

export const Route = createFileRoute("/")({
  loader: () => redirect({ to: IsAuthenticated() ? "/dashboard" : "/login" }),
});
