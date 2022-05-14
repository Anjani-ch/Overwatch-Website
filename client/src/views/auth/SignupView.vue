<template>
    <main class="main-wrapper container">
        <section v-if="showTwoFactorInfo">
            <div class="bg-white max-w-2xl mx-auto px-6 py-5 rounded-lg shadow-xl">
                <img class="block mx-auto w-2/3" :src="twoFactorInfo.img" alt="qrcode-img">

                <p class="text-center mb-1">Secret:</p>
                <p class="text-center mb-4">{{ twoFactorInfo.secret }}</p>

                <Button @click="finishSignup" class="w-full">
                    Continue to login
                </Button>
            </div>
        </section>

        <FormContainer v-else @submit.prevent="handleSignup($event)">
            <Alert class="mb-6" @closeAlert="closeAlert" v-if="error" :message="error" :useClose="true" title="Error Signing Up User" type="error" />

            <h1 class="text-3xl">Signup</h1>

            <FormInput id="username" labelText="Username" type="text" placeholder="Enter Username" />
            <FormInput id="email" labelText="Email address" type="text" placeholder="Enter Email" />
            <FormInput id="password" labelText="Password" type="password" placeholder="Enter Password" />
            <FormInput id="confirmPassword" labelText="Confirm Password" type="password" placeholder="Confirm Password" />

            <div class="form-check form-switch mb-7">
                <input @click="toggleTwoFactor" class="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm" type="checkbox" role="switch" id="twoFactor">
                <label class="form-check-label inline-block ml-1 text-gray-800" for="twoFactor">Enable Two Factor</label>
            </div>

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
import { defineComponent, Ref, ref, reactive } from 'vue'
import { useRouter, Router } from 'vue-router'

import { useStore } from '@/store/store'

import FormContainer from '@/components/forms/FormContainer.vue'
import FormInput from '@/components/forms/FormInput.vue'
import Button from '@/components/Button.vue'
import Alert from '@/components/Alert.vue'
import Spinner from '@/components/Spinner.vue'

import SignupData from '@/types/auth/SignupData'
import ActionTypes from '@/enums/actionTypes'
import IUser from '@/interfaces/IUser'

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

        const twoFactorRef: Ref = ref<string>('off')
        const error: Ref = ref<string>('')
        const isLoading: Ref = ref<boolean>(false)
        const showTwoFactorInfo: Ref = ref<boolean>(false)
        const twoFactorInfo = reactive<any>({ secret: null, img: null })

        const toggleTwoFactor: Function = (): void => {
            if(twoFactorRef.value === 'on') {
                twoFactorRef.value = 'off'
            } else {
                twoFactorRef.value = 'on'
            }
        }

        const finishSignup: Function = (): void => {
            router.push({ name: 'Login', params: {
                redirectMsg: 'You are now signed up, and can log in',
                redirectType: 'success',
                redirectTitle: 'Account Created'
            }})
        }

        const handleSignup: Function = async (e: Event): Promise<void> => {
            const { username, email, password, confirmPassword } = e.target as any

            error.value = ''
            isLoading.value = true

            const data: SignupData = {
                username: username.value,
                email: email.value,
                password: password.value,
                confirmPassword: confirmPassword.value,
                twoFactor: twoFactorRef.value
            }

            try {
                const user = await store.dispatch(ActionTypes.SIGNUP_USER, data)

                if(data.twoFactor === 'on') {
                    const { base32, otpauth_url } = user.twoFactor

                    showTwoFactorInfo.value = true
                    twoFactorInfo.secret = base32
                    twoFactorInfo.img = otpauth_url
                } else {
                    finishSignup()
                }
            } catch(err: any) {
                const errMsg: string = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()

                error.value = errMsg
            } finally {
                isLoading.value = false
            }
        }

        const closeAlert: Function = (): void => {
            error.value = ''
        }

        return {
            error,
            isLoading,
            toggleTwoFactor,
            handleSignup,
            closeAlert,
            showTwoFactorInfo,
            twoFactorInfo,
            finishSignup
        }
    }
})
</script>