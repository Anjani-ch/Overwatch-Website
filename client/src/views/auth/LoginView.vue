<template>
    <main class="main-wrapper container">
        <FormContainer @submit.prevent="handleLogin($event)">
            <Alert class="mb-6" @closeAlert="closeAlert" v-if="redirectMsgRef" :message="redirectMsgRef" :useClose="true" :title="redirectTitleRef" :type="redirectTypeRef" />
            <Alert class="mb-6" @closeAlert="closeAlert" v-if="error" :message="error" :useClose="true" title="Error Loging In" type="error" />

            <h1 class="text-3xl">Login</h1>

            <FormInput id="email" labelText="Email address" type="text" placeholder="Enter Email" />
            <FormInput id="password" labelText="Password" type="password" placeholder="Enter Password" />

            <Spinner class="mb-4" v-if="isLoading" />

            <Button type="submit" class="w-full">
                Login
            </Button>

            <p class="text-center mt-6 font-bold">
                Don't have an account? <router-link :to="{ name: 'Signup' }" class="text-blue-700">Signup</router-link>
            </p>
        </FormContainer>
    </main>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'
import { useRoute, useRouter, Router } from 'vue-router'

import { useStore } from '@/store/store'

import FormContainer from '@/components/forms/FormContainer.vue'
import FormInput from '@/components/forms/FormInput.vue'
import Button from '@/components/Button.vue'
import Alert from '@/components/Alert.vue'
import Spinner from '@/components/Spinner.vue'

import ActionTypes from '@/enums/actionTypes'

export default defineComponent({
    name: 'Login',
    components: {
        FormContainer,
        FormInput,
        Button,
        Alert,
        Spinner
    },
    setup(): object {
        const router: Router = useRouter()
        const { params: { redirectMsg, redirectType, redirectTitle } } = useRoute()

        const store = useStore()

        const redirectMsgRef: Ref = ref<string>('')
        const redirectTypeRef: Ref = ref<string>('')
        const redirectTitleRef: Ref = ref<string>('')
        const error: Ref = ref<string>('')
        const isLoading: Ref = ref<boolean>(false)

        if(redirectMsg) {
            redirectMsgRef.value = redirectMsg
            redirectTypeRef.value = redirectType
            redirectTitleRef.value = redirectTitle
        }

        const handleLogin: Function = async (e: Event) => {
            const { email, password } = e.target as any

            redirectMsgRef.value = ''
            isLoading.value = true

            try {
                await store.dispatch(ActionTypes.LOGIN_USER, {
                    email: email.value,
                    password: password.value
                })

                router.push({ name: 'Home' })
            } catch (err: any) {
                const errMsg: string = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()

                error.value = errMsg
            } finally {
                isLoading.value = false
            }
        }

        const closeAlert: Function = () => {
            redirectMsgRef.value = ''
            error.value = ''
        }

        return {
            handleLogin,
            redirectMsgRef,
            redirectTypeRef,
            redirectTitleRef,
            closeAlert,
            error,
            isLoading
        }
    }
})
</script>