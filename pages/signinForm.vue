<template>
    <main class="min-h-screen bg-[#0c0c0c]">
        <section class="px-4 py-3 min-h-screen flex items-center justify-center">
            <form @submit.prevent="handleLoginUser()"
                class="mx-auto mt-10 flex w-full flex-col rounded-lg p-8 shadow-lg md:mt-0 md:w-1/2 lg:w-2/6">
                <h2 class="text-[#9B7029] mb-5 font-raleway font-semibold text-3xl">Login</h2>
                <div class="relative mb-4">
                    <label for="email" class="block mb-1 font-medium text-white font-montserrat text-lg">Email:</label>
                    <div class="relative">

                        <input v-model="formData.email" type="email" id="email" name="email" @change="valid.email.$touch"
                            class="text-white font-medium text-md font-montserrat focus:ring-0 focus:ring-offset-0 rounded-sm w-full bg-[#212121] outline-none border border-1 !border-[#565454] p-3 focus:!shadow-none"
                            :class="{
                                'border-red-500 focus:border-red-500': valid.email.$error,
                                'border-[#42d392] ': !valid.email.$invalid,
                            }" placeholder="Enter Your Email...">

                        <Icon v-if="!valid.email.$invalid || valid.email.$error"
                            class="absolute right-2 h-full text-xl text-green-500"
                            :class="{ 'text-green-500': !valid.email.$invalid, 'text-yellow-500': valid.email.$error }"
                            :name="`heroicons-solid:${!valid.email.$error ? 'check-circle' : 'exclamation'}`" />
                    </div>
                    <p class="text-red-500" v-if="valid.email.$error"> {{ valid.email.required.$message }}</p>
                </div>
                <div class="relative mb-4">
                    <label for="password"
                        class="block mb-1 font-medium text-white font-montserrat text-lg">Password:</label>
                    <div class="relative">
                        <input v-model="formData.password" type="password" id="password" name="password"
                            @change="valid.password.$touch" :class="{
                                'border-red-500 focus:border-red-500': valid.password.$error,
                                'border-[#42d392] ': !valid.password.$invalid,
                            }" placeholder="Enter Your Password..."
                            class="text-white font-medium text-md font-montserrat focus:ring-0 focus:ring-offset-0 rounded-sm w-full bg-[#212121] outline-none border border-1 !border-[#565454] p-3 focus:!shadow-none">
                    </div>
                    <p class=" text-red-500" v-if="valid.password.$error"> {{ valid.password.required.$message }}</p>
                </div>
                <button type="submit" :disabled="valid.$invalid"
                    class="bg-[#9B7029] disabled:opacity-60 disabled:cursor-not-allowed disabled:text-opacity-60 text-white text-xl rounded-sm min-h-[50px] font-raleway font-semibold text-center block w-full">
                    <span v-if="!isLoading">Sign In</span>
                    <span v-else>Loading...</span>
                </button>
                <router-link class="text-[#9B7029] text-sm mt-4 text-center hover:text-[#FFFF]" to="/">Go To Home
                    Page ?</router-link>

            </form>
        </section>
    </main>
</template>

<script setup>
import AuthServices from "@/services/auth/auth"
import { authStore } from '~/store/auth';

import { required, email, minLength, helpers } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';


definePageMeta({
    layout: "signinLayout",
});

const router = useRouter();
const store = authStore()
const isLoading = ref(false)
const formData = reactive({
    email: '',
    password: '',
});

// Add validation For check Email and Password
const validation = computed(() => {
    return {
        email: {
            required: helpers.withMessage('This Field is Required', required),
            email: helpers.withMessage('Invalid email', email),
        },
        password: {
            required: helpers.withMessage('This Field is Required', required),
            minLength: minLength(6),
        },
    };
});
const valid = useVuelidate(validation, formData);
const handleLoginUser = () => {
    isLoading.value = true;
    valid.value.$validate();
    let payload = {
        device_os: "Windows 10",
        device_type: "browser",
        "email": formData.email,
        "password": formData.password,
        uniq_device_id: "6cufu3uj9kh0cekps14f4obve22lmam7m3q"
    }
    if (!valid.value.$error) {
        AuthServices.handleLoginApi(payload).then((response) => {

            store.isAuthenticated = true;
            authStore().handleSetToken(response.data.auth_token)
            store.handleAddUser(response.data.data)
            isLoading.value = false

            router.push('/favoriteList')
        })
            .catch((error) => {
                isLoading.value = false
                console.error('Axios error:', error);
            });
    } else {
        isLoading.value = false
    }
}

</script>
<style scoped></style>