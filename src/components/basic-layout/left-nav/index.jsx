import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import menus from '$conf/menus';
const { SubMenu } = Menu;
export default class LeftNav extends Component {

    createMenus = (menus) => {
        return menus.map((menu) => {
            if (menu.children) {
                return <SubMenu
                    key={menu.path}
                    title={
                        <span>
                            <Icon type={menu.icon} />
                            <FormattedMessage id={menu.title} />
                            {/* <span>{menu.title}</span> */}
                        </span>
                    }
                >
                    {
                        menu.children.map((childrenMenu) => {
                            return this.createMenuItem(childrenMenu);
                        })
                    }

                </SubMenu>
            } else {
                return this.createMenuItem(menu);
            }
        })
    }

    createMenuItem = (menu) => {
        return <Menu.Item key={menu.path}>
            <Link to={menu.path}>
                <Icon type={menu.icon} />
                <FormattedMessage id={menu.title} />
                {/* <span>{menu.title}</span> */}
            </Link>
        </Menu.Item>
    }

    render() {

        return <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">

            {/*  <Menu.Item key="1">

                <Icon type="home" />
                <span>首页</span>
            </Menu.Item>
            <Menu.Item key="2">
                <Icon type="desktop" />
                <span>Option 2</span>
            </Menu.Item>
            <SubMenu
                key="sub1"
                title={
                    <span>
                        <Icon type="user" />
                        <span>User</span>
                    </span>
                }
            >
                <Menu.Item key="3">Tom</Menu.Item>
                <Menu.Item key="4">Bill</Menu.Item>
                <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu
                key="sub2"
                title={
                    <span>
                        <Icon type="team" />
                        <span>Team</span>
                    </span>
                }
            >
                <Menu.Item key="6">Team 1</Menu.Item>
                <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
                <Icon type="file" />
                <span>File</span>
            </Menu.Item>
            */}
            {this.createMenus(menus)}
        </Menu>
    }
}
