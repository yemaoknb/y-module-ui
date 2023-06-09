<template>
  <div>
    <y-button
      :data="data"
      @export="handleExport"
      @added="handleAdded"
      @delete="handleDelete"
      @update="handleUpdate"
    ></y-button>
  </div>
</template>

<script>
/**
 * {
 *    text: '导出', // 文案
 *    code: '', // 按钮权限
 *    eventName: 'export', // 自定义方法
 *    buttonProps: {// element 按钮参数
 *        type: 'primary',
 *        disabled: false,
 *    },
 *    uploadProps: { // 当按钮箱转换成上传按钮的时候使用
 *    }
 * }
 */
export default {
  name: 'module-button',
  data() {
    return {
      data: [
        {
          text: '导出',
          code: '',
          eventName: 'export',
          buttonProps: {
            type: 'primary'
          }
        },
        {
          text: '添加',
          code: '',
          eventName: 'added',
          buttonProps: {
            type: 'success'
          }
        },
        {
          text: '删除',
          code: '',
          eventName: 'delete',
          buttonProps: {
            type: 'danger'
          }
        },
        {
          text: '上传文件',
          code: '',
          eventName: 'update',
          buttonProps: {
            type: 'info'
          }
        }
      ]
    }
  },
  methods: {
    /**
     * @description 删除操作
     */
    handleDelete() {
      this.$message('删除成功')
    },
    /**
     * @description 添加操作
     */
    handleAdded() {
      this.$message('添加成功')
    },
    /**
     * @description 导出操作
     */
    handleExport() {
      this.$message('导出成功')
    },
    /**
     *  @description 上传文件
     */
    handleUpdate() {
      this.$message('抛出独立执调用')
    }
  }
}
</script>

<style lang="scss" scoped></style>
