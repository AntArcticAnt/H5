import React from 'react';
import {
  Form,
  Input,
  Row,
  Col,
  Button,
  DatePicker,
  Select,
  Icon,
  Radio,
  InputNumber,
  Checkbox,
  message,
  Upload,
  notification
} from 'antd';

import styles from './searchForm.less'

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;

const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;

const SearchForm = ({
  form,
}) => {

    const {
      getFieldDecorator
    } = form;

    // Form.Item 排列方式
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };

    const dateConfig = {
      rules: [{
        type: 'object',
        required: true,
        message: 'Please select time!'
      }]
    };

    const rangeConfig = {
     rules: [{
       type: 'array',
       required: true,
       message: 'Please select time!'
     }],
   };

   const selectConfig = {
     rules: [
       { required: true, message: 'Please select your country!' },
     ],
   }

   const configOfSelectMutiple = {
     rules: [
       { required: true, message: 'Please select your favourite colors!', type: 'array' },
     ],
   }

   function onChange(dates, dateStrings) {
    console.log('From: ', dates[0], ', to: ', dates[1]);
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
  }

    // mock 几个 Form.Item
    const children = [
        <FormItem
          {...formItemLayout}
          label="单个日期"
        >
          {getFieldDecorator('date-picker', dateConfig)(
            <DatePicker />
          )}
        </FormItem>,

        <FormItem
          {...formItemLayout}
          label="下单时间"
        >
        {
          getFieldDecorator('range-picker', {
           rules: [{
             type: 'array',
             required: false,
             message: 'Please select time!'
           }],
         })(

            <RangePicker
              // ranges={{
              //   "今天": [moment(), moment()],
              //   "本月": [moment(), moment().endOf('month')]
              // }}
              onChange={onChange}
            />
          )
        }
        </FormItem>,

        <FormItem
          {...formItemLayout}
          label="配送时间"
        >
        {getFieldDecorator('range-picker', rangeConfig)(
            <RangePicker />
          )}
        </FormItem>,

        <FormItem
          {...formItemLayout}
          label="单选"
          hasFeedback
        >
          {getFieldDecorator('select', selectConfig)(
            <Select placeholder="Please select a country">
              <Option value="china">China</Option>
              <Option value="use">U.S.A</Option>
            </Select>
          )}
        </FormItem>,

        <FormItem
          {...formItemLayout}
          label="多选"
        >
          {getFieldDecorator('select-multiple', configOfSelectMutiple)(
            <Select multiple placeholder="Please select favourite colors">
              <Option value="red">Red</Option>
              <Option value="green">Green</Option>
              <Option value="blue">Blue</Option>
            </Select>
          )}
        </FormItem>
    ];

    for (let i = 0; i < 10; i++) {
      children.push(
        <Col span={8} key={i}>
          <FormItem {...formItemLayout} label={`Field ${i}`}>
            {getFieldDecorator(`field-${i}`)(
              <Input placeholder="placeholder" />
            )}
          </FormItem>
        </Col>
      );
    }

    const expand = true;
    const shownCount = expand ? children.length : 6;

    // 提交表单方法
    const handleSearch = () => {

    }

    // 清除表单内容
    const handleReset = () => {
      form.resetFields();
    }

    return (
      <Form
        className={styles.form}
        onSubmit={handleSearch}
        /*style={{background: '#3e3e3e'}}*/
      >
      <Row gutter={40}>
        {children.slice(0, shownCount)}
      </Row>
      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            搜索
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>
            清除
          </Button>
        </Col>
      </Row>
      </Form>
  );

}

// antd中的表单组件还要这么包装一层
export default Form.create()(SearchForm);
