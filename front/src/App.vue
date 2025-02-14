<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>
  <menu-mobile/>
</template>
<script>
export default {
  mounted() {
    if (this.mobile) {
      document.documentElement.style.fontSize = "100%";
    }
  }
}
</script>