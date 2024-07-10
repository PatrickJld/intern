<template>
    <div class="w-full h-full flex text-white">
        <div id="sidebar" class="hidden md:block absolute md:static w-7/12 md:w-3/12 min-h-screen bg-foreground-4-200 rounded-r-3xl z-10">
            <div v-show="this.showInside" class="min-h-screen pt-4 pb-5 px-5 flex flex-col">
                <!-- <div class="text-center my-5">
                    <img src="../assets/logo.png" alt="" class="w-32 inline-block">
                </div> -->
                <div class="text-center my-3 py-2 w-full bg-background-400 rounded-full">
                    <img src="../assets/logo.png" alt="" class="w-32 inline-block">
                </div>
                <div>
                    <p class="md:text-lg font-bold">Waktu Lokal : </p>
                    <p class="mb-2 md:text-lg">{{timestamp || 'Getting Current Time...'}}</p>

                    <p class="md:text-lg font-bold">Tenggat Waktu : </p>
                    <p class="md:text-lg">{{tenggat}}</p>
                </div>
                <h1 class="text-base md:text-xl font-bold mt-3">Persoalan Selesai: </h1>
                <div class="grow w-auto h-1 my-2 overflow-x-hidden overflow-y-auto no-scrollbar text-foreground-4-800">
                    <div class="w-full mr-2 h-auto bg-background-400 inline-block mb-2 px-2 py-1 rounded-lg" v-for="i in hasil" :key="i">
                        <div class="flex items-center">
                            <i class="fas fa-file-alt mr-3 text-2xl"></i>
                            <div>
                                <p class="md:text-lg font-bold">Persoalan {{i.section_number}}</p>
                                <p class="text-foreground-4-300 font-bold text-xs md:text-sm">Diselesaikan Pada {{toDate(i.createdAt)}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button @click="logout" type="button" class="w-full text-left text-xl font-bold mb-3">
                    <i class="mr-5 fa fa-sign-out-alt"></i>
                    <span>Logout</span>
                </button>
            </div>
        </div>
        
        <form v-if="this.id_tes!=null && this.id_tes==17 && this.data_ist==false" class="bg-foreground-3-500 w-full h-full rounded-xl text-black overflow-y-auto no-scrollbar py-5 px-5 mt-24 mx-10"
            @submit.prevent="submitIstData">
            <h1 class="text-3xl font-bold mb-2">Biodata</h1>
            <div class="mb-5 mt-3">
                <label for="tglLahir">Tanggal Lahir :</label><br>
                <input type="date" name="birth_date" id="birthdate" v-model="tgl_lahir"
                    class="rounded-lg py-2 px-3 my-2 w-full outline-none"><br>
                <label for="tglLahir">Tujuan Mengikuti Tes :</label>
                <input name="alasan" id="alasan_tes" placeholder="Tuliskan disini." v-model="alasan"
                    class="rounded-lg py-2 px-3 my-2 w-full outline-none"><br>
            </div>
            
            <div class="text-center md:text-right">
                <button type="submit" class="bg-foreground-4-100 text-white hover:bg-foreground-4-200 duration-200 rounded-full text-lg font-bold px-10 py-2">
                    Submit dan mulai
                </button>
            </div>
        </form>

        <form v-if="this.id_tes!=null && this.id_tes==2 && this.data_epps==false" class="bg-foreground-3-500 w-full h-full rounded-xl text-black overflow-y-auto no-scrollbar py-5 px-5 mt-24 mx-10"
            @submit.prevent="submitEPPSData">
            <h1 class="text-3xl font-bold mb-2">Biodata</h1>
            <div class="mb-5 mt-3">
                <label for="pend" class="font-bold text-lg">Pendidikan :</label><br>
                <div class="mb-2 flex gap-10">
                    <div>
                        <input type="radio" v-model="pendidikan" value="sma" name="pendidikan" id="smasmk" class="w-5 h-5 mr-2" />
                        <label for="smasmk">SMA / SMK</label>
                    </div>
                    <div>
                        <input type="radio" v-model="pendidikan" value="s1" name="pendidikan" id="s1d3" class="w-5 h-5 mr-2" />
                        <label for="s1d3">S1 / D3</label>
                    </div>
                </div>
                
                <label for="jk" class="font-bold text-lg">Jenis Kelamin :</label>
                <div class="mb-2 flex gap-10">
                    <div>
                        <input type="radio" v-model="jk" value="l" name="jenisKelamin" id="laki" class="w-5 h-5 mr-2" />
                        <label for="laki">Laki - Laki</label>
                    </div>
                    <div>
                        <input type="radio" v-model="jk" value="p" name="jenisKelamin" id="perempuan" class="w-5 h-5 mr-2" />
                        <label for="perempuan">Perempuan</label>
                    </div>
                </div>
            </div>
            
            <div class="text-center md:text-right">
                <button type="submit" class="bg-foreground-4-100 text-white hover:bg-foreground-4-200 duration-200 rounded-full text-lg font-bold px-10 py-2">
                    Submit dan mulai
                </button>
            </div>
        </form>

        <div class="w-full h-screen overflow-hidden" v-if="this.id_tes!=null && this.tampil">
            <div class="text-2xl font-bold text-white ml-5 my-6 flex items-center gap-5">
                <i class="fa fa-bars md:hidden" @click="toggleSidebar"></i>
                <p>{{judulHalaman}}</p>
            </div>
            <div class="overflow-auto no-scrollbar h-screen w-full relative px-10">
                <Section v-if="this.sectionList!=null && this.now!=-99" :sectionList="this.sectionList" :now="this.now"/>
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
import Section from '../components/views/Sections.vue'

export default {
    components: {
        axios, Section
    },
    data() {
        return {
            judulHalaman: 'Dashboard',
            timestamp: '',
            tenggat: '',
            timerWaktu: null,
            month: ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],
            day: ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"],
            sectionList: null,
            port: import.meta.env.VITE_BACKEND_URL,
            hasil: null,
            now: -99,
            id_tes: null,
            id_tes_result: null,
            data_ist: false,
            tgl_lahir: null,
            alasan: "",
            data_epps: false,
            pendidikan: "",
            jk: "",
            showSidebar: false,
            showInside: false,
            tampil: false,
        }
    },
    async created() {
        window.addEventListener("resize", this.resize);

        let adaTest = -1
        adaTest = await this.getCurrentTest(this.$cookies.get('data_registrant').exam_session)
        if(!adaTest)
            this.$router.push({path: '/dashboard'})

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
                    this.$cookies.remove('start_time')

                    window.location="/"
                }
            });
        },
        async cekSelesai(result){
            if(this.id_tes==21){
                this.sectionList.pop()
            }

            let unfinished_section = [];
            if(result!=null){
                result.sort((a, b) => {
                    let da = a.section_id,
                        db = b.section_id;
                    return db - da;
                });
                
                for(let i = 0 ; i < this.sectionList.length; i++){
                    if(result.filter(r => r.section_id == this.sectionList[i].id).length <= 0){
                        unfinished_section.push(this.sectionList[i].id)
                    }
                }
                this.now = unfinished_section[0] ?? result[0].section_id

                this.hasil = []
                for (let i = 0; i < this.sectionList.length ; i++) {
                    for (let j = 0; j < result.length; j++) {
                        if(this.sectionList[i].id==result[j].section_id){
                            let temp = this.sectionList[i]
                            this.hasil.push({
                                "section_number": temp.section_number,
                                "createdAt": result[j].finish_date,
                                "question_num": temp.question_num,
                                "section_type": temp.section_type,
                                "option_num": temp.option_num,
                            })
                        }
                    }
                }
                this.hasil.sort((a, b) => {
                    let da = new Date(a.createdAt),
                        db = new Date(b.createdAt);
                    return db - da;
                });
            }else{
                if(this.sectionList)this.now = this.sectionList[0].id
            }

            // Move to dashboard
            if(this.sectionList && 
                unfinished_section.length == 0 &&
                result!=null){
                //update test result
                let dataReg = this.$cookies.get('data_registrant')
                let res = -1
                dataReg.test.forEach(t => {
                    if(t[0]==this.id_tes){
                        res = t[1]
                    }
                });
                let data_result = null

                axios
                .get(this.port+`/test_result/${res}`)
                .then(({data}) => (
                    data_result = data,
                    axios.post(this.port+'/test_result/update',{
                        "updating_id": data_result.id,
                        "test_id": this.id_tes,
                        "exam_session": dataReg.exam_session,
                        "start_date": data_result.start_date,
                        "finish_date": Date.now(),
                        "status": 1,
                        "result": data_result.result
                    })
                    .then((response) => {
                        axios.post(this.port+'/exam_session/updateCurrentTest',{
                            "id": dataReg.exam_session,
                            "test_id": 0
                        })
                        .then((response) => {
                            window.location = '/dashboard'
                        }).catch( error => { 
                            console.log('error: ' + error) 
                        });
                    }).catch( error => { 
                        console.log('error: ' + error) 
                    })
                )).catch( error => { 
                    console.log('error: ' + error) 
                })
            }
        },
        submitIstData(e){
            if (this.tgl_lahir == null || this.alasan == ""){
                Swal.fire({
                    title: 'Mohon Isi Semua Field!',
                    icon: 'warning',
                    confirmButtonText: 'Kembali'
                });
            } else{
                $('#spinner-modal').fadeIn("slow");

                axios.post(this.port+'/ist_data/create',{
                    "test_result_id": this.test_result_id,
                    "email": this.$cookies.get('data_registrant').email,
                    "tanggal_lahir": this.tgl_lahir,
                    "tujuan_tes": this.alasan
                })
                .then((dataResponse) => {
                    const thi = this
                    Swal.fire(
                        'Sukses!',
                        'Data diri berhasil dikirimkan.',
                        'success'
                    )
                    .then(function(){
                        thi.data_ist = true,
                        thi.tampil = true
                        $('#spinner-modal').fadeOut("slow")
                    })
                }).catch( error => { 
                    console.log('error: ' + error) 
                });
            }
        },
        submitEPPSData(e){
            if (this.pendidikan == "" || this.jk == ""){
                Swal.fire({
                    title: 'Mohon Isi Semua Field!',
                    icon: 'warning',
                    confirmButtonText: 'Kembali'
                });
            } else{
                $('#spinner-modal').fadeIn("slow");

                axios.post(this.port+'/epps_data/create',{
                    "test_result_id": this.test_result_id,
                    "jenis_kelamin": this.jk,
                    "pendidikan": this.pendidikan
                })
                .then((dataResponse) => {
                    const thi = this
                    Swal.fire(
                        'Sukses!',
                        'Data diri berhasil dikirimkan.',
                        'success'
                    )
                    .then(function(){
                        thi.data_epps = true,
                        thi.tampil = true
                        $('#spinner-modal').fadeOut("slow")
                    })
                }).catch( error => { 
                    console.log('error: ' + error) 
                });
            }
        },
    },
    async mounted(){
        this.resize()
        // console.log(this.$cookies.get('refresh_token'));
        // this.$store.commit('refresh_access_token', this.$cookies.get('refresh_token'));

        let email = this.$cookies.get('data_registrant').email
        axios
        .get(this.port+`/exam_session/getbyemail/${email}`)
        .then(({data}) => {
            this.tenggat = this.toDate(data.finish_date)
        })

        this.id_tes = await this.getCurrentTest(this.$cookies.get('data_registrant').exam_session)
        axios
        .get(this.port+`/section/all/${this.id_tes}`)
        .then(({data}) => (
            this.sectionList = data,
            // console.log(this.sectionList),
            axios
            .get(this.port+`/section_result/getbytest/${this.id_tes}?email=${this.$cookies.get('data_registrant').email}`)
            .then(({data}) => (
                this.cekSelesai(data)
            ))
        ))

        // console.log(this.id_tes)
        if(this.id_tes === 17){
            // IST
            let tes = this.$cookies.get('data_registrant').test
            this.test_result_id = -1
            tes.forEach(t => {
                if (t[0]==this.id_tes) this.test_result_id = t[1]
            });
            if(this.test_result_id!=-1){
                axios
                .get(this.port+`/ist_data/?test_result_id=${this.test_result_id}`)
                .then(({data}) => {
                    this.data_ist = data!=undefined
                    if(this.data_ist) this.tampil = true
                })
            }
        }else if(this.id_tes === 2){
            // EPPS
            let tes = this.$cookies.get('data_registrant').test
            this.test_result_id = -1
            tes.forEach(t => {
                if (t[0]==this.id_tes) this.test_result_id = t[1]
            });
            if(this.test_result_id!=-1){
                axios
                .get(this.port+`/epps_data/?test_result_id=${this.test_result_id}`)
                .then(({data}) => {
                    this.data_epps = data!=undefined
                    if(this.data_epps) this.tampil = true
                    
                })
            }
        }else{
            this.tampil = true
        }
    },
}
</script>

<style>

</style>