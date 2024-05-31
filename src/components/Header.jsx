import React from "react";
import {Navbar, NavbarContent, NavbarItem} from "@nextui-org/react";
import {NavLink} from "react-router-dom";

export default function Header() {
    return (
        <Navbar shouldHideOnScroll>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <NavLink to="/login">
                    Login
                    </NavLink>
                </NavbarItem>
                <NavbarItem >
                    <NavLink to="/registre">
                        Registre
                    </NavLink>
                </NavbarItem>
                <NavbarItem>
                    <NavLink to="/panel">
                    Panel
                    </NavLink>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
