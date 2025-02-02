<template>
    
    <div class="areaInputBase">
        
        <input
        v-model="value"
        :class="{'inputBase': true, 'inputBaseError': error.length > 0}"
        :type="type"
        :placeholder="placeholder"
        :required="require"
        @click="error.length && (error = [])"
        @input="returnInput(value)"/>
        
        <label v-if="labelVisible == false && !value || labelVisible" :class="{'inputBaseLabel': true, 'visibleFocus': !labelVisible}">
            {{label}}
        </label>
        <i v-if="icon" :class="[icon, 'inputBaseIcon']"/>
        
        <span v-if="error.length > 0" class="inputBaseMessageError">
            {{ error[0] }}
        </span>
    </div>

</template>
<script>

export default {
    name: 'InputBase',
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
        },
        icon: {
            type: String,
            default: null
        },
        labelVisible: {
            type: Boolean,
            default: true
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
            
            if(!this.error.length) {
                this.rules?.forEach( rule => {
                
                    if (rule(this.value)) {
                        const error = rule(this.value);
                        if(error){
                            this.error.push(error);
                        }
                    }
                });
            }

            return this.error.length > 0 ? this.error : null;
        }
    },
    mounted() {
       
        this.$parent?.register?.(this)
    }
}
</script>
<style scoped>
.inputBase:focus ~ .visibleFocus {
    display: none !important;
}
.inputBaseIcon {
    position: absolute;
    right: 0.5rem;
    top: 50%;

    transform: translateY(-50%);
    
    font-size: 1rem;
    opacity: 50%;
}
.inputBaseMessageError {
    position: absolute;
    left: 0;
    top: 100%;
    color: var(--color-error);
}
.areaInputBase {
    width: 100%;
    position: relative;
    overflow: visible;
    color: var(--color-primary-inverse);
}
.inputBaseError {
    border: 1px solid var(--color-error) !important;
}
.inputBase {
    width: 100%;
    height: 2.5rem;
    padding: 0 1rem;
    border-radius: 0.5rem;
    border-color: transparent;
    transition: height 0.5s ease-in-out;
    color: var(--color-primary-inverse);

    background-color: var(--color-primary-input);
}
.inputBase:hover {
    border: 1px solid var(--color-main);
}
.inputBase:focus {
    outline: none;
    border: 1px solid rgba(0, 0, 0, 0.1);
}
.inputBase::placeholder {
    transition: color 0.5s ease-in;
    color: transparent;
}
.inputBase:focus::placeholder {
    color: var(--color-primary-inverse);
}
.inputBaseLabel {
    position: absolute;
    top: 0.7rem;
    left: 0.5rem;
    pointer-events: none;
    color: var(--color-primary-inverse);
    transition: all 0.5s ease-in-out;
}
.inputBase:focus ~ .inputBaseLabel,
.inputBase:not(:placeholder-shown) ~ .inputBaseLabel {
    transition: all 0.5s ease-in-out;
    top: -1.2rem;
    left: 0;
    color: var(--color-primary-inverse);
}

</style>