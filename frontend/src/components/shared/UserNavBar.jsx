import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Avatar,
} from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import {  useNavigate } from "react-router-dom";
import { REFRESH_TOKEN ,ACCESS_TOKEN} from "../../lib/constants";
import api from "../../lib/api";


export default function UserNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate()

  const menuItems = ["Home", "login", "register"];

const Logout = async ()=>{
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);
   await api.post('/api/user/logout/',{ refresh:refreshToken }).then(()=>{
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.removeItem(ACCESS_TOKEN);
    navigate('/login');
    console.log("navigate to login")
   }).catch((err)=>{
    console.log("could not log out");
   })
   

}

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="2xl"
      className="font-thin absolute"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <h1 className="text-2xl font-thin">Fund Chain</h1>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex " justify="center">
        <NavbarItem>
          <Link color="foreground" href="/#testimonials">
            All projects
          </Link>
        </NavbarItem>

        <Dropdown>
          <DropdownTrigger>
            <div className="cursor-pointer" variant="light">
              Categories
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="new">New file</DropdownItem>
            <DropdownItem key="copy">Copy link</DropdownItem>
            <DropdownItem key="edit">Edit file</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Dropdown>
            <DropdownTrigger>
              <Avatar className="cursor-pointer" />
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="profile" onPress={()=>navigate('/profile')}>profile</DropdownItem>
              <DropdownItem key="copy"onPress={()=>{Logout()}} >logout</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
        <NavbarItem></NavbarItem>
      </NavbarContent>
      <NavbarMenu className="flex flex-col gap-10">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full text-white text-3xl my-6 font-thin font-mono "
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
