<script setup lang="ts">
import SearchFormContainer from '@/components/search-form-container/SearchFormContainer.vue';
import type { Dayjs } from 'dayjs';
import {
  Form,
  FormItem,
  Input,
  Select,
  InputNumber,
  Row,
  Col,
  Space,
  Button,
  Flex,
} from 'ant-design-vue';
import { Component, ref } from 'vue';

const formModel = ref<{
  name?: string;
  age?: number;
  gender?: 'male' | 'female';
  birthDate?: Dayjs;
  status?: 'enabled' | 'disabled';
}>({});

const a: SearchItem[] = [
  {
    name: 'name',
    label: 'Name',
    model: 'value',
    component: Input,
  },
];

type SearchItem = {
  name: string;
  label: string;
  model?: string;
  component?: Component;
};
</script>

<template>
  <SearchFormContainer>
    <Form
      :model="formModel"
      layout="inline"
      :labelCol="{ span: 6 }"
      :wrapperCol="{ span: 18 }"
      class="form-wrapper"
    >
      <Row class="form-row">
        <Col :span="6">
          <FormItem name="name" label="Name">
            <Input v-model:value="formModel.name" />
          </FormItem>
        </Col>

        <Col :span="6">
          <FormItem name="age" label="Age">
            <InputNumber v-model:value="formModel.age" />
          </FormItem>
        </Col>

        <Col :span="6">
          <FormItem name="gender" label="Gender">
            <Select
              v-model:value="formModel.gender"
              :options="[
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
              ]"
            ></Select>
          </FormItem>
        </Col>

        <Col :span="6">
          <Flex justify="flex-end" :gap="12" align="center">
            <Button>Reset</Button>
            <Button type="primary">Query</Button>
            <Button type="link" class="expand-toggle"> Expand </Button>
          </Flex>
        </Col>

        <!-- <FormItem name="birthDate" label="Birth Date">
        <DatePicker v-model:value="formModel.birthDate" />
      </FormItem>

      <FormItem name="status" label="Status">
        <Select
          v-model:value="formModel.status"
          :options="[
            { label: 'Enabled', value: 'enabled' },
            { label: 'Disabled', value: 'disabled' },
          ]"
        ></Select>
      </FormItem> -->
      </Row>
    </Form>
  </SearchFormContainer>
</template>

<style scoped lang="less">
.form-wrapper {
  width: 100%;
  .form-row {
    width: 100%;
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
