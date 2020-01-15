import React, { Component } from 'react'
import { Button, Icon } from 'antd';
import screenfull from 'screenfull';

import './index.less';
export default class HeaderMain extends Component {
    state = {
        isScreenfull: false
    };

    componentDidMount() {
        screenfull.on('change', this.handleScreenFullChange);
    }

    handleScreenFullChange = () => {
        this.setState({
            isScreenfull: !this.state.isScreenfull
        });
    };

    componentWillUnmount() {
        screenfull.off('change', this.handleScreenFullChange);
    }

    screenFull = () => {
        screenfull.toggle();
    };

    render() {
        const { isScreenfull } = this.state;
        return (
            <div className='header-main'>
                <div className='header-main-top'>
                    <Button size='small' onClick={this.screenFull}>
                        <Icon type={isScreenfull ? 'fullscreen-exit' : 'fullscreen'} />
                    </Button>
                    <Button size='small'>
                        English
                    </Button>
                    <span>hello,admin</span>
                    <Button size='small' type='link'>
                        退出
                    </Button>
                </div>
                <div className='header-main-bottom'>
                    <span className='header-main-left'>商品管理</span>
                    <span className='header-main-right'>2020/01/14 23:00:00</span>
                </div>
            </div>
        )
    }
}
