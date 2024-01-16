"use client";
import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

import EquipoIcons from "../icons/EquipoIcons";

import noAvatar from "../../../public/noAvatar.png";

import Image from "next/image";
import HelpIcons from "../icons/HelpIcons";

import SettingIcons from "../icons/SettingIcons";
import BoardIcon from "../icons/HomeIcons";
import NotificationIcons from "../icons/NotificationIcons";

const Nav = () => {
  return (
    <div className="">
      <Sidebar
        backgroundColor="#0E0E0E"
        className="text-white h-screen"
        style={{ left: "auto", right: 0 }}
      >
        <div className="flex items-center mt-5 justify-center  gap-2 max-w-52 mx-auto ">
          <div>
            <Image className="w-20 h-20 rounded-full" src={noAvatar} />
            <p className="text-center">Admin</p>
          </div>
        </div>

        <Menu
          className="h-full   "
          menuItemStyles={{
            button: {
              backgroundColor: "#0E0E0E", // Color de fondo cuando no se pasa el cursor
              "&:hover": {
                backgroundColor: "#F73859",
              },
            },
          }}
        >
          <SubMenu
            className="pt-3 pb-3 "
            active={true}
            icon={<BoardIcon className="  text-3xl text-blue-600 w-9" />}
            label="Tablero Principal"
          >
            <MenuItem> opcion 1 </MenuItem>
            <MenuItem> opcion 2 </MenuItem>
          </SubMenu>

          <MenuItem
            className="pt-3 pb-3"
            icon={
              <NotificationIcons className=" text-3xl text-blue-600 w-9 " />
            }
          >
            {" "}
            Notificaciones{" "}
          </MenuItem>
          <MenuItem
            className="pt-3 pb-3"
            icon={<EquipoIcons className=" text-3xl text-blue-600 w-9 " />}
          >
            {" "}
            Equipo{" "}
          </MenuItem>
          <MenuItem
            className="pt-3 pb-3"
            icon={<SettingIcons className="font-light  text-3xl  w-9" />}
          >
            {" "}
            Configuraciones{" "}
          </MenuItem>

          <MenuItem
            className="pt-3 pb-3"
            active={true}
            icon={<HelpIcons className=" text-3xl text-blue-600 w-9" />}
          >
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
