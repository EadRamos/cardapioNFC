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
                style="position: absolute; left: 2rem; top: 2rem"
                @click="$router.push({path: '/'})"/>
                <h1 :style="{fontSize: mobile ? '3rem' : ''}">LOGIN</h1>
            </div>

            <base-input 
            ref="baseInputLogin"
            :class="['full', 'colum','center']"
            :style="{gap: '2rem', padding: '2rem'}">
                <input-login
                v-if="isCadastre"
                :placeholder="'Digite o nome...'"
                :required="true"
                :label="'Nome'"
                :rules="[
                    (v) => v ? null : 'Campo obrigátorio.',
                    (v) => v?.length > 4 ? null : 'Campo com minímo de 5 caracteres.'
                ]"
                :returnInput="(v) => nome = v"/>

                <input-login
                :placeholder="'Digite o login...'"
                :required="true"
                :label="'Login'"
                :rules="[
                    (v) => v ? null : 'Campo obrigátorio.',
                    (v) => v?.length > 4 ? null : 'Campo com minímo de 5 caracteres.'
                ]"
                :returnInput="(v) => login = v"/>
                
                <input-login
                :placeholder="'Digite a senha...'"
                :required="true"
                :label="'Senha'"
                :rules="[
                    (v) => v ? null : 'Campo obrigárotio.',
                    (v) => v?.length > 7 ? null : 'A senha deve ter no minímo 8 caracteres.'
                ]"
                :returnInput="(v) => senha = v"/>

                <input-login
                v-if="isCadastre"
                :placeholder="'Confirme a senha...'"
                :required="true"
                :label="'Confirmar senha'"
                :rules="[
                    (v) => v ? null : 'Campo obrigárotio.',
                    (v) => v == senha ? null : 'Senhas não conferem.'
                ]"/>

                <select-login
                v-if="isCadastre"
                label="Tipo de usuário"
                :minimal="false"
                :values="['chef', 'waiter', 'admin']"
                :valueSelect="(v) => tipo = v"/>

                <simple-message v-if="error.length" :messages="error" :exit="() => error = []"/>

                <btn
                @click="isCadastre ? loginPush() : cadastro()"
                :type="mobile ? 'full' : 'half'"
                text="Confirmar"
                :icon="'fa-solid fa-right-to-bracket fa-flip'"
                :color="'gradientPrimary'"
                style="align-self: end;"/>

                <btn
                
                @click="isCadastre = !isCadastre"
                :type="mobile ? 'full' : 'half'"
                :text="isCadastre ? 'Login' : 'Cadastrar'"
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

import authStore from '@/store/auth.js';

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
        const auth = authStore();
        return {
            auth,
            error: [],
            isCadastre: false,
            nome: null,
            login: null,
            tipo: null,
            senha: null
        };
    },
    methods: {
        async loginPush() {
            const errors = this.$refs.baseInputLogin.validate();

            if (errors?.length == 0) {
                try {
                    const response = this.auth.login({
                        login: this.login,
                        password: this.senha
                    });
                    if(response) {
                        this.$router.push('/');
                    }
                } catch (error) {
                    this.error.push('Houve um erro interno ao efetuar login.');
                    console.error('Error de login: ', error);
                }
            }
            
        },
        async cadastro() {
            const errors = this.$refs.baseInputLogin.validate();

            if (errors?.length == 0) {
                try {
                    const response = await axios.push('/cadastro', {
                        login: this.login,
                        name: this.nome,
                        password: this.senha,
                        type: this.tipo
                    });

                    if(response){
                        const logado = this.auth.login({
                            login: this.login,
                            password: this.senha
                        });
                        if(logado) {
                            this.$router.push('/');
                        }
                    }
                } catch (error) {
                    console.log(error.response);
                    if(error.response?.message){
                        this.erro.push(error.response.message);
                    } else {
                        this.erro.push('Houve um erro interno ao cadastrar usuário.');
                    }
                }
            }
        }
    }
}
</script>
<style>
#loginPG {
    width: 100%;
    height: 100%;
    min-height: 100vh;

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