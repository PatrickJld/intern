<template>
    <div class="h-auto min-h-screen w-full text-white flex overflow-hidden">
        <div class="bg-foreground-4-200 rounded-r-3xl h-screen w-16 px-1 py-5 hover:w-1/6 hover:px-6 duration-300 flex flex-col group">
            <div class="my-2 py-2 flex flex-col items-center bg-background-400 rounded-full mb-7 group-hover:mb-2">
                <img src="../../assets/logo_only.png" alt="" class="w-8 m-auto group-hover:mb-2">
                <!-- <div class="flex justify-center">
                    <div class="text-center my-3 py-2 w-full ">
                        <img src="../../assets/logo.png" alt="" class="w-32 inline-block">
                    </div>
                </div> -->
                <img src="../../assets/text_only.png" alt="" class="w-24 m-auto hidden transition group-hover:block">
            </div>
            <router-link to="/admin">
                <div class="relative">
                    <div class="hover:bg-background-200 hover:text-black font-bold rounded-xl cursor-pointer pl-3.5 pr-4 py-3 mb-2 flex items-center menu" id="menu-home"
                        :class="{'bg-background-200': menu=='dashboard', 'text-black':menu=='dashboard'}"
                        @click="menu='dashboard'">
                        <i class="w-1/12 mr-5 fa fa-house text-2xl"></i>
                        <span class="ml-0.5 opacity-0 transition group-hover:opacity-100">Dasbor</span>
                    </div>
                </div>
            </router-link>
            
            <router-link to="/admin/registrant">
                <div class="relative">
                    <div class="hover:bg-background-200 hover:text-black font-bold rounded-xl cursor-pointer px-4 py-3 mb-2 flex items-center menu" id="menu-registrant"
                        :class="{'bg-background-200': menu=='registrant', 'text-black': menu=='registrant'}"
                        @click="menu='registrant'">
                        <i class="w-1/12 mr-5 fa fa-user text-2xl"></i>
                        <span class="opacity-0 transition duration-300 group-hover:opacity-100">Pendaftar</span>
                    </div>
                </div>
            </router-link>

            <router-link to="/admin/test">
                <div class="relative">
                    <div class="hover:bg-background-200 hover:text-black font-bold rounded-xl cursor-pointer px-4 py-3 mb-2 flex items-center menu" id="menu-test"
                        :class="{'bg-background-200': menu=='test', 'text-black':menu=='test'}"
                        @click="menu='test'">
                        <i class="w-1/12 mr-5 fa fa-tasks text-2xl"></i>
                        <span class="opacity-0 transition duration-300 group-hover:opacity-100">Tes</span>
                    </div>
                </div>
            </router-link>
            
            <router-link to="/admin/session">
                <div class="relative">
                    <div class="hover:bg-background-200 hover:text-black font-bold rounded-xl cursor-pointer px-4 py-3 mb-2 flex items-center menu" id="menu-session"
                        :class="{'bg-background-200': menu=='session', 'text-black':menu=='session'}"
                        @click="menu='session'">
                        <i class="w-1/12 mr-5 fas fa-calendar-alt text-2xl"></i>
                        <span class="opacity-0 transition duration-300 group-hover:opacity-100">Sesi</span>
                    </div>
                </div>
            </router-link>
            
            <router-link to="/admin/recruitment" class="grow">
                <div class="relative">
                    <div class="hover:bg-background-200 hover:text-black font-bold rounded-xl cursor-pointer px-4 py-3 mb-2 flex items-center menu" id="menu-recruitment"
                        :class="{'bg-background-200': menu=='recruitment', 'text-black':menu=='recruitment'}"
                        @click="menu='recruitment'">
                        <i class="w-1/12 mr-5 fas fa-users text-2xl relative right-1"></i>
                        <span class="opacity-0 transition duration-300 group-hover:opacity-100">Rekrutmen</span>
                    </div>
                </div>
            </router-link>

            <div @click="logout">
                <div class="relative">
                    <div class="hover:bg-background-200 hover:text-black font-bold rounded-xl cursor-pointer px-4 py-3 flex items-center">
                        <i class="w-1/12 mr-5 fas fa-sign-out-alt text-2xl"></i>
                        <span class="opacity-0 transition duration-300 group-hover:opacity-100">Logout</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 
            Test -> Section -> Question
            Registrant
            Exam_session -> Section_result   -> question_result -> sementara tidak perlu
                                                -> review essay
        -->

        <div class="relative w-full h-screen text-black">
            <div class="w-full py-5 px-10 flex justify-between font-bold text-white text-2xl">
                <p >Hi, Admin</p>
                <p >{{timestamp||""}}</p>
            </div>
            <div class="overflow-auto h-screen w-full relative mt-2">
                <!-- <div class="overflow-hidden absolute w-full h-72 -z-10">
                    <svg viewBox="0 0 500 150" preserveAspectRatio="none" class="h-full w-full">
                        <path d="M0.00,92.27 C216.83,192.92 304.30,8.39 500.00,109.03 L500.00,0.00 L0.00,0.00 Z" class="fill-foreground-4-50"></path>
                    </svg>
                </div> -->
                <div class="w-5/6 m-auto py-8 flex justify-between">
                    <h1 class="text-4xl font-bold">{{header}}</h1>
                </div>
                <router-view @updateHeader="updateHeader" @updateMenu="updateMenu"/>
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
    data(){
        return {
            header: null,
            timerWaktu: null,
            timestamp: null,
            menu: 'dashboard',
            month: ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],
            day: ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"],
        }
    },
    methods:{
        updateHeader(header){
            this.header = header
        },
        updateMenu(menu){
            this.menu = menu
        },
        getNow() {
            const today = new Date()
            const date = this.day[today.getDay()] + ", " + ('00'+today.getDate()).slice(-2) + " " + this.month[today.getMonth()] + " " + today.getFullYear()
            const time = ('00'+today.getHours()).slice(-2) + ":" + ('00'+today.getMinutes()).slice(-2) + ":" + ('00'+today.getSeconds()).slice(-2)
            const dateTime = date + ' ' + time
            this.timestamp = dateTime
        },
        
        logout(){
            Swal.fire({
                title: 'Yakin Ingin Logout?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await axios.post("/auth/logout", {
                        // session_id: this.$cookies.get('data_registrant').exam_session
                    }, { withCredentials: true });

                    axios.defaults.headers.common['Authorization'] = '';
                    this.$cookies.remove('refresh_token')
                    this.$cookies.remove('data_registrant')
                    localStorage.clear();

                    window.location="/"
                }
            });
        },
    },
    created() {
        this.$emit('updateJudul', 'Hi, Admin!')
        this.timerWaktu = setInterval(() => {
            this.getNow()
        }, 1000)
    },
    mounted(){
        let path = this.$route.fullPath.split('/')
        this.menu = path[path.length-1]=="admin" ? 'dashboard' : path[path.length-1]
        // $('#main-header').addClass('fixed')
        // $('#main-header').addClass('w-full')
    }
}
</script>

<style>

</style>