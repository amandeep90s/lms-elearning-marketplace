import React, {useContext, useEffect, useState} from "react";
import {Menu} from "antd";
import Link from "next/link";
import {AppstoreOutlined, CoffeeOutlined, LoginOutlined, LogoutOutlined, UserAddOutlined,} from "@ant-design/icons";
import {Context} from "../context";
import axios from "axios";
import {useRouter} from "next/router";
import {toast} from "react-toastify";

const {Item, SubMenu} = Menu;

const TopNav = () => {
    const [current, setCurrent] = useState("");
    const {state, dispatch} = useContext(Context);
    const {user} = state;

    // router
    const router = useRouter();

    useEffect(() => {
        typeof window !== 'undefined' && setCurrent(window.location.pathname)
    }, [typeof window !== 'undefined' && window.location.pathname]);

    const logout = async () => {
        dispatch({type: "LOGOUT"});
        window.localStorage.removeItem("user");
        const {data} = await axios.get("/api/logout");
        toast.success(data.message);
        await router.push("/login");
    }

    return (
        <Menu mode="horizontal" selectedKeys={[current]}>
            <Item icon={<AppstoreOutlined/>} key="/" onClick={(e) => setCurrent(e.key)}>
                <Link href="/">
                    <a>App</a>
                </Link>
            </Item>
            {user === null ? (
                <>
                    <Item icon={<LoginOutlined/>} key="/login" onClick={(e) => setCurrent(e.key)}>
                        <Link href="/login">
                            <a>Login</a>
                        </Link>
                    </Item>
                    <Item icon={<UserAddOutlined/>} key="/register" onClick={(e) => setCurrent(e.key)}>
                        <Link href="/register">
                            <a>Register</a>
                        </Link>
                    </Item>
                </>
            ) : (
                <SubMenu icon={<CoffeeOutlined />} title={user?.name}>
                    <Item icon={<LogoutOutlined/>} key="/logout" onClick={logout}>
                        Logout
                    </Item>
                </SubMenu>
            )}
        </Menu>
    );
};

export default TopNav;
