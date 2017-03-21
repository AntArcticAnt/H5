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

const signature = (order)=>{
  let signature = '未知';
  if (order.isAnonymity) {
      signature = "******"
  } else if (order.cardName) {
      signature = order.cardName;
  } else if (order.senderName) {
      signature = order.senderName;
  } else if (order.user) {
      signature = order.user.nickname;
  } else {
      signature = "未知";
  }
  return signature;
}

const OperationView = ({
  order,
  updateOrderState,
}) => {

    const {
      state,
    } = order;

    let stateText = null;
    let style = null;
    let operationText = null;

    // console.log("state",state);

    switch (state){
        case -1:
            stateText = "关闭";
            style = styles.btnDefault;
            break;
        case 0:
            stateText = "未知";
            style = styles.btnDefault;
            break;
        case 1:
            stateText = "订单生成 等待付款";
            style = styles.btnDefault;
            break;

        case 2:
            stateText = "支付完成 等待确认";
            style = styles.btnPrimary;
            operationText = "确认订单";
            break;
        case 3:
            stateText = "确认完成 等待制作";
            style = styles.btnSecondary;
            operationText = "开始制作";
            break;
        case 5:
            stateText = "制作完成 等待配送";
            style = styles.btnSuccess;
            operationText = "开始配送";
            break;
        case 7:
            stateText = "开始配送 等待收货";
            style = styles.btnWarning;
            operationText = "已经送达";
            break;
        case 8:
            stateText = "已收货 等待评价";
            style = styles.btnDefault;
            break;
        case 9:
            stateText = "订单完成-等待评价";
            style = "am-btn-default";
            break;
        case 10:
            stateText = "订单完成OK";
            style = "am-btn-default";
            break;
        case 11:
            stateText = "申请退款中";
            style = "am-btn-danger";
            break;
        case 12:
            stateText = "审核成功 等待退款";
            style = "am-btn-warning";
            break;
        case 13:
            stateText = "退款完成";
            style = "am-btn-default";
            break;
    }

    return (
      <div>
        {stateText}
        <br/>
        {
          operationText
            ? <Button size='large'
                      className={style}
                      loading={order.loading}
                      onClick={()=>{
                        updateOrderState([order]);
                      }}>
                {operationText}
              </Button>
            :''
        }
      </div>
    );
}

const PersonView = (order) => {

  const {
    // senderName,
    senderPhone,
    receiverName,
    receiverPhone,
  } = order;

  return (
    <div>
      <Row>
        <Col>
        {signature(order)}
        <br/>
        {senderPhone}
        </Col>
      </Row>
      ------------
      <Row>
        <Col>
        {receiverName}
        <br/>
        {receiverPhone}
        </Col>
      </Row>
    </div>
  );
}

const DateView = ({
  createdAt,
  deliveryFromDate,
}) => {
  // AL.log("createdAt",createdAt)
  // AL.log("deliveryFromDate",deliveryFromDate)
  return (
    <div>
      <Row>
        <Col>
        {AL.date2string(createdAt, "MM月DD日 HH时mm分")}
        </Col>
      </Row>
      ---------------
      <Row>
        <Col>
        {AL.date2string(deliveryFromDate, "MM月DD日 HH时mm分")}
        </Col>
      </Row>
    </div>
  );
}

