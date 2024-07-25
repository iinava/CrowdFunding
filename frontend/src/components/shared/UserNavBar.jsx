import React, { useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Avatar,
} from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../../lib/constants";
import api from "../../lib/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchcategorys } from "../../features/CategoriesSlice";

export default function UserNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const Category = useSelector((state) => state.Category.Category);

  const error = useSelector((state) => state.Category.error);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const menuItems = ["Home", "login", "register"];

  const Logout = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    await api
      .post("/api/user/logout/", { refresh: refreshToken })
      .then(() => {
        localStorage.removeItem(REFRESH_TOKEN);
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem("IS_LOGGED_IN");
        navigate("/login");
        console.log("navigate to login");
      })
      .catch((err) => {
        console.log("could not log out");
      });
  };

  useEffect(() => {
    dispatch(fetchcategorys());
  }, [dispatch]);

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      className="font-thin absolute md:px-[3vw] bg-neutral-900"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <img
            src="https://giveth.io/images/logo/logo.svg"
            className="filter invert"
            alt=""
          />
          <h1 className="text-2xl font-thin"> Fund chain</h1>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex" justify="center">
        <NavbarItem>
          <NavLink
            to="/dashboard"
            className="text-1xl font-thin hover:text-green-500"
          >
            All projects
          </NavLink>
        </NavbarItem>

        {Category && (
          <Dropdown>
            <DropdownTrigger>
              <div
                variant="light"
                className="hover:text-green-500 cursor-pointer"
              >
                Categories
              </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              {Category.map((cat) => (
                <DropdownItem key={cat.id}>
                  <NavLink
                    to={`campaign/category/${cat.name}`}
                    className="hover:text-green-500"
                  >
                    {cat.name}
                  </NavLink>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        )}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Dropdown>
            <DropdownTrigger>
              <Avatar className="cursor-pointer" />
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="profile" onPress={() => navigate("/profile")}>
                Profile
              </DropdownItem>
              <DropdownItem key="logout" onClick={Logout}>
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
        <NavbarItem></NavbarItem>
      </NavbarContent>
      <NavbarMenu className="flex flex-col gap-10">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full text-white text-3xl my-6 font-thin font-mono"
              to={`/${item.toLowerCase()}`}
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
