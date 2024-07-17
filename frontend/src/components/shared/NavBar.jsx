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
  Button,
} from "@nextui-org/react";
import { FaGithub } from "react-icons/fa";

export default function NavbarNextUI() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = ["Home", "login", "register"];

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
          <Link href="/#agenda" aria-current="page" className="text-white">
            insights
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link color="foreground" href="/#testimonials">
            Testimonials
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/#contact">
            contact
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
      <a href="https://github.com/iinava/fundchain-web3"><FaGithub size={20} /></a>
        </NavbarItem>
        <NavbarItem>
          {/* <ButtonBackgroundShine text={"Login"} /> */}
        </NavbarItem>
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
