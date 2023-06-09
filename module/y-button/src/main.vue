<template>
  <div class="button-wrap">
    <el-button
      v-for="(button, index) in buttonData"
      :key="`button_${index}`"
      v-bind="{
        ...button.buttonProps
      }"
      @click.native="emitEvent(button)"
    >
      {{ button.text }}
    </el-button>
  </div>
</template>
<script>
// import { mapState } from 'vuex'
export default {
  name: 'y-button', // 必填 烤肉d
  props: {
    data: {
      require: true,
      type: Array
    },
    checkAuth: {
      require: false,
      type: Boolean,
      default: false
    }
  },
  mixins: [],
  data() {
    return {
      BUTTON_AUTH: []
    }
  },
  computed: {
    // ...mapState(['BUTTON_AUTH']),
    buttonData() {
      if (this.checkAuth) {
        return this.data.filter(
          item =>
            this.BUTTON_AUTH.includes(item.code) || item.checkAuth === false
        )
      } else {
        return this.data
      }
      return this.data
    }
  },
  methods: {
    /**
     * @function 往外抛出事件
     */
    emitEvent(button) {
      this.$emit(button.eventName)
    },
    nullFunc() {}
  }
}
</script>
<style lang="scss" scoped>
.button-wrap {
  min-height: 28px;
  display: flex;
  flex-wrap: wrap;
}
/deep/ {
  .el-button {
    margin-bottom: 10px;
  }
}
</style>
