<template>
    <div class="areaLevelInput">
        <div v-if="value > 1 || del == false" class="btnLevelInput clicked" @click="returnValue(value > 1 ? value - 1 : value)" style="background-color: brown;"> - </div>
        <div v-if="value <= 1 && del == true" class="btnLevelInput clicked" style="background-color: brown;" @click="returnDel(true)">
        <i class="fa-solid fa-trash" style="font-size: 0.8rem;"></i>
        </div>

        <div class="valueLevelInput"> {{  value }}</div>

        <div class="btnLevelInput clicked" @click="returnValue(value + 1)" style="background-color: var(--color-main);"> + </div>

    </div>
</template>
<script>
export default {
    name: 'LevelInput',
    props: {
        value: {
            type: Number,
            default: 1
        },
        returnValue: {
            type: Function,
            default: () => {}
        },
        del: {
            type: Boolean,
            default: false,
        },
        returnDel: {
            type: Function,
            default: () => {}
        }
    }
}
</script>
<style scoped>
.areaLevelInput {
    width: fit-content;
    aspect-ratio: 3/1;
    display: flex;
    padding: 0.2rem;
    align-items: center;
    border-radius: 2rem;
    border: 1px solid rgba(128, 128, 128, 0.1);
    background-color: var(--color-primary-input);
    color: var(--color-primary-inverse);
}
.btnLevelInput {
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    border-radius: 50%;

}
.valueLevelInput {
    width: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;

}
</style>