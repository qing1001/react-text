import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import { FormattedMessage } from 'react-intl';
import LeftNav from './left-nav'
import HeaderMain from './header-main'
import logo from '../../assets/imgs/logo.png';
import './index.less';

const { Header, Content, Footer, Sider } = Layout;


export default class BasicLayout extends React.Component {
    //控制收缩
    state = {
        collapsed: false,
        isDisplay: true
    };

    onCollapse = collapsed => {
        const { isDisplay } = this.state;
        // console.log(collapsed);
        this.setState({ collapsed, isDisplay: !isDisplay });
    };

    render() {
        const { isDisplay, collapsed } = this.state;
        const { children } = this.props;
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                    <div className="layout-logo" >
                        <img src={logo} alt='logo' />
                        <h1 style={{ display: isDisplay ? 'block' : 'none' }}><FormattedMessage id='title' /></h1>
                    </div>
                    <LeftNav />
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <HeaderMain />
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>{children}</div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        );
    }
}