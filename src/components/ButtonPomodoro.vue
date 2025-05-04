<template>
  <button class="bg-blue-400 rounded-lg p-3 px-20 text-white hover:text-grey-800 hover:bg-blue-300 shadow-sm">{{ props.textButton }}</button>
</template>

<script setup>
const props = defineProps(['textButton'])
</script>
