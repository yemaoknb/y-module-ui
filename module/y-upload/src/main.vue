<template>
  <div>
    <div class="image-list">
      <div class="image-wrap" v-if="!queryParams[item.key]">
        <image-upload
          :imageSize="2"
          :imgType="['image/jpeg', 'image/png']"
          class="image"
          :can-edit="true"
          :cropper-ratio="311 / 351"
          @on-upload-success="handleUploadImage($event, item.key)"
        >
        </image-upload>
      </div>
      <div
        class="image-wrap"
        v-else
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <img class="image" alt="图" :src="$url + queryParams[item.key]" />
        <image-hover-mask
          class="mask"
          v-show="showsHoverMask"
          :imageSize="2"
          :imgType="['image/jpeg', 'image/png']"
          :can-edit="true"
          :cropper-ratio="311 / 351"
          @on-upload-success="handleUploadImage($event, item.key)"
          @on-delete="handleDeleteImage(item.key)"
        >
        </image-hover-mask>
      </div>
    </div>
    <br />
    <span style="color: #999; font-size: 11px">
      &emsp;建议上传311px*351px比例png，jpg格式图片
    </span>
  </div>
</template>

<script>
import ImageUpload from './image-upload'
import ImageHoverMask from './image-hover-mask'
export default {
  name: 'y-image-upload', 
  components: {
    ImageUpload,
    // 图片鼠标悬停遮罩
    ImageHoverMask,
  }, 
  props: {},
  data() {
    return {
      showsHoverMask: false,
      queryParams: {
        posterImage: '', //图片 小程序
      }, // 搜索数据
      
    }
  }, 
  mounted() {
  },
  methods: {
    /**
     * @description 上传图片
     * @param {*} file
     * @param {*} key
     */
    handleUploadImage(file, key) {
      this.queryParams[key] = file
    },
    /**
     * @description 鼠标进入事件
     */
    handleMouseEnter() {
      this.showsHoverMask = true
    },
    /**
     * @description 鼠标离开事件
     */
    handleMouseLeave() {
      this.showsHoverMask = false
    },
    /**
     * @description 删除图片事件
     */
    handleDeleteImage(key) {
      this.queryParams[key] = ''
    },
  },
}
</script>

<style lang="scss" scoped>
.image-list {
  display: flex;

  .image-wrap {
    position: relative;
    margin-right: 16px;

    &:last-child {
      margin-right: 0;
    }

    .image {
      width: 120px;
      height: 120px;
      line-height: 120px;
      font-size: 32px;
      color: #d9d9d9;
      border-radius: 4px;
      border: 1px solid #d9d9d9;
    }

    .mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 120px;
      height: 120px;
      background: rgba(0, 0, 0, 0.5);
      transition: all 0.3s;
    }
  }
}
</style>
