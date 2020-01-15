import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { IntlProvider } from 'react-intl';
import { ConfigProvider } from 'antd'
import Login from './containers/login';
import BasicLayout from './components/basic-layout';
import { en, zhCN } from './locales';
import zh_CN from 'antd/es/locale/zh_CN';
import en_US from 'antd/es/locale/en_US';
import routes from './config/routes'


@connect(
    state => ({ language: state.language }), null
)
class App extends Component {
    render() {
        const language = this.props.language;
        const isEn = language === 'en'


        return <ConfigProvider locale={isEn ? en_US : zh_CN}>
            <IntlProvider locale={language} messages={isEn ? en : zhCN} >
                <Router>
                    <Switch>
                        <Route path="/login" exact component={Login} />
                        <BasicLayout>
                            {
                                routes.map((route) => {
                                    return <Route {...route} key={route.path} />
                                })
                            }
                            {/* <Route path="/" exact component={Home} /> */}
                        </BasicLayout>
                    </Switch>
                </Router>
            </IntlProvider>
        </ConfigProvider>

    }
}

export default App;