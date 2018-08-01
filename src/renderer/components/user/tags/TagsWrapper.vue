<template>
        <div>
        <transition name='global-router-view' mode='out-in'>
          <router-view></router-view>
        </transition>
        </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
  
</style>