const CommodityView = ({
  commodity,
  order,
}) => {
  /*
    onClick={()=>{
      AL.log("商品图片-点击")
      this.state.orderDetailModalVisible = true;
    }}
  */
  return (
    <div>
      <img width={60} src={commodity.detailPhotos[0].URL} />
      <br/>
      {commodity.name}
    </div>
  );
}

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

    // AL.log("list组件-构造函数",props);
    // 绑定this
    const state = this.props2state(props);
    this.state = {
      ...state,
      selectedRows:[],
      selectedRowKeys:[],
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

  // 数据更新 setState时
  // componentDidUpdate(newState){
  //   AL.log("list组件-数据更新",newState);
  // }

  props2state(props){
    // 属性
    const {
      // UI数据
      // loading,
      // 内容数据
      // list,
      total,
      // 查询数据
      searchInfo:{
        limit,
        skip,
      },
      // 操作数据
      handlePageChange,
    } = props;

    // 分页信息
    const pagination = {

      // 当前页数
      current: parseInt(skip/limit)+1,
      // 当前页条数
      pageSize: limit,

      // 是否可以改变 pageSize
      showSizeChanger: true,
      // 指定每页可以显示多少条
      pageSizeOptions: ['100','200','500','1000'],

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

        // this.setState({
        //   pagination:{
        //     ...this.state.pagination,
        //     current,
        //     pageSize,
        //   }
        // });

        this.props.handlePageChange({
          current,
          pageSize,
        })
        // AL.log("this.state",this.state);
      }
    };

    return {
      // 分页属性
      pagination,
      // 翻页方法
      // onChange:(page)=>{
      //   AL.log("翻页",page);
      //   handlePageChange(page);
      // },
    };
  }

  onOrder(order){

    // AL.log("this",this);
    AL.log("查看订单",order.receiverName);

    this.setState({
      currentOrder : order,
      orderModalVisible : true,
    });

    // currentCommodity : null,
    // commodityModalVisible : false,
    //
    // currentOrder : null,
    // orderModalVisible : false,
  }

  render(){

    const columns = [
      {
        title:"商品",
        // 取值
        dataIndex: 'commodity',
        // 随便起
        key:'commodity',
        // width:10,
        onCellClick:(order, event)=>{
          // AL.log("点击单元格")
          this.props.onCommodityModal(order.commodity);
        },
        // value  : 由dataIndex取出来的数据
        // record : 完整的这一行数据
        // index  : 当前数据行数
        render: (commodity, order, index) => {

          return (
            <CommodityView {
              ...{
                commodity,
                order,
              }
            }/>
          );

        }
      },
      {
        title:"订单状态",
        dataIndex: 'state',
        key:'state',
        // width:60,
        // onCellClick:(order, event)=>{
        //   // AL.log("点击单元格")
        //   this.props.showDisplayOrderModal(order);
        // },
        render: (state, order, index) => {
          // console.log("value",value)
          // console.log("record",record)

          return (
            <OperationView {
              ...{
                order,
                updateOrderState:this.props.updateOrderState,
              }
            }/>
          );
        }
      },
      {
        title:"订单对象",
        // dataIndex: 'person',
        key:'person',
        // width:70,
        onCellClick:(order, event)=>{
          // AL.log("点击单元格")
          // this.props.showDisplayOrderModal(order);
        },
        render: (person, order, index) => {

          // const {
          //   senderName,
          //   senderPhone,
          //   receiverName,
          //   receiverPhone,
          // } = person;

          return (
            <PersonView {...order} />
          );
        }
      },
      {
        title:"订单时间",
        // dataIndex: 'date',
        key:'date',
        width:130,
        onCellClick:(order, event)=>{
          // AL.log("点击单元格")
          // this.props.showDisplayOrderModal(order);
        },
        render: (date, order, index) => {

          // const {
          //   createdAt,
          //   deliveryFromDate,
          // } = date;

          // AL.log('date',date);

          return (
              <DateView {...order} />
          );
        }
      },
      {
        title:"地址",
        // dataIndex: 'address',
        key:'address',
        width:140,
        onCellClick:(order, event)=>{
          // AL.log("点击单元格")
          // this.props.showDisplayOrderModal(order);
        },
        render: (address, order, index) => {
          return (
            <div>
              <Row>
              <p>{order.address.district}</p>
              </Row>
              -----------------
              <Row>
              <p>{order.address.street}</p>
              </Row>
            </div>
          );
        }
      },
      {
        title:"备注",
        // dataIndex: 'remark',
        key:'remark',
        width:100,
        onCellClick:(order, event)=>{
          // AL.log("点击单元格")
          // this.props.showDisplayOrderModal(order);
        },
        render: (x, order, index) => {

          // 长度不能超过35
          // return (<p>{"我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我"}</p>);
          const remark = order.remark;
          const remarkOfServer = order.remarkOfServer;
          const maxLenght = 26;
          if (!AL.isString(remark) || !AL.isString(remarkOfServer)){
            return (<p></p>);
          } else if (remark.length>maxLenght || remarkOfServer.length>maxLenght) {

            return (
                  <div>
                    {
                      remark.length>maxLenght
                      ?(
                        <Tooltip title={remark}>
                          <p>{remark.substr(0,maxLenght)}...</p>
                        </Tooltip>
                      )
                      :<p>{remark}</p>
                    }
                    ----------
                    {
                      remarkOfServer.length>maxLenght
                      ?(
                        <Tooltip title={remarkOfServer}>
                          <p>{remarkOfServer.substr(0,maxLenght)}...</p>
                        </Tooltip>
                      )
                      :<p>{remarkOfServer}</p>
                    }
                </div>
              );
          } else {
            return (
              <div>
                <p>{remark}</p>
                ----------
                <p>{remarkOfServer}</p>
              </div>
            );
          }
        }
      },
      {
        title:"渠道",
        // dataIndex: 'channel',
        key:'channel',
        // width:70,
        onCellClick:(order, event)=>{
          // AL.log("点击单元格")
          // this.props.showDisplayOrderModal(order);
        },
        render: (channel, order, index) => {

          let {
            appName,
            platform,
            version,
          } = order;

          // AL.log("platform",platform);
          if (appName==="BLOOM"){
              platform = "iOS";
              version = "1.6.0";
          }

          let platformIcon = "";
          switch (platform) {
            case "iOS":
              platformIcon = "https://dn-g405gbtt.qbox.me/27f5edde5c45923a069d.png";
              break;
            case "Android":
              platformIcon = "https://dn-g405gbtt.qbox.me/2701d10b0d1092b3441c.png";
              break;
          }
          let appIcon = "";
          switch (appName) {
            case "鲜花中国":
              appIcon = "https://dn-g405gbtt.qbox.me/3294e32dcb2ad44488fa.png";
              break;
            case "BLOOM":
              appIcon = "https://dn-g405gbtt.qbox.me/08c02ca7cef32cc0df7f.png";
              break;
            case "奔奔送花":
              appIcon = "https://dn-g405gbtt.qbox.me/b1d71599c81e8e25501f.png";
              break;
            case "Enjoy Flower":
              appIcon = "https://dn-g405gbtt.qbox.me/6f97aa5206f2e32cbae3.png";
              break;

          }
          return (
            <div>
              <img src={platformIcon} style={{width:25,heigth:25}} />
              <img src={appIcon} style={{width:25,heigth:25}} />
            </div>
          );

          // return (
          //     <div style={{textAlign:'center'}}>
          //       <p>  APP名: {appName}</p>
          //       <p>  渠道 : {platform}</p>
          //       <p>  版本 : {version}</p>
          //     </div>
          // );
        }
      },{
        title:"操作",
        // dataIndex: 'channel',
        key:'operation',
        width:70,
        onCellClick:(order, event)=>{
          // AL.log("点击单元格")
        },
        render: (channel, order, index) => {

          // let signature = '未知';
          // if (order.isAnonymity) {
          //     signature = "******"
          // } else if (order.cardName) {
          //     signature = order.cardName;
          // } else if (order.senderName) {
          //     signature = order.senderName;
          // } else if (order.user) {
          //     signature = order.user.nickname;
          // } else {
          //     signature = "未知";
          // }

          const orderString = `\n
              商品名:《${order.commodityName}》\n
              金额:${order.totalPrice/100} 元\n
              ---------------------------------------\n
              发货人姓名:${signature(order)}\n
              发货人电话:${order.senderPhone}\n
              留言:${order.cardMessage}\n
              ---------------------------------------
              收货人姓名:${order.receiverName}\n
              收货人电话:${order.receiverPhone}\n
              收货人住址:${order.deliveryAddress}\n
              优惠金额:${order.coupon?order.coupon.faceValue:''}\n
              备注: ${order.remark}\n
              ---------------------------------------\n
          `;

          return (
            <div>
              <Button type={
                        order.isPrint
                        ?"dashed"
                        :"danger"
                      }
                      icon="qrcode"
                      style={{marginBottom:1}}
                      onClick={()=>{
                        // this.props.showDisplayOrderModal(order);
                        const orderDetailPage = `http://dev.flowerso2o.leanapp.cn/1.4/20161122/admin/order/detail?orderId=${order.objectId}`;
                        const w = window.open('about:blank');
                        w.location.href = orderDetailPage;
                      }}
              >
                打印
              </Button>

              <Button type="primary"
                      icon="message"
                      style={{marginBottom:1}}
                      onClick={()=>{
                        this.props.showDisplayOrderModal(order);
                      }}
              >
                详情
              </Button>

              <Button type="default"
                      icon="edit"
                      style={{marginBottom:1}}
                      onClick={()=>{
                        this.props.showEditOrderModal(order);
                      }}
              >
                编辑
              </Button>

              <CopyToClipboard text={orderString}
                               onCopy={() => {
                                 this.setState({
                                   copying: true
                                 },()=>{
                                   setTimeout(()=>{
                                     this.setState({
                                       copying: false
                                     });
                                   }, 500);
                                 });
                               }}
                >
                <Button type="dashed"
                        icon={this.state.copying?"loading":"copy"}
                        style={{marginBottom:1}}
                        /* loading={this.state.copying} */
                        >
                  拷贝
                </Button>
              </CopyToClipboard>
            </div>
          );
        }
      }
    ];

    AL.log("this.state.pagination", this.state.pagination);

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
                   this.props.handlePageChange({
                     current,
                     pageSize : this.state.pagination.pageSize,
                   })
                 }}
            />
          </Col>

          <Col span={8}>

            <Button type="default"
                    style={{
                      margin:"0px 5px 16px 0px",
                    }}
                    onClick={()=>{

              this.setState({
                selectedRows:[],
                selectedRowKeys:[],
              })
              // ({this.state.selectedRows.length})

            }}>清除选中订单</Button>
            <Button type="primary"
                    style={{
                      margin:"0px 5px 16px 0px",
                    }}
                    onClick={()=>{

              this.props.updateOrderState(this.state.selectedRows)
              // ({this.state.selectedRows.length})

            }}>更新状态（{this.state.selectedRows.length}）</Button>
            {
              /*
              <Button type="danger"
                      style={{
                        margin:"0px 5px 16px 0px",
                      }}
                      onClick={()=>{

                this.props.downloadOrders(this.state.selectedRows.map((order)=>(order.objectId)))
                // ({this.state.selectedRows.length})

              }}>下载（{this.state.selectedRows.length}）</Button>
              */
            }
            <a  target="_blank"
                href={
                  `${AL.host}admin/order/commodity/download?orderIds=${JSON.stringify(this.state.selectedRows.map((order)=>(order.objectId)))}`
                }
            >
                下载（{this.state.selectedRows.length}）
            </a>
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
          // onChange={this.props.handlePageChange}
          pagination={false}

          rowKey={(record) => (record.objectId)}
        />

      </div>
    )
  }
}

// list.propTypes = {
//   onPageChange: PropTypes.func,
//   onDeleteItem: PropTypes.func,
//   onEditItem: PropTypes.func,
//   dataSource: PropTypes.array,
//   loading: PropTypes.any,
//   pagination: PropTypes.any
// }

// export default list
