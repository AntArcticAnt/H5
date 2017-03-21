import React, {
  PropTypes,
  Component,
} from 'react'

import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Checkbox,
  Button,
  Row,
  Col,
  InputNumber,
  DatePicker,
  Switch,
} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;

import {AL} from '../../utils'

const OrderEditView = ({
  order,
  updateOrderInfo,
  isUpdatetOrderInfo,
  form: {
    getFieldDecorator,
    validateFields,
    validateFieldsAndScroll,
    getFieldsValue
  }
}) => {

    if (!AL.isAVObject(order)){
      return <div>订单数据异常</div>;
    }

    // function handleSubmit(e) {
    //   e.preventDefault();
    //   validateFields((err, values) => {
    //     if (!err) {
    //       console.log('Received values of form: ', values);
    //     }
    //   });
    // };

    const checkOrderChanges = (
      order,
      params,
    )=>{

      const data = {
      };
      for (let key in params){

        // if (key==="deliveryFromDate"){
        //   AL.log("params[key]",params[key]);
        //   AL.log("order[key]",order[key]);
        // }
        const value = params[key];
        if (AL.isDate(value)){
          if (AL.date2string(value)!==AL.date2string(order[key])){
              data[key] = value;
          }
        } else if (value !== order[key]){
            data[key] = value;
        }
      }
      if (!AL.isEmpty(data)){
        data.orderId = order.objectId;
      }
      return data;
    }

    function handleSubmit(e) {
      e.preventDefault();
      validateFieldsAndScroll((err, values) => {
        if (!err) {

          const {
            isBloom,
            state,
            totalPrice,
            costPrice,
            senderName,
            senderPhone,
            receiverName,
            receiverPhone,
            deliveryAddress,
            deliveryDate,
            cardName,
            cardMessage,
            remark,
            remarkOfServer,
            isAnonymity,
            isAllowSms,
          } = values;

          const deliveryFromDate = deliveryDate[0].toDate();
          const deliveryToDate = deliveryDate[1].toDate();

          updateOrderInfo({
            ...checkOrderChanges(order,{
              isBloom,
              state:parseInt(state),
              totalPrice,
              costPrice,
              senderName,
              senderPhone,
              receiverName,
              receiverPhone,
              deliveryAddress,
              deliveryFromDate,
              deliveryToDate,
              cardName,
              cardMessage,
              remark,
              remarkOfServer,
              isAnonymity,
              isAllowSms,
            })
          });

        }
      });
    };

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        span: 20,
        offset: 10,
      },
    };

    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select className="icp-selector">
        <Option value="86">+86</Option>
      </Select>
    );

    const todayMoments = [
      AL.moment({hour: 8, minute: 0, seconds: 0, milliseconds: 0}),
      AL.moment({hour: 22, minute: 0, seconds: 0, milliseconds: 0}),
    ];

    const tomorrowMoments = [
      AL.moment({hour: 8, minute: 0, seconds: 0, milliseconds: 0}).add(24, 'hours'),
      AL.moment({hour: 22, minute: 0, seconds: 0, milliseconds: 0}).add(24, 'hours'),
    ];

    const afterTomorrowMoments = [
      AL.moment({hour: 8, minute: 0, seconds: 0, milliseconds: 0}).add(48, 'hours'),
      AL.moment({hour: 22, minute: 0, seconds: 0, milliseconds: 0}).add(48, 'hours'),
    ];

    // AL.config.states
    // AL.log("date",AL.moment(AL.string2date(order.deliveryFromDate.iso,"YYYY-MM-DD'T'HH:mm:ss.SSS'Z'")));
    // AL.log("date",AL.moment(AL.string2date(order.deliveryToDate.iso,"YYYY-MM-DD'T'HH:mm:ss.SSS'Z'")))
    // AL.log('updateOrderInfo',updateOrderInfo);

    const statesOption = ()=>{
        const options = [];
        AL.log("AL.config.states",AL.config.states);
        for (let key in AL.config.states){
          const value = AL.config.states[key];
          options.push(<Option value={value}>{key}</Option>);
        }
        return (
          <Select placeholder="Please select a country" defaultValue={order.state}>
            {options}
          </Select>
        )

    }

    return (
        <Form onSubmit={handleSubmit}>

          <FormItem
            {...formItemLayout}
            label="自营订单"
          >
          {getFieldDecorator('isBloom', {
            valuePropName: 'checked',
            initialValue: order.isBloom,
            rules: [{ required: true, message: '请选择是否属于自营订单!' }],
          })(
            <Switch />
          )}

          </FormItem>

          <FormItem
            {...formItemLayout}
            label="状态"
            hasFeedback
          >
            {getFieldDecorator('state', {
              rules: [
                { required: true, message: '请指定一个订单状态!' },
              ],
              initialValue: order.state.toString(),

            })(
              <Select placeholder="请指定一个订单状态!"
                      onChange={
                        (stateValue)=>{
                          AL.log("订单状态",parseInt(stateValue));
                        }
                      }
              >
                {
                  Object.keys(AL.config.states).map((stateName)=>{
                    const stateValue = AL.config.states[stateName];
                    // AL.log("状态value",stateValue)
                    // AL.log("状态name",stateName)
                    return (
                      <Option key={stateValue.toString()}
                              value={stateValue.toString()}
                      >
                        {stateName}
                      </Option>
                    );
                  })
                }
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="订单价格"
            hasFeedback
          >
            {getFieldDecorator('totalPrice', {
              rules: [
                { required: true, message: '请输入订单价格!' },
              ],
              initialValue: order.totalPrice
            })(
              <InputNumber min={0} />
            )}
            <span className="ant-form-text"> 分（单位）</span>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="分单价格"
          >
            {getFieldDecorator('costPrice', {
              initialValue: order.costPrice
            })(
              <InputNumber min={0} />
            )}
            <span className="ant-form-text"> 分（单位）</span>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="送花人姓名"
            hasFeedback
          >
            {getFieldDecorator('senderName', {
              initialValue: order.senderName,
              rules: [{ required: true, message: '请输入送花人姓名!' }],
            })(
              <Input />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="送花人电话"
            hasFeedback
          >
            {getFieldDecorator('senderPhone', {
              initialValue: order.senderPhone,
              rules: [{ required: true, message: '请输入送花人电话!' }],
            })(
              <Input addonBefore={prefixSelector} />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="收花人姓名"
            hasFeedback
          >
            {getFieldDecorator('receiverName', {
              initialValue: order.receiverName,
              rules: [{ required: true, message: '请输入收花人姓名!' }],
            })(
              <Input />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="收花人电话"
            hasFeedback
          >
            {getFieldDecorator('receiverPhone', {
              initialValue: order.receiverPhone,
              rules: [{ required: true, message: '请输入收花人电话!' }],
            })(
              <Input addonBefore={prefixSelector} />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="地址"
            hasFeedback
          >
            {getFieldDecorator('deliveryAddress', {
              initialValue: order.deliveryAddress,
              rules: [{ required: true, message: '请输入收花人地址!' }],
            })(
              <Input />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="配送时间"
          >
            {getFieldDecorator('deliveryDate', {
              initialValue:[
                // AL.string2date(order.deliveryToDate.iso,"YYYY-MM-DD'T'HH:mm:ss.SSS'Z'")
                AL.moment(order.deliveryFromDate),
                AL.moment(order.deliveryToDate),
              ],
              rules: [{
                type: 'array', required: true, message: '请选择一个配送时间!'
              }],
            })(
              <RangePicker
                  /* 快速选择 */
                  ranges={{
                    "今天": todayMoments,
                    "明天": tomorrowMoments,
                    "后天": afterTomorrowMoments
                  }}
                  /* 显示值 */
                  /*
                    order应该有一个地方统一转换
                    现在order的date还是string
                    应该order中date格式
                    ui中moment格式
                   */
                  // value={[
                  //   AL.moment(AL.string2date(order.deliveryFromDate.iso,"YYYY-MM-DD'T'HH:mm:ss.SSS'Z'")),
                  //   AL.moment(AL.string2date(order.deliveryToDate.iso,"YYYY-MM-DD'T'HH:mm:ss.SSS'Z'")),
                  // ]}
                  showTime
                  format="YYYY-MM-DD HH:mm:ss" />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="署名"
          >
            {getFieldDecorator('cardName', {
              initialValue: order.cardName,
              // rules: [{ required: true, message: '请输入订单署名!' }],
            })(
              <Input />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="留言"
          >
            {getFieldDecorator('cardMessage', {
              initialValue: order.cardMessage,
              // rules: [{ required: true, message: '请输入留言!' }],
            })(
              <Input />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="用户备注"
          >
            {getFieldDecorator('remark', {
              initialValue: order.remark,
              // rules: [{ required: true, message: '请输入留言!' }],
            })(
              <Input type="textarea" placeholder="这里是用户备注！请谨慎修改！！！" autosize />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="客服备注"
          >
            {getFieldDecorator('remarkOfServer', {
              initialValue: order.remarkOfServer,
              // rules: [{ required: true, message: '请输入留言!' }],
            })(
              <Input type="textarea" placeholder="这里客服备注。" autosize />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="是否匿名"
          >
          {getFieldDecorator('isAnonymity', {
            valuePropName: 'checked',
            initialValue: order.isAnonymity,
            rules: [{ required: true, message: '请选择是否匿名!' }],
          })(
            <Switch />
          )}

          </FormItem>

          <FormItem
            {...formItemLayout}
            label="是否接收短信"
          >
          {getFieldDecorator('isAllowSms', {
            valuePropName: 'checked',
            initialValue: order.isAllowSms,
            rules: [{ required: true, message: '请选择是否接收短信提醒!' }],
          })(
            <Switch />
          )}

          </FormItem>

          <FormItem {...tailFormItemLayout}>
            <Button type="primary"
                    htmlType="submit"
                    size="large"
                    loading={isUpdatetOrderInfo}
                    >
              确认
            </Button>
          </FormItem>
        </Form>
      );

}


export default Form.create()(OrderEditView)
