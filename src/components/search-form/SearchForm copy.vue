<script setup lang="ts">
import { computed, ref } from 'vue';
import { SearchFormItem } from './types';
import {
  Button,
  Col,
  Flex,
  Form,
  FormInstance,
  FormItem,
  Row,
} from 'ant-design-vue';
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue';
import { useElementSize } from '@vueuse/core';
import { cloneDeep } from 'lodash-es';

const props = withDefaults(
  defineProps<{
    items: SearchFormItem[];
    labelSpan?: number;
  }>(),
  { labelSpan: 8 },
);

const emits = defineEmits<{
  search: [model: typeof formModel.value];
  reset: [];
  expand: [status: boolean];
}>();

const expanded = ref(false);
const containerRef = ref<HTMLDivElement | null>(null);
const { width: containerWidth } = useElementSize(containerRef);
const responsiveAttrs = computed(() => {
  const allCount = props.items.length;
  if (containerWidth.value > 920) {
    return {
      count: expanded.value ? allCount : 3,
      span: 6,
      layout: 'inline',
      labelCol: { span: props.labelSpan },
      wrapperCol: { span: 24 - props.labelSpan },
    };
  } else if (containerWidth.value > 730) {
    return {
      count: expanded.value ? allCount : 2,
      span: 8,
      layout: 'inline',
      labelCol: { span: props.labelSpan },
      wrapperCol: { span: 24 - props.labelSpan },
    };
  } else if (containerWidth.value > 480) {
    return {
      count: expanded.value ? allCount : 1,
      span: 12,
      layout: 'vertical',
      labelCol: { span: 24 },
      wrapperCol: { span: 24 },
    };
  } else {
    return {
      count: expanded.value ? allCount : 1,
      span: 24,
      layout: 'vertical',
      labelCol: { span: 24 },
      wrapperCol: { span: 24 },
    };
  }
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
  <div class="search-form" ref="containerRef">
    <Form
      :model="formModel"
      :layout="responsiveAttrs.layout"
      ref="formRef"
      :labelCol="responsiveAttrs.labelCol"
      :wrapperCol="responsiveAttrs.wrapperCol"
      class="form-wrapper"
    >
      <Row
        class="form-row"
        wrap
        :class="{ vertical: responsiveAttrs.layout === 'vertical' }"
      >
        <Col
          :span="responsiveAttrs.span"
          v-for="(item, index) in items"
          :key="item.name"
          v-show="index < responsiveAttrs.count"
        >
          <FormItem
            :name="item.name"
            :label="item.label"
            :hidden="index >= responsiveAttrs.count"
          >
            <component :is="item.component"
            :[item.model||'value']="formModel[item.name]"
            :[`onUpdate:${item.model||'value'}`]="(value:unknown) => {
            formModel[item.name] = value } " />
          </FormItem>
        </Col>
        <div
          :span="responsiveAttrs.span"
          class="rest-container"
          :class="{
            'rest-center': responsiveAttrs.span === 12,
          }"
        >
          <Flex justify="flex-end" :gap="12" align="center">
            <Button @click="reset">Reset</Button>
            <Button type="primary" @click="query" htmlType="submit">
              Query
            </Button>
            <Button
              type="link"
              class="expand-toggle"
              @click="expandHandler"
              v-if="responsiveAttrs.count < items.length || expanded"
            >
              {{ expanded ? 'Collapsed' : 'Expand' }}
              <UpOutlined v-if="expanded" />
              <DownOutlined v-else />
            </Button>
          </Flex>
        </div>
      </Row>
    </Form>
  </div>
</template>

<style scoped lang="less">
.search-form {
  .form-row {
    width: 100%;
    &:not(.vertical) {
      row-gap: 24px;
    }
    :deep(.ant-form-item) {
      .ant-form-item-control-input-content {
        > :first-child {
          width: 100%;
        }
      }
    }
    .expand-toggle {
      padding: 0;
    }
    .rest-container {
      flex: 1;
      justify-content: flex-end;
      &.rest-center {
        padding-top: 30px;
      }
    }
  }
}
</style>
