<template>
  <div>
    <y-search
      ref="ySearch"
      :data="data"
      @submit="handleSubmit"
      :labelWidth="70"
      :showMore="true"
      @reset="reset"
    />
  </div>
</template>

<script>
export default {
  name: 'module-search',
  data() {
    return {
      data: [
        {
          type: 'input',
          defaultValue: '',
          label: '省市区',
          rules: [
            { required: true, message: '请输入活动名称', trigger: 'blur' }
          ],
          propKey: 'countryMap3'
        },
        {
          type: 'cascader',
          defaultValue: '',
          label: '省市区',
          propKey: 'cascader',
          defaultProps: {},
          optionData: [
            {
              value: 'zhinan',
              label: '指南',
              children: [
                {
                  value: 'shejiyuanze',
                  label: '设计原则',
                  children: [
                    {
                      value: 'kekong',
                      label: '可控'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          type: 'select',
          defaultValue: '',
          label: '省市区',
          defaultProps: {
            label: 'label',
            value: 'id',
            placeholder: '请选择',
            clearable: false
          },
          propKey: 'select',
          optionData: [
            { label: '全部', id: '' },
            { label: '已结算', id: true },
            { label: '未结算', id: false }
          ]
        },
        {
          type: 'datetime',
          timeType: 'date',
          defaultValue: '',
          label: '结算时间',
          propKey: 'settlementTime',
          defaultProps: {}
        },
        {
          type: 'datetime',
          timeType: 'daterange',
          defaultValue: '',
          label: '时间范围',
          propKey: 'settlement',
          defaultProps: {}
        },
        {
          type: 'input',
          defaultValue: '',
          label: '省市区',
          propKey: 'countryMap3'
        }
      ]
    }
  },
  methods: {
    /**
     * @function 执行搜索
     */
    handleSubmit(e) {
      console.log(e)
      this.$message('搜索')
    },
    /**
     * @function 重置搜索
     */
    reset() {
      console.log('清空')
      this.$message('清空')
    }
  }
}
</script>

<style lang="scss" scoped></style>
