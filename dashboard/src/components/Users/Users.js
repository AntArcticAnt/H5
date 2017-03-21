import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import { routerRedux } from 'dva/router';
// DVA的router方法
import styles from './Users.css';
import { PAGE_SIZE } from '../../constants';
import UserModal from './UserModal';



//Users是无状态组件
function Users({ dispatch, list: dataSource, loading, total, page: current }) {


//传进来的dispatch是什么??
//传进来的变量名字为list改为dataSource
//传进来的变量名字为page改为current
// 所以现在实参变量为===>
// dispatch本质为dispatch方法===>DVA的内置方法
// dataSource==>list数组的指针=>list来源于models(1/5),同理total,page(current)
// loading也是DVA封装的效果



  function deleteHandler(id) {
    //id是形参
    dispatch({
      //dispatch方法来源于DVA
      type: 'users/remove',
      //ACTIONS
      payload: id,
      //payload是啥???
    });
  }

  function pageChangeHandler(page) {
    let para=routerRedux.push({
      pathname: '/users',
      query: { page },
    });
    dispatch(para);
  }

  function editHandler(id, values) {
    dispatch({
      type: 'users/patch',
      payload: { id, values },
    });
  }

  function createHandler(values) {
    dispatch({
      type: 'users/create',
      payload: values,
    });
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="">{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <UserModal record={record} onOk={editHandler.bind(null, record.id)}>
            {/*const { name, email, website } = this.props.record;  */}
            <a>Edit</a>
            {/*标签嵌套,自定义内容 */}
          </UserModal>
          <Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, record.id)}>
            <a href="">Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className={styles.normal}>
      <div>
        <div className={styles.create}>
          <UserModal record={{}} onOk={createHandler}>
            <Button type="primary">Create User</Button>
            {/*自定义内容!!*/}
          </UserModal>
        </div>
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          rowKey={record => record.id}
          pagination={false}
        />
        <Pagination
          className="ant-table-pagination"
          total={total}
          current={current}
          pageSize={PAGE_SIZE}
          onChange={pageChangeHandler}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, page } = state.users123;
  // 从 model 中 引入 list, total, page 三个state.
  // state.users123必须对应models
  //从router.js文件中dva.model(加载的model)
  // state.users  ===>从models文件夹中的users.js中暴露的对象(五个键值对中的命名空间namespace=>state)中获取
  return {
    loading: state.loading.models.users,
    list,
    total,
    page,
  };
}

export default connect(mapStateToProps)(Users);
// mapStateToProps

// 向外面暴露一个变量=>connect()();
