import React, {
  PropTypes,
  Component,
} from 'react'
//react==>拿来



import {
  Form,
  Input,
  // Tooltip,
  // Icon,
  // Cascader,
  Select,
  // Checkbox,
  Button,
  // Row,
  Col,
  // InputNumber,
  DatePicker,
  Switch,
  // Tabs,
  Upload,
  // Modal,
} from 'antd';
// antd的效果组件--基本

const FormItem = Form.Item;
const Option = Select.Option;
// const MonthPicker = DatePicker.MonthPicker;
// const RangePicker = DatePicker.RangePicker;

const TabPane = Tabs.TabPane;

// antd的效果组件--拓展




//----------------------------


import {AL} from '../../utils'
// {}的引入方式就是按需加载
import UploadPhotoWall from './UploadPhotoWall'
// 引入组件==>返回值是JSX和数据

const DetailEditView = ({  commodity,
  updateCommodity,
  isLoading,
  // isUpdatetOrderInfo,
  form,
}) => {
  // 箭头函数==>返回值为:

    const {
      getFieldDecorator,
      validateFields,
      validateFieldsAndScroll,
      getFieldsValue
    } = form;

    // if (!AL.isAVObject(commodity)){
    //
    // }
    // AL.log("form",form);

    // function callback(key) {
    //   console.log(key);
    // }

    // const uploadProps = {
    //   // fileList: [{
    //   //   uid: -1,
    //   //   name: 'xxx.png',
    //   //   status: 'done',
    //   //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //   // }],
    //   // photos:commodity.detailPhotos,
    //   action:"http://localhost:3000/0.1/admin/app/upload"
    //   // action:"http://dev.flowerso2o.leanapp.cn/0.1/admin/app/upload"
    // }

    // const formItemLayout = {
    //   labelCol: { span: 6 },
    //   wrapperCol: { span: 14 },
    // };

    const tailFormItemLayout = {
      wrapperCol: {
        span: 20,
        offset: 10,
      },
    };

    const handleSubmit = ({
      e,
      commodity,
    }) => {

      e.preventDefault();
      validateFieldsAndScroll((err, values) => {

        if (!err) {

          let {
            detailPhotos,
            name,
            subname,
            introductions,
            serviceIntroductions
          } = values;

          AL.log("values", values);

          introductions = JSON.parse(introductions);
          serviceIntroductions = JSON.parse(serviceIntroductions);

          // const deliveryFromDate = deliveryDate[0].toDate();
          // const deliveryToDate = deliveryDate[1].toDate();

          updateCommodity({
            ...AL.checkAVObjectChanges(commodity,{
              detailPhotos,
              name,
              subname,
              introductions,
              serviceIntroductions,
            })
          });

        }
      });
    };

    return (
      //返回值为--JSX的模拟DOM对象和属性
      <Form
        vertical={true}
        onSubmit={(e)=>(handleSubmit({e, commodity}))}
        >
          {/*   onSubmit={(e)=>(handleSubmit({e, commodity}))} 事件绑定==>  */}
        <Tabs onChange={callback} type="card">

          <TabPane tab="基本信息" key="1">

            {/*...formItemLayout*/}
            <FormItem
              label="图片"
            >
            {/*双向绑定*/}
            {getFieldDecorator('detailPhotos', {
              // initialValue 会传递给表单组件的 valuePropName 属性
              // （没有指定 valuePropName 会使用value属性）
              initialValue: commodity.detailPhotos,
              valuePropName: 'photos',
              rules: [{ required: true, message: '请保留至少一张图片!' }],
            })(
              <UploadPhotoWall
                form={form}
                action={"http://localhost:3000/0.1/admin/app/upload"} />
            )}
            </FormItem>

            <FormItem
              label="名称"
            >
              {getFieldDecorator('name', {
                initialValue: commodity.name,
                rules: [{ required: true, message: '请输入商品名称!' }],
              })(
                <Input />
              )}
            </FormItem>

            <FormItem
              label="副标题"
            >
              {getFieldDecorator('subname', {
                initialValue: commodity.subname,
                rules: [{ required: true, message: '请输入商品副标题!' }],
              })(
                <Input />
              )}
            </FormItem>

            <FormItem
              label="商品描述"
            >
              {getFieldDecorator('introductions', {
                initialValue: JSON.stringify(commodity.introductions),
                rules: [{ required: true, message: '请输入商品描述!' }],
              })(
                <Input type="textarea" placeholder="商品描述。" autosize />
              )}
            </FormItem>

            <FormItem
              label="服务说明"
            >
              {getFieldDecorator('serviceIntroductions', {
                initialValue: JSON.stringify(commodity.serviceIntroductions),
                rules: [{ required: true, message: '请输入商品服务说明!' }],
              })(
                <Input type="textarea" placeholder="商品服务说明。" autosize />
              )}
            </FormItem>

            <FormItem {...tailFormItemLayout}>
              <Button type="primary"
                      htmlType="submit"
                      size="large"
                      loading={isLoading}
                      >
                确认
              </Button>
            </FormItem>

          </TabPane>
          <TabPane tab="说明" key="2">Content of Tab Pane 2</TabPane>
          <TabPane tab="活动" key="3">Content of Tab Pane 3</TabPane>
        </Tabs>
      </Form>
    );

}


export default Form.create()(DetailEditView)
// Form表单需要的高阶函数
