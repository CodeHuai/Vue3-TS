<script setup lang="ts">
import type { IFormItem } from '../types/index'
import { PropType, ref, watch, computed } from 'vue'

const emits = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: Object,
    require: true
  },
  labelWidth: {
    type: String,
    default: '100px'
  },
  formItems: {
    type: Array as PropType<IFormItem[]>,
    default: () => []
  },
  colLayout: {
    type: Object,
    default: () => ({
      xl: 6, // >1920px 4个
      lg: 8,
      md: 12,
      sm: 24,
      xs: 24
    })
  },
  itemStyle: {
    type: Object,
    default: () => ({ padding: '10px 40px' })
  }
})


// 处理 formData
// const formData = computed({
//   set: () => {
//     emits('update:modelValue', formData)
//   },
//   get: ()=> ({...props.modelValue})
// })

const formData = ref({ ...props.modelValue })
watch(() => formData, (newValue) => {
  emits('update:modelValue', newValue)
}, { deep: true })
</script>

<template>
  <div class="hy-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="props.labelWidth">
      <el-row>
        <template v-for="item in props.formItems" :key="item.label">
          <el-col v-bind="props.colLayout">
            <el-form-item
              :label="item.label"
              :rules="item.rules"
              :style="props.itemStyle"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  v-model="formData[`${item.field}`]"
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :show-password="item.type === 'password'"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  v-model="formData[`${item.field}`]"
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                  >{{ option.title }}
                  </el-option
                  >
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  v-model="formData[`${item.field}`]"
                  style="width: 100%"
                  v-bind="item.otherOptions"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped lang="less">
.hy-form {
  padding-top: 22px;
}
</style>
