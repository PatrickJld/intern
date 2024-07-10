<template>
    <div class="w-full flex justify-center">
        <div class="w-5/6 h-full">
            <div class="flex justify-center gap-10 text-white text-center">
                <router-link to="/admin/registrant" class="w-3/12 h-96 bg-foreground-4-200 rounded-xl shadow-xl  py-10 px-5">
                    <i class="fa fa-user text-8xl"></i>
                    <p class="font-bold text-3xl my-3">Master Pendaftar</p>
                    <p class="font-bold">
                        Master Pendaftar adalah halaman untuk melihat data hasil tes, biodata, dan laporan dari setiap pelamar kerja
                    </p>
                </router-link>
                <router-link to="/admin/test" class="w-3/12 h-96 bg-foreground-4-200 rounded-xl shadow-xl py-10 px-5">
                    <i class="fa fa-tasks text-8xl"></i>
                    <p class="font-bold text-3xl my-3">Master Tes</p>
                    <p class="font-bold">
                        Master Tes adalah halaman untuk mengelola (melihat, memperbarui, maupun menghapus) data tes, persoalan, dan pertanyaan
                    </p>
                </router-link>
                <router-link to="/admin/session" class="w-3/12 h-96 bg-foreground-4-200 rounded-xl shadow-xl py-10 px-5">
                    <i class="fas fa-calendar-alt text-8xl"></i>
                    <p class="font-bold text-3xl my-3">Master Sesi</p>
                    <p class="font-bold">
                        Master Sesi adalah halaman untuk mengelola (melihat dan memperbarui) data sesi pengerjaan tes, termasuk tes yang diberikan
                    </p>
                </router-link>
                
                <router-link to="/admin/recruitment" class="w-3/12 h-96 bg-foreground-4-200 rounded-xl shadow-xl py-10 px-5">
                    <i class="fa fa-users text-8xl"></i>
                    <p class="font-bold text-3xl my-3">Master Rekrutmen</p>
                    <p class="font-bold">
                        Master Rekrutmen adalah halaman untuk mengelola (melihat, memperbarui, maupun menghapus) data lowongan kerja dan pelamar kerja
                    </p>
                </router-link>
            </div>

            <!-- <div class="w-full h-96 bg-foreground-4-200 text-white rounded-xl shadow-xl inline-block relative top-10 py-5 px-5">
                <p class="font-bold text-3xl text-left">Some Kind of Graph</p>
            </div> -->
            
            <h1 class="font-bold text-4xl mt-10">Persoalan yang baru saja diselesaikan</h1>
            <div class="overflow-auto w-full h-auto max-h-[30rem] no-scrollbar mt-5 rounded-lg shadow-xl">
                <table class="table-fixed w-full font-semibold">
                    <thead class="bg-foreground-4-100 text-white sticky top-0">
                        <tr>
                            <th class="w-1/12 py-3">No.</th>
                            <th class="w-2/12">E-Mail</th>
                            <th class="w-3/12">Persoalan</th>
                            <th class="w-3/12">Mulai</th>
                            <th class="w-3/12">Selesai</th>
                        </tr>
                    </thead>
                    <tbody v-if="this.section_result!=null && this.section_result.length>0">
                        <tr class="text-center odd:bg-foreground-4-50 even:bg-foreground-4-10" v-for="(i,idx) in this.section_result" :key="i">
                            <td class="py-2">{{idx+1}}.</td>
                            <td>{{i.email}}</td>
                            <td>{{i.section}}</td>
                            <td>{{toDate(i.start_date)}}</td>
                            <td>{{toDate(i.finish_date)}}</td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr class="text-center bg-foreground-4-50 text-xl">
                            <td colspan="5" class="py-5">Belum ada data tersedia</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="w-1 h-64 relative top-10">
            
            </div>
        </div>
    </div>
    
</template>

<script>
import axios from 'axios'
export default {
    components: {
        axios
    },
    data() {
        return {
            section_result: null,
            port: import.meta.env.VITE_BACKEND_URL
        }
    },
    created() {
        this.$emit('updateHeader', 'Home')
    },
    methods: {
        toDate(timeString){
            const waktu = new Date(timeString)
            const date = ('00'+waktu.getDate()).slice(-2) + "/" + ('00'+(waktu.getMonth()+1)).slice(-2) + "/" + waktu.getFullYear()
            const time = ('00'+waktu.getHours()).slice(-2) + ":" + ('00'+waktu.getMinutes()).slice(-2)
            const dateTime = date + ' ' + time
            return dateTime
        },
    },
    mounted(){
        axios
        .get(this.port+"/section_result/getLatest")
        .then(({data}) => (
            this.section_result = data
        ))
    }
}
</script>

<style>

</style>