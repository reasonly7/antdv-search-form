<script setup lang="ts">
import { SearchForm, SearchFormItem } from '@/components/search-form';
import { DatePicker, Input, InputNumber, Select } from 'ant-design-vue';
import { h } from 'vue';

const searchFormItems: SearchFormItem[] = [
  { label: 'Name', name: 'name', component: Input },
  { label: 'Age', name: 'age', component: InputNumber },
  {
    label: 'Gender',
    name: 'gender',
    component: h(Select, {
      allowClear: true,
      options: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
      ],
    }),
  },
  {
    label: 'Status',
    name: 'status',
    component: h(Select, {
      allowClear: true,
      options: [
        { label: 'Enabled', value: 'enabled' },
        { label: 'Disabled', value: 'disabled' },
      ],
    }),
  },
  { label: 'Birth Date', name: 'birthDate', component: DatePicker },
];
</script>

<template>
  <div class="user-view">
    <div class="form-wrapper">
      <SearchForm :items="searchFormItems"></SearchForm>
    </div>
  </div>
</template>

<style scoped lang="less">
.user-view {
  padding: 100px;
  height: 100vh;
  width: 100vw;
  background-color: #f1f1f1;
  .form-wrapper {
    padding: 20px;
    background-color: #fff;
    border-radius: 6px;
  }
}
</style>
