import React from "react";
//import DefaultLayout from "./containers/DefaultLayout";


const Layout = React.lazy(() => import("./views/ShareHolder/Layout"));
// const Test = React.lazy(() => import("./views/ShareHolder/InputInfo"));
const Chart = React.lazy(() => import("./views/ShareHolder/DashboardChart"));
const TrafficSales = React.lazy(() => import("./views/ShareHolder/TrafficandSales"));
const Demographics = React.lazy(() => import("./views/ShareHolder/Demographics"));
const CustomerVisit = React.lazy(() => import("./views/ShareHolder/CustomerVisit"));
const ConfigShop = React.lazy(() => import("./views/In Store Analytics/CreateShop"));
const ShopList = React.lazy(() => import("./views/In Store Analytics/ShopList"));
const EditShop = React.lazy(() => import("./views/In Store Analytics/EditShop"));



const routes = [
  // {path: "/dashboard/:id", exact: true, name: "Admin Dashboard", component: ConfigShop},
  {path: "/", exact: true, name: "Admin Dashboard", component: ConfigShop},
  {path: "/shoplist", exact: true, name: "Shop List", component: ShopList},
  {path: "/editing", exact: true, name: "Editing Shop", component: EditShop},
  
];

export default routes;
