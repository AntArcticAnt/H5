import React from 'react'

import {
  Table,
  Popconfirm,
  Button,
  Row,
  Col,
  Icon,
  Tooltip,
  Pagination,
} from 'antd'

import styles from './TabelView.less'

import {AL} from '../../utils'

import CopyToClipboard from 'react-copy-to-clipboard';
// import PrintTemplate from 'react-print';

export default class TabelView extends React.Component {

  //类的静态属性检查
  static propTypes = {
      searchInfo: React.PropTypes.object,
  }

  //类的静态属性
  static defaultProps = {

  }

  // 构造函数，在创建组件的时候调用一次。
  constructor(props) {
    super(props);

    const state = this.props2state(props);
    this.state = {
      ...state,
      // selectedRows:[],
      // selectedRowKeys:[],
    };

  }

  /*
    当props发生变化时执行，初始化render时不执行，
    在这个回调函数里面，你可以根据属性的变化，通过调用this.setState()来更新你的组件状态，
    旧的属性还是可以通过this.props来获取,这里调用更新状态是安全的，并不会触发额外的render调用
  */
  componentWillReceiveProps(nextProps){
    // AL.log("list组件-重新渲染",nextProps);
    const state = this.props2state(nextProps);
    this.setState({
      ...state,
    });
  }

  props2state(props){
    // 属性
    const {
      // UI数据
      loading,
      // 内容数据
      list,
      total,
      selectedList,
      // 查询数据
      searchInfo:{
        limit,
        skip,
      },
      // 操作数据
      onPageChange,
    } = props;

    AL.log("props",props);

    // 分页信息
    const pagination = {

      // 当前页数
      current: parseInt(skip/limit)+1,
      // 当前页条数
      pageSize: limit,

      // 是否可以改变 pageSize
      showSizeChanger: true,
      // 指定每页可以显示多少条
      pageSizeOptions: ['50','100','200','500'],

      // 是否可以快速跳转至某页
      showQuickJumper: true,

      // 数据总数
      total,
      // 显示数据总数
      showTotal: (total) => (`共 ${total} 条`),

      onShowSizeChange:(current,pageSize) => {

        AL.log("改变每页条数");
        AL.log("current",current);
        AL.log("pageSize",pageSize);

        this.props.onPageChange({
          current,
          pageSize,
        })
      }
    };

    return {
      // 分页属性
      pagination,
    };
  }

  render(){

    const columns = [
      {
        title:"名称",
        // 取值
        // dataIndex: 'commodity',
        // 随便起
        key:'name',
        // width:10,
        onCellClick:(commodity, event)=>{
          // AL.log("点击单元格")
          this.props.showCommodityModal(commodity);
        },
        // value  : 由dataIndex取出来的数据
        // record : 完整的这一行数据
        // index  : 当前数据行数
        render: (value, commodity, index) => {
          return (
            <div>
              <img width={60} src={commodity.detailPhotos[0].URL} />
              <br/>
              <p>{commodity.name}</p>
            </div>
          );

        }
      },
      {
        title:"价格",
        key:'price',
        onCellClick:(commodity, event)=>{
          // AL.log("点击单元格")
          // this.props.showDisplayOrderModal(order);
        },
        render: (value, commodity, index) => {

          return (
            <div style={{textAlign:'left'}}>
              <Row>
              <p style={{
                color:'red',
                fontSize:'18px'
              }}>￥{commodity.price/100}</p>
              </Row>
              -----------------
              <Row>
              <p> 💹{commodity.saleCount}</p>
              </Row>
            </div>
          );
        }
      },
      {
        title:"描述",
        key:'introduction',
        // width:80,
        onCellClick:(commodity, event)=>{
          // AL.log("点击单元格")
          // this.props.showDisplayOrderModal(order);
        },
        render: (value, commodity, index) => {

          let introduction = "";
          commodity.introductions.forEach((intro,index)=>{
            if (index%2===0){
              introduction += `${intro} : `;
            }else{
              introduction += `${intro}\n`;
            }
          });
          // AL.log("introduction",introduction);
          const doms = [];
          for (let i=0;i<parseInt(commodity.introductions.length/2);++i){
            doms.push(<p key={`introduction-${i}-${commodity.objectId}`}>{commodity.introductions[i*2]} : {commodity.introductions[i*2+1]}</p>);
          }
          // styles={{textAlign:'left'}}
          // AL.log("doms",doms)
          return (
            <div style={{textAlign:'left'}}>
              <Row>
              <p>{commodity.subname}</p>
              </Row>
              -----------------
              <Row>
                {doms}
              </Row>
            </div>
          );
        }
      },
      {
        title:"操作",
        key:'operation',
        // width:70,
        onCellClick:(commodity, event)=>{
          // AL.log("点击单元格")
        },
        render: (value, commodity, index) => {

          return (
            <div>
              <Row>
              <Button type={
                        commodity.isDeleted
                        ?"dashed"
                        :"danger"
                      }
                      icon={
                        commodity.isDeleted
                        ?"arrow-up"
                        :"arrow-down"
                      }
                      style={{marginBottom:1}}
                      onClick={()=>{

                      }}
              >
                {
                  commodity.isDeleted
                  ?"上架"
                  :"下架"
                }
              </Button>
              </Row>
              <Row>
              <Button type="primary"
                      icon="message"
                      style={{marginBottom:1}}
                      onClick={()=>{
                        this.props.showCommodityModal(commodity);
                      }}
              >
                详情
              </Button>
              </Row>

              <Row>
              <Button type="default"
                      icon="edit"
                      style={{marginBottom:1}}
                      onClick={()=>{
                        this.props.showEditCommodityModal(commodity);
                      }}
              >
                编辑
              </Button>
              </Row>
            </div>
          );
        }
      }
    ];

    // AL.log("this.state.pagination", this.state.pagination);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            AL.log("选中所有行Id",selectedRowKeys);
            AL.log("选中所有行Object",selectedRows);
            this.setState({
                selectedRows,
                selectedRowKeys,
            });
            // this.states.selectedRows = selectedRows;
        },
        selectedRowKeys:this.state.selectedRowKeys,
        // onSelect: (record, selected, selectedRows) => {
        //     AL.log("哇哇哇")
        //     console.log(record, selected, selectedRows);
        // },
        // onSelectAll: (selected, selectedRows, changeRows) => {
        //     console.log(selected, selectedRows, changeRows);
        // },
        // getCheckboxProps: record => ({
        //   disabled: record.name === 'Disabled User',    // Column configuration not to be checked
        // }),
    };

    /*<OrderDetailModalView visible={false} />*/

    return (
      <div>

        <Row type="flex" justify="space-between">
          <Col span={16}>
            <Pagination
                {...this.state.pagination}
                 onChange={(current)=>{
                   this.props.onPageChange({
                     current,
                     pageSize : this.state.pagination.pageSize,
                   })
                 }}
            />
          </Col>

        </Row>

        <Table
          className={styles.table}
          size="small"
          fixed={true}
          bordered={false}

          columns={columns}
          dataSource={this.props.list}
          loading={this.props.loading}
          onChange={this.state.onChange}
          rowSelection={rowSelection}
          // pagination={this.state.pagination}
          // onChange={this.props.onPageChange}
          pagination={false}

          rowKey={(record) => (record.objectId)}
        />

      </div>
    )
  }
}
