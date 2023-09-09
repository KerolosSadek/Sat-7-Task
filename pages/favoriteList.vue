<template>
    <div class=" min-h-screen container mx-auto px-5 py-24 bg-[#0c0c0c]">
        <h1 class="text-2xl text-[#9B7029] font-bold mb-4 text-center">Favorites List Page</h1>
        <div class="flex justify-between align-middle">
            <button
                class="bg-[#9B7029] text-white text-xl rounded-md border border-[#9B7029] min-h-[50px] font-raleway font-semibold block
                hover:bg-transparent hover:text-[#9B7029] hover:border-[#9B7029] hover:border-solid transition-all duration-300 px-4 mb-4">
                <router-link class="text-white text-xl mb-4" to="/"><img src="@/public/home.svg"
                    alt="Home"
                    class="w-6 h-6 inline-block mr-2 mb-1"
                    /> Go To Home
                    Page</router-link>
            </button>
        </div>

        <template v-if="projects && !isLoading">
            <Swiper :slides-per-view="3" :space-between="10" :modules="modules" :pagination="{
                clickable: true,

            }">
                <swiper-slide class="swiper-slide pb-12" v-for="project in projects" :key="project.id">
                    <div class="card overflow-hidden border border-[#9B7029] rounded-lg shadow-lg p-4">
                        <h2 class="text-xl font-semibold text-[#c9c2c2] mb-6 mt-2">{{ project.title }}</h2>
                        <img :src="project.image" class="mt-2 rounded-lg w-full h-auto">
                        <p class="mt-2 description text-[#8b8b8b]">{{ truncateDescription(project.description) }}</p>
                    </div>
                </swiper-slide>
            </Swiper>
        </template>
        <template v-else>
            <div class="d-flex justify-center text-center mt-8 text-[#9B7029]">
                <loading-indicator :isLoading="isLoading" />
            </div>
        </template>
    </div>
</template>


<script setup lang="ts">
import FavoritesServices from "@/services/favorites/favorites"
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { ref, onMounted } from "vue"
import LoadingIndicator from '~/components/LoadingIndicator.vue';

const modules = [Navigation, Pagination, Scrollbar, A11y]
const projects = ref([]) as any
const isLoading = ref(false)

const getFavoriteList = async () => {
    isLoading.value = true
    await FavoritesServices.favProjApi().then((res: any) => {
        projects.value = res.blocks[0].projects
        isLoading.value = false
    }).catch((err: any) => {
        console.log("error", err);
        isLoading.value = false
    })
}

const truncateDescription = (description: any) => {
    const maxLength = 200;
    if (description.length <= maxLength) {
        return description;
    } else {
        return description.slice(0, maxLength) + '...';
    }
}

getFavoriteList()

</script>

<style scoped></style>