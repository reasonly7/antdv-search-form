<script setup lang="ts">
import { computed, ref } from 'vue';
import { SearchFormItem } from './types';
import { Button, Form, FormInstance, FormItem, Input } from 'ant-design-vue';
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue';
import { useElementSize } from '@vueuse/core';
import { cloneDeep } from 'lodash-es';

const props = withDefaults(
  defineProps<{
    items: SearchFormItem[];
    labelWidth?: number;
  }>(),
  { labelWidth: 100 },
);

const emits = defineEmits<{
  search: [model: typeof formModel.value];
  reset: [];
  expand: [status: boolean];
}>();

const expanded = ref(false);
const _labelWidth = computed(() => props.labelWidth + 'px');
const _labelRest = computed(() => `calc(100% - ${props.labelWidth}px)`);
const containerRef = ref<HTMLDivElement | null>(null);
const { width: containerWidth, height: containerHeight } =
  useElementSize(containerRef);
const responsiveAttrs = computed(() => {
  const allCount = props.items.length;
  if (containerWidth.value > 1000) {
    return expanded.value && allCount > 3
      ? { count: allCount, width: 'w-1-4', layout: 'horizontal' }
      : { count: 3, width: 'w-1-4', layout: 'horizontal' };
  } else if (containerWidth.value > 700) {
    return expanded.value && allCount > 2
      ? { count: allCount, width: 'w-1-2', layout: 'horizontal' }
      : { count: 2, width: 'w-1-3', layout: 'horizontal' };
  } else if (containerWidth.value > 500) {
    return {
      count: expanded.value && allCount > 1 ? allCount : 1,
      width: 'w-1-2',
      layout: 'horizontal',
    };
  } else {
    return {
      count: expanded.value && allCount > 1 ? allCount : 1,
      width: 'w-full',
      layout: 'vertical',
      fullRow: true,
    };
  }
});
const expandShow = computed(() => {
  return (
    (expanded.value && containerHeight.value > 32) ||
    responsiveAttrs.value.count < props.items.length
  );
});
const formRef = ref<FormInstance | null>(null);
const formModel = ref<Record<string, unknown>>({});

const reset = () => {
  formRef.value!.resetFields();
  emits('reset');
};

const query = () => {
  emits('search', cloneDeep(formModel.value));
};

const expandHandler = () => {
  expanded.value = !expanded.value;
  emits('expand', expanded.value);
};
</script>

<template>
  <div class="search-form-wrapper" ref="containerRef" :class="{ expanded }">
    <Form
      class="search-form"
      :model="formModel"
      :layout="responsiveAttrs.layout"
      ref="formRef"
    >
      <FormItem
        v-for="(item, index) in items"
        :key="item.name"
        class="form-item"
        :name="item.name"
        :label="item.label"
        v-show="index < responsiveAttrs.count"
        :class="responsiveAttrs.width"
      >
        <component :is="item.component || Input" style="width: 100%;"
        :[item.model||'value']="formModel[item.name]"
        :[`onUpdate:${item.model||'value'}`]="(value:unknown) => {
        formModel[item.name] = value } " />
      </FormItem>
      <div
        class="form-item last-item"
        :class="{ 'full-row': responsiveAttrs.fullRow }"
      >
        <Button @click="reset">Reset</Button>
        <Button type="primary" @click="query" htmlType="submit">Query</Button>
        <Button
          class="expand-btn"
          type="link"
          @click="expandHandler"
          v-show="expandShow"
        >
          {{ expanded ? 'Collapsed' : 'Expand' }}
          <UpOutlined v-if="expanded" />
          <DownOutlined v-else />
        </Button>
      </div>
    </Form>
  </div>
</template>

<style scoped lang="less">
.search-form-wrapper {
  .search-form {
    display: flex;
    flex-flow: row wrap;
    &.ant-form-vertical {
      .form-item {
        &.last-item {
          padding-top: 30px;
          &.full-row {
            padding-top: 0;
          }
        }
        &.w-full {
          width: 100%;
          margin-bottom: 20px;
        }
      }
    }
    &.ant-form-horizontal {
      row-gap: 20px;
      .form-item {
        &.w-1-4 {
          width: 25%;
        }
        &.w-1-3 {
          width: 33.33%;
        }
        &.w-1-2 {
          width: 50%;
        }
        &.w-full {
          width: 100%;
        }
      }
      :deep(.ant-form-item-label) {
        width: v-bind(_labelWidth);
      }
      :deep(.ant-form-item-control) {
        width: v-bind(_labelRest);
      }
    }
    .form-item {
      margin-bottom: 0;
      &.last-item {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        gap: 8px;
        .expand-btn {
          padding: 0;
        }
      }
    }
  }
}
</style>
