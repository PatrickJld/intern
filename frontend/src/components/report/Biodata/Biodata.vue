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
            <div class="flex mb-5">
                <div class="w-6/12">
                    <div class="ml-2 flex gap-2">
                        <div class="font-bold flex justify-between w-6/12">
                            <div class="flex">
                                <p class="mt-2 mr-2">1. </p>
                                <p class="mt-2">NAMA LENGKAP</p>
                            </div>
                            <p class="mt-2">:</p>
                        </div>
                        <p class="mt-2">{{biodata.nama_lengkap}}</p>
                    </div>
                    
                    <div class="ml-2 flex gap-2">
                        <div class="font-bold flex justify-between w-6/12">
                            <div class="flex">
                                <p class="mt-1 mr-2">2. </p>
                                <p class="mt-1">NAMA PANGGILAN</p>
                            </div>
                            <p class="mt-1">:</p>
                        </div>
                        <p class="mt-1">{{biodata.nama_panggilan}}</p>
                    </div>
                    
                    <div class="ml-2 flex gap-2">
                        <div class="font-bold flex justify-between w-6/12">
                            <div class="flex">
                                <p class="mt-1 mr-2">3. </p>
                                <p class="mt-1">ALAMAT DI KTP</p>
                            </div>
                            <p class="mt-1">:</p>
                        </div>
                        <p class="mt-1">{{biodata.alamat_ktp}}</p>
                    </div>
                    
                    <div class="ml-2 flex gap-2">
                        <div class="font-bold flex justify-between w-6/12">
                            <div class="flex">
                                <p class="mt-1 mr-2">4. </p>
                                <p class="mt-1">ALAMAT SEKARANG</p>
                            </div>
                            <p class="mt-1">:</p>
                        </div>
                        <p class="mt-1">{{biodata.alamat_skg}}</p>
                    </div>
                    
                    <div class="ml-2 flex gap-2">
                        <div class="font-bold flex justify-between w-6/12">
                            <div class="flex">
                                <p class="mt-1 mr-2">5. </p>
                                <p class="mt-1">TELEPON/HP</p>
                            </div>
                            <p class="mt-1">:</p>
                        </div>
                        <p class="mt-1">{{biodata.no_hp}}</p>
                    </div>
                    
                    <div class="ml-2 flex gap-2">
                        <div class="font-bold flex justify-between w-6/12">
                            <div class="flex">
                                <p class="mt-1 mr-2">6. </p>
                                <p class="mt-1">TEMPAT & TGL LAHIR</p>
                            </div>
                            <p class="mt-1">:</p>
                        </div>
                        <p class="mt-1">{{biodata.ttl}}</p>
                    </div>
                    
                    <div class="ml-2 flex gap-2">
                        <div class="font-bold flex justify-between w-6/12">
                            <div class="flex">
                                <p class="mt-1 mr-2">7. </p>
                                <p class="mt-1">KEWARGANEGARAAN</p>
                            </div>
                            <p class="mt-1">:</p>
                        </div>
                        <p class="mt-1">{{biodata.kewarganegaraan}}</p>
                    </div>
                    
                    <div class="ml-2 flex gap-2">
                        <div class="font-bold flex justify-between w-6/12">
                            <div class="flex">
                                <p class="mt-1 mr-2">8. </p>
                                <p class="mt-1">SUKU</p>
                            </div>
                            <p class="mt-1">:</p>
                        </div>
                        <p class="mt-1">{{biodata.suku}}</p>
                    </div>
                </div>
                
                <div class="w-6/12">
                    <div class="ml-2 flex gap-2">
                        <div class="font-bold flex justify-between w-6/12">
                            <div class="flex">
                                <p class="mt-2 mr-3">9. </p>
                                <p class="mt-2">AGAMA</p>
                            </div>
                            <p class="mt-2">:</p>
                        </div>
                        <p class="mt-2">{{biodata.agama}}</p>
                    </div>
                    
                    <div class="ml-2 flex gap-2">
                        <div class="font-bold flex justify-between w-6/12">
                            <div class="flex">
                                <p class="mt-1 mr-2">10. </p>
                                <p class="mt-1">USIA</p>
                            </div>
                            <p class="mt-1">:</p>
                        </div>
                        <p class="mt-1">{{biodata.usia}} Tahun</p>
                    </div>
                    
                    <div class="ml-2 flex gap-2">
                        <div class="font-bold flex justify-between w-6/12">
                            <div class="flex">
                                <p class="mt-1 mr-2">11. </p>
                                <p class="mt-1">TINGGI BADAN</p>
                            </div>
                            <p class="mt-1">:</p>
                        </div>
                        <p class="mt-1">{{biodata.tinggi_badan}} cm</p>
                    </div>
                    
                    <div class="ml-2 flex gap-2">
                        <div class="font-bold flex justify-between w-6/12">
                            <div class="flex">
                                <p class="mt-1 mr-2">12. </p>
                                <p class="mt-1">BERAT BADAN</p>
                            </div>
                            <p class="mt-1">:</p>
                        </div>
                        <p class="mt-1">{{biodata.berat_badan}} kg</p>
                    </div>
                    
                    <div class="ml-2 flex gap-2">
                        <div class="font-bold flex justify-between w-6/12">
                            <div class="flex">
                                <p class="mt-1 mr-2">13. </p>
                                <p class="mt-1">NO KTP / SIM / PASPOR</p>
                            </div>
                            <p class="mt-1">:</p>
                        </div>
                        <p class="mt-1">{{biodata.no_identitas}}</p>
                    </div>
                    
                    <div class="ml-2 flex gap-2">
                        <div class="font-bold flex justify-between w-6/12">
                            <div class="flex">
                                <p class="mt-1 mr-2">14. </p>
                                <p class="mt-1">GOLONGAN DARAH</p>
                            </div>
                            <p class="mt-1">:</p>
                        </div>
                        <p class="mt-1">{{biodata.golongan_darah}}</p>
                    </div>
                    
                    <div class="ml-2 flex gap-2">
                        <div class="font-bold flex justify-between w-6/12">
                            <div class="flex">
                                <p class="mt-1 mr-2">15. </p>
                                <p class="mt-1">NO NPWP</p>
                            </div>
                            <p class="mt-1">:</p>
                        </div>
                        <p class="mt-1">{{biodata.no_npwp}}</p>
                    </div>
                    
                    <div class="ml-2 flex gap-2">
                        <div class="font-bold flex justify-between w-6/12">
                            <div class="flex">
                                <p class="mt-1 mr-2">16. </p>
                                <p class="mt-1">E-MAIL</p>
                            </div>
                            <p class="mt-1">:</p>
                        </div>
                        <p class="mt-1">{{biodata.email}}</p>
                    </div>
                </div>
            </div>

            <div class="mb-2">
                <div class="flex mb-1">
                    <p class="mr-2 font-bold">17.</p>
                    <p><span class="font-bold">Jenis Kelamin :</span> {{biodata.jenis_kelamin=="L"?"Laki-Laki":"Perempuan"}}</p>
                </div>
            </div>

            <div class="mb-2">
                <div class="w-full flex">
                    <p class="mr-2 font-bold">18.</p>
                    <div class="w-1/2">
                        <div class="mr-4">
                            <p class="font-bold">Keadaan Kesehatan pada saat ini : </p>
                            <p>{{biodata.kesehatan.keadaan}}</p>
                        </div>
                        <div class="mt-2">
                            <p id="sakitKeras" class="font-bold">Apakah anda pernah sakit keras/kecelakaan?</p>
                            <p>{{biodata.kesehatan.sakit_keras}}, {{biodata.kesehatan.kapan}}</p>
                        </div>
                    </div>
                    <div class="w-1/2">
                        <div>
                            <div class="flex gap-2">
                                <p class="font-bold">Apakah ada cacat tubuh? </p>
                                <p>{{biodata.kesehatan.cacat}}</p>
                            </div>
                            <p class="text-gray-400 italic">(Misal: penglihatan / pendengaran / pengucapan / jantung / dll.)</p>
                            <div>
                                <p class="font-bold">Keterangan Cacat: </p>
                                <p>{{biodata.kesehatan.cacat_desc}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mb-2">
                <div class="flex w-full">
                    <p class="mr-2 font-bold">19.</p>
                    <div>
                        <div class="flex w-full gap-2">
                            <p class="font-bold">Apakah anda belum menikah/menikah? </p>
                            <p>{{biodata.status_nikah.menikah}}</p>
                        </div>
                        <div class="flex gap-2">
                            <div class="font-bold">
                                <p>Nama Suami/Istri</p>
                                <p>Nama Anak</p>
                            </div>
                            <div>
                                <p v-for="i in 2" :key="i">:</p>
                            </div>
                            <div>
                                <p>{{biodata.status_nikah.nama_suami_istri}}</p>
                                <p>{{biodata.status_nikah.nama_anak}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mb-2">
                <div class="flex mb-1 font-bold">
                    <p class="mr-2">20.</p>
                    <p>PENDIDIKAN TERAKHIR</p>
                </div>
                <div class="ml-5">
                    <table class="table-fixed w-full font-semibold">
                        <thead class="bg-foreground-4-100 text-white">
                            <tr>
                                <th class="font-semibold w-2/12"><span class="relative bottom-1.5">TINGKAT/GELAR</span></th>
                                <th class="font-semibold w-2/12"><span class="relative bottom-1.5">JURUSAN</span></th>
                                <th class="font-semibold w-3/12"><span class="relative bottom-1.5">NAMA SEKOLAH</span></th>
                                <th class="font-semibold w-2/12"><span class="relative bottom-1.5">KOTA</span></th>
                                <th class="font-semibold w-2/12"><span class="relative bottom-1.5">TAHUN KELULUSAN</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-center odd:bg-foreground-4-50 even:bg-foreground-4-10" v-for="i in biodata.pendidikan" :key="i">
                                <td class="py-1"><span class="relative bottom-1.5">{{i.tingkat}}</span></td>
                                <td><span class="relative bottom-1.5">{{i.jurusan}}</span></td>
                                <td><span class="relative bottom-1.5">{{i.nama_sekolah}}</span></td>
                                <td><span class="relative bottom-1.5">{{i.kota}}</span></td>
                                <td><span class="relative bottom-1.5">{{i.tahun_lulus}}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="mb-2">
                <div class="flex mb-1 font-bold">
                    <p class="mr-2">21.</p>
                    <p>Mengapa Anda ingin bekerja di perusahaan kami? Jelaskan secara singkat:</p>
                </div>
                <div class="ml-5">
                    {{biodata.alasan_bekerja}}
                </div>
            </div>

            <div>
                <div class="flex mb-1 font-bold">
                    <p class="mr-2">22.</p>
                    <p>KELUARGA</p>
                </div>

                <!-- orang tua -->
                <div class="ml-5 mb-2">
                    <table class="table-fixed w-full font-semibold">
                        <thead class="bg-foreground-4-100 text-white">
                            <tr>
                                <th class="font-semibold w-3/12"><span class="relative bottom-1.5">NAMA ORANG TUA</span></th>
                                <th class="font-semibold w-3/12"><span class="relative bottom-1.5">TEMPAT & TGL LAHIR</span></th>
                                <th class="font-semibold w-3/12"><span class="relative bottom-1.5">ALAMAT</span></th>
                                <th class="font-semibold w-2/12"><span class="relative bottom-1.5">PENDIDIKAN</span></th>
                                <th class="font-semibold w-2/12"><span class="relative bottom-1.5">PEKERJAAN</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-center odd:bg-foreground-4-50 even:bg-foreground-4-10" v-for="i in biodata.keluarga.orang_tua" :key="i">
                                <td class="py-1"><span class="relative bottom-1.5">{{i.nama}}</span></td>
                                <td><span class="relative bottom-1.5">{{i.ttl}}</span></td>
                                <td><span class="relative bottom-1.5">{{i.alamat}}</span></td>
                                <td><span class="relative bottom-1.5">{{i.pendidikan}}</span></td>
                                <td><span class="relative bottom-1.5">{{i.pekerjaan}}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- istri/suami -->
                <div class="ml-5 mb-2">
                    <table class="table-fixed w-full font-semibold">
                        <thead class="bg-foreground-4-100 text-white">
                            <tr>
                                <th class="font-semibold w-3/12"><span class="relative bottom-1.5">NAMA ISTRI/SUAMI</span></th>
                                <th class="font-semibold w-3/12"><span class="relative bottom-1.5">TEMPAT & TGL LAHIR</span></th>
                                <th class="font-semibold w-3/12"><span class="relative bottom-1.5">ALAMAT</span></th>
                                <th class="font-semibold w-3/12"><span class="relative bottom-1.5">PENDIDIKAN</span></th>
                                <th class="font-semibold w-3/12"><span class="relative bottom-1.5">PEKERJAAN</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-center odd:bg-foreground-4-50 even:bg-foreground-4-10" v-for="i in biodata.keluarga.istri_suami" :key="i">
                                <td class="py-1"><span class="relative bottom-1.5">{{i.nama}}</span></td>
                                <td><span class="relative bottom-1.5">{{i.ttl}}</span></td>
                                <td><span class="relative bottom-1.5">{{i.alamat}}</span></td>
                                <td><span class="relative bottom-1.5">{{i.pendidikan}}</span></td>
                                <td><span class="relative bottom-1.5">{{i.pekerjaan}}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- anak kandung -->
                <div class="ml-5 mb-2">
                    <table class="table-fixed w-full font-semibold">
                        <thead class="bg-foreground-4-100 text-white">
                            <tr>
                                <th class="font-semibold w-3/12"><span class="relative bottom-1.5">NAMA ANAK KANDUNG</span></th>
                                <th class="font-semibold w-3/12"><span class="relative bottom-1.5">TEMPAT & TGL LAHIR</span></th>
                                <th class="font-semibold w-3/12"><span class="relative bottom-1.5">ALAMAT</span></th>
                                <th class="font-semibold w-2/12"><span class="relative bottom-1.5">PENDIDIKAN</span></th>
                                <th class="font-semibold w-2/12"><span class="relative bottom-1.5">PEKERJAAN</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-center odd:bg-foreground-4-50 even:bg-foreground-4-10" v-for="i in biodata.keluarga.anak_kandung" :key="i">
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