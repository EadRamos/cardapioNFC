<template>
    <div
    v-if="messages?.length > 0"
    :class="[
        mobile ? 'simpleCardMessageMobile shadow2' : 'simpleCardMessageDesktop', 'round'
    ]"
    :style="[
        {backgroundColor: color()},space()
    ]">
        <i class="fa-solid fa-circle-xmark simpleCardMessageIcon clicked" @click="exit(null)"/>
        <p class="simpleCardMessageText" v-for="(msg, key) in messages">{{ key+1 }} - {{ msg }}</p>
    </div>
</template>
<script>
export default {
    name: 'SimpleCardMessage',
    props: {
        messages: {
            type: Array,
            default: null,
        },
        type: {
            type: String,
            default: 'error',
        },
        size: {
            type: String,
            default: 'full',
        },
        exit: {
            type: Function,
            default: () => {},
        }
    },
    data() {
        return {
            msg: null,
        }
    },
    methods: {
        color() {
            switch (this.type) {
                case 'error':
                    return 'var(--color-error)';
                case 'success':
                    return 'var(--color-success)';
                default:
                    return 'transparent';
            }
        },
        space() {
            switch (this.size) {
                case 'full':
                    return this.mobile ? {width: '95%'} : {width: '100%'};
                case 'minimal':
                    return {width: 'fit-content'};
                default:
                    return {width: '50%'};
            }
        }
    }
}
</script>
<style>
.simpleCardMessageDesktop {
    height: fit-content;
    position: relative;
    padding: 0.5rem 2rem 0.5rem 1rem;

    font-size: 1.3rem;
}
.simpleCardMessageMobile {
    height: fit-content;
    position: absolute;
    padding: 0.5rem 2rem 0.5rem 1rem;
    top: 0.5rem;
    right: 50%;
    transform: translateX(50%);
    z-index: 999;

    font-size: 1.3rem;
}
.simpleCardMessageIcon {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
}
</style>