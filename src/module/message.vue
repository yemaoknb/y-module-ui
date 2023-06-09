<template>
  <div>
    <y-button :data="data" @message="handleMessage"></y-button>
  </div>
</template>

<script>
export default {
  name: 'module-message',
  data() {
    return {
      data: [
        {
          text: '弹窗',
          code: '',
          eventName: 'message',
          buttonProps: {
            type: 'primary'
          }
        }
      ]
    }
  },
  methods: {
    /**
     * @description 弹窗操作
     */
    handleMessage() {
      this.$message('弹窗操作')
    }
  }
}
</script>

<style lang="scss" scoped></style>
