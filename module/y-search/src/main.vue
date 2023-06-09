<template>
  <div class="search-container">
    <el-form
      class="search-form"
      ref="ruleForm"
      :class="[showAll ? 'search-expand' : '']"
      :label-width="`${labelWidth}px`"
      :model="formData"
      size="mini"
      :inline="true"
    >
      <slot></slot>
      <el-form-item
        :label="item.label"
        :prop="item.propKey"
        :rules="item.rules || []"
        v-for="(item, dex) in showList"
        :key="dex"
      >
        <slot :name="item.propKey">
          <!-- 默认输入框 -->
          <el-input
            v-if="item.type === 'input'"
            v-model="$data[`formData`][item.propKey]"
            :placeholder="item.placeholder || '请输入'"
            :clearable="item.clearable || true"
          >
            <i
              v-if="item.suffix"
              slot="suffix"
              class="el-input__icon"
              :class="item.suffix"
            ></i>
            <i
              v-if="item.prefix"
              slot="prefix"
              class="el-input__icon"
              :class="item.prefix"
            ></i>
          </el-input>
          <!-- 级联选择器 -->
          <el-cascader
            v-if="item.type === 'cascader'"
            :options="item.optionData"
            v-model="$data[`formData`][item.propKey]"
            v-bind="{
              placeholder: '请选择',
              clearable: true,
              'show-all-levels': false,
              ...item.defaultProps
            }"
            @change="emitEvent(item.eventFun, $event)"
          >
          </el-cascader>
          <!-- 下拉选择框 -->
          <el-select
            v-if="item.type === 'select'"
            v-model="$data[`formData`][item.propKey]"
            class="w100"
            v-bind="{
              placeholder: '请选择',
              clearable: true,
              multiple: false,
              collapseTags: false,
              ...item.defaultProps
            }"
            @change="emitEvent(item.eventName, $event)"
          >
            <el-option
              v-for="(text, idx) in item.optionData"
              :label="setFilter({ text, item, defaultKey: 'label' })"
              :value="setFilter({ text, item, defaultKey: 'id' })"
              :key="idx"
            ></el-option>
          </el-select>
          <!-- 时间选择器 -->
          <el-date-picker
            v-if="item.type === 'datetime'"
            :type="item.timeType"
            v-model="$data[`formData`][item.propKey]"
            class="w100"
            v-bind="{
              valueFormat: 'yyyy-MM-dd',
              placeholder: '选择日期',
              startPlaceholder: '开始日期',
              endPlaceholder: '结束日期',
              rangeSeparator: '至',
              clearable: true,
              ...item.defaultProps
            }"
          ></el-date-picker>
        </slot>
      </el-form-item>
    </el-form>
    <div class="search-button">
      <el-button
        class="inline-block"
        v-if="resetShow"
        plain
        @click="resetForm('ruleForm')"
      >
        重置
      </el-button>
      <el-button
        class="inline-block"
        type="primary"
        @click="submitForm('ruleForm')"
      >
        查询
      </el-button>
      <div
        @click="isShowAll"
        class="inline-block show-more"
        v-if="defaultIsShow"
      >
        {{ word }}
        <i :class="!showAll ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"></i>
      </div>
    </div>
  </div>
