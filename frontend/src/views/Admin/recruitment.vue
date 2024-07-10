<template>
    <div class="absolute top-20 w-full min-h-screen flex justify-center">
        <div class="w-5/6 h-full">
            <div class="flex justify-end">
                <button class="bg-foreground-4-100 text-white hover:bg-foreground-4-200
                                duration-200 rounded-md px-10 py-2 mt-5 h-auto w-auto shadow-lg"
                        id="btnCreateRecruitment"
                        @click.prevent="openModalCreate">
                    <i class="fa fa-calendar-alt fa-lg mr-2"></i>   
                    <span>Buat Rekrutmen Baru</span>
                </button>
            </div>

            <div class="overflow-auto w-full h-auto max-h-[30rem] no-scrollbar mt-5 rounded-lg shadow-xl">
                <table class="table-fixed w-full font-semibold">
                    <thead class="bg-foreground-4-100 text-white sticky top-0">
                        <tr>
                            <th class="w-2/12 py-3">QR Barcode</th>
                            <th class="w-1/12">Nama</th>
                            <th class="w-2/12">Lowongan</th>
                            <th class="w-2/12">Dibuat Pada</th>
                            <th class="w-1/12">Status</th>
                            <th class="w-2/12">Aksi</th>
                        </tr>
                    </thead>
                    <tbody v-if="this.recruitment!=null">
                        <tr class="text-center odd:bg-foreground-4-50 even:bg-foreground-4-10" v-for="i in this.recruitment" :key="i">
                            <td>
                                <a :href="getImg(i,'download')">
                                    <img :src="getImg(i,'view')" alt="" class="h-36 my-2 inline-block">
                                </a>
                            </td>
                            <td>{{i.name}}</td>
                            <td>{{i.list_pekerjaan}}</td>
                            <td>{{toDate(i.start_date)}}</td>
                            <td>{{i.status==1?"Open":"Closed"}}</td>
                            <td>
                                <button class="bg-foreground-4-100 hover:bg-foreground-4-200 duration-200 rounded-md text-white
                                                h-auto w-auto px-5 py-1 mr-1" 
                                    @click="gantiJobVacancy(i.id)"> 
                                    <i class="fa fa-info-circle mr-2"></i>
                                    <span>Detail</span>
                                </button>
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
                            <td colspan="6" class="py-5">Belum ada data tersedia</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div>
                <h1 class="font-bold text-4xl mt-10">Pelamar Kerja</h1>
                <div class="overflow-auto w-full h-auto max-h-[30rem] bg-transparent no-scrollbar mt-3 rounded-lg shadow-xl">
                    <table class="table-fixed w-full font-semibold">
                        <thead class="bg-foreground-4-100 text-white sticky top-0">
                            <tr>
                                <th class="w-2/12 py-3">Email</th>
                                <th class="w-2/12">Nama</th>
                                <th class="w-2/12">Jenis Kelamin</th>
                                <th class="w-2/12">Melamar Pada</th>
                                <th class="w-1/12">Aksi</th>
                            </tr>
                        </thead>
                        <tbody v-if="this.applicant!=null && this.applicant.length>0">
                            <tr class="text-center odd:bg-foreground-4-50 even:bg-foreground-4-10" v-for="i in this.applicant" :key="i">
                                <td>{{i.email}}</td>
                                <td>{{i.nama}}</td>
                                <td>{{i.jenis_kelamin=='L' ? "Laki-Laki" : "Perempuan"}}</td>                                
                                <td>{{toDate(i.createdAt)}}</td>
                                <td class="py-5">
                                    <button class="bg-foreground-4-100 hover:bg-foreground-4-200 duration-200 rounded-md text-white
                                                    h-auto w-auto px-5 py-1 mr-1" 
                                        @click="this.$router.push({path: '/admin/applicant', query: {email: i.email}})"> 
                                        <i class="fa fa-info-circle mr-2"></i>
                                        <span>Detail</span>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr class="text-center bg-foreground-4-50 text-xl">
                                <td colspan="5" class="py-5">Belum ada data tersedia</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="w-1 h-64 relative top-10"></div>
        </div>
    </div>

    <!-- Transparent Overlay -->
    <div id="bg" class="fixed top-0 left-0 w-screen h-screen bg-primary-1000 bg-opacity-60 hidden" @click="closeModal"></div>

    <!-- Create New Recruitment Modal -->
    <div id="modalRecruitment" class="fixed left-1/4 bg-foreground-4-200 h-3/5 w-1/2 text-primary-1000 rounded-lg hidden" style="top: 20%">
        <div class="bg-primary-300 h-12 rounded-t-lg px-5 py-2 flex items-center">
            <p class="font-bold text-lg inline-block relative" style="width: 96%">{{headerModal}}</p>
            <button id="closeNewRecruitment" class="relative inline-block"
                @click.prevent="closeModal">
                <i class="fa fa-times fa-lg"></i>
            </button>
        </div>

        <form class="text-white p-5 h-5/6 relative" @submit.prevent="createRecruitment">
            <label for="nama">Nama Lowongan :</label><br>
            <input type="text" name="nama" id="nama" placeholder="Nama Lowongan" v-model="nama"
                class="rounded-lg py-2 px-3 w-full my-2 bg-primary-600 outline-none placeholder-gray-300 mb-5"><br>

            <div class="flex">
                <p class="w-4/12">Lowongan Yang Ditawarkan :</p>
                <div class="grow h-auto">
                    <div class="bg-primary-600 py-1 px-3 rounded-full inline-block ml-2 mb-2" v-for="i in lowongan" :key="i">
                        <span>{{i}}</span>
                        <i class="fa fa-x text-sm ml-3 cursor-pointer" @click="hapusLowongan(`${i}`)"></i>
                    </div>
                </div>
            </div>
            <div class="flex items-center gap-3 py-4">
                <input type="text" name="lowongan" id="lowongan" placeholder="Lowongan" v-model="isiLowongan"
                    class="rounded-lg py-2 px-3 w-full bg-primary-600 outline-none placeholder-gray-300"><br>
                <button class="rounded-lg px-3 h-10 bg-sky-300 text-primary-1000 hover:bg-primary-600 hover:text-sky-200 duration-300"
                                @click.prevent="tambahLowongan">Tambahkan</button>
            </div>

            <div class="flex items-center" v-if="!this.statusAdd">
                Status Aktif :
                <label for="toggle" class="flex items-center cursor-pointer ml-2">
                    <div class="relative">
                        <input type="checkbox" id="toggle" class="sr-only" v-model="aktif">
                        <div class="block bg-gray-600 w-14 h-8 rounded-full"></div>
                        <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                    </div>
                </label>
            </div>

            <button type="submit" id="submit_new_Recruitment" class="absolute bottom-0 right-0 mr-5 rounded-lg px-10 py-2 bg-sky-300 text-primary-1000 hover:text-white 
                                                    hover:bg-primary-700 duration-300 ring-2 ring-inset ring-sky-300 hover:ring-primary-200"
                                                    >{{this.statusAdd?"Buat":"Perbarui"}}</button>

        </form>
    </div>
    
    <div id="spinner-modal" class="fixed top-0 left-0 w-screen h-screen flex items-center bg-foreground-3-500 bg-opacity-70 justify-center z-20" style="display: none">
        <i class="fas fa-spinner animate-spin fa-7x inline-block text-foreground-4-100"></i>
    </div>
