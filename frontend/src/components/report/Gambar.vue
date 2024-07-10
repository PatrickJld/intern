<template>
    <div class="flex items-center w-full bg-foreground-4-100 px-4 py-2">
        <!-- <img src="../../assets/logo.png" alt="" class="w-14 h-10"> -->
        <div class="text-center bg-background-400 rounded-xl flex items-center px-1 h-12">
            <img src="../../assets/logo.png" alt="" class="w-14 h-10">
        </div>
        <div class="text-white text-center w-full relative bottom-2">
            <p class="font-bold text-sm">PT. Adiputro Wirasejati</p>
            <div class="text-[0.6rem]">
                <p>Jl. Raya Balearjosari no. 35, Malang, Jawa Timur - Indonesia 65126</p>
                <p>+62 (0) 341 491 139 | Adiputrogroup.com</p>
            </div>
        </div>
    </div>
    <div class="px-2 py-1">
        <div class="flex justify-between items-center relative">
            <h1 class="font-bold">Hasil Tes Gambar {{judul}}</h1>
            <div class="flex">
                <div class="font-bold text-sm">
                    <p>Nama :</p>
                </div>
                <div class="ml-3 text-sm">
                    <p>{{this.nama}}</p>
                </div>
            </div>
        </div>
        
        <!-- <div class="h-full w-full flex justify-center" v-if="link!=null"> -->
        <div class="h-full w-full flex justify-center">
            <img :src="this.data" alt="" class="w-11/12" @load="loaded">
        </div>
    </div>
</template>

<script>
export default {
    props: {
        "data": { type: String, default: "", required: true },
        "nama": { type: String, default: "", required: true },
        "judul": { type: String, default: "", required: true }
    },
    data() {
        return {
            link: null
        }
    },
    methods: {
        loaded(){
            // console.log("asd")
        }
    },
    mounted() {
        this.link = this.data
    },
}
</script>

<style>

</style>