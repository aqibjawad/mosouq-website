import { Helmet } from "react-helmet";
import Home from "../pages/home/index";
import Contact from "../pages/contact/index";
import Category from "../pages/categories";
import AboutAndContact from "../pages/about/job.about";
import Blog from "../pages/blogs";
import DealDetails from "../pages/dealdetails";
import Jobs from "../pages/about/job.about";
import SignUpForm from "../pages/auth/auth.signup";
import Login from "../pages/auth/auth.signin";
import Deals from "../pages/deals";
import UserProfile from "../pages/user/profile";
import EditUser from "../pages/user/edit.user";
import CategoryDetails from "../pages/categorydetails";
import Businesses from "../pages/category/index";
import SubCategoryDetails from "../pages/category/subCategoryDetails";
import BusinessListing from "../pages/businessListing";
import BusinessDetails from "../pages/businessDetails";
import SearchResults from "../components/searchbar/search";

// Wrapper component to add dynamic titles
const PageWrapper = ({ title, children }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </>
  );
};

const routes = [
  {
    path: "/",
    element: (
      <PageWrapper title="Home">
        <Home />
      </PageWrapper>
    ),
    exact: "true",
    type: "public",
  },
  {
    path: "/search-results",
    element: (
      <PageWrapper title="Search-Items">
        <SearchResults />
      </PageWrapper>
    ),
    exact: "true",
    type: "public",
  },
  {
    path: "/sign-up",
    element: (
      <PageWrapper title="Sign Up">
        <SignUpForm />
      </PageWrapper>
    ),
    exact: "true",
    type: "public",
  },
  {
    path: "/login",
    element: (
      <PageWrapper title="Login">
        <Login />
      </PageWrapper>
    ),
    exact: "true",
    type: "public",
  },
  {
    path: "/contact",
    element: (
      <PageWrapper title="Contact Us">
        <Contact />
      </PageWrapper>
    ),
    exact: "true",
    type: "public",
  },
  {
    path: "/categories",
    element: (
      <PageWrapper title="Categories">
        <Category />
      </PageWrapper>
    ),
    exact: "true",
    type: "public",
  },
  {
    path: "/about",
    element: (
      <PageWrapper title="About Us">
        <AboutAndContact />
      </PageWrapper>
    ),
    exact: "true",
    type: "public",
  },
  {
    path: "/jobs",
    element: (
      <PageWrapper title="Jobs">
        <Jobs />
      </PageWrapper>
    ),
    exact: "true",
    type: "public",
  },
  {
    path: "/blogs",
    element: (
      <PageWrapper title="Blogs">
        <Blog />
      </PageWrapper>
    ),
    exact: "true",
    type: "public",
  },
  {
    path: "/deal-details/:id",
    element: (
      <PageWrapper title="Deal Details">
        <DealDetails />
      </PageWrapper>
    ),
    exact: "true",
    type: "public",
  },
  {
    path: "/deals",
    element: (
      <PageWrapper title="Deals">
        <Deals />
      </PageWrapper>
    ),
    exact: "true",
    type: "public",
  },
  {
    path: "/business/:category/:name",
    element: (
      <PageWrapper title="Business Details">
        <BusinessDetails />
      </PageWrapper>
    ),
    exact: "true",
    type: "public",
  },

  {
    path: "/user-profile",
    element: (
      <PageWrapper title="User Profile">
        <UserProfile />
      </PageWrapper>
    ),
    exact: "true",
    type: "private",
  },

  {
    path: "/edit-user/:id",
    element: (
      <PageWrapper title="Edit Profile">
        <EditUser />
      </PageWrapper>
    ),
    exact: "true",
    type: "private",
  },

  {
    path: "/cat-details/:id",
    element: (
      <PageWrapper title="Category Details">
        <CategoryDetails />
      </PageWrapper>
    ),
    exact: "true",
    type: "private",
  },

  {
    path: "/categories/:name",
    element: (
      <PageWrapper title="Business">
        <Businesses />
      </PageWrapper>
    ),
    exact: "true",
    type: "public",
  },
  {
    path: "/:category/:name",
    element: (
      <PageWrapper title="Businesses">
        <SubCategoryDetails />
      </PageWrapper>
    ),
    exact: "true",
    type: "public",
  },
  {
    path: "/business-listing",
    element: (
      <PageWrapper title="Business Listing">
        <BusinessListing />
      </PageWrapper>
    ),
    exact: "true",
    type: "public",
  },
];

export default routes;
