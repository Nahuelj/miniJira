"use client";
import React, { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import EquipoIcons from "../icons/EquipoIcons";
import noAvatar from "../../../public/noAvatar.png";
import Image from "next/image";
import HelpIcons from "../icons/HelpIcons";
import SettingIcons from "../icons/SettingIcons";
import BoardIcon from "../icons/HomeIcons";
import NotificationIcons from "../icons/NotificationIcons";
import { getUserCurrent } from "@/axios/user.current";

const Nav = () => {
  const [user, setUser] = useState("");
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    async function axios() {
      const { data } = await getUserCurrent();
      setUser(() => {
        return data.userCurrent;
      });
      setAvatar(() => {
        return data.userCurrent.userPhoto;
      });
    }
    axios();
  }, []);

  return (
    <div className="">
      <Sidebar
        backgroundColor="#0E0E0E"
        className="text-white h-screen"
        style={{ left: "auto", right: 0 }}
      >
        <div className="flex items-center mt-5 justify-center  gap-2 max-w-52 mx-auto ">
          <div>
            <img className="w-20 h-20 rounded-sm mb-2" src={avatar} alt="" />
            <p className="text-center mb-3 text-xl font-semibold mt-3">
              {user.username}
            </p>
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
          <MenuItem
            className="pt-3 pb-3"
            icon={
              <NotificationIcons className=" text-3xl text-blue-600 w-9 " />
            }
          >
            {" "}
            Inicio{" "}
          </MenuItem>
          <SubMenu
            className="pt-3 pb-3 "
            active={true}
            icon={<BoardIcon className="  text-3xl text-blue-600 w-9" />}
            label="Tableros"
          >
            <MenuItem> opcion 1 </MenuItem>
            <MenuItem> opcion 2 </MenuItem>
          </SubMenu>
          <SubMenu
            className="pt-3 pb-3 "
            active={true}
            icon={<EquipoIcons className=" text-3xl text-blue-600 w-9 " />}
            label="Equipo Actual"
          >
            <MenuItem> opcion 1 </MenuItem>
            <MenuItem> opcion 2 </MenuItem>
          </SubMenu>

          {/* 
          <MenuItem
            className="pt-3 pb-3"
            icon={
              <NotificationIcons className=" text-3xl text-blue-600 w-9 " />
            }
          >
            {" "}
            Notificaciones{" "}
          </MenuItem> */}
          {/* <MenuItem
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
          </MenuItem> */}
        </Menu>
      </Sidebar>

      {/* <Cs> Hola Mundo </Cs> styles components, uso. */}
    </div>
  );
};

export default Nav;
