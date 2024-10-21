import { Component } from 'vue';

export interface SearchFormItem {
  name: string;
  label: string;
  model?: string;
  component?: Component;
}
