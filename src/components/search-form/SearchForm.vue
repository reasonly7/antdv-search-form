<script setup lang="ts">
import { ref } from 'vue';
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

const props = defineProps<{
  items: SearchFormItem[];
}>();

const emits = defineEmits<{
  search: [model: typeof formModel.value];
  reset: [];
  expand: [status: boolean];
}>();

const expanded = ref(false);
const formRef = ref<FormInstance | null>(null);
const formModel = ref<Record<string, unknown>>({});

const reset = () => {
  console.log(formRef.value?.getFieldsValue());
  formRef.value!.resetFields();
  emits('reset');
};
const expandHandler = () => {
  expanded.value = !expanded.value;
  emits('expand', expanded.value);
};
</script>

<template>
  <div class="search-form">
    <Form
      :model="formModel"
      layout="inline"
      ref="formRef"
      :labelCol="{ span: 6 }"
      :wrapperCol="{ span: 18 }"
      class="form-wrapper"
    >
      <Row class="form-row">
        <Col :span="6" v-for="item in items" :key="item.name">
          <FormItem :name="item.name" :label="item.label">
            <component :is="item.component"
            :[item.model||'value']="formModel[item.name]"
            :[`onUpdate:${item.model||'value'}`]="(value:unknown) => {
            formModel[item.name] = value } " />
          </FormItem>
        </Col>
        <Col :span="6">
          <Flex justify="flex-end" :gap="12" align="center">
            <Button @click="reset">Reset</Button>
            <Button type="primary">Query</Button>
            <Button type="link" class="expand-toggle" @click="expandHandler">
              {{ expanded ? 'Collapsed' : 'Expand' }}
              <UpOutlined v-if="expanded" />
              <DownOutlined v-else />
            </Button>
          </Flex>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<style scoped lang="less">
.search-form {
  .form-row {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    :deep(.ant-form-item-control-input-content) {
      > :first-child {
        width: 100%;
      }
    }
    .expand-toggle {
      padding: 0;
    }
  }
}
</style>
