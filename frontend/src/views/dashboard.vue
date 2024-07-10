<template>
    <div class="w-full h-full flex text-white">
        <div id="sidebar" class="hidden md:block absolute md:static w-7/12 md:w-3/12 min-h-screen bg-foreground-4-200 rounded-r-3xl z-10">
            <div v-show="this.showInside" class="min-h-screen pt-4 pb-5 px-5 flex flex-col">
                <div class="flex justify-center">
                    <div class="text-center my-3 py-2 w-full bg-background-400 rounded-full">
                        <img src="../assets/logo.png" alt="" class="w-32 inline-block">
                    </div>
                </div>
                <div>
                    <p class="md:text-lg font-bold">Waktu Lokal : </p>
                    <p class="mb-2 md:text-lg">{{timestamp || 'Getting Current Time...'}}</p>

                    <p class="md:text-lg font-bold">Tenggat Waktu : </p>
                    <p class="md:text-lg">{{tenggat}}</p>
                </div>
                <h1 class="md:text-xl font-bold mt-3">Tes Selesai: </h1>
                <div class="grow w-auto h-1 my-2 overflow-x-hidden overflow-y-auto no-scrollbar text-foreground-4-800">
                    <div class="w-full mr-2 h-auto bg-background-400 inline-block mb-2 px-2 py-1 rounded-lg" v-for="i in this.hasil" :key="i">
                        <div class="flex items-center">
                            <i class="fas fa-file-alt mr-3 text-2xl"></i>
                            <div>
                                <p class="md:text-lg font-bold">{{i.nama}}</p>
                                <p class="text-foreground-4-300 font-bold text-xs md:text-sm">Diselesaikan Pada {{toDate(i.finish_date)}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button @click="logout" type="button" class="w-full text-left font-bold mb-3 text-xl">
                    <i class="mr-5 fa fa-sign-out-alt"></i>
                    <span>Logout</span>
                </button>
            </div>
        </div>

        <div class="w-full h-screen overflow-hidden">
            <div class="text-2xl font-bold text-white ml-5 my-6 flex items-center gap-5">
                <i class="fa fa-bars md:hidden" @click="toggleSidebar"></i>
                <p>{{judulHalaman}}</p>
            </div>
            <div class="overflow-auto no-scrollbar h-screen w-full relative px-10">
                <Test v-if="this.test_list!=null" :testList="this.test_list"/>
                <div class="w-1 h-28"></div>
            </div>
        </div>
        
        <!-- Transparent Overlay -->
        <div id="bg" class="hidden fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-foreground-4-100 bg-opacity-60 z-0"
            @click="toggleSidebar"></div>
    </div>
</template>

<script>
import axios from 'axios'
import Test from '../components/views/Test.vue'
// import { useRouter } from 'vue-router'
// import { onMounted } from '@vue/runtime-core'

export default {
    components: {
        axios, Test
    },
    data() {
        return {
            judulHalaman: 'Dashboard',
            timestamp: '',
            tenggat: '',
            timerWaktu: null,
            month: ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],
            day: ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"],
            test_list: null,
            port: import.meta.env.VITE_BACKEND_URL,
            hasil: null,
            showSidebar: false,
            showInside: false,
            abjad: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
            alias: [1,2,21,5,8,6,10,7,9,11,12,15,13,14,18,16,17,3,4,20,19],
        }
    },
    async created() {
        window.addEventListener("resize", this.resize);

        let adaTest = -1
        adaTest = await this.getCurrentTest(this.$cookies.get('data_registrant').exam_session)
        if(adaTest)
            this.$router.push({path: '/section'})

        this.timerWaktu = setInterval(() => {
            this.getNow()
            // console.log(this.$store.state.access_token);
        }, 1000)
    },
    destroyed() {
        window.removeEventListener("resize", this.resize);
    },
    methods: {
        async getCurrentTest(exam_session){
            exam_session = await axios.get(this.port+'/exam_session/' + exam_session);
            return exam_session.data.current_test;
        },
        toDate(timeString){
            const waktu = new Date(timeString)
            const date = this.day[waktu.getDay()] + ", " + ('00'+waktu.getDate()).slice(-2) + " " + this.month[waktu.getMonth()] + " " + waktu.getFullYear()
            const time = ('00'+waktu.getHours()).slice(-2) + ":" + ('00'+waktu.getMinutes()).slice(-2) + ":" + ('00'+waktu.getSeconds()).slice(-2)
            const dateTime = date + ' ' + time
            return dateTime
        },
        getNow() {
            const today = new Date()
            this.timestamp = this.toDate(today)
        },
        resize(){
            const { offsetWidth, offsetHeight } = document.getElementById('app');
            let thi = this
            if(offsetWidth >= 768){
                $("#sidebar").removeClass("hidden")
                this.showInside = true
            }
            else{
                $("#sidebar").addClass("hidden")
            }
        },
        toggleSidebar(){
            if(this.showInside) this.showInside = false
            let thi = this
            $('#bg').fadeToggle("slow");
            $("#sidebar").animate(
                                    { width: "toggle" }, 
                                    "fast", 
                                    function(){ if(!thi.showInside){ thi.showInside = true; } }
                                );
        },
        logout() {
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
                    this.$cookies.remove('current_section')
                    this.$cookies.remove("start_time")
                    localStorage.clear();

                    window.location="/"
                }
            });
        },
        cekSelesai(hasil){
            if(hasil!=null){
                this.hasil = []
                for (let i = this.section.length-1; i >= 0 ; i--) {
                    for (let j = 0; j < hasil.length; j++) {
                        if(this.section[i].id==hasil[j].section_id){
                            let temp = this.section.splice(i,1)
                            this.hasil.push({
                                "section_number": temp[0].section_number,
                                "createdAt": temp[0].createdAt,
                                "question_num": temp[0].question_num,
                                "section_type": temp[0].section_type,
                                "option_num": temp[0].option_num,
                            })
                        }
                    }
                }
                this.hasil.sort((a, b) => {
                    let da = new Date(a.createdAt),
                        db = new Date(b.createdAt);
                    return db - da;
                });
            }
        }
    },
    async mounted(){
        this.resize()
        // console.log(this.$cookies.get('refresh_token'));
        // this.$store.commit('refresh_access_token', this.$cookies.get('refresh_token'));

        let tes = this.$cookies.get('data_registrant').test
        let email = this.$cookies.get('data_registrant').email

        axios
        .get(this.port+`/exam_session/getbyemail/${email}`)
        .then(({data}) => {
            this.tenggat = this.toDate(data.finish_date)
        })

        this.test_list = []
        for (let i = 0; i < tes.length; i++) {
            await axios
            .get(this.port+`/test/${tes[i][0]}`)
            .then(({data}) => (
                this.test_list.push(data)
            ))
        }

        let test_list_temp = []
        let counter = 0
        for (let i = 0; i < this.alias.length; i++) {
            const id = this.alias[i];
            for (let j = 0; j < this.test_list.length; j++) {
                const tempTest = this.test_list[j];
                if(tempTest.id==id){
                    if (tempTest.id==19) tempTest.nama = "Biodata"
                    else tempTest.nama = "TES "+this.abjad[counter]
                    test_list_temp.push(tempTest)
                    counter++
                    break;
                }
            }
        }
        this.test_list = test_list_temp

        this.hasil  = []
        await axios
        .get(this.port+`/test_result/getbyemail/${email}`)
        .then(({data}) => {
            data.forEach(d => {
                if (d.status==0) this.hasil.push(d)
            });
        })

        let len = this.test_list.length-1
        for (let i = len; i >= 0 ; i--) {
            for (let j = 0; j < this.hasil.length; j++) {
                if(this.test_list[i].id == this.hasil[j].test_id){
                    this.hasil[j].nama = this.test_list[i].nama
                    this.test_list.splice(i,1)
                    break;
                }
            }
        }

        this.hasil.sort((a, b) => {
            let da = new Date(a.finish_date),
                db = new Date(b.finish_date);
            return db - da;
        });
        
        // let ada = true
        // let idTes = 4
        // tes.forEach(t => {
        //     if (t[0]==5)
        //         ada = true
        // });
        // if(ada){
        //     axios
        //     .get(this.port+`/section/all/${idTes}`)
        //     .then(({data}) => (
        //         console.log("")
        //         // this.$cookies.set('current_test', idTes),
        //         // this.section = data,
        //         // axios
        //         // .get(this.port+`/section_result/getbytest/${idTes}?email=${this.$cookies.get('data_registrant').email}`)
        //         // .then(({data}) => (
        //         //     this.cekSelesai(data)
        //         // ))
        //     ))
        // }
    },
}
</script>

<style>

</style>