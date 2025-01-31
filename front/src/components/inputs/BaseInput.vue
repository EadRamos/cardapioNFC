<template>
    <div>
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'BaseInput',
    data() {
        return {
            inputs: []
        }
    },
    methods: {
        register(input) {
            if(input && !this.inputs.includes(input)) this.inputs.push(input);

        },
        validate() {
            let messages = [];
            
            this.inputs.forEach(child => {
                const message = child.validate();
                if(message) messages.push(message);
            });
           
            return messages.length > 0 ? messages : null;
        }
    }
}
</script>