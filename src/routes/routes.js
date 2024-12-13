import Home from "../pages/home/index";
import Contact from "../pages/contact/index";
import Category from "../pages/categories";
import AboutAndContact from "../pages/about/job.about";
import Blog from "../pages/blogs";
// import BlogDetails from "../pages/blogDetails";
import BlogDetails from "../pages/blogDetails/index";

import DealDetails from "../pages/dealdetails";
import Jobs from "../pages/about/job.about";
import SignUpForm from "../pages/auth/auth.signup";
import Login from "../pages/auth/auth.signin";
import Deals from "../pages/deals";
import UserProfile from "../pages/user/profile";
import EditUser from "../pages/user/edit.user";
import CategoryDetails from "../pages/categorydetails";

import Businesses from "../pages/category/index";
import BusinessListing from "../pages/businessListing";
import BusinessDetails from "../pages/businessDetails";

const routes = [
  { path: "/", element: <Home />, exact: "true", type: "public" },

  { path: "/sign-up", element: <SignUpForm />, exact: "true", type: "public" },

  { path: "/login", element: <Login />, exact: "true", type: "public" },

  { path: "/contact", element: <Contact />, exact: "true", type: "public" },

  { path: "/categories", element: <Category />, exact: "true", type: "public" },

  {
    path: "/about",
    element: <AboutAndContact />,
    exact: "true",
    type: "public",
  },

  { path: "/jobs", element: <Jobs />, exact: "true", type: "public" },

  { path: "/blogs", element: <Blog />, exact: "true", type: "public" },

  {
    path: "/blog-details/:id",
    element: <BlogDetails />,
    exact: "true",
    type: "public",
  },

  {
    path: "/deal-details/:id",
    element: <DealDetails />,
    exact: "true",
    type: "public",
  },

  { path: "/deals", element: <Deals />, exact: "true", type: "public" },

  {
    path: "/business-details/:id",
    element: <BusinessDetails />,
    exact: "true",
    type: "public",
  },

  // { path: "/business", element: <Business />, exact: "true", type: "public" },

  {
    path: "/user-profile",
    element: <UserProfile />,
    exact: "true",
    type: "private",
  },

  {
    path: "/edit-user/:id",
    element: <EditUser />,
    exact: "true",
    type: "private",
  },

  {
    path: "/cat-details/:id",
    element: <CategoryDetails />,
    exact: "true",
    type: "private",
  },

  {
    path: "/business/:name/:id",
    element: <Businesses />,
    exact: "true",
    type: "public",
  },

  {
    path: "/business-listing",
    element: <BusinessListing />,
    exact: "true",
    type: "public",
  },
];
export default routes;
