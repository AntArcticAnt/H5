import React,{
  Component,
  PropTypes,
} from 'react'
// import moment from 'moment';
import {
  Input,
  Button,
  Row,
  Col,
  DatePicker,
  Checkbox,
  Switch,
} from 'antd'

const Search = Input.Search;

import {AL} from '../../utils'

const config = {
  states:AL.config.states,
  channels:AL.config.channels,
};

const CheckboxGroup = Checkbox.Group;

/*
  需要有state
  自行维护自身state--而不是直接关联到model
  从model获取基本参数 --> 通过dispatch想model发送数据
*/
export default class SearchView extends Component {

  //类的静态属性检查
  static propTypes = {
      searchInfo: PropTypes.object,
  }

  //类的静态属性
  static defaultProps = {

  }

  // 初始化state
  constructor(props) {
    super(props);

    const state = this.props2state(props);
    this.state = {
      ...state,
      // initState:state,
    };
  }

  componentWillReceiveProps(nextProps){
    // this.initState(nextProps);
    const state = this.props2state(nextProps);
    this.setState({
      ...state,
      // initState:state,
    });
  }

  state2props(state){

    const {
      isOnlyBloom,
      sort,
      keyword,
    } = state;

    return {

      states:checkboxOfState.value.map((val)=>(AL.config.states[val])),
      channels:checkboxOfChannel.value,
      isOnlyBloom,
    };
  }

  props2state(props){

    // 属性
    const {
      // 搜索条件
      searchInfo:{

        // 订单状态
        states,
        // 渠道信息
        channels,
        // stateConfig,
        // 只显示自营
        isOnlyBloom,
        // 只显示未打印
        isOnlyNotToPrint,
        // 日期范围
        createdFromDate,
        createdToDate,
        deliveryFromDate,
        deliveryToDate,
      },
      handleSearch,
    } = props;

    const todayMoments = [
      moment({hour: 0}),
      moment({hour: 23, minute: 59, seconds: 59, milliseconds: 999}),
    ];

    const tomorrowMoments = [
      moment({hour: 0}).add(24, 'hours'),
      moment({hour: 23, minute: 59, seconds: 59, milliseconds: 999}).add(24, 'hours'),
    ];

    const afterTomorrowMoments = [
      moment({hour: 0}).add(48, 'hours'),
      moment({hour: 23, minute: 59, seconds: 59, milliseconds: 999}).add(48, 'hours'),
    ];

    const yesterdayMoments = [
      moment({hour: 0}).add(-24, 'hours'),
      moment({hour: 23, minute: 59, seconds: 59, milliseconds: 999}).add(-24, 'hours'),
    ];

    //var afterTomorrow = AL.string2date(currentDate.getFullYear() + "-" + (currentDate.getMonth()+1)+ "-" + (currentDate.getDate()+2));
    let options = Object.keys(AL.config.states);
    let value = [];
    for (let stateName in AL.config.states){
      if (states.indexOf(AL.config.states[stateName])!==-1) {
          value.push(stateName);
      }
    }

    const checkboxOfState = {
      // 选中的项
      value,
      // 可选项
      options,
      // 是否部分选中
      indeterminate:value.length!=options.length && value.length!==0,
      // 是否全选了
      isCheckAll:value.length==options.length,
    }

    // AL.config.channels
    const checkboxOfChannel = {
        value:channels,
        options:AL.config.channels,
        indeterminate:channels.length!==AL.config.channels.length && channels.length!==0,
        isCheckAll:channels.length===AL.config.channels.length,
    };

    // 是否部分选中
    // indeterminate:seleteOfState.options.length!==seleteOfState.value.length && seleteOfState.value.length!==0,
    // 是否全选了
    // isCheckAll:seleteOfState.options.length===seleteOfState.value.length,

    // const options = Object.keys(stateConfig);
    // const value = [];
    // for (let key in stateConfig){
    //   if (states.indexOf(stateConfig[key])!==-1) {
    //     value.push(key);
    //   }
    // }

    return {

      // 订单状态
      // 可选项
      // options,
      // 选中的选项
      // value,
      checkboxOfState,
      checkboxOfChannel,
      isOnlyBloom,
      isOnlyNotToPrint,
      // stateConfig,

      // 订单时间
      createdFromMoment:AL.isDate(createdFromDate)?moment(createdFromDate):null,
      createdToMoment:AL.isDate(createdToDate)?moment(createdToDate):null,
      deliveryFromMoment:AL.isDate(deliveryFromDate)?moment(deliveryFromDate):null,
      deliveryToMoment:AL.isDate(deliveryToDate)?moment(deliveryToDate):null,

      // 订单时间
      todayMoments,
      tomorrowMoments,
      afterTomorrowMoments,
      yesterdayMoments,
    };

  }

