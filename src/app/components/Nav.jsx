"use client";
import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";


import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';import HelpIcon from "@mui/icons-material/Help";
import noAvatar from "../../../public/noAvatar.png";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Image from "next/image";

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import styled from "styled-components";

const Nav = () => {
  const Cs = styled.p`
    background-color: blue;
    color: white;
  `;

  return (
    <div className="">
      <Sidebar backgroundColor="" className="  h-screen">
        <div className="flex justify-center gap-2 max-w-52 mx-auto mt-2">
          <div>
            <Image className="w-20 h-20 rounded-full" src={noAvatar} />
            <p className="text-center">Hector</p>
          </div>
        </div>

        <Menu className="h-full ">
          <SubMenu
            className="pt-3 pb-3"
            active={true}
            icon={<HomeOutlinedIcon className=" text-4xl" />}
            label="Tablero Principal"
          >
            <MenuItem> opcion 1 </MenuItem>
            <MenuItem> opcion 2 </MenuItem>
          </SubMenu>
          <MenuItem className=" pt-3 pb-3" icon={<AssignmentOutlinedIcon  className=" text-4xl"/>}> Tareas </MenuItem>
          <MenuItem className="pt-3 pb-3" icon={<NotificationsNoneOutlinedIcon className=" text-4xl" />}> Notificaciones </MenuItem>
          <MenuItem className="pt-3 pb-3" icon={<GroupOutlinedIcon className=" text-4xl" />}> Equipo </MenuItem>
          <MenuItem className="pt-3 pb-3" icon={<SettingsOutlinedIcon className="font-light  text-4xl" />}> Configuraciones </MenuItem>

          <MenuItem className="pt-3 pb-3" active={true} icon={<ContactSupportOutlinedIcon className=" text-4xl" />}>
            {" "}
            Ayuda{" "}
          </MenuItem>
        </Menu>
      </Sidebar>

      {/* <Cs> Hola Mundo </Cs> styles components, uso. */}
    </div>
  );
};

export default Nav;
