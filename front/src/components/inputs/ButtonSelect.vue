<template>
    <div class="buttonSelectBase round center clicked" :style="value ? 'background-image: var(--gradient-primary)': ''">
        <span v-if="label">{{ label }}</span>
        <i v-if="icon" :class="[icon]"/>
    </div>
</template>
<script>
export default {
    name: 'ButtonSelect',
    props: {
        label: {
            type: String,
            default: null
        },
        icon: {
            type: String,
            default: null
        },
        value: {
            type: Boolean,
            default: false
        }
    }
}
</script>
<style>
.buttonSelectBase {
    width: 100%;
    background-color: var(--color-primary-input);
    color: var(--color-primary-inverse)
}
.buttonSelectBase:hover {
    border: 1px solid var(--color-main);
}
</style>