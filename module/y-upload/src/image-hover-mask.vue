<!--
 * @Descripttion : 
 * @version      : 
 * @Author       : 李天遥
 * @Date         : 2022-08-12 17:40:58
 * @LastEditors  : 李天遥
 * @LastEditTime : 2022-08-12 17:40:58
 * @FilePath     : \operator-side\src\components\common\ImageHoverMask.vue
-->
<template>
    <div class="image-hover-mask">
      <i class="icon el-icon-delete-solid" @click="$emit('on-delete')"></i>
      <image-upload
        v-bind="$attrs"
        @on-upload-success="$emit('on-upload-success', $event)"
      >
        <i class="icon el-icon-upload"></i>
      </image-upload>
    </div>
  </template>
  
  <script>
  import ImageUpload from '@/components/common/ImageUpload'
  
  export default {
    name: 'ImageHoverMask',
  
    components: {
      ImageUpload
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .image-hover-mask {
    display: flex;
    align-items: center;
    justify-content: center;
  
    .icon {
      margin: 0 4px;
      width: 36px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      border-radius: 18px;
      font-size: 20px;
      color: #dedede;
      background: rgba(255, 255, 255, 0.5);
    }
  }
  </style>
  