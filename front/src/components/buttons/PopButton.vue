<template>
    <div :class="[
        type == 'round' ? 'round' : 'squad',
        mobile ? 'popButton mobile' : 'popButton',
        color == 'primary' ? 'primary' : {
            'secundary': color == 'secundary',
            'main': color == 'main'
        }
    ]">
        <i :class="icon"/>
    </div>
</template>
<script>
export default {
    name: 'PopButton',
    data() {
        return {
            
        }
    },
    props: {
        type: {
            type: String,
            default: 'round'
        },
        icon: {
            type: String,
            default: ''
        },
        color: {
            type: String,
            default: 'primary'
        }
    }
}
</script>
<style scoped>
.popButton {
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
}
.popButton:hover {
    border: 1px solid rgba(110, 110, 110, 0.3);
}
.round {
    border-radius: 50%;
}
.squad {
    border-radius: 0.5rem;
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
</style>