<template>
    <div v-if="this.biodata!=null" class="w-9/12 h-full m-auto text-white relative flex flex-col flex-grow pb-3 overflow-hidden">
        <div method="" action="" autocomplete="off" class="bg-foreground-3-500 w-full h-full rounded-xl text-black overflow-y-auto no-scrollbar py-5 px-5">
            <div class="flex justify-between">
                <h1 class="text-3xl font-bold mb-2">Biodata</h1>
                <button class="bg-foreground-4-100 hover:bg-foreground-4-200 text-white px-3 py-2 rounded-md" @click="this.$router.go(-1)">
                    <i class="fa fa-chevron-left mr-2 text-xl"></i>
                    <span class="font-bold text-xl">Kembali</span>
                </button>
            </div>
            <div class="flex mb-5">
                <div class="mr-2 font-bold">
                    <p class="mt-2">1. </p>
                    <p class="mt-4" v-for="i in 7" :key="i">{{i+1}}. </p>
                </div>
                <div class="w-6/12 ml-2 flex">
                    <div class="font-bold">
                        <p class="mt-2">NAMA LENGKAP</p>
                        <p class="mt-4">NAMA PANGGILAN</p>
                        <p class="mt-4">ALAMAT DI KTP</p>
                        <p class="mt-4">ALAMAT SEKARANG</p>
                        <p class="mt-4">TELEPON/HP</p>
                        <p class="mt-4">TEMPAT & TGL LAHIR</p>
                        <p class="mt-4">KEWARGANEGARAAN</p>
                        <p class="mt-4">SUKU</p>
                    </div>
                    <div class="mx-2 font-bold">
                        <p class="mt-2">:</p>
                        <p class="mt-4" v-for="i in 7" :key="i">:</p>
                    </div>
                    <div>
                        <p class="mt-2">{{biodata.nama_lengkap == "" ? "-" : biodata.nama_lengkap}}</p>
                        <p class="mt-4">{{biodata.nama_panggilan == "" ? "-" : biodata.nama_panggilan }}</p>
                        <p class="mt-4">{{biodata.alamat_ktp == "" ? "-" : biodata.alamat_ktp }}</p>
                        <p class="mt-4">{{biodata.alamat_skg == "" ? "-" : biodata.alamat_skg }}</p>
                        <p class="mt-4">{{biodata.no_hp == "" ? "-" : biodata.no_hp }}</p>
                        <p class="mt-4">{{biodata.ttl == "" ? "-" : biodata.ttl }}</p>
                        <p class="mt-4">{{biodata.kewarganegaraan == "" ? "-" : biodata.kewarganegaraan }}</p>
                        <p class="mt-4">{{biodata.suku == "" ? "-" : biodata.suku }}</p>
                    </div>
                </div>

                
                <div class="mr-2 font-bold">
                    <p class="mt-2">9. </p>
                    <p class="mt-4" v-for="i in 7" :key="i">{{i+9}}. </p>
                </div>
                <div class="w-6/12 mr-10 ml-2 flex">
                    <div class="font-bold">
                        <p class="mt-2">AGAMA</p>
                        <p class="mt-4">USIA</p>
                        <p class="mt-4">TINGGI BADAN</p>
                        <p class="mt-4">BERAT BADAN</p>
                        <p class="mt-4">NO KTP / SIM / PASPOR</p>
                        <p class="mt-4">GOLONGAN DARAH</p>
                        <p class="mt-4">NO NPWP</p>
                        <p class="mt-4">E-MAIL</p>
                    </div>
                    <div class="mx-2 font-bold">
                        <p class="mt-2">:</p>
                        <p class="mt-4" v-for="i in 7" :key="i">:</p>
                    </div>
                    <div>
                        <p class="mt-2">{{biodata.agama == "" ? "-" : biodata.agama }}</p>
                        <p class="mt-4">{{biodata.usia == "" ? "-" : biodata.usia }} Tahun</p>
                        <p class="mt-4">{{biodata.tinggi_badan == "" ? "-" : biodata.tinggi_badan }} cm</p>
                        <p class="mt-4">{{biodata.berat_badan == "" ? "-" : biodata.berat_badan }} kg</p>
                        <p class="mt-4">{{biodata.no_identitas == "" ? "-" : biodata.no_identitas }}</p>
                        <p class="mt-4">{{biodata.golongan_darah == "" ? "-" : biodata.golongan_darah }}</p>
                        <p class="mt-4">{{biodata.no_npwp == "" ? "-" : biodata.no_npwp }}</p>
                        <p class="mt-4">{{biodata.email == "" ? "-" : biodata.email }}</p>
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
                        <div class="mr-4 flex gap-2">
                            <p class="mb-1 font-bold">Keadaan Kesehatan pada saat ini : </p>
                            <p>{{biodata.kesehatan.keadaan == "" ? "-" : biodata.kesehatan.keadaan}}</p>
                        </div>
                        <div class="mt-2">
                            <p id="sakitKeras" class="mb-1 font-bold">Apakah anda pernah sakit keras/kecelakaan?</p>
                            <p>{{biodata.kesehatan.sakit_keras == "" ? "-" : biodata.kesehatan.sakit_keras}}, 
                                {{biodata.kesehatan.kapan == "" ? "-" : biodata.kesehatan.kapan}}</p>
                        </div>
                    </div>
                    <div class="w-1/2">
                        <div>
                            <div class="flex gap-2">
                                <p class="font-bold">Apakah ada cacat tubuh? </p>
                                <p>{{biodata.kesehatan.cacat == "" ? "-" : biodata.kesehatan.cacat}}</p>
                            </div>
                            <p class="mb-1 text-gray-400 italic">(Misal: penglihatan / pendengaran / pengucapan / jantung / dll.)</p>
                            <div>
                                <p class="font-bold">Keterangan Cacat: </p>
                                <p>{{biodata.kesehatan.cacat_desc == "" ? "-" : biodata.kesehatan.cacat_desc}}</p>
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
                            <p class="mb-1 font-bold">Apakah anda belum menikah/menikah? </p>
                            <p>{{biodata.status_nikah.menikah == "" ? "-" : biodata.status_nikah.menikah}}</p>
                        </div>
                        <div class="flex gap-2">
                            <div class="font-bold">
                                <p class="mt-2">Nama Suami/Istri</p>
                                <p class="mt-2">Nama Anak</p>
                            </div>
                            <div>
                                <p class="mt-2" v-for="i in 2" :key="i">:</p>
                            </div>
                            <div>
                                <p class="mt-2">{{biodata.status_nikah.nama_suami_istri== "" ? "-" : biodata.status_nikah.nama_suami_istri}}</p>
                                <p class="mt-2">{{biodata.status_nikah.nama_anak== "" ? "-" : biodata.status_nikah.nama_anak}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="mb-2">
                <div class="flex mb-2 font-bold">
                    <p class="mr-2">20.</p>
                    <p>PENDIDIKAN TERAKHIR</p>
                </div>
                <div class="ml-7">
                    <table class="table-fixed w-full font-semibold">
                        <thead class="bg-foreground-4-100 text-white">
                            <tr>
                                <th class="font-semibold w-2/12">TINGKAT/GELAR</th>
                                <th class="font-semibold w-2/12">JURUSAN</th>
                                <th class="font-semibold w-3/12">NAMA SEKOLAH</th>
                                <th class="font-semibold w-2/12">KOTA</th>
                                <th class="font-semibold w-2/12">TAHUN KELULUSAN</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-center odd:bg-foreground-4-50 even:bg-foreground-4-10" v-for="i in biodata.pendidikan" :key="i">
                                <td class="py-1">{{i.tingkat}}</td>
                                <td>{{i.jurusan}}</td>
                                <td>{{i.nama_sekolah}}</td>
                                <td>{{i.kota}}</td>
                                <td>{{i.tahun_lulus}}</td>
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
                <div class="ml-7">
                    {{biodata.alasan_bekerja == "" ? "-" : biodata.alasan_bekerja}}
                </div>
            </div>

            <div class="mb-2">
                <div class="flex mb-2 font-bold">
                    <p class="mr-2">22.</p>
                    <p>KELUARGA</p>
                </div>

                <!-- orang tua -->
                <div class="ml-7 mb-2">
                    <table class="table-fixed w-full font-semibold">
                        <thead class="bg-foreground-4-100 text-white">
                            <tr>
                                <th class="font-semibold w-3/12">NAMA ORANG TUA</th>
                                <th class="font-semibold w-3/12">TEMPAT & TGL LAHIR</th>
                                <th class="font-semibold w-3/12">ALAMAT</th>
                                <th class="font-semibold w-2/12">PENDIDIKAN</th>
                                <th class="font-semibold w-2/12">PEKERJAAN</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-center odd:bg-foreground-4-50 even:bg-foreground-4-10" v-for="i in biodata.keluarga.orang_tua" :key="i">
                                <td class="py-1">{{i.nama}}</td>
                                <td>{{i.ttl}}</td>
                                <td>{{i.alamat}}</td>
                                <td>{{i.pendidikan}}</td>
                                <td>{{i.pekerjaan}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- istri/suami -->
                <div class="ml-7 mb-2">
                    <table class="table-fixed w-full font-semibold">
                        <thead class="bg-foreground-4-100 text-white">
                            <tr>
                                <th class="font-semibold w-3/12">NAMA ISTRI/SUAMI</th>
                                <th class="font-semibold w-3/12">TEMPAT & TGL LAHIR</th>
                                <th class="font-semibold w-3/12">ALAMAT</th>
                                <th class="font-semibold w-3/12">PENDIDIKAN</th>
                                <th class="font-semibold w-3/12">PEKERJAAN</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-center odd:bg-foreground-4-50 even:bg-foreground-4-10" v-for="i in biodata.keluarga.istri_suami" :key="i">
                                <td class="py-1">{{i.nama}}</td>
                                <td>{{i.ttl}}</td>
                                <td>{{i.alamat}}</td>
                                <td>{{i.pendidikan}}</td>
                                <td>{{i.pekerjaan}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- anak kandung -->
                <div class="ml-7 mb-2">
                    <table class="table-fixed w-full font-semibold">
                        <thead class="bg-foreground-4-100 text-white">
                            <tr>
                                <th class="font-semibold w-3/12">NAMA ANAK KANDUNG</th>
                                <th class="font-semibold w-3/12">TEMPAT & TGL LAHIR</th>
                                <th class="font-semibold w-3/12">ALAMAT</th>
                                <th class="font-semibold w-2/12">PENDIDIKAN</th>
                                <th class="font-semibold w-2/12">PEKERJAAN</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-center odd:bg-foreground-4-50 even:bg-foreground-4-10" v-for="i in biodata.keluarga.anak_kandung" :key="i">
                                <td class="py-1">{{i.nama}}</td>
                                <td>{{i.ttl}}</td>
                                <td>{{i.alamat}}</td>
                                <td>{{i.pendidikan}}</td>
                                <td>{{i.pekerjaan}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- saudara kandung -->
                <div class="ml-7 mb-2">
                    <table class="table-fixed w-full font-semibold">
                        <thead class="bg-foreground-4-100 text-white">
                            <tr>
                                <th class="font-semibold w-3/12">NAMA SAUDARA KANDUNG</th>
                                <th class="font-semibold w-3/12">TEMPAT & TGL LAHIR</th>
                                <th class="font-semibold w-3/12">ALAMAT</th>
                                <th class="font-semibold w-2/12">PENDIDIKAN</th>
                                <th class="font-semibold w-2/12">PEKERJAAN</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-center odd:bg-foreground-4-50 even:bg-foreground-4-10" v-for="i in biodata.keluarga.saudara_kandung" :key="i">
                                <td class="py-1">{{i.nama}}</td>
                                <td>{{i.ttl}}</td>
                                <td>{{i.alamat}}</td>
                                <td>{{i.pendidikan}}</td>
                                <td>{{i.pekerjaan}}</td>
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
                <div class="ml-7">
                    <table class="table-fixed w-full font-semibold">
                        <thead class="bg-foreground-4-100 text-white">
                            <tr>
                                <th class="font-semibold w-2/12">DARI TGL/TAHUN</th>
                                <th class="font-semibold w-2/12">SAMPAI</th>
                                <th class="font-semibold w-3/12">NAMA PERUSAHAAN</th>
                                <th class="font-semibold w-2/12">KOTA</th>
                                <th class="font-semibold w-2/12">BID. USAHA</th>
                                <th class="font-semibold w-2/12">JABATAN/BAGIAN</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-center odd:bg-foreground-4-50 even:bg-foreground-4-10" v-for="i in biodata.riwayat_pekerjaan.riwayat" :key="i">
                                <td class="py-1">{{i.dari}}</td>
                                <td>{{i.sampai}}</td>
                                <td>{{i.nama_perusahaan}}</td>
                                <td>{{i.kota}}</td>
                                <td>{{i.bidang_usaha}}</td>
                                <td>{{i.jabatan}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="ml-7">
                    <p class="font-bold mb-1 mt-3">Apabila Anda pernah bekerja di tempat lain coba sebutkan gaji yang anda peroleh? </p>
                    <p class="mb-2">
                        {{biodata.riwayat_pekerjaan.gaji_diperoleh  == "" ? "-" : biodata.riwayat_pekerjaan.gaji_diperoleh}}
                    </p>

                    <p class="mb-1 font-bold">Mengapa Anda berhenti dari pekerjaan yang lama, jelaskan secara singkat:</p>
                    <p>
                        {{biodata.riwayat_pekerjaan.alasan_berhenti  == "" ? "-" : biodata.riwayat_pekerjaan.alasan_berhenti}}
                    </p>
                </div>
            </div>

            <div class="mb-2">
                <div class="flex mb-2 font-bold">
                    <p class="mr-2">24.</p>
                    <p>TRAINING / KURSUS  YANG PERNAH DI IKUTI:</p>
                </div>
                <div class="ml-7">
                    <table class="table-fixed w-full font-semibold">
                        <thead class="bg-foreground-4-100 text-white">
                            <tr>
                                <th class="font-semibold w-3/12">MATERI</th>
                                <th class="font-semibold w-3/12">PENYELENGGARA</th>
                                <th class="font-semibold w-2/12">TAHUN</th>
                                <th class="font-semibold w-2/12">TEMPAT</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-center odd:bg-foreground-4-50 even:bg-foreground-4-10" v-for="i in biodata.training_kursus" :key="i">
                                <td class="py-1">{{i.materi}}</td>
                                <td>{{i.penyelenggara}}</td>
                                <td>{{i.tahun}}</td>
                                <td>{{i.tempat}}</td>
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
                <div class="ml-7">
                    <table class="table-fixed w-full font-semibold">
                        <thead class="bg-foreground-4-100 text-white">
                            <tr>
                                <th class="font-semibold w-3/12">ORGANISASI</th>
                                <th class="font-semibold w-3/12">TEMPAT</th>
                                <th class="font-semibold w-2/12">MASA</th>
                                <th class="font-semibold w-2/12">JABATAN</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-center odd:bg-foreground-4-50 even:bg-foreground-4-10" v-for="i in biodata.organisasi" :key="i">
                                <td class="py-1">{{i.nama}}</td>
                                <td>{{i.tempat}}</td>
                                <td>{{i.masa}}</td>
                                <td>{{i.jabatan}}</td>
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
                <div class="ml-7">
                    <table class="table-fixed w-full font-semibold">
                        <thead class="bg-foreground-4-100 text-white">
                            <tr>
                                <th rowspan="2" class="font-semibold w-3/12">BAHASA</th>
                                <th class="font-semibold w-2/12 border-b-[1px] border-white">BERBICARA</th>
                                <th class="font-semibold w-2/12 border-b-[1px] border-white">MENDENGAR</th>
                                <th class="font-semibold w-2/12 border-b-[1px] border-white">MENULIS</th>
                            </tr>
                            <tr>
                                <th class="font-normal text-sm w-3/12">KURANG/CUKUP/BAIK</th>
                                <th class="font-normal text-sm w-2/12">KURANG/CUKUP/BAIK</th>
                                <th class="font-normal text-sm w-2/12">KURANG/CUKUP/BAIK</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-center odd:bg-foreground-4-50 even:bg-foreground-4-10" v-for="i in biodata.bahasa_dikuasai" :key="i">
                                <td class="py-1">{{i.bahasa}}</td>
                                <td>{{i.berbicara}}</td>
                                <td>{{i.mendengar}}</td>
                                <td>{{i.menulis}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="mb-2">
                <div class="flex">
                    <p class="mr-2 font-bold">27.</p>
                    <p class="font-bold mr-2">Berapa lama Anda harus memberitahu pada perusahaan lama untuk berhenti bekerja :</p>
                    <p>{{biodata.keterangan_kerja.lama_berhenti_kerja == "" ? "-" : biodata.keterangan_kerja.lama_berhenti_kerja }}</p>
                </div>
                <div class="ml-7">
                    <div class="mt-2 flex gap-2">
                        <p class="font-bold">Dan mulai kapan Anda dapat mulai bekerja jika Anda di terima di PT. Adiputro Wirasejati :</p>
                        <p>{{biodata.keterangan_kerja.bisa_mulai_kerja == "" ? "-" : biodata.keterangan_kerja.bisa_mulai_kerja }}</p>
                    </div>

                    <div class="mt-2 flex gap-2">
                        <p class="mb-1 font-bold">Apakah Anda memiliki saudara / kenalan di perusahaan ini: </p>
                        <p>{{biodata.keterangan_kerja.kenalan_perusahaan == "" ? "-" : biodata.keterangan_kerja.kenalan_perusahaan }}</p>
                    </div>
                    
                    <div>
                        <p class="font-bold">Bila YA, Sebutkan:</p>
                        <div class="flex gap-2">
                            <div class="font-bold">
                                <p class="mt-1">Nama</p>
                                <p class="mt-1">Alamat</p>
                                <p class="mt-1">Jabatan</p>
                            </div>
                            <div class="font-bold">
                                <p class="mt-1" v-for="i in 3" :key="i">:</p>
                            </div>
                            <div>
                                <p class="mt-1">{{biodata.keterangan_kerja.kenalan!=null ? biodata.keterangan_kerja.kenalan.nama : " "}}</p>
                                <p class="mt-1">{{biodata.keterangan_kerja.kenalan!=null ? biodata.keterangan_kerja.kenalan.alamat : " "}}</p>
                                <p class="mt-1">{{biodata.keterangan_kerja.kenalan!=null ? biodata.keterangan_kerja.kenalan.jabatan : " "}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex mb-2 mr-3">
                <p class="mr-2 font-bold">28.</p>
                <div class="flex gap-2">
                    <p class="font-bold">Bersediakah Anda menjalani Pelatihan kerja  selama 6 (enam) bulan di PT. Adiputro Wirasejati: </p>
                    <p>{{biodata.pelatihan_kerja == "" ? "-" : biodata.pelatihan_kerja}}</p>
                </div>
            </div>

            <div class="mb-2">
                <div class="flex mb-1 font-bold">
                    <p class="mr-2">29.</p>
                    <p>Apakah tujuan Anda bekerja, Jelaskan: </p>
                </div>
                <div class="ml-7">
                    {{biodata.tujuan_kerja == "" ? "-" : biodata.tujuan_kerja}}
                </div>
            </div>
            
            <div>
                <div class="flex font-bold">
                    <p class="mr-2">30.</p>
                    <p>Apakah anda memiliki kendaraan (sebutkan jenis kendaraan dan nomer kendaraan):</p>
                </div>
                <div class="ml-7 mb-2">
                    {{biodata.kendaraan.keterangan == "" ? "-" : biodata.kendaraan.keterangan}}                
                </div>
            </div>

            <div>
                <div class="mb-2 ml-7 flex gap-2">
                    <p class="font-bold">Kendaraan tersebut milik :</p>
                    <p>{{biodata.kendaraan.kepemilikan == "" ? "-" : biodata.kendaraan.kepemilikan}} </p>
                </div>
            </div>

            <div class="mb-2">
                <div class="flex font-bold">
                    <p class="mr-2">31.</p>
                    <p>Apa Hobby Anda? </p>
                </div>
                <div class="ml-7">
                    {{biodata.hobi == "" ? "-" : biodata.hobi}}               
                </div>
            </div>

            <div class="mb-2">
                <div class="flex font-bold">
                    <p class="mr-2">32.</p>
                    <p>Apabila Anda diterima sebagai karyawan, gaji berapa yang Anda harapkan untuk tiap bulannya?</p>
                </div>
                <div class="ml-7">
                    {{biodata.harapan_gaji == "" ? "-" : biodata.harapan_gaji}}                    
                </div>
            </div>

            <div class="mb-2">
                <div class="flex font-bold">
                    <p class="mr-2">33.</p>
                    <p>Apakah Anda pernah bermasalah dengan Hukum?</p>
                </div>
                <div class="ml-7">
                    {{biodata.masalah_hukum == "" ? "-" : biodata.masalah_hukum}}                
                </div>
            </div>

            <div class="mb-2">
                <div class="flex font-bold">
                    <p class="mr-2">34.</p>
                    <p>Apakah yang menjadi kelebihan dalam diri anda?</p>
                </div>
                <div class="ml-7">
                    {{biodata.kelebihan == "" ? "-" : biodata.kelebihan}} 
                </div>
            </div>

            <div class="mb-2">
                <div class="flex font-bold">
                    <p class="mr-2">35.</p>
                    <p>Apakah yang menjadi kekurangan dalam diri anda?</p>
                </div>
                <div class="ml-7">
                    {{biodata.kekurangan == "" ? "-" : biodata.kekurangan}}                   
                </div>
            </div>

            <div class="mb-2">
                <div class="flex font-bold">
                    <p class="mr-2">36.</p>
                    <p>Apakah anda puas dengan keadaan diri anda saat ini? Jelaskan</p>
                </div>
                <div class="ml-7">
                    {{biodata.kepuasan_keadaan_diri == "" ? "-" : biodata.kepuasan_keadaan_diri}}               
                </div>
            </div>

            <div class="mb-2">
                <div class="flex font-bold">
                    <p class="mr-2">37.</p>
                    <p>Apakah anda mempunyai prestasi / penghargaan selama ini? Bila ada silahkan disebutkan (jenis, bidang, dan tahun)</p>
                </div>
                <div class="ml-7">
                    <div class="flex gap-2" v-for="i in biodata.prestasi.length" :key="i">
                        <p>{{i}}.</p>
                        <p>{{biodata.prestasi[i-1].jenis}} ({{biodata.prestasi[i-1].bidang}} - {{biodata.prestasi[i-1].tahun}})</p>
                    </div>
                </div>
            </div>

            <div class="mb-2">
                <div class="flex font-bold">
                    <p class="mr-2">38.</p>
                    <p>Adakah bidang seni yang Anda kuasai ? jika ada, sebutkan jenisnya (Musik, suara, dll)</p>
                </div>
                <div class="ml-7">
                    {{biodata.seni_dikuasai.jenis!=undefined ? biodata.seni_dikuasai.jenis : " "}}
                    <!-- <span>{{biodata.seni_dikuasai.jenis[0]}}</span>
                    <span v-for="i in biodata.seni_dikuasai.jenis.length-1" :key="i">, {{biodata.seni_dikuasai.jenis[i]}}</span> -->
                </div>
            </div>

            <div>
                <div class="flex font-bold">
                    <p class="mr-2">39.</p>
                    <p>Sebagai referensi, sebutkan 2 (dua) nama orang terdekat anda, beserta alamat dan telepon: </p>
                </div>
                <div class="ml-7">
                    <div class="flex gap-10 mb-2">
                        <div class="w-1/2">
                            <p class="font-bold">Orang Terdekat 1</p>
                            <div class="flex gap-2">
                                <div class="font-bold">
                                    <p>Nama</p>
                                    <p>Alamat</p>
                                    <p>No. Telepon</p>
                                </div>
                                <div class="font-bold">
                                    <p v-for="i in 3" :key="i">:</p>
                                </div>
                                <div>
                                    <p>{{biodata.orang_terdekat[0].nama}}</p>
                                    <p>{{biodata.orang_terdekat[0].alamat}}</p>
                                    <p>{{biodata.orang_terdekat[0].telepon}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="w-1/2">
                            <p class="font-bold">Orang Terdekat 2</p>
                            <div class="flex gap-2">
                                <div class="font-bold">
                                    <p>Nama</p>
                                    <p>Alamat</p>
                                    <p>No. Telepon</p>
                                </div>
                                <div class="font-bold">
                                    <p v-for="i in 3" :key="i">:</p>
                                </div>
                                <div>
                                    <p>{{biodata.orang_terdekat[1].nama}}</p>
                                    <p>{{biodata.orang_terdekat[1].alamat}}</p>
                                    <p>{{biodata.orang_terdekat[1].telepon}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <p class="font-bold text-xl mt-10 mb-20">Bahwa segala biodata yang saya isi di atas adalah benar adanya. </p>
            <div class="flex justify-end font-bold">
                <div>
                    <div class="mb-2">
                        {{biodata.tanggal_biodata}}
                    </div>
                    <p class="mb-2 text-center">Pelamar,</p>
                    <div class="text-center">
                        <img v-if="url!=null" :src="url" alt="" id="imgSoal" class="h-32 w-32 mb-2 inline-block">
                        <div v-else class="h-32 w-32 mb-2 inline-block bg-[#C4C4C4]">
                            <div class="flex justify-center items-center h-full">
                                <p>Tanda Tangan</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="text-center">
                        {{biodata.nama_lengkap}}
                    </div>
                </div>
            </div>
        </div>
        <div class="w-1 h-40"></div>
    </div>
    <div v-else class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/3 w-1/2">
        <div class="bg-foreground-3-500 w-full h-full px-10 py-20 rounded-xl flex items-center justify-center text-center text-black text-2xl font-bold overflow-y-auto no-scrollbar py-5 px-5">
            Biodata belum diisi :(
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
            biodata: null,
            port: import.meta.env.VITE_BACKEND_URL,
            url: null
        }
    },
    methods: {
        getImg(data){
            return "https://drive.google.com/uc?export=view&id="+data
        },
    },
    mounted() {
        axios
        .get(this.port+'/registrant/'+this.$route.query.registrant)
        .then(({data}) => (
            this.biodata = data.biodata,
            this.url = this.getImg(this.biodata.tanda_tangan)
        ))
    },
    created() {
        this.$emit('updateHeader', '')
    },
}
</script>

<style>

</style>