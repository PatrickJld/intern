<template>
  <div class="h-auto min-h-screen flex flex-col">
    <div class="bg-background-100 h-screen w-full fixed top-0 left 0"></div>
    <router-view/>
  </div>
</template>
<script>
  export default{}
</script>
<style>
  .no-scrollbar::-webkit-scrollbar{
    display: none;
  }

  .no-scrollbar{
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>