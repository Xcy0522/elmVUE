<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
#app {
  height: 100%;
  background-color: #f5f5f5;
 .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
   }
}
</style>