</template>
<script>
import EleResize from './documentResize'
var _ = require('lodash')
export default {
  name: 'y-search',
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    showMore: {
      // 是否加载更多按钮
      type: Boolean,
      default: true
    },
    labelWidth: {
      type: Number,
      default: 80
    },
    resetShow: {
      // 是否显示重置按钮
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      formData: {}, // 表单数据
      defaultTarget: {}, //作为重置表单的时候使用
      showAll: false,
      resizeNum: 0
    }
  },
  computed: {
    showList: function () {
      return this.data
    },
    /**
     * @description 展开按钮的文字转换
     */
    word: function () {
      if (this.showAll == false) {
        //对文字进行处理
        return '展开'
      } else {
        return '收起'
      }
    },
    defaultIsShow() {
      if (!this.showMore) {
        return false
      }
      let offsetWidth = null
      let w = 0
      let width = document.querySelectorAll('.el-form-item')
      width.forEach(item => {
        w += item.offsetWidth + 10
      })
      if (this.resizeNum) {
        offsetWidth =
          document.querySelector('.search-form') &&
          (document.querySelector('.search-form').offsetWidth || 0)
      }
      if (w > offsetWidth) {
        return true
      } else {
        return false
      }
    }
  },
  created() {
    this.initDefaultValue()
  },
  mounted() {
    if (!this.showMore) {
      this.showAll = true
    }
    this.onResize()
    this.resizeNum++
    window.addEventListener('resize', this.triggerResize)
  },
  activated() {
    this.onResize()
    window.addEventListener('resize', this.triggerResize)
    if (!this.showMore) {
      this.showAll = true
    }
  },
  components: {},
  methods: {
    /**
     * @description 初始化数据
     */
    initDefaultValue() {
      let defaultData = {}
      this.data.forEach(item => {
        // 添加一个默认值
        if (item.defaultValue !== null && item.defaultValue !== undefined) {
          defaultData[item.propKey] = item.defaultValue
        }
        if (!item.defaultProps) {
          defaultData['defaultProps'] = {}
        }
      })
      // 设置好默认值 重置的时候使用
      this.defaultTarget = { ...defaultData }
      this.formData = { ...defaultData }
    },
    /**
     * @description 处理下拉框的默认key
     */
    setFilter(e) {
      let { text, item, defaultKey } = e
      let key = defaultKey
      if (item.defaultProps && item.defaultProps.label) {
        key = item.defaultProps.label
      }
      return text[key]
    },
    /**
     * @description 提交查询 防抖 额外数据可外部处理
     */
    submitForm: _.debounce(async function (ruleForm) {
      let valid = await this.$refs[ruleForm].validate()
      if (!valid) false
      let data = this.$refs[ruleForm].model
      for (const key in data) {
        // 去除对象内多余的空值key
        if (data[key] === '') {
          delete data[key]
        }
      }
      this.$emit('submit', data)
    }, 500),
    /**
     * @description 重置数据
     */
    resetForm: _.debounce(function (ruleForm) {
      this.$emit('reset')
      this.formData = { ...this.defaultTarget }
      this.$refs[ruleForm].resetFields()
    }, 500),
    /**
     * @description 往外抛出事件
     */
    emitEvent(button, e) {
      if (button) {
        this.$emit(button, e)
      }
    },
    /**
     * @description 点击展开和搜索按钮
     */
    isShowAll() {
      this.showAll = !this.showAll
      this.resizeNum++
    },
    /**
     * @description 触发表格重新计算高度
     */
    triggerResize() {
      this.resizeNum++
    },
    /**
     * @description 监听页面缩放，改变表格大小
     */
    onResize: _.debounce(function () {
      const element = document.querySelector('.search-bar')
      if (element) {
        this.resizeNum++
        EleResize.on(element, () => {
          this.resizeNum++
        })
      }
    }, 300),
    /**
     * @function 销毁监听页面缩放的事件
     */
    offResize: _.debounce(function () {
      const element = document.querySelector('.search-bar')
      if (element) {
        EleResize.off(element, () => {
          // "卸载resize监听";
        })
      }
    }, 300)
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.triggerResize)
  },
  destroyed() {
    this.offResize()
  },
  deactivated() {
    window.removeEventListener('resize', this.triggerResize)
    this.offResize()
  }
}
</script>
<style lang="scss" scoped>
.w100 {
  width: 100%;
}
/deep/.search-form {
  .el-form-item {
    margin-bottom: 0;
    padding: 8px 0;
    flex-shrink: 0;
    user-select: none;
    min-width: 265px;
  }
  .el-date-editor .el-range-separator {
    padding: 0;
  }
  .el-date-editor .el-input__inner {
    padding-right: 15px;
  }
}
$searchW: 200px;
.search-container {
  width: 100%;
  display: grid;
  grid-template-columns: minmax(300px, 1fr) $searchW;
  .search-form {
    width: 100%;
    overflow: hidden;
    transition: height 0.2s linear;
    display: inline-block;
    vertical-align: middle;
    height: 50px;
  }
  .search-expand {
    height: auto !important;
  }
  .search-button {
    margin-top: 10px;
    width: $searchW;
    text-align: right;
    flex-shrink: 0;
    display: inline-block;
    vertical-align: top;
    user-select: none;
    .inline-block {
      display: inline-block;
      vertical-align: middle;
    }
    .show-more {
      margin-left: 15px;
      color: #00a1d6;
      font-size: 14px;
      font-weight: 400;
      cursor: pointer;
    }
  }
}
</style>
