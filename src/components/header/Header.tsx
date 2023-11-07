import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { PATH_ROUTES } from "../../constants/pathRoutes";
import logo from "./annea-logo.jpg";

const NavItemLabel = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  font-size: 16px;
  font-weight: 650;
  padding: 0;
  white-space: nowrap;
  transition: 0.3s;
  letter-spacing: 0.4px;
  position: relative;
  text-transform: uppercase;
  cursor: pointer;
  text-decoration: none;

  &.active {
    color: #307062;
  }

  &.active:before {
    visibility: visible;
    width: 80%;
    background-color: #307062;
  }

  &:hover {
    color: #4be580;
  }

  &:hover:before {
    visibility: visible;
    width: 80%;
    background-color: #4be580;
  }

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: -6px;
    left: 0;
    width: 0;
    background-color: #fff;
    visibility: hidden;
    transition: all 0.3s ease-in-out 0s;
  }
`;

const NavItem = styled.span`
  white-space: nowrap;
  padding: 10px 0 10px 30px;
`;

const Navbar = styled.nav`
  transition: box-shadow 0.15s ease-in-out;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

const Wrapper = styled.header<{ isalpha: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 5;
  background: rgba(0, 0, 0, ${(props) => (props.isalpha ? "0" : "0.9")});
  padding: ${(props) => (props.isalpha ? "20px 0" : "12px 0")};
  transition:
    background 0.5s,
    padding 0.5s;
`;

const StyledNavigationMenu = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;

  margin-right: 25px;
  margin-left: 25px;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`;

export const Header: React.FunctionComponent = () => {
  const [isalpha, setAlpha] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setAlpha(false);
      } else {
        setAlpha(true);
      }
    };

    window.addEventListener("scroll", handleScroll, true);
  }, []);

  return (
    <Wrapper isalpha={isalpha}>
      <StyledNavigationMenu>
        <LogoContainer>
          <img src={logo} alt={"Logo of the website"} />
        </LogoContainer>
        <Navbar>
          <NavItem>
            <NavItemLabel to={PATH_ROUTES.home}>Home</NavItemLabel>
          </NavItem>
        </Navbar>
      </StyledNavigationMenu>
    </Wrapper>
  );
};
