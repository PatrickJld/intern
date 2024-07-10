<template>
    <div class="flex items-center w-full bg-foreground-4-100 px-4 py-2">
        <!-- <img src="../../../assets/logo.png" alt="" class="w-14 h-10"> -->
        <div class="text-center bg-background-400 rounded-xl flex items-center px-1 h-12">
            <img src="../../../assets/logo.png" alt="" class="w-14 h-10">
        </div>
        <div class="text-white text-center w-full relative bottom-2">
            <p class="font-bold text-sm">PT. Adiputro Wirasejati</p>
            <div class="text-xs">
                <p>Jl. Raya Balearjosari no. 35, Malang, Jawa Timur - Indonesia 65126</p>
                <p>+62 (0) 341 491 139 | Adiputrogroup.com</p>
            </div>
        </div>
    </div>
    
    <div class="px-2 py-1">
        <div v-if="this.biodata!=null" class="h-full relative flex flex-col flex-grow pb-3 text-[0.6rem]">
            <div class="mb-2 mt-1">
                <!-- saudara kandung -->
                <div class="ml-5 mb-2">
                    <table class="table-fixed w-full font-semibold">
                        <thead class="bg-foreground-4-100 text-white">
                            <tr>
                                <th class="font-semibold w-3/12"><span class="relative bottom-1.5">NAMA SAUDARA KANDUNG</span></th>
                                <th class="font-semibold w-3/12"><span class="relative bottom-1.5">TEMPAT & TGL LAHIR</span></th>
                                <th class="font-semibold w-3/12"><span class="relative bottom-1.5">ALAMAT</span></th>
                                <th class="font-semibold w-2/12"><span class="relative bottom-1.5">PENDIDIKAN</span></th>
                                <th class="font-semibold w-2/12"><span class="relative bottom-1.5">PEKERJAAN</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-center odd:bg-foreground-4-50 even:bg-foreground-4-10" v-for="i in biodata.keluarga.saudara_kandung" :key="i">
                                <td class="py-1"><span class="relative bottom-1.5">{{i.nama}}</span></td>
                                <td><span class="relative bottom-1.5">{{i.ttl}}</span></td>
                                <td><span class="relative bottom-1.5">{{i.alamat}}</span></td>
                                <td><span class="relative bottom-1.5">{{i.pendidikan}}</span></td>
                                <td><span class="relative bottom-1.5">{{i.pekerjaan}}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="mb-2">
                <div class="flex mb-2 font-bold">
                    <p class="mr-2">23.</p>
                    <p>RIWAYAT PEKERJAAN DI TEMPAT LAIN:</p>
                </div>
                <div class="ml-5">
                    <table class="table-fixed w-full font-semibold">
                        <thead class="bg-foreground-4-100 text-white">
                            <tr>
                                <th class="font-semibold w-2/12"><span class="relative bottom-1.5">DARI TGL/TAHUN</span></th>
                                <th class="font-semibold w-2/12"><span class="relative bottom-1.5">SAMPAI</span></th>
                                <th class="font-semibold w-3/12"><span class="relative bottom-1.5">NAMA PERUSAHAAN</span></th>
                                <th class="font-semibold w-2/12"><span class="relative bottom-1.5">KOTA</span></th>
                                <th class="font-semibold w-2/12"><span class="relative bottom-1.5">BID. USAHA</span></th>
                                <th class="font-semibold w-2/12"><span class="relative bottom-1.5">JABATAN/BAGIAN</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-center odd:bg-foreground-4-50 even:bg-foreground-4-10" v-for="i in biodata.riwayat_pekerjaan.riwayat" :key="i">
                                <td class="py-1"><span class="relative bottom-1.5">{{i.dari}}</span></td>
                                <td><span class="relative bottom-1.5">{{i.sampai}}</span></td>
                                <td><span class="relative bottom-1.5">{{i.nama_perusahaan}}</span></td>
                                <td><span class="relative bottom-1.5">{{i.kota}}</span></td>
                                <td><span class="relative bottom-1.5">{{i.bidang_usaha}}</span></td>
                                <td><span class="relative bottom-1.5">{{i.jabatan}}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="ml-5">
                    <p class="font-bold mt-3">Apabila Anda pernah bekerja di tempat lain coba sebutkan gaji yang anda peroleh? </p>
                    <p class="mb-2">
                        {{biodata.riwayat_pekerjaan.gaji_diperoleh}}
                    </p>

                    <p class="font-bold">Mengapa Anda berhenti dari pekerjaan yang lama, jelaskan secara singkat:</p>
                    <p>
                        {{biodata.riwayat_pekerjaan.alasan_berhenti}}
                    </p>
                </div>
            </div>

            <div class="mb-2">
                <div class="flex mb-2 font-bold">
                    <p class="mr-2">24.</p>
                    <p>TRAINING / KURSUS  YANG PERNAH DI IKUTI:</p>
                </div>
                <div class="ml-5">
                    <table class="table-fixed w-full font-semibold">
                        <thead class="bg-foreground-4-100 text-white">
                            <tr>
                                <th class="font-semibold w-3/12"><span class="relative bottom-1.5">MATERI</span></th>
                                <th class="font-semibold w-3/12"><span class="relative bottom-1.5">PENYELENGGARA</span></th>
                                <th class="font-semibold w-2/12"><span class="relative bottom-1.5">TAHUN</span></th>
                                <th class="font-semibold w-2/12"><span class="relative bottom-1.5">TEMPAT</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-center odd:bg-foreground-4-50 even:bg-foreground-4-10" v-for="i in biodata.training_kursus" :key="i">
                                <td class="py-1"><span class="relative bottom-1.5">{{i.materi}}</span></td>
                                <td><span class="relative bottom-1.5">{{i.penyelenggara}}</span></td>
                                <td><span class="relative bottom-1.5">{{i.tahun}}</span></td>
                                <td><span class="relative bottom-1.5">{{i.tempat}}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="mb-2">
                <div class="flex mb-2 font-bold">
                    <p class="mr-2">25.</p>
                    <p>ORGANISASI YANG PERNAH DI IKUTI:</p>
                </div>
                <div class="ml-5">
                    <table class="table-fixed w-full font-semibold">
                        <thead class="bg-foreground-4-100 text-white">
                            <tr>
                                <th class="font-semibold w-3/12"><span class="relative bottom-1.5">ORGANISASI</span></th>
                                <th class="font-semibold w-3/12"><span class="relative bottom-1.5">TEMPAT</span></th>
                                <th class="font-semibold w-2/12"><span class="relative bottom-1.5">MASA</span></th>
                                <th class="font-semibold w-2/12"><span class="relative bottom-1.5">JABATAN</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-center odd:bg-foreground-4-50 even:bg-foreground-4-10" v-for="i in biodata.organisasi" :key="i">
                                <td class="py-1"><span class="relative bottom-1.5">{{i.nama}}</span></td>
                                <td><span class="relative bottom-1.5">{{i.tempat}}</span></td>
                                <td><span class="relative bottom-1.5">{{i.masa}}</span></td>
                                <td><span class="relative bottom-1.5">{{i.jabatan}}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="mb-2">
                <div class="flex mb-2 font-bold">
                    <p class="mr-2">26.</p>
                    <p>BAHASA YANG DIKUASAI:</p>
                </div>
                <div class="ml-5">
                    <table class="table-fixed w-full font-semibold">
                        <thead class="bg-foreground-4-100 text-white">
                            <tr>
                                <th rowspan="2" class="font-semibold w-3/12"><span class="relative bottom-1.5">BAHASA</span></th>
                                <th class="font-semibold w-2/12 border-b-[1px] border-white"><span class="relative bottom-1.5">BERBICARA</span></th>
                                <th class="font-semibold w-2/12 border-b-[1px] border-white"><span class="relative bottom-1.5">MENDENGAR</span></th>
                                <th class="font-semibold w-2/12 border-b-[1px] border-white"><span class="relative bottom-1.5">MENULIS</span></th>
                            </tr>
                            <tr>
                                <th class="font-normal w-3/12"><span class="relative bottom-1.5">KURANG/CUKUP/BAIK</span></th>
                                <th class="font-normal w-2/12"><span class="relative bottom-1.5">KURANG/CUKUP/BAIK</span></th>
                                <th class="font-normal w-2/12"><span class="relative bottom-1.5">KURANG/CUKUP/BAIK</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-center odd:bg-foreground-4-50 even:bg-foreground-4-10" v-for="i in biodata.bahasa_dikuasai" :key="i">
                                <td class="py-1"><span class="relative bottom-1.5">{{i.bahasa}}</span></td>
                                <td><span class="relative bottom-1.5">{{i.berbicara}}</span></td>
                                <td><span class="relative bottom-1.5">{{i.mendengar}}</span></td>
                                <td><span class="relative bottom-1.5">{{i.menulis}}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="mb-2">
                <div class="flex">
                    <p class="mr-2 font-bold">27.</p>
                    <p class="font-bold mr-2">Berapa lama Anda harus memberitahu pada perusahaan lama untuk berhenti bekerja :</p>
                    <p>{{biodata.keterangan_kerja.lama_berhenti_kerja}}</p>
                </div>
                <div class="ml-5">
                    <div class="mt-2 flex gap-2">
                        <p class="font-bold">Dan mulai kapan Anda dapat mulai bekerja jika Anda di terima di PT. Adiputro Wirasejati :</p>
                        <p>{{biodata.keterangan_kerja.bisa_mulai_kerja}}</p>
                    </div>

                    <div class="mt-2 flex gap-2">
                        <p class="mb-1 font-bold">Apakah Anda memiliki saudara / kenalan di perusahaan ini: </p>
                        <p>{{biodata.keterangan_kerja.kenalan_perusahaan}}</p>
                    </div>
                    
                    <div>
                        <p class="font-bold">Bila YA, Sebutkan:</p>
                        <div class="flex gap-2">
                            <div class="font-bold">
                                <p>Nama</p>
                                <p>Alamat</p>
                                <p>Jabatan</p>
                            </div>
                            <div class="font-bold">
                                <p v-for="i in 3" :key="i">:</p>
                            </div>
                            <div>
                                <p>{{biodata.keterangan_kerja.kenalan.nama}}</p>
                                <p>{{biodata.keterangan_kerja.kenalan.alamat}}</p>
                                <p>{{biodata.keterangan_kerja.kenalan.jabatan}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex mb-2 mr-3">
                <p class="mr-2 font-bold">28.</p>
                <div class="flex gap-2">
                    <p class="font-bold">Bersediakah Anda menjalani Pelatihan kerja  selama 6 (enam) bulan di PT. Adiputro Wirasejati: </p>
                    <p>{{biodata.pelatihan_kerja}}</p>
                </div>
            </div>

            <div class="mb-2">
                <div class="flex font-bold">
                    <p class="mr-2">29.</p>
                    <p>Apakah tujuan Anda bekerja, Jelaskan: </p>
                </div>
                <div class="ml-5">
                    {{biodata.tujuan_kerja}}
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    props: {
        "data": { type: Object, default: {}, required: true }
    },
    data() {
        return {
            biodata: null
        }
    },
    mounted() {
        this.biodata = this.data
        // console.log(this.data)
    },
}
</script>

<style>

</style>