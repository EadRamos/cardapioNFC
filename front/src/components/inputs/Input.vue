<template>
    <div class="input-area">

        <input
        v-model="value"
        class="input"
        :type="type"
        :placeholder="placeholder"
        :required="require"
        @input="returnInput(value)"/>
        
        <label class="input-label">{{label}}</label>
    </div>
</template>
<script>
export default {
    name: 'Input',
    props: {
        type: {
            type: String,
            default: 'text'
        },
        placeholder: {
            type: String,
            default: ''
        },
        require: {
            type: Boolean,
            default: false
        },
        label: {
            type: String,
            default: ''
        },
        returnInput: {
            type: Function,
            default: () => {}
        },
        rules: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            value: null,
            error: [],
        };
    },
    methods: {
        validate() {
            
            this.rules?.forEach( rule => {
                
                if (rule(this.value)) {
                    const error = rule(this.value);
                    if(error){
                        this.error.push(error);
                    }
                }
            });
            return this.error.length > 0 ? this.error : null;
        }
    },
    mounted() {
       
        this.$parent?.register?.(this)
    }
}
</script>
<style scoped>
.input-area {
    width: 100%;
    position: relative;
    overflow: visible;
}
.input {
    width: 100%;
    height: 2.5rem;
    padding: 0 1rem;
    border-radius: 0.5rem;
    border-color: transparent;
    transition: height 0.5s ease-in-out;

    background-color: var(--color-primary-input);
}
.input:hover {
    border: 1px solid var(--color-main);
}
.input:focus {
    outline: none;
    border: 1px solid rgba(0, 0, 0, 0.1);
}
.input::placeholder {
    transition: color 0.5s ease-in;
    color: transparent;
}
.input:focus::placeholder {
    color: var(--color-primary-inverse);
}
.input-label {
    position: absolute;
    top: 0.7rem;
    left: 0.5rem;
    pointer-events: none;
    color: var(--color-primary-inverse);
    transition: all 0.5s ease-in-out;
}
.input:focus ~ .input-label,
.input:not(:placeholder-shown) ~ .input-label {
    transition: all 0.5s ease-in-out;
    top: -1.2rem;
    left: 0;
    color: var(--color-primary-inverse);
}
@keyframes input-selection {
    0% {
        border-right: 2px solid var(--color-main);
    }
    50% {
        border-right: 2px solid transparent;
        border-left: 2px solid var(--color-main);
    }
    100% {
        border-right: 2px solid var(--color-main);
    }
}
@keyframes input-focus {
    50% {
        border-color: transparent;
    }
    100% {
        border-color: var(--color-main);
    }
}
</style>