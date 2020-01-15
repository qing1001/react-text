import React, { Component } from 'react';
import { Card, Button, Icon, Table } from 'antd';
import { connect } from 'react-redux';
import { getCategoryListAsync } from '$redux/actions';

@connect(state => ({ categories: state.categories }), {
    getCategoryListAsync
})
class Category extends Component {
    componentDidMount() {
        this.props.getCategoryListAsync();
    }
    columns = [
        {
            title: '品类名称',
            dataIndex: 'name'
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render() {
                return (
                    <div>
                        <Button type='link'>修改分类</Button>
                        <Button type='link'>删除分类</Button>
                    </div>
                );
            }
        }
    ];


    render() {
        const { categories } = this.props;

        return (
            <Card title='分类列表' extra={<Button type='primary'><Icon type='plus' />分类列表</Button>}>
                <Table
                    columns={this.columns} //列
                    dataSource={categories}
                    bordered
                    pagination={{
                        defaultPageSize: 5,
                        pageSizeOptions: ['5', '10', '15', '20'],
                        showSizeChanger: true, // 是否显示改变 pageSize(改变每页的显示数)
                        showQuickJumper: true // 快速跳转
                    }}
                    rowKey='_id'
                />
            </Card>
        )
    }
}


export default Category;