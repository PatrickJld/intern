<template>
    <div>
        <div class="absolute top-20 w-full flex justify-center" style="height: 30rem;">
            <div class="w-5/6 h-full">
                <p class="font-bold text-xl mt-2">Cari Sesi : </p>
                <input type="text" name="token" id="userToken" class="w-1/2 ml-0.5 mb-3 bg-white ring-1 inset ring-stroke-100 
                            placeholder-stroke mt-1 px-3 py-1.5 rounded-md outline-none" placeholder="Cari sesi disini..."
                            @keyup="cari" v-model="pencarian">
                <div class="flex justify-end">
                    <button class="bg-foreground-4-100 text-white hover:bg-foreground-4-200
                                    duration-200 rounded-md px-10 py-2 mt-5 h-auto w-auto shadow-xl"
                            id="btnCreateSession" @click="openModalCreate">
                        <i class="fa fa-calendar-alt fa-lg mr-2"></i>   
                        <span>Buat Sesi Baru</span>
                    </button>
                </div>

                <div class="overflow-auto w-full h-auto max-h-[30rem] no-scrollbar mt-5 rounded-lg shadow-xl">
                    <table class="table-fixed w-full font-semibold">
                        <thead class="bg-foreground-4-100 text-white sticky top-0">
                            <tr>
                                <th class="w-2/12 py-3">E-Mail</th>
                                <th class="w-1/12">Mulai</th>
                                <th class="w-1/12">Berakhir</th>
                                <th class="w-1/12">Durasi</th>
                                <th class="w-2/12">Token</th>
                                <th class="w-1/12">Status</th>
                                <th class="w-1/12">Aksi</th>
                            </tr>
                        </thead>
                        <tbody v-if="this.exam_session!=null && this.exam_session.length>0">
                            <tr class="text-center odd:bg-foreground-4-50 even:bg-foreground-4-10" v-for="i in this.exam_session" :key="i">
                                <td>{{i.email}}</td>
                                <td>{{toDate(i.start_date)}}</td>
                                <td>{{toDate(i.finish_date)}}</td>
                                <td>{{Math.round(i.duration/60 * 10)/10}} Jam</td>
                                <td>{{i.test_token}}</td>
                                <td class="py-5">
                                    <span v-if="i.status%2==1">Aktif</span>
                                    <span v-else>Non-Aktif</span>
                                </td>
                                <td>
                                    <button class="bg-foreground-4-100 hover:bg-foreground-4-200 duration-200 rounded-md text-white
                                                    h-auto w-auto px-5 py-1 mr-1" 
                                        @click="openModal(i)"> 
                                        <i class="fa fa-refresh mr-2"></i>
                                        <span>Perbarui</span>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr class="text-center bg-foreground-4-50 text-xl">
                                <td colspan="7" class="py-5">Belum ada data tersedia</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="w-1 h-64 relative top-10"></div>
            </div>
        </div>

        <!-- Transparent Overlay -->
        <div id="bg" class="fixed top-0 left-0 w-screen h-screen bg-primary-1000 bg-opacity-60 hidden" @click="closeModal"></div>

        <!-- Create New Session Modal -->
        <div id="modalSession" class="fixed bg-foreground-4-200 h-4/5 w-2/3 text-primary-1000 rounded-lg hidden" style="top: 10%; left: 16.67%">
            <div class="bg-primary-300 h-12 rounded-t-lg px-5 py-2 flex items-center">
                <p class="font-bold text-lg inline-block relative" style="width: 96%">{{headerModal}}</p>
                <button id="closeNewSession" class="relative inline-block" @click="closeModal">
                    <i class="fa fa-times fa-lg"></i>
                </button>
            </div>

            <div class="text-white p-5 h-5/6 relative">
                <div class="flex">
                    <p class="w-2/12">Email :</p>
                    <div class="grow h-auto">
                        <div class="bg-primary-600 py-1 px-3 rounded-full inline-block ml-2 mb-2" v-for="i in emails" :key="i">
                            <span>{{i}}</span>
                            <i v-if="this.statusAdd" class="fa fa-x text-sm ml-3 cursor-pointer" @click="hapusEmail(`${i}`)"></i>
                        </div>
                    </div>
                </div>
                <div class="flex items-center gap-3 py-4" v-if="this.statusAdd">
                    <input name="email" id="user_email" placeholder="Email Registrant" v-model="isiEmail"
                        class="rounded-lg py-2 px-3 w-full bg-primary-600 outline-none placeholder-gray-300"><br>
                    <button class="rounded-lg px-3 h-10 bg-sky-300 text-primary-1000 hover:bg-primary-600 hover:text-sky-200 duration-300"
                                    @click.prevent="tambahEmail">Tambahkan</button>
                </div>

                <label>Tanggal Tes</label><br>
                <div class="flex gap-2 mb-3">
                    <div class="w-1/2 flex items-center">
                        <label for="start">Dari :</label>
                        <input type="datetime-local" name="start_date" id="start" v-model="start"
                                class="ml-2 rounded-lg py-2 px-3 my-2 bg-primary-600 outline-none placeholder-gray-300">
                    </div>
                    <div class="w-1/2 flex items-center">
                        <label for="finish">Sampai : </label>
                        <input type="datetime-local" name="finish_date" id="finish" v-model="finish"
                                class="ml-2 rounded-lg py-2 px-3 my-2 bg-primary-600 outline-none placeholder-gray-300"><br>
                    </div>
                </div>
                
                <div class="flex gap-2 py-2 items-center" v-if="this.statusAdd">
                    <label>Paket Tes :</label>
                    <button class="rounded-lg px-5 py-1 bg-sky-300 text-primary-1000 hover:text-white 
                                    hover:bg-primary-700 duration-300 ring-2 ring-inset ring-sky-300 hover:ring-primary-200"
                                    @click="pilihPaket('opt')">Paket Tes Opt</button>
                    <button class="rounded-lg px-5 py-1 bg-sky-300 text-primary-1000 hover:text-white 
                                    hover:bg-primary-700 duration-300 ring-2 ring-inset ring-sky-300 hover:ring-primary-200"
                                    @click="pilihPaket('S1')">Paket S1 </button>
                    <button class="rounded-lg px-5 py-1 bg-sky-300 text-primary-1000 hover:text-white 
                                    hover:bg-primary-700 duration-300 ring-2 ring-inset ring-sky-300 hover:ring-primary-200"
                                    @click="pilihPaket('Teknik')">Paket Teknik</button>
                </div>

                <div class="flex gap-2 items-center">
                    <label>Tes Opsional : </label>
                    <select name="" id="" class="bg-sky-300 text-primary-1000 rounded-lg py-1 px-2 w-1/3 outline-none shadow-xl cursor-pointer"
                            v-model="this.selectedOptional">
                        <option v-for="i in opsional" :key="i" v-bind:value="i.id">{{i.name}}</option>
                    </select>
                    <button class="rounded-lg px-3 h-8 bg-sky-300 text-primary-1000 hover:bg-primary-600 hover:text-sky-200 duration-300"
                                    @click.prevent="tambahTes">Tambahkan</button>
                </div>

                <div class="flex gap-2 mt-2 w-full">
                    <p class="w-2/12">Daftar Tes :</p>
                    <div class="w-9/12">
                        <div class="bg-primary-600 py-1 px-3 rounded-full inline-block ml-2 mb-2" v-for="(i, idx) in tests" :key="idx">
                            <div class="flex items-center">
                                <span>{{i.name}}</span>
                                <label :for="'toggle'+idx" class="cursor-pointer ml-2 inline-block" v-if="!this.statusAdd && idx<this.test_result.length">
                                    <div class="relative">
                                        <input type="checkbox" :id="'toggle'+idx" class="sr-only" v-model="this.test_result[idx].status">
                                        <div class="block bg-gray-600 w-14 h-8 rounded-full"></div>
                                        <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                                    </div>
                                </label>
                                <i v-if="this.statusAdd || (!this.statusAdd && !this.current_test_list.includes(i))" class="fa fa-x text-sm ml-3 cursor-pointer" @click="hapusTest(`${i.id}`)"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div class="flex items-center mt-5" v-if="!this.statusAdd">
                        Status Aktif :
                        <label for="toggle" class="flex items-center cursor-pointer ml-2">
                            <div class="relative">
                                <input type="checkbox" id="toggle" class="sr-only" v-model="aktif">
                                <div class="block bg-gray-600 w-14 h-8 rounded-full"></div>
                                <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                            </div>
                        </label>
                    </div>
                </div>

                <button id="submit_new_session" class="absolute bottom-0 right-0 mr-5 rounded-lg px-10 py-2 bg-sky-300 text-primary-1000 hover:text-white 
                                                        hover:bg-primary-700 duration-300 ring-2 ring-inset ring-sky-300 hover:ring-primary-200"
                                                @click.prevent="createSession">{{this.statusAdd?"Buat":"Perbarui"}}</button>

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
            headerModal: "Buat Sesi Baru",
            exam_session: null,
            exam_session_full: null,
            port: import.meta.env.VITE_BACKEND_URL,
            emails: [],
            tests: [],
            opsional: [],
            test_result: [],
            start: null,
            finish: null,
            isiEmail: "",
            aktif: true,
            statusAdd: true,
            updating: -1,
            list_tes: null,
            selectedOptional: -1,
            current_test_list: null,
            current_exam_session: null,
            pencarian: "",
        }
    },
    created() {
        this.$emit('updateHeader', 'Sesi')
        this.$emit('updateMenu', 'session')
    },
    methods: {
        toDate(timeString){
            const waktu = new Date(timeString)
            const date = ('00'+waktu.getDate()).slice(-2) + "/" + ('00'+(waktu.getMonth()+1)).slice(-2) + "/" + waktu.getFullYear()
            const time = ('00'+waktu.getHours()).slice(-2) + ":" + ('00'+waktu.getMinutes()).slice(-2)
            const dateTime = date + ' ' + time
            return dateTime
        },
        cari(){
            let temp = []
            this.exam_session_full.forEach(s => {
                if (s.email.includes(this.pencarian))
                    temp.push(s)
            });
            this.exam_session = temp
        },
        // getToken(length) {
        //     var token = '';
        //     var validChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        //     for (let i = 0; i < length; i++ ) {
        //         token += validChar.charAt(Math.floor(Math.random()*36));
        //     }
        //     return token;
        // },
        openModalCreate(){
            this.statusAdd = true
            this.emails = []
            this.tests = []
            this.start = null
            this.finish = null
            this.isiEmail = ""
            this.headerModal = "Buat Sesi Baru";
            $('#modalSession').fadeIn("slow");
            $('#bg').fadeIn("slow");
        },
        async openModal(data2){
            this.test_result = []
            this.current_test_list = []
            this.tests = []
            await axios
            .get(`${this.port}/test/getbyExamSession/${data2.id}`)
            .then(({data}) => {
                if(data!=undefined){
                    let idx = -1;
                    for (let i = 0; i < this.list_tes.length; i++) {
                        for (let j = 0; j < data.length; j++) {
                            if (this.list_tes[i].id == data[j].test_id){
                                this.tests.push(this.list_tes[i])
                                this.current_test_list.push(this.list_tes[i])
                                break;
                            }
                        }
                    }

                    let temp = []
                    for (let i = 0; i < this.list_tes.length; i++) {
                        const tes = this.list_tes[i];
                        if(!this.tests.includes(tes)){
                            temp.push(tes)
                        }
                    }
                    this.opsional = temp
                    this.selectedOptional = this.opsional[0].id
                }
            })

            await axios
            .get(`${this.port}/test_result/getbyemail/${data2.email}`)
            .then(({data}) => {
                if(data!=undefined){
                    for (let i = 0; i < this.current_test_list.length; i++) {
                        for (let j = 0; j < data.length; j++) {
                            if (this.current_test_list[i].id == data[j].test_id){
                                let t = data[i]
                                t.status = t.status==1?true:false
                                this.test_result.push(t)
                                break;
                            }
                        }
                    }
                }
            })

            this.current_exam_session = data2.id
            this.statusAdd = false
            this.emails = [data2.email]
            this.start = data2.start_date.split(".")[0]
            this.finish = data2.finish_date.split(".")[0]
            this.isiEmail = ""
            this.updating = data2.id
            this.headerModal = "Perbarui Sesi";
            $('#modalSession').fadeIn("slow");
            $('#bg').fadeIn("slow");
        },
        tambahEmail(){
            if(this.isiEmail!='' && !this.emails.includes(this.isiEmail) && this.emailFormatCheck(this.isiEmail)){
                this.emails.push(this.isiEmail)
                this.isiEmail = ""
            }
        },
        hapusEmail(email){
            var idx = this.emails.indexOf(email);
            if (idx !== -1) {
                this.emails.splice(idx, 1);
            }
        },
        pilihPaket(paket){
            this.tests = []
            let temp = []
            let tempOpsi = []

            let lisTes = []
            if(paket == "opt"){
                lisTes = [1,2,3,4,5,19,20,21]
            }else if(paket == "S1"){
                lisTes = [1,2,3,4,5,6,7,8,9,10,19,20,21]
            }else if(paket == "Teknik"){                
                lisTes = [1,2,3,4,5,6,7,8,9,11,12,13,14,15,19,20,21]
            }
            for (let i = 0; i < this.list_tes.length; i++) {
                if(lisTes.includes(this.list_tes[i].id)){
                    temp.push(this.list_tes[i])
                }
                else
                    tempOpsi.push(this.list_tes[i])
            }
            this.tests = temp
            this.opsional = tempOpsi
            this.selectedOptional = this.opsional[0].id
        },
        hapusTest(tes){
            let idx = -1;
            for (let i = 0; i < this.tests.length; i++) {
                if (this.tests[i].id == tes){
                    idx = i;
                    break;
                }
            }

            if (idx !== -1) {
                let temp = this.tests.splice(idx, 1);
                this.opsional.push(temp[0]);
            }
        },
        tambahTes(){
            let ada = -1;
            for (let i = 0; i < this.tests.length; i++) {
                if (this.tests[i].id == this.selectedOptional){
                    ada = i;
                    break;
                }
            }
            if (ada == -1) {
                let idx = -1;
                for (let i = 0; i < this.opsional.length; i++) {
                    if (this.opsional[i].id == this.selectedOptional){
                        idx = i;
                        break;
                    }
                }
                if (idx!==-1){
                    this.tests.push(this.opsional[idx]);
                }
            }
        },
        emailFormatCheck(email){
            let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            let result = email.match(pattern)
            if(result==null)
                return false
            else
                return true
        },
        async createSession(){
            if(this.emails.length==0 || this.tests.length==0 ||this.start==null||this.finish==null)
                Swal.fire({
                    title: 'Mohon Isi Semua Field!',
                    icon: 'warning',
                    confirmButtonText: 'Kembali'
                });
            else if(start>finish)
                Swal.fire({
                    title: 'Waktu Awal Melebihi Waktu Akhir!',
                    icon: 'warning',
                    confirmButtonText: 'Kembali'
                });
            else{
                var dateStart = new Date(this.start);
                var dateFinish = new Date(this.finish);
                var duration = (dateFinish.getTime()-dateStart.getTime())/(1000*60)

                let daftarTes = []
                this.tests.forEach(t => {
                    daftarTes.push(t.id)
                });
                if (this.statusAdd){
                    // console.log("create")
                    axios.post(this.port+'/exam_session/create',{
                        "email": this.emails,
                        "start_date": dateStart,
                        "finish_date": dateFinish,
                        "duration": duration,
                        "tests": daftarTes
                    })
                    .then((response) => {
                        if (response.status==200){
                            axios
                            .get(this.port+'/exam_session/all')
                            .then(({data}) => (
                                this.validation(data),
                                Swal.fire(
                                    'Created!',
                                    'Sesi Baru Berhasil Dibuat!',
                                    'success'
                                )
                                .then(function(){
                                    $('#modalSession').fadeOut("fast")
                                    $('#bg').fadeOut("slow")
                                })
                            ))
                            
                        }else{
                            throw response
                        }
                    }).catch( error => {
                        $('#spinner-modal').fadeOut("slow");
                        Swal.fire(
                            'Warning!',
                            error.response.data,
                            'warning'
                        )
                    });
                }else{
                    // console.log("update")
                    let addTest = this.tests.filter(n => !this.current_test_list.includes(n))
                    let addingTest = []
                    addTest.forEach(at => { addingTest.push(at.id) });
                    // console.log(addingTest)

                    axios.post(this.port+'/test/addTest',{
                        "test_id": addingTest,
                        "exam_session_id": this.current_exam_session
                    })
                    .then((response) => {
                        axios.post(this.port+'/exam_session/update',{
                            "updating_id": this.updating,
                            "email": this.emails[0],
                            "start_date": dateStart,
                            "finish_date": dateFinish,
                            "duration": duration,
                            "status": this.aktif?2:1
                        })
                        .then(async (response) => {
                            if (response.status==200){
                                for (let i = 0; i < this.test_result.length; i++) {
                                    const tr = this.test_result[i];
                                    await axios.post(this.port+'/test_result/update',{
                                        "updating_id": tr.id,
                                        "test_id": tr.test_id,
                                        "exam_session": tr.exam_session,
                                        "start_date": tr.start_date,
                                        "finish_date": tr.finish_date,
                                        "status": tr.status==true?2:1,
                                        "result": tr.result
                                    })
                                    .then((response) => {

                                    }).catch( error => { 
                                        console.log('error: ' + error) 
                                    })
                                }

                                axios
                                .get(this.port+'/exam_session/all')
                                .then(({data}) => (
                                    this.validation(data),
                                    Swal.fire(
                                        'Updated!',
                                        'Sesi Berhasil Diperbarui!',
                                        'success'
                                    )
                                    .then(function(){
                                        $('#modalSession').fadeOut("fast")
                                        $('#bg').fadeOut("slow")
                                    })
                                ))
                            }else{
                                throw response
                            }
                        }).catch( error => {});
                    }).catch( error => {
                        $('#spinner-modal').fadeOut("slow");
                        Swal.fire(
                            'Warning!',
                            error.response.data,
                            'warning'
                        )
                    });
                }
            }
        },
        closeModal(){
            $('#modalSession').fadeOut("fast");
            $('#bg').fadeOut("slow");
        },
        validation(data){
            let valid_session = []
            for (let i = 0; i < data.length; i++) {
                if (data[i]!=null)
                    valid_session.push(data[i])
            }
            this.exam_session = valid_session
            this.exam_session_full = valid_session
        }
    },
    mounted(){
        axios
        .get(this.port+'/exam_session/all')
        .then(({data}) => (
            this.validation(data)
        ))
        axios
        .get(this.port+'/test/all')
        .then(({data}) => {
            this.list_tes = data
            
            let temp = []
            for (let i = 0; i < this.list_tes.length; i++) {
                temp.push(this.list_tes[i])
            }
            this.opsional = temp
            this.selectedOptional = this.opsional[0].id
        })
    }
}
</script>

<style>
input:checked ~ .dot {
  transform: translateX(100%);
  background-color: #33CCFF;
}
</style>