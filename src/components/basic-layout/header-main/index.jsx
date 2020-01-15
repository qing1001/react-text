import React, { Component } from 'react'
import { Button, Icon, Modal } from 'antd';
import screenfull from 'screenfull';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedHTMLMessage } from 'react-intl';
import dayjs from 'dayjs';
import { changeLanguage, removeUser } from '$redux/actions';
import { removeItem } from '$utils/storage';
import menus from '$conf/menus';
import './index.less';
@connect(state => ({
    language: state.language,
    username: state.user.user && state.user.user.username

}),
    {
        changeLanguage,
        removeUser

    })
@withRouter
class HeaderMain extends Component {
    state = {
        isScreenfull: false,
        date: Date.now()
    };

    componentDidMount() {
        screenfull.on('change', this.handleScreenFullChange);
        this.timeId = setInterval(() => {
            this.setState({
                date: Date.now()
            });
        }, 1000);
    }

    handleScreenFullChange = () => {
        this.setState({
            isScreenfull: !this.state.isScreenfull
        });
    };



    componentWillUnmount() {
        screenfull.off('change', this.handleScreenFullChange);
        clearInterval(this.timeId);
    }

    screenFull = () => {
        screenfull.toggle();
    };


    //切换语言
    changeLanguage = () => {
        const language = this.props.language === 'en' ? 'zh-CN' : 'en';
        this.props.changeLanguage(language);
    }


    logout = () => {

        // 显示对话框
        Modal.confirm({
            title: '你确认要退出登录吗?',
            onOk: () => {
                // 清空用户数据
                removeItem('user');
                this.props.removeUser();
                // 跳转到/login
                this.props.history.replace('/login');
            }
        });
    };

    findTilt = (menus, pathname) => {
        for (let index = 0; index < menus.length; index++) {
            const menu = menus[index];
            if (menu.children) {
                for (let index = 0; index < menu.children.length; index++) {
                    const cMenu = menu.children[index];
                    if (cMenu.path === pathname) {
                        return cMenu.title;
                    }
                }
            } else {
                if (menu.path === pathname) {
                    return menu.title;
                }
            }
        }
    }


    render() {
        const { isScreenfull, date } = this.state;
        const { language, location: { pathname } } = this.props;

        const title = this.findTilt(menus, pathname);
        return (
            <div className='header-main'>
                <div className='header-main-top'>
                    <Button size='small' onClick={this.screenFull}>
                        <Icon type={isScreenfull ? 'fullscreen-exit' : 'fullscreen'} />
                    </Button>
                    <Button size='small' className='header-main-lang' onClick={this.changeLanguage}>
                        {
                            language === 'en' ? '中文' : 'English'
                        }

                    </Button>
                    <span>hello,admin</span>
                    <Button size='small' type='link' onClick={this.logout}>
                        退出
                    </Button>
                </div>
                <div className='header-main-bottom'>
                    <span className='header-main-left'>
                        <FormattedHTMLMessage id={title} />
                    </span>
                    <span className='header-main-right'>
                        {
                            dayjs(date).format('YYYY/MM/DD HH:mm:ss')
                        }
                    </span>
                </div>
            </div>
        )
    }
}

export default HeaderMain;