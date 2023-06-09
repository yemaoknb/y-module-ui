<!--
 * @Descripttion : 
 * @version      : 
 * @Author       : 李天遥
 * @Date         : 2022-08-12 17:40:55
 * @LastEditors  : 李天遥
 * @LastEditTime : 2022-08-12 18:12:31
 * @FilePath     : \operator-side\src\components\common\ImageUpload.vue
-->
<template>
    <div>
      <el-upload
        action=""
        :accept="accept"
        :show-file-list="showFileList"
        :before-upload="handleBeforeUpload"
      >
        <slot>
          <i class="icon el-icon-plus"></i>
        </slot>
      </el-upload>
  
      <el-dialog
        destroy-on-close
        :visible.sync="showsDialog"
        :title="title"
        :width="dialogWidth"
        :append-to-body="true"
        :close-on-click-modal="false"
      >
        <div class="dialog-content">
          <div class="cropper-wrapper">
            <div class="image-wrapper" :style="cropperStyle">
              <img class="image" alt="" :id="imageID" />
            </div>
          </div>
        </div>
  
        <div class="dialog-footer" slot="footer">
          <el-button
            @click="handleCancel"
            style="letter-spacing: 0px !important; padding: 0px !important"
            >取 消</el-button
          >
          <el-button
            type="primary"
            @click="handleConfirm"
            style="letter-spacing: 0px !important; padding: 0px !important"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import apis from '@/apis'
  import Cropper from 'cropperjs'
  import pushMessage from '@/globalEvent/showMessage'
  
  export default {
    name: 'ImageUpload',
  
    props: {
      // 接受的文件类型
      accept: {
        type: String,
        default: '.jpg,.jpeg,.png'
      },
      // 是否显示文件列表
      showFileList: {
        type: Boolean,
        default: false
      },
      // 上传接口地址
      uploadUrl: {
        type: String,
        default: apis._file_upload
      },
      // 是否可编辑
      canEdit: {
        type: Boolean,
        default: false
      },
      // 编辑弹窗标题
      title: {
        type: String,
        default: '编辑'
      },
      // 编辑器尺寸
      cropperSize: {
        type: Object,
        default: () => {
          return {
            width: 600,
            height: 300
          }
        }
      },
      // 编辑器裁剪部分宽高比，为 0 时不限制
      cropperRatio: {
        type: Number,
        default: 0
      },
      //图片格式 ['image/jpeg', 'image/png']
      imgType: {
        type: Array,
        default: () => {
          return []
        }
      },
      // 图片大小
      imageSize: {
        type: Number,
        default: 20
      }
    },
  
    data() {
      return {
        // 选中的文件
        file: {},
        // 是否显示编辑弹窗
        showsDialog: false,
        // 编辑器
        cropper: null
      }
    },
  
    computed: {
      // 编辑弹窗宽度
      dialogWidth() {
        return `${this.cropperSize.width + 50}px`
      },
      // 编辑器样式
      cropperStyle() {
        return {
          width: `${this.cropperSize.width}px`,
          height: `${this.cropperSize.height}px`
        }
      },
      // 图片 ID
      imageID() {
        return `cropper-${this._uid}`
      }
    },
  
    methods: {
      /**
       * 文件上传前回调
       * @param {*} file
       */
      handleBeforeUpload(file) {
        let isJPG = true
        const isLtMB = file.size / 1024 / 1024 < this.imageSize
  
        if (this.imgType.length > 0 && this.imgType.indexOf(file.type) === -1) {
          isJPG = false
        }
        if (!isJPG) {
          this.$message.error('请上传指定格式的图片!')
          return false
        }
        if (!isLtMB) {
          this.$message.error(`上传图片大小不能超过 ${this.imageSize}MB!`)
        }
        if (!isJPG || !isLtMB) {
          return false
        }
  
        this.file = file
  
        if (this.canEdit) {
          // 如果可编辑则打开编辑弹窗
          this.openDialog(file)
        } else {
          // 如果不可编辑则直接上传
          this.uploadFile(file)
        }
  
        return false
      },
      /**
       * 弹窗点击取消
       */
      handleCancel() {
        this.showsDialog = false
      },
      /**
       * 弹窗点击确定
       */
      handleConfirm() {
        // 获取选中部分并转为 blob 格式
        this.cropper.getCroppedCanvas().toBlob(blob => {
          // blob 格式转为 file 格式并上传
          const file = new File([blob], this.file.name, { type: this.file.type })
          this.uploadFile(file)
          this.showsDialog = false
        })
      },
      /**
       * 上传文件
       * @param {*} file
       */
      uploadFile(file) {
        // 判断是否是图片类型
        const isImage = file.type.indexOf('image/') !== -1
        if (!isImage) {
          pushMessage('请选择图片格式的文件', 'error')
          return
        }
  
        this.$http({
          method: 'post',
          url: this.uploadUrl,
          data: { file, IsFormData: true }
        }).then(res => {
          const { status, data } = res
          if (status === 200) {
            this.$emit('on-upload-success', data[file.name])
          } else {
            pushMessage('上传失败', 'error')
          }
        })
      },
      /**
       * 打开编辑弹窗
       * @param {*} file
       */
      openDialog(file) {
        this.showsDialog = true
  
        this.$nextTick(() => {
          // 初始化编辑器
          const cropperOptions = { checkCrossOrigin: true }
          if (this.cropperRatio && this.cropperRatio !== 0) {
            cropperOptions.aspectRatio = this.cropperRatio
          }
          this.cropper = new Cropper(
            document.getElementById(this.imageID),
            cropperOptions
          )
  
          // 将选择的图片填入编辑器中
          const fileReader = new FileReader()
          fileReader.readAsDataURL(file)
          fileReader.onload = event => {
            const result = event.target.result
            this.cropper.replace(result)
          }
        })
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  /deep/ .el-upload {
    width: 100%;
    height: 100%;
  
    .icon {
      width: 100%;
      height: 100%;
    }
  }
  
  .image-wrapper {
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');
    border: 1px solid #eeeeee;
  }
  </style>
  