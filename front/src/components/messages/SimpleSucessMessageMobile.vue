<template>
    <div v-if="message.length > 0" :class="['messageAvisoMobile round shadow', type]">
        <div class="containerMessageAvisoMobile">
            <p>{{ message }}</p>

            <div class="iconMessageAvisoMobile" @click="exit()">
                <i class="fa-solid fa-circle-xmark clicked" />
            </div>
            <div class="areaTime">
                <div class="barraTime" :style="`width: ${porTime}%`"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'SimpleSucessMessageMobile',
    props: {
        message: {
            type: String,
            default: null
        },
        returnMessage: {
            type: Function,
            default: () => {}
        },
        type: {
            type: String,
            default: 'information'
        },
        time: {
            type: String,
            default: '3000',
        }
    },
    methods: {
        exit(){
            this.returnMessage('');
            clearInterval(this.interval);
        }
    },
    data() {
        return {
            porTime: 0,
            interval: null
        }
    },
    mounted() {
        this.interval = setInterval(() => {
            if(this.porTime < 100){
                this.porTime += 10;
                console.log(this.porTime);
            } else {
                clearInterval(this.interval);
                this.returnMessage('');
            }
        }, (+this.time)/10);

        console.log((+this.time)/10);
    },
    destroyed() {
        if (this.interval) clearInterval(this.interval);
    },
}
</script>
<style scoped> 
.messageAvisoMobile {
    width: 95%;
    height: fit-content;
    position: absolute;
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);

    font-size: 1.2rem;
    
}
.messageAvisoMobile.information {
    background-color: var(--color-main);
}
.messageAvisoMobile.error {
    background-color: var(--color-error);
}
.containerMessageAvisoMobile {
    width: 100%;
    height: 100%;
    position: relative;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;

}
.iconMessageAvisoMobile {
    width: 1.5rem;
    aspect-ratio: 1/1;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    color: var(--color-primary);
}
.areaTime {
    width: 100%;
    height: 0.4rem;
    margin: 1rem 1.5rem;
    border: 1px solid rgba(0, 0, 0, 0.25);
    background-color: var(--color-primary);
    overflow: hidden;
    border-radius: 0.2rem;
}
.barraTime {
    width: 0%;
    height: 100%;
    background-color: var(--color-main);
    transition: width 0.8s ease;
}
</style>