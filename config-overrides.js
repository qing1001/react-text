
const { override, fixBabelImports, addLessLoader, addDecoratorsLegacy, addWebpackAlias } = require('customize-cra');

module.exports = override(
    //按需加载
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    //自定义主题色
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: { '@primary-color': '#1DA57A' },
    }),
    //es7装饰器语法兼容
    addDecoratorsLegacy(),
    //调用webpack路径别名
    addWebpackAlias({
        
    })
);