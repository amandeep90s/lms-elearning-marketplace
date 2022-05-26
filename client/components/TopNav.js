import React from "react";
import { Menu } from "antd";
import Link from "next/link";
import {
  AppstoreOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

const { Item } = Menu;

const items = [
  {
    label: "App",
    key: "app",
    icon: <AppstoreOutlined />,
  },
  {
    label: "Login",
    key: "login",
    icon: <LoginOutlined />,
  },
  {
    label: "Register",
    key: "register",
    icon: <UserAddOutlined />,
  },
];

const TopNav = () => {
  return (
    <Menu mode="horizontal">
      <Item icon={<AppstoreOutlined />} key="app">
        <Link href="/">
          <a>App</a>
        </Link>
      </Item>

      <Item icon={<LoginOutlined />} key="login">
        <Link href="/login">
          <a>Login</a>
        </Link>
      </Item>
      <Item icon={<UserAddOutlined />} key="register">
        <Link href="/register">
          <a>Register</a>
        </Link>
      </Item>
    </Menu>
  );
};

export default TopNav;
