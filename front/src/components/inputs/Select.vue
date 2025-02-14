<template>
    <div class="selectBase" :style="[sizeMinimal(), selectPopupMobile()]">
        <div ref="refSelectBase" @click="clickSelectF" class="buttonSelectBase round center">

            <label v-if="labelCanVisible()" :class="{'labelSelectBase': true, 'labelSelectBaseFocus': value != ''}">
                {{ label }}
            </label>

            <span v-if="value" style="line-height: 2.5rem;">
                {{ primaryElement(value) }}
            </span>

            <i class="fa-solid fa-angle-down iconSelectBase" :style="[clickSelect ? 'transform: translateY(-50%);' : 'transform: rotate(180deg)  translateY(50%);']"/>
            
        </div>
        <div :class="{'optionsSelectBase shadow': true,'optionsSelectBaseVisible': clickSelect, 'optionSelectBaseMobile': mobile}">
            <ul>
                <li v-if="value" @click="value = ''">Limpar</li>
                <li v-for="item in values" @click="value = item" :style="{'background-color: var(--color-main)': item == value}">{{ primaryElement(item) }}</li>
            </ul>
        </div>
    </div>
</template>
<script>

export default {
    name: 'SelectBase',
    props: {
        label: {
            type: String,
            default: ''
        },
        values: {
            type: Array,
            default: []
        },
        valueSelect: {
            type: Function,
            default: () => {}
        },
        keyTitle: {
            type: String,
            default: null,
        },
        minimal: {
            type: Boolean,
            default: true,
        },
        size: {
            type: String,
            default: '15rem'
        },
        labelVisible: {
            type: Boolean,
            default: true
        }
    },
    data(){
        return {
            value: '',
            clickSelect: false,
        }
    },
    watch: {
        value: function (value) {
            this.valueSelect(value);
            this.value = value;
        }
    },
    methods: {
        clickSelectF() {
            this.clickSelect = !this.clickSelect;
            
            if (this.clickSelect) {
                document.addEventListener('click', this.closeSelectOutside);
            } else {
                document.removeEventListener('click', this.closeSelectOutside);
            }
        },
        closeSelectOutside(event) {
            // Verifica se o clique foi fora do elemento refSelectBase
            if (!this.$refs.refSelectBase.contains(event.target)) {
                this.clickSelect = false;
                document.removeEventListener('click', this.closeSelectOutside);
            }
        },
        primaryElement(value){
            if(this.keyTitle)
            {
                return value[this.keyTitle];
            }
            else
            {
                return value;
            }     
        },
        sizeMinimal() {
            return this.minimal ? `width: ${this.size}` : 'width: 100%';
        },
        selectPopupMobile() {
            return this.mobile ? '' : 'position: relative;';
        },
        labelCanVisible() {
            return (this.labelVisible == false && !this.value) || this.labelVisible;
        }
    }
}
</script>
<style>
.iconSelectBase {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    
    font-size: 1rem;
}
.selectBase {
    width: 100%;
    overflow: visible;
    color: var(--color-primary-inverse);
}
.buttonSelectBase {
    display: block;
    position: relative;
    overflow: visible;
    width: 100%;
    height: 2.5rem;
    padding: 0 1.5rem 0 1rem;
    border: 2px solid transparent;
    background-color: var(--color-primary-input);
    border-color: transparent;
    transition: height 0.5s ease-in-out;
}
.buttonSelectBase:hover {
    border: 1px solid var(--color-main);
}
.labelSelectBase {
    width: fit-content;
    position: absolute;
    top: 50%;
    transform: translateY(-50%) translateX(-50%);
    left: calc(50% - 0.5rem);
    pointer-events: none;
    color: var(--color-primary-inverse);
    transition: all 0.5s ease-in-out;
}
.labelSelectBaseFocus {
    transition: all 0.5s ease-in-out;
    top: 0%;
    left: 0;
    transform: translateY(-100%);
    color: var(--color-primary-inverse);
}
.optionsSelectBase {
    display: none;
    max-height: 10rem;
    height: max-content;
    position: absolute;
    overflow-y: auto;
    overflow-wrap: hidden;
    width: 100%;
    min-height: 5rem;
    top: 2.5rem;
    transform: scaleX(0%);
    padding: 1rem 0;
    border-radius: 0.5rem;
    background-color: var(--color-primary);
    color: var(--color-primary-inverse) !important;
    opacity: 0;
    z-index: 900;
    transition: opacity 1s ease;
}
.optionsSelectBase::-webkit-scrollbar {
    width: 1rem;
}
.optionsSelectBase::-webkit-scrollbar-thumb {
    border-radius: 1rem;
    background-color: var(--color-principalClara);
}
.optionsSelectBaseVisible {
    display: block;
    animation-duration: 1s;
    animation-name: animationAppearSelectInput;
    animation-fill-mode: forwards;
    opacity: 1;
    transition: opacity 1s ease;
}
.optionsSelectBase > ul {
    width: 100%;
    height: 100%;
}
.optionsSelectBase > ul > li {
    width: 100%;
    min-height: 2.5rem;
    padding: 0 1rem;
    line-height: 2rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    transition: background-color 0.2s ease-in-out;
}
.optionsSelectBase > ul > li:hover {
    background-color: rgba(0, 0, 0, 0.2);
}
.optionSelectBaseMobile {
    
    position: fixed;
    top: auto;
    bottom: 0;
    left: 0;
    max-height: 50%;
    min-height: 25%;
    padding-top: 2rem;

    border-radius:2rem 2rem 0 0;
    
    animation: none;
    transform: scaleX(100%);
    background-image: var(--gradient-primary);
}
@keyframes animationSelectInput {
    0% {
        border-right: 2px solid var(--color-principal);
    }
    50% {
        border-right: 2px solid transparent;
        border-left: 2px solid var(--color-principal);
    }
    100% {
        border-right: 2px solid var(--color-principal);
    }
}
@keyframes animationFocusSelectInput {
    50% {
        border-color: transparent;
    }
    100% {
        border-color: var(--color-principal);
    }
}
@keyframes animationAppearSelectInput {
    20% {
        
        transform: scaleX(100%);
    }
    100% {
        top: 100%;
        transform: scaleX(100%);
    }
}
</style>