  /* 自定义方法 */
  // 选定下单时间范围
  createdDateChange(moments, dateStrings){

    AL.log("moments",moments);
    //  console.log('From: ', moments[0].set({hour: 0}).toDate(), ', to: ', moments[1].set({hour: 23, minute: 59, seconds: 59, milliseconds: 999}).toDate());
    //  console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    if (AL.isEmpty(moments)){
      return this.setState({
        createdFromMoment  : null,
        createdToMoment    : null,
      });
    }
    this.setState({
     createdFromMoment  : moments[0].set({hour: 0, minute: 0, seconds: 0, milliseconds: 0}),
     createdToMoment    : moments[1].set({hour: 23, minute: 59, seconds: 59, milliseconds: 999}),
    });
  }

  // 选定配送时间范围
  deliveryDateChange(moments, dateStrings){

    AL.log("moments",moments);
    //  console.log('From: ', moments[0].set({hour: 0}).toDate(), ', to: ', moments[1].set({hour: 23, minute: 59, seconds: 59, milliseconds: 999}).toDate());
    //  console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
      if (AL.isEmpty(moments)){
        return this.setState({
          deliveryFromMoment  : null,
          deliveryToMoment    : null,
        });
      }
      this.setState({
       deliveryFromMoment  : moments[0].set({hour: 0, minute: 0, seconds: 0, milliseconds: 0}),
       deliveryToMoment    : moments[1].set({hour: 23, minute: 59, seconds: 59, milliseconds: 999}),
      });
  }

  // 选择订单状态--全选/全不选
  handleStateCheckAll(e){

    AL.log("e.target.checked",e.target.checked);

    this.setState({
      checkboxOfState:{
        value: e.target.checked
         ? this.state.checkboxOfState.options
         : [],
        options:this.state.checkboxOfState.options,
        indeterminate: false,
        isCheckAll: e.target.checked,
      }
    });
  }

  // CheckboxGroup选中方法
  handleStateChange(checkedList){

    console.log("checkboxOfState.value",this.state.checkboxOfState.value);
    console.log("checkedList",checkedList);
    // orderStateProps.value = checkedList;
    const length = this.state.checkboxOfState.options.length;
    this.setState({
      checkboxOfState:{
        value: checkedList,
        options:this.state.checkboxOfState.options,
        indeterminate: checkedList.length!==length && checkedList.length!==0,
        isCheckAll: checkedList.length===length,
      }
    });
  }

  // 选择订单状态--全选/全不选
  handleChannelCheckAll(e){

    AL.log("e.target.checked",e.target.checked);

    this.setState({
      checkboxOfChannel:{
        value: e.target.checked
         ? this.state.checkboxOfChannel.options
         : [],
        options:this.state.checkboxOfChannel.options,
        indeterminate: false,
        isCheckAll: e.target.checked,
      }
    });
  }

  // CheckboxGroup选中方法
  handleChannelChange(checkedList){

    console.log("checkboxOfChannel.value",this.state.checkboxOfChannel.value);
    console.log("checkedList",checkedList);
    // orderStateProps.value = checkedList;
    const length = this.state.checkboxOfChannel.options.length;
    this.setState({
      checkboxOfChannel:{
        value: checkedList,
        options:this.state.checkboxOfChannel.options,
        indeterminate: checkedList.length!==length && checkedList.length!==0,
        isCheckAll: checkedList.length===length,
      }
    });
  }

  restoreSeachInfo(){
    AL.log("还原搜索结果");
    this.setState({
      ...this.state.initState,
    });
  }

  cleanSeachInfo(){
    AL.log("清除搜索条件");
    this.setState({
      checkboxOfState:{
        // 选中的选项
        value:this.state.checkboxOfState.options,
        options:this.state.checkboxOfState.options,
        // 是否部分选中
        indeterminate:false,
        // 是否全选了
        isCheckAll:true,
      },
      checkboxOfChannel:{
        // 选中的选项
        value:this.state.checkboxOfChannel.options,
        options:this.state.checkboxOfChannel.options,
        // 是否部分选中
        indeterminate:false,
        // 是否全选了
        isCheckAll:true,
      },

      // 订单时间
      createdFromMoment:null,
      createdToMoment:null,
      deliveryFromMoment:null,
      deliveryToMoment:null,

    });
  }
  /*
  <Radio.Group value={state.date} onChange={handleSizeChange}>
    <Radio.Button value="0">今日配送</Radio.Button>
    <Radio.Button value="1">明日配送</Radio.Button>
    <Radio.Button value="2">后天配送</Radio.Button>
  </Radio.Group>
  <br/>
  */
  render (){

    return (
      <div style={{marginBottom:16}}>

        <Row gutter={24}>

          <Col lg={8} md={12} sm={16} xs={24} style={{marginBottom: 16}}>
            {/*<SearchGroup {...searchGroupProps} />*/}

            下单时间：
            <RangePicker
              /* 快速选择 */
              ranges={{
                "今天": this.state.todayMoments,
                "昨天": this.state.yesterdayMoments,
                "本月": [moment(), moment().endOf('month')]
              }}
              /* 是否显示清除按钮 */
              allowClear={true}
              /* 显示值 */
              value={[
                this.state.createdFromMoment,
                this.state.createdToMoment,
              ]}
              onChange={(moments, dateStrings)=>(this.createdDateChange(moments, dateStrings))}
            />
            <br/>
            配送时间：
            <RangePicker
              ranges={{
                "今天": this.state.todayMoments,
                "明天": this.state.tomorrowMoments,
                "后天": this.state.afterTomorrowMoments,
                "本月": [moment(), moment().endOf('month')]
              }}
              /* 是否显示清除按钮 */
              allowClear={true}
              /* 显示值 */
              value={[
                this.state.deliveryFromMoment,
                this.state.deliveryToMoment,
              ]}
              onChange={(moments, dateStrings)=>(this.deliveryDateChange(moments, dateStrings))}
            />
            <br/>
            <br/>
            <br/>
            只显示自营：
            <Switch defaultChecked={this.state.isOnlyBloom}
                    onChange={(checked)=>{
                      this.setState({
                        isOnlyBloom:checked,
                      });
                    }}
             />
             <br />
             <br />
             只显示未打印：
             <Switch defaultChecked={this.state.isOnlyNotToPrint}
                     onChange={(checked)=>{
                       this.setState({
                         isOnlyNotToPrint:checked,
                       });
                     }}
              />
          </Col>

          <Col lg={{offset: 8, span: 8}} md={12} sm={8} xs={24}
               style={{marginBottom: 16, textAlign: 'left'}}>
            {/* 选择状态 */}
            <div>
              <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                <Checkbox
                  indeterminate={this.state.checkboxOfState.indeterminate}
                  checked={this.state.checkboxOfState.isCheckAll}
                  /*bind this*/
                  onChange={(e)=>(this.handleStateCheckAll(e))}
                >
                  选择订单状态
                </Checkbox>
              </div>
              <br />
              <CheckboxGroup
                value={this.state.checkboxOfState.value}
                options={this.state.checkboxOfState.options}
                /*bind this*/
                onChange={(list)=>this.handleStateChange(list)}
              />
            </div>
            <br />
            <br />
            {/* 选择渠道 */}
            <div>
              <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                <Checkbox
                  indeterminate={this.state.checkboxOfChannel.indeterminate}
                  checked={this.state.checkboxOfChannel.isCheckAll}
                  /*bind this*/
                  onChange={(e)=>(this.handleChannelCheckAll(e))}
                >
                  选择渠道
                </Checkbox>
              </div>
              <br />
              <CheckboxGroup
                value={this.state.checkboxOfChannel.value}
                options={this.state.checkboxOfChannel.options}
                /*bind this*/
                onChange={(list)=>this.handleChannelChange(list)}
              />
            </div>

          </Col>

        </Row>

        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary"
                    htmlType="submit"
                    onClick={()=>(this.props.handleSearch(this.state2props(this.state)))} >
              搜索
            </Button>
            <Button style={{ marginLeft: 8 }}
                    onClick={()=>(this.restoreSeachInfo())} >
              还原
            </Button>
            <Button style={{ marginLeft: 8 }}
                    onClick={()=>(this.cleanSeachInfo())} >
              清除
            </Button>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col lg={8} md={12} sm={16} xs={24} style={{marginBottom: 16}}>
            快速搜索：
            <Search
              placeholder="请输入手机号、姓名、配送地址..."
              style={{ width: 390 }}
              onSearch={
                (value)=>{
                  this.props.handleSearch({
                    keyword:value,
                  });
                }
              }
            />
          </Col>
        </Row>

      </div>
    );
  }

}

// search.propTypes = {
//   form: PropTypes.object.isRequired,
//   onSearch: PropTypes.func,
//   onAdd: PropTypes.func,
//   field: PropTypes.string,
//   keyword: PropTypes.string
// }

// export default Form.create()(search)
