<template>
    <div class="z-10">
        <div class="w-9/12 h-full m-auto text-white relative mt-3 flex flex-col flex-grow pb-3 overflow-hidden">
            <div v-if="this.dataApplicant!=null" class="bg-foreground-3-500 w-full h-full rounded-xl text-black overflow-y-auto no-scrollbar py-5 px-5">
                <h1 class="text-3xl font-bold mb-2">Biodata</h1>
                <div class="flex mb-5">
                    <div class="w-6/12 flex gap-5">
                        <div class="font-bold">
                            <p class="mt-2">NAMA LENGKAP</p>
                            <p class="mt-2">NO KTP</p>
                            <p class="mt-2">TEMPAT LAHIR</p>
                            <p class="mt-2">TANGGAL LAHIR</p>
                            <p class="mt-2">ALAMAT DOMISILI</p>
                            <p class="mt-2">USIA</p>
                        </div>
                        <div>
                            <p class="mt-2"><span class="font-bold">:</span> {{this.dataApplicant.nama}}</p>
                            <p class="mt-2"><span class="font-bold">:</span> {{this.dataApplicant.no_ktp}}</p>
                            <p class="mt-2"><span class="font-bold">:</span> {{this.dataApplicant.tempat_lahir}}</p>
                            <p class="mt-2"><span class="font-bold">:</span> {{this.dataApplicant.tanggal_lahir}}</p>
                            <p class="mt-2"><span class="font-bold">:</span> {{this.dataApplicant.alamat_domisili}}</p>
                            <p class="mt-2"><span class="font-bold">:</span> {{this.dataApplicant.usia}} Tahun</p>
                        </div>
                    </div>

                    <div class="w-6/12 flex gap-5">
                        <div class="font-bold">
                            <p class="mt-2">NO.TELEPON/HP</p>
                            <p class="mt-2">E-MAIL</p>
                            <p class="mt-2">JENIS KELAMIN</p>
                            <p class="mt-2">STATUS PERKAWINAN</p>
                            <p class="mt-2">POSISI YANG DILAMAR</p>
                        </div>

                        <div>
                            <p class="mt-2"><span class="font-bold">:</span> {{this.dataApplicant.nomor_hp}}</p>
                            <p class="mt-2"><span class="font-bold">:</span> {{this.dataApplicant.email}}</p>
                            <p class="mt-2"><span class="font-bold">:</span> {{this.dataApplicant.jenis_kelamin=="L" ? "Laki-Laki" : "Perempuan"}}</p>
                            <p class="mt-2"><span class="font-bold">:</span> {{this.dataApplicant.status_perkawinan}}</p> 
                            <p class="mt-2"><span class="font-bold">:</span> {{this.dataApplicant.posisi_dilamar}}</p> 
                        </div>
                    </div>
                </div>
                
                <div class="flex mb-5">
                    <div class="w-6/12">
                        <p class="font-bold">PENDIDIKAN TERAKHIR</p>
                        <div class="w-full flex gap-9 mb-5">
                            <div class="font-bold">
                                <p class="mt-2">GELAR</p>
                                <p class="mt-2">JURUSAN</p>
                                <p class="mt-2">NAMA SEKOLAH</p>
                            </div>
                            <div>
                                <p class="mt-2"></p>
                                <p class="mt-2"><span class="font-bold">:</span> {{this.dataApplicant.pendidikan_terakhir}}</p>
                                <p class="mt-2"><span class="font-bold">:</span> {{this.dataApplicant.jurusan}}</p>
                                <p class="mt-2"><span class="font-bold">:</span> {{this.dataApplicant.nama_sekolah}}</p>
                            </div>
                        </div>
                    </div>

                    <div class="w-6/12">
                        <div class="mb-2 flex gap-2">
                            <p class="font-bold mb-2">PORTOFOLIO :</p>
                            <a :href="this.dataApplicant.portofolio" class="hover:underline hover:text-blue-700">
                                Lihat Portofolio (klik disini)
                            </a>
                        </div>
                        <div class="mb-2 flex gap-2">
                            <p class="font-bold mb-2">LAMPIRAN :</p>
                            <a :href="getFile(this.dataApplicant.lampiran_drive_id)" class="hover:underline hover:text-blue-700">
                                Lihat Lampiran (klik disini)
                            </a>
                        </div>
                    </div>
                </div>
                
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
        return{
            dataApplicant: null,
            month: ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],
            port: import.meta.env.VITE_BACKEND_URL
        }
    },
    methods: {
        subPendidikanCount(){ if (this.pendidikanCount>1) this.pendidikanCount-- },
        getDate(){
            const today = new Date()
            const date = ('00'+today.getDate()).slice(-2) + " " + this.month[today.getMonth()] + " " + today.getFullYear()
            return date
        },
        getFile(id){
            return "https://drive.google.com/file/d/"+id+"/view?usp=sharing"
        },
    },
    mounted() {
        axios
        .get(this.port+"/applicant/"+this.$route.query.email)
        .then(({data}) => (
            this.dataApplicant = data
        ))
    },
    created(){
        this.$emit('updateHeader', 'Detail Pelamar')
    }
}
</script>

<style>

</style>