</template>

<script>
import axios from 'axios'
import NoWorkResult from 'postcss/lib/no-work-result'
export default {
    components: {
        axios
    },
    emits: ["updateHeader","updateMenu"],
    data() {
        return {
            headerModal: "Buat Rekrutmen Baru",
            recruitment: null,
            applicant: null,
            isiLowongan: "",
            nama: "",
            lowongan: [],
            port: import.meta.env.VITE_BACKEND_URL,
            aktif: true,
            statusAdd: true,
            updating: -1,
            tanggalUpdating: null
        }
    },
    methods: {
        toDate(timeString){
            const waktu = new Date(timeString)
            const date = ('00'+waktu.getDate()).slice(-2) + "/" + ('00'+(waktu.getMonth()+1)).slice(-2) + "/" + waktu.getFullYear()
            const time = ('00'+waktu.getHours()).slice(-2) + ":" + ('00'+waktu.getMinutes()).slice(-2)
            const dateTime = date + ' ' + time
            return dateTime
        },
        getImg(job_vacancy, exports){
            let id = job_vacancy.qr_link.split("d/")
            // console.log("https://drive.google.com/uc?export="+exports+"&id="+id[1])
            return "https://drive.google.com/uc?export="+exports+"&id="+id[1]
        },
        openModal(data){
            this.statusAdd = false
            this.nama = data.name
            this.isiLowongan = ""
            this.lowongan = data.list_pekerjaan.split(",")
            this.aktif = data.status==1?true:false
            this.updating = data.id
            this.tanggalUpdating = data.start_date
            // console.log(this.tanggalUpdating)
            // console.log(data)
            this.headerModal = "Perbarui Rekrutmen";
            $('#modalRecruitment').fadeIn("slow");
            $('#bg').fadeIn("slow");
        },
        openModalCreate(){
            this.statusAdd = true
            this.nama = ""
            this.isiLowongan = ""
            this.lowongan = []
            this.aktif = true
            this.headerModal = "Buat Rekrutmen Baru";
            $('#modalRecruitment').fadeIn("slow");
            $('#bg').fadeIn("slow");
        },
        closeModal(){
            $('#modalRecruitment').fadeOut("fast");
            $('#bg').fadeOut("slow");
        },
        createRecruitment(e){
            let date = Date.now()
            if(this.nama==""||this.lowongan.length==0)
                Swal.fire({
                    title: 'Mohon Isi Semua Field!',
                    icon: 'warning',
                    confirmButtonText: 'Kembali'
                });
            else{
                $('#spinner-modal').fadeIn("slow");
                if(this.statusAdd){
                    // console.log("create")
                    let url = import.meta.env.VITE_FRONTEND_URL+"/recruitment?id="+(this.recruitment[this.recruitment.length-1].id+1)
                    axios.post(this.port+'/job_vacancy/create',{
                        "name": this.nama,
                        "list_pekerjaan": this.lowongan,
                        "start_date": date,
                        "url": url
                    })
                    .then((response) => {
                        axios
                        .get(this.port+'/job_vacancy/all')
                        .then(({data}) => (
                            this.recruitment = data,
                            this.lowongan = [],
                            this.nama = "",
                            $('#spinner-modal').fadeOut("slow"),
                            $('#modalRecruitment').fadeOut("fast"),
                            $('#bg').fadeOut("slow"),
                            Swal.fire(
                                'Created!',
                                'Rekrutmen Baru Berhasil Dibuat!',
                                'success'
                            )
                            .then(function(){
                            })
                        ))
                    }).catch( error => { 
                        console.log('error: ' + error) 
                    });
                }else{
                    // console.log("update")
                    let url = import.meta.env.VITE_FRONTEND_URL+"/recruitment?id="+this.updating
                    axios.post(this.port+'/job_vacancy/update',{
                        "name": this.nama,
                        "list_pekerjaan": this.lowongan,
                        "start_date": this.tanggalUpdating,
                        "url": url,
                        "updating_id": this.updating,
                        "status": this.aktif?2:1
                    })
                    .then((response) => {
                        axios
                        .get(this.port+'/job_vacancy/all')
                        .then(({data}) => (
                            this.recruitment = data,
                            this.lowongan = [],
                            this.nama = "",
                            $('#spinner-modal').fadeOut("slow"),
                            $('#modalRecruitment').fadeOut("fast"),
                            $('#bg').fadeOut("slow"),
                            Swal.fire(
                                'Updated!',
                                'Rekrutmen Berhasil Diperbarui!',
                                'success'
                            )
                            .then(function(){
                            })
                        ))
                    }).catch( error => { 
                        console.log('error: ' + error) 
                    });
                }
            }
        },
        tambahLowongan(){
            if(this.isiLowongan!='' && !this.lowongan.includes(this.isiLowongan)){
                this.lowongan.push(this.isiLowongan)
                this.isiLowongan = ""
            }
        },
        hapusLowongan(lowonganKerja){
            var idx = this.lowongan.indexOf(lowonganKerja);
            if (idx !== -1) {
                this.lowongan.splice(idx, 1);
            }
        },
        gantiJobVacancy(id){
            axios
            .get(this.port+'/applicant/vacancy/'+id)
            .then(({data}) => (
                this.applicant = data
            ))
        }
    },
    created() {
        this.$emit('updateHeader', 'Rekrutmen')
        this.$emit('updateMenu', 'recruitment')
    },
    mounted(){
        axios
        .get(this.port+'/job_vacancy/all')
        .then(({data}) => (
            this.recruitment = data
            // console.log(import.meta.env.VITE_FRONTEND_URL+"/recruitment?id="+(this.recruitment[this.recruitment.length-1].id+1))
        ))
    }
}
</script>

<style>
input:checked ~ .dot {
  transform: translateX(100%);
  background-color: #33CCFF;
}
</style>