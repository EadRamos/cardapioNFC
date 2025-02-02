<template>
    <div id="loginPG">
        
        <div 
        :class="[
            'shadow',
            {'round': !mobile},
            mobile ? 'cardLoginMobile center-v colum' : 'cardLoginDesktop'
        ]">
            <div
            :class="['header', 'center']"
            style="position: relative; background: var(--gradient-primary); height: 40%;">
                <pop-btn
                :icon="'fa-solid fa-angle-left'"
                style="position: absolute; left: 2rem; top: 2rem"/>
                <h1 :style="{fontSize: mobile ? '3rem' : ''}">LOGIN</h1>
            </div>

            <base-input 
            ref="baseInputLogin"
            :class="['full', 'colum', mobile ? 'center-v' :  'center']"
            :style="{gap: '2rem', padding: '2rem', paddingTop: mobile ? '20%' : '4rem'}">
                <input-login
                :placeholder="'Digite seu login...'"
                :required="true"
                :label="'Login'"
                :rules="[
                    (v) => v ? null : 'Campo obrigátorio.',
                    (v) => v?.length > 4 ? null : 'Campo necessita de 5 caracteres.'
                ]"/>
                
                <input-login
                :placeholder="'Digite sua senha...'"
                :required="true"
                :label="'Senha'"/>

                <simple-message :messages="error" :exit="() => error = []"/>

                <btn
                @click="login"
                :type="mobile ? 'full' : 'half'"
                :text="'Confirmar'"
                :icon="'fa-solid fa-right-to-bracket fa-flip'"
                :color="'gradientPrimary'"
                style="align-self: end;"/>
            </base-input>
        </div>
    </div>
</template>
<script>
import Input from '@/components/inputs/Input.vue';
import Select from '@/components/inputs/Select.vue';
import BaseInput from '@/components/inputs/BaseInput.vue';
import Button from '@/components/buttons/Button.vue';
import PopButton from '@/components/buttons/PopButton.vue';
import SimpleCardMessage from '@/components/messages/SimpleCardMessage.vue';

export default {
    name: 'LoginPG',
    components: {
        'input-login': Input,
        'base-input': BaseInput,
        'btn': Button,
        'pop-btn': PopButton,
        'simple-message': SimpleCardMessage,
        'select-login': Select,
    },
    data() {
        return {
            error: [],
        };
    },
    methods: {
        login() {
            const errors = this.$refs.baseInputLogin.validate();
            
        }
    }
}
</script>
<style>
#loginPG {
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: var(--color-secundary);
    color: var(--color-primary-inverse);
}

.cardLoginMobile {
    width: 100%;
    height: 100%;
}
.cardLoginDesktop {
    width: 60%;
    min-width: 45rem;
    max-width: 80rem;
    height: auto;

    background-color: var(--color-primary);
}
.cardLoginDesktop, .cardLoginMobile {
    overflow: hidden;
}
</style>