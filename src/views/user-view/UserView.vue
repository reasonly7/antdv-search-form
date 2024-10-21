<script setup lang="ts">
import UserSearchForm from './user-search-form/UserSearchForm.vue';
</script>

<template>
  <div class="user-view">
    <div class="form-wrapper">
      <UserSearchForm></UserSearchForm>
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
