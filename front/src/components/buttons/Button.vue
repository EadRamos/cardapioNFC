<template>
    <div
    :class="{
        'btn': true,
        'mobile': mobile,
        'primary': color == 'primary',
        'secundary': color == 'secundary',
        'main': color == 'main',
        'red': color == 'red',
        'gradientPrimary': color == 'gradientPrimary',
        'gradientSecundary': color == 'gradientSecundary',
        'round': rouder,
        'minimal': type == 'minimal',
        'middle': type == 'middle',
        'full': type == 'full',
        'half': type == 'half'
    }">
        <i v-if="iconSide == 'left'" :class="icon"/>
        <span v-if="text">{{ text }}</span>
        <i v-if="iconSide == 'right'" :class="icon"/>
    </div>
</template>
<script>
export default {
    name: 'Button',
    props: {
        type: {
            type: String,
            default: 'minimal'
        },
        text: {
            type: String,
            default: null
        },
        icon: {
            type: String,
            default: null
        },
        iconSide: {
            type: String,
            default: 'left'
        },
        color: {
            type: String,
            default: 'main'
        },
        rouder: {
            type: Boolean,
            default: true
        }
    }
}
</script>
<style scoped>
.round {
    border-radius: 1rem;
}
.btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    height: 3rem;

    font-size: 150%;

    cursor: pointer;
}
.btn:hover {
    border: 1px solid rgb(82, 82, 82, 0.3);
}
.btn.mobile {
    font-size: 100%;
}
.minimal {
    width: fit-content;
    padding: 0.5rem 1.5rem;
}
.middle {
    width: fit-content;
    min-width: 10rem;
    padding: 0.5rem 1.5rem;
}
.full {
    width: 100%;
    padding: 0.5rem 1.5rem;
}
.half {
    width: 50%;
    padding: 0.5rem 1.5rem;
}
.primary {
    background-color: var(--color-primary);
    color: var(--color-primary-inverse);
}
.secundary {
    background-color: var(--color-primary-inverse);
    color: var(--color-primary);
}
.main {
    background-color: var(--color-main);
    color: var(--color-main-inverse);
}
.red {
    background-color: rgb(247, 55, 55);
    color: var(--color-red-inverse);
}
.gradientPrimary {
    background: var(--gradient-primary);
    color: var(--color-red-inverse);
}
.gradientSecundary {
    background: var(--gradient-secundary);
    color: var(--color-red-inverse);
}
</style>