<template>
    <main class="main-wrapper container">
        <Spinner v-if="isLoading" />
        <Alert class="mb-6" v-if="userError" :message="userError" title="Error Signing Up User" type="error" />

        <section v-if="!userError && !isLoading">
            <Alert class="mb-6" @closeAlert="closeAlert" v-if="deleteError" :message="deleteError" :useClose="true" title="Error Signing Up User" type="error" />

            <h1 class="text-4xl">Settings</h1>

            <div class="mt-12">
                <h2 class="text-2xl">Account Details</h2>
                
                <p>Created at: {{ formateCreatedAt(user.createdAt) }}</p>
            </div>

            <div class="mt-10">
                <div class="form-group my-6">
                    <label for="username" class="form-label inline-block mb-2 text-gray-700 font-bold">Username</label>
                    <input type="email" class="
                        block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border-2 border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-amber-500 focus:outline-none"
                        id="username"
                        name="username"
                        :placeholder="user.username"
                        disabled>
                </div>

                <div class="form-group my-6">
                    <label for="email" class="form-label inline-block mb-2 text-gray-700 font-bold">Email</label>
                    <input type="email" class="
                        block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border-2 border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-amber-500 focus:outline-none"
                        id="email"
                        name="email"
                        :placeholder="user.email"
                        disabled>
                </div>
            </div>

            <div class="mt-10">
                <Button @click="handleDelete" class="!bg-red-600">Delete Account</Button>
            </div>
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import { useRouter, Router } from 'vue-router'
import axios, { AxiosRequestConfig } from 'axios'

import { useStore } from '@/store/store'

import Spinner from '@/components/Spinner.vue'
import Button from '@/components/Button.vue'
import FormContainer from '@/components/forms/FormContainer.vue'
import FormInput from '@/components/forms/FormInput.vue'
import Alert from '@/components/Alert.vue'

import getUser from '@/composables/getUser'

import IUser from '../../../src/interfaces/IUser'
import MutationTypes from '../enums/mutationTypes'

export default defineComponent({
    name: 'Settings',
    components: {
        Spinner,
        Button,
        FormContainer,
        FormInput,
        Alert
    },
    setup(): object {
        const router: Router = useRouter()

        const store = useStore()

        const {
            data,
            error:userError,
            isLoading,
            load
        } = getUser()

        const deleteError: Ref = ref<string>()

        const formateCreatedAt: Function = (date: Date): string => {
            const months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

            date = new Date(date)

            const day: number = date.getDate()
            const month: string = months[date.getMonth()]
            const year: number = date.getFullYear()

            const result: string = `${day} ${month}, ${year}`

            return result
        }

        const handleDelete: Function = async (): Promise<void> => {
            const userID: string = data.value._id
            const token = store.state.user.token

            const reqConfig: AxiosRequestConfig = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                await axios.delete('/api/users/' + userID, reqConfig)

                store.commit(MutationTypes.RESET_AUTH, null)

                router.push({ name: 'Signup', params: {
                    redirectMsg: 'Your account has successfully been deleted',
                    redirectType: 'success',
                    redirectTitle: 'Account Deleted'
                }})
            } catch (err) {
                console.log(err)
                deleteError.value = 'Unable to delete account'
            }
        }

        const closeAlert: Function = (): void => {
            deleteError.value = ''
        }

        load()

        return {
            user: data as IUser,
            userError,
            deleteError,
            isLoading,
            load,
            formateCreatedAt,
            handleDelete,
            closeAlert
        }
    }
})
</script>