import React, {
  PropTypes,
  Component,
} from 'react'

import {
  // Form,
  // Input,
  // Tooltip,
  Icon,
  // Cascader,
  // Select,
  // Checkbox,
  // Button,
  // Row,
  // Col,
  // InputNumber,
  // DatePicker,
  // Switch,
  // Tabs,
  Upload,
  Modal,
} from 'antd';

const Dragger = Upload.Dragger;

// const FormItem = Form.Item;
// const Option = Select.Option;
// const MonthPicker = DatePicker.MonthPicker;
// const RangePicker = DatePicker.RangePicker;

// const TabPane = Tabs.TabPane;

import {AL} from '../../utils';

export default class UploadPhotoWall extends React.Component {

  //类的静态属性检查
  static propTypes = {
      photos: React.PropTypes.array,
  }

  //类的静态属性
  static defaultProps = {

  }

  // 构造函数，在创建组件的时候调用一次。
  constructor(props) {
    super(props);
    AL.log("uploadPhoto组件-首次加载",props);
    const state = this.props2state(props);
    this.state = {
      ...state,
      previewVisible: false,
      previewImage: '',
    };
  }

  /*
    当props发生变化时执行，初始化render时不执行，
    在这个回调函数里面，你可以根据属性的变化，通过调用this.setState()来更新你的组件状态，
    旧的属性还是可以通过this.props来获取,这里调用更新状态是安全的，并不会触发额外的render调用
  */
  // componentWillReceiveProps(nextProps){
  //   AL.log("uploadPhoto组件-重新渲染",nextProps);
  //   const state = this.props2state(nextProps);
  //   this.setState({
  //     ...state,
  //   });
  // }

  props2state(props){

    const {
      // fileName,
      // fileList,
      // value,
      photos,
      action,
    } = props;

    return {
      photos,
      fileList:photos.map((photo)=>(this.photo2file({photo,status:'done'}))),
    }
  }

  photo2file({
    photo,
    status,
  }){
    return {
      photo,
      uid: photo.objectId,
      name: photo.name,
      url: photo.URL,
      width: photo.width,
      height: photo.height,
      status,
    };
  }

  //
  handleCancel(){
    AL.log("handleCancel")
    this.setState({ previewVisible: false })
  }

  // 点击文件链接回调
  handlePreview(file){
    AL.log("点击文件链接回调")
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  // 文件列表变化时回调
  handleChange({
    file,
    fileList,
    event
  }){

    const {
      uid,
      name,
      status,
      response,
    } = file;

    AL.log("文件列表变化时回调");

    const form = this.props.form;

    try{

      // 正在上传时显示一个提示信息
      if (status === 'uploading') {

        AL.log("正在上传");
      }
      // 上传失败
      else if (status === 'error') {

        AL.log("上传失败");
        throw file.error;
      }
      // 文件移除
      else if (status === 'removed') {

        AL.log("移除文件");

        // 表单绑定数据
        if (form){
          const photo = file.photo;
          const photos = form.getFieldValue('photos');
          form.setFieldsValue({
            'detailPhotos':photos.fitler((tmpPhoto)=>(tmpPhoto.objectId!==photo.objectId)),
          });
        }
      }
      // 上传完成，判断返回值
      else if (status === 'done') {

        AL.log("上传完成");
        const {
          object:photo,
          error,
        } = response;

        if (!photo || error){
          throw error;
        }

        // AL.log("photo",photo);
        file.photo = photo;
        fileList = fileList.map((tmpFile)=>{
          if (tmpFile.uid === file.uid){
            tmpFile.photo = photo;
          }
          return tmpFile;
        })

        // 表单绑定数据
        if (form){
          const photos = fileList.map((file)=>(file.photo));
          AL.log("photos",photos);
          form.setFieldsValue({
            'detailPhotos':photos,
          });
        }
      }

    }finally{

      // AL.log("fileList",fileList);
      this.setState({
        fileList
      });
    }
  }

  handleUploadData(file){
    AL.log("data",file.thumbUrl);
    return file;
  }

  render(){

    const { previewVisible, previewImage, fileList } = this.state;

      const uploadButton = (
        <div>
          <Icon type="plus" />
          <div className="ant-upload-text">上传图片</div>
        </div>
      );

      return (
        <div className="clearfix">
          <Upload
            // name={this.props.fileName}
            action={this.props.action}
            data={(data)=>(this.handleUploadData(data))}
            listType="picture-card"
            multiple={true}
            fileList={fileList}
            onPreview={(file)=>(this.handlePreview(file))}
            onChange={(info)=>(this.handleChange(info))}
          >
            {this.state.fileList.length >= 20 ? null : uploadButton}
          </Upload>
          <Modal
              visible={previewVisible}
              footer={null}
              onCancel={()=>(this.handleCancel())}
              >
            <img
              style={{ width: '100%' }}
              src={previewImage} />
          </Modal>
        </div>
      );
  }
}
