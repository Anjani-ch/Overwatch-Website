<template>
    <main class="main-wrapper container">
        <FormContainer @submit.prevent="handleSignup($event)">
            <Alert class="mb-6" @closeAlert="closeAlert" v-if="error" :message="error" :useClose="true" title="Error Signing Up User" type="error" />

            <h1 class="text-3xl">Signup</h1>

            <FormInput id="username" labelText="Username" type="text" placeholder="Enter Username" />
            <FormInput id="email" labelText="Email address" type="text" placeholder="Enter Email" />
            <FormInput id="password" labelText="Password" type="password" placeholder="Enter Password" />
            <FormInput id="confirmPassword" labelText="Confirm Password" type="password" placeholder="Confirm Password" />

            <Spinner class="mb-4" v-if="isLoading" />

            <Button type="submit" class="w-full" :disabled="isLoading">
                Signup
            </Button>

            <p class="text-center mt-6 font-bold">
                Already have an account? <router-link :to="{ name: 'Login' }" class="text-blue-700">Login</router-link>
            </p>
        </FormContainer>
    </main>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import { useRouter, Router } from 'vue-router'

import { useStore } from '@/store/store'
import ActionTypes from '@/enums/actionTypes'

import FormContainer from '@/components/forms/FormContainer.vue'
import FormInput from '@/components/forms/FormInput.vue'
import Button from '@/components/Button.vue'
import Alert from '@/components/Alert.vue'
import Spinner from '@/components/Spinner.vue'

export default defineComponent({
    name: 'Signup',
    components: {
        FormContainer,
        FormInput,
        Button,
        Alert,
        Spinner
    },
    setup(): object {
        const store = useStore()
        const router: Router = useRouter()

        const error: Ref = ref<string>('')
        const isLoading: Ref = ref<boolean>(false)

        const handleSignup: Function = async (e: Event): Promise<void> => {
            const { username, email, password, confirmPassword } = e.target as any

            error.value = ''
            isLoading.value = true

            try {
                await store.dispatch(ActionTypes.SIGNUP_USER, {
                    username: username.value,
                    email: email.value,
                    password: password.value,
                    confirmPassword: confirmPassword.value
                })

                router.push({ name: 'Login', params: {
                    redirectMsg: 'You are now signed up, and can log in',
                    redirectType: 'error',
                    redirectTitle: 'Account Created'
                }})
            } catch(err: any) {
                const errMsg: string = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()

                error.value = errMsg
            } finally {
                isLoading.value = false
            }
        }

        const closeAlert: Function = () => {
            error.value = ''
        }

        return {
            error,
            isLoading,
            handleSignup,
            closeAlert
        }
    }
})
</script>