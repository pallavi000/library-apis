import { Routes, Route } from "react-router-dom";
import UserLayout from "../component/layout/UserLayout";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import BookDetail from "../pages/BookDetail";
import UserProtected from "./UserProtected";
import AdminDashboardLayout from "../component/layout/admin/AdminDashboardLayout";
import Dashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/users/Users";
import Membership from "../pages/admin/membership/Membership";
import Authors from "../pages/admin/authors/Authors";
import Genres from "../pages/admin/genres/Genres";
import Books from "../pages/admin/books/Books";
import Borrows from "../pages/admin/borrows/Borrow";

function Navigation() {
  return (
    <Routes>
      {/* User Routes */}
      <Route element={<UserLayout />}>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<UserProtected />}>
          <Route path="/" element={<Home />} />
          <Route path="/books/:id" element={<BookDetail />} />
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route element={<AdminDashboardLayout />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/membership" element={<Membership />} />
        <Route path="/admin/authors" element={<Authors />} />
        <Route path="/admin/genres" element={<Genres />} />
        <Route path="/admin/books" element={<Books />} />
        <Route path="/admin/borrows" element={<Borrows />} />
      </Route>
    </Routes>
  );
}

export default Navigation;
