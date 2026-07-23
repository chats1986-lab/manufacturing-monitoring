import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

import RootRoute from "./routes/__routes";
import Dashboard from "./routes/index";
import SensorPage from "./routes/sensors.$sensorId";
import PrinterPage from "./routes/printers.$printerId";

const rootRoute = createRootRoute({
  component: RootRoute,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Dashboard,
});

const printerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/printers/$printerId",
  component: PrinterPage,
});

const sensorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sensors/$sensorId",
  component: SensorPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  printerRoute,
  sensorRoute,
]);

export const router = createRouter({
  routeTree,
});
