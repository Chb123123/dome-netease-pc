<template>
  <router-view></router-view>
</template>

<script setup>

</script>

<style>
  .container-main {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
  div {
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
  }
  * {
    padding: 0;
    margin: 0;
    /* 隐藏滚动条 */
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  *::-webkit-scrollbar {
    display: none;
  }
  .pageMain {
    width: 100%;
    padding: 20px;
    height: calc(100vh - 20px);
  }
  /* 设置全局文字不换行 */
  .textNotWarp {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
</style>
