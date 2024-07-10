<template>
    <div class="w-11/12 h-full m-auto text-white relative flex flex-col flex-grow pb-3 overflow-hidden
                md:w-9/12">
        <div class="flex justify-between mb-7">
            <h1 class="text-white text-3xl text-center font-bold mt-5">Biodata</h1>
            <div class="text-center bg-background-400 rounded-full flex justify-center py-2 px-3 mt-1">
                <img src="../assets/logo.png" alt="" class="w-20">
            </div>
        </div>
        
        <div class="mb-5 mt-3">
            <button class="bg-foreground-4-100 hover:bg-foreground-4-200 text-white px-3 py-1 rounded-md" @click="kembali">
                <i class="fa fa-chevron-left mr-2 text-xl"></i>
                <span class="font-bold text-xl">Kembali</span>
            </button>
        </div>

        <form method="" action="" autocomplete="off" name="biodataForm" class="bg-foreground-3-500 w-full h-full rounded-xl text-black overflow-y-auto no-scrollbar 
                    py-5 px-5" @submit.prevent="submitForm"  v-if="ready">
            <h1 class="text-3xl font-bold mb-2">Biodata</h1>
            <div class="md:flex mb-5">
                <div class="md:w-6/12 md:mr-5 flex">
                    <div class="mr-2">
                        <p class="mt-2">1. </p>
                        <p class="mt-16" v-for="i in 7" :key="i">{{i+1}}. </p>
                    </div>
                    <div class="w-full">
                        <p class="mt-2">NAMA LENGKAP :</p>
                        <InputBio :type="'text'" v-model="fullname" :nama="'nama_lengkap'" :placeHolder="'Nama Lengkap'" />

                        <p class="mt-4">NAMA PANGGILAN :</p>
                        <InputBio :type="'text'" v-model="data_old.nama_panggilan" :nama="'nama_panggilan'" :placeHolder="'Nama Panggilan'" />

                        <p class="mt-4">ALAMAT DI KTP :</p>
                        <InputBio :type="'text'" v-model="data_old.alamat_ktp" :nama="'alamat_ktp'" :placeHolder="'Alamat di KTP'" />

                        <p class="mt-4">ALAMAT SEKARANG :</p>
                        <InputBio :type="'text'" v-model="alamat" :nama="'alamat_skg'" :placeHolder="'Alamat Sekarang'" />

                        <p class="mt-4">TELEPON/HP :</p>
                        <InputBio :type="'number'" v-model="noHp" :nama="'no_hp'" :placeHolder="'081234567890'" />

                        <p class="mt-4">TEMPAT & TGL LAHIR :</p>
                        <InputBio :type="'text'" v-model="ttl" :nama="'ttl'" :placeHolder="'Malang / 22 Januari 2022'" />

                        <p class="mt-4">KEWARGANEGARAAN :</p>
                        <InputBio :type="'text'" v-model="data_old.kewarganegaraan" :nama="''" :placeHolder="'Kewarganegaraan'" />

                        <p class="mt-4">SUKU :</p>
                        <InputBio :type="'text'" v-model="data_old.suku" :nama="'suku'" :placeHolder="'Suku'" />
                    </div>
                </div>

                <div class="md:w-6/12 flex">
                    <div class="mr-2">
                        <p class="mt-2">9. </p>
                        <p class="mt-16" v-for="i in 7" :key="i">{{i+9}}. </p>
                    </div>
                    <div class="w-full">
                        <p class="mt-2">AGAMA :</p>
                        <InputBio :type="'text'" v-model="data_old.agama" :nama="'agama'" :placeHolder="'Agama'" />

                        <p class="mt-4">USIA :</p>
                        <InputBio :type="'number'" v-model="usia" :nama="'usia'" :placeHolder="'20'" />

                        <p class="mt-4">TINGGI BADAN :</p>
                        <InputBio :type="'number'" v-model="data_old.tinggi_badan" :nama="'tinggi_badan'" :placeHolder="'150'" />

                        <p class="mt-4">BERAT BADAN :</p>
                        <InputBio :type="'number'" v-model="data_old.berat_badan" :nama="'berat_badan'" :placeHolder="'50'" />

                        <p class="mt-4">NO KTP / SIM / PASPOR :</p>
                        <InputBio :type="'number'" v-model="ktp" :nama="'no_identitas'" :placeHolder="'0123456789'" />

                        <p class="mt-4">GOLONGAN DARAH :</p>
                        <InputBio :type="'text'" v-model="data_old.golongan_darah" :nama="'golongan_darah'" :placeHolder="'A / B / AB / O'" />

                        <p class="mt-4">NO NPWP (OPSIONAL) :</p>
                        <InputBio :type="'number'" v-model="data_old.no_npwp" :nama="'no_npwp'" :placeHolder="'01234567890'" />

                        <p class="mt-4">E-MAIL :</p>
                        <InputBio :type="'email'" v-model="email" :nama="'email'" :placeHolder="'contoh@example.com'" :readonly="true" />
                    </div>
                </div>
            </div>

            <div class="w-full md:w-1/2">
                <div class="flex mb-2">
                    <p class="mr-2">17.</p>
                    <p>Jenis Kelamin :</p>
                </div>
                <div class="flex mb-1 gap-3 ml-7">
                    <div class="w-1/2">
                        <Radio v-model="data_old.jenis_kelamin" :values="'L'" :names="'jenis_kelamin'" :id="'laki'" :label="'LAKI-LAKI'"/>
                    </div>
                    <div class="w-1/2">
                        <Radio v-model="data_old.jenis_kelamin" :values="'P'" :names="'jenis_kelamin'" :id="'perempuan'" :label="'PEREMPUAN'"/>
                    </div>            
                </div>
            </div>

            <div class="mb-2">
                <div class="w-full flex">
                    <p class="mr-2">18.</p>
                    <div class="w-1/2 mr-3 md:mr-0">
                        <div class="mr-4">
                            <p class="mb-1">Keadaan Kesehatan pada saat ini : </p>
                        </div>
                        <div class="md:flex mb-1">
                            <div class="md:w-1/2"><Radio v-model="data_old.kesehatan.keadaan" :values="'baik'" :names="'keadaan'" :id="'kesehatanBaik'" :label="'BAIK'" /></div>
                            <div class="md:w-1/2"><Radio v-model="data_old.kesehatan.keadaan" :values="'kurang sehat'" :names="'keadaan'" :id="'kesehatanKurang'" :label="'KURANG SEHAT'"/></div>
                        </div>
                        
                        <div class="mt-10">
                            <p id="sakitKeras" class="mb-1">Apakah anda pernah sakit keras/kecelakaan?</p>
                        </div>
                        <div class="flex">
                            <div class="w-1/2"><Radio v-model="data_old.kesehatan.sakit_keras" :values="'Ya'" :names="'sakit_keras'" id="kecelakaanYa" :label="'YA'" @change="sakitKeras=true"/></div>
                            <div class="w-1/2"><Radio v-model="data_old.kesehatan.sakit_keras" :values="'Tidak'" :names="'sakit_keras'" id="kecelakaanTidak" :label="'TIDAK'" @change="sakitKeras=false"/></div>
                        </div>
                    </div>
                    <div class="w-1/2">
                        <div>
                            <p>Apakah ada cacat tubuh? </p>
                            <p class="mb-1 text-gray-400 italic">(Misal: penglihatan / pendengaran / pengucapan / jantung / dll.)</p>
                        </div>
                        <div class="flex">
                            <div class="w-1/2"><Radio v-model="data_old.kesehatan.cacat" :values="'Ya'" :names="'cacat'" :id="'cacatYa'" :label="'YA'" @change="changeCacat(1)"/></div>
                            <div class="w-1/2"><Radio v-model="data_old.kesehatan.cacat" :values="'Tidak'" :names="'cacat'" :id="'cacatTidak'" :label="'TIDAK'" @change="changeCacat(0)"/></div>
                        </div>
                        <div>
                            <p>Tuliskan apabila ada </p>
                            <InputBio :type="'text'" v-model="data_old.kesehatan.cacat_desc" :nama="'cacat_desc'" :placeHolder="'Cacat'"  :readonly="!adaCacat" />
                        </div>

                        <div v-show="sakitKeras">
                            <div class="mt-2 w-1/3">
                                <p>Kapan Terjadinya:</p>
                            </div>
                            <InputBio :type="'text'" v-model="data_old.kesehatan.kapan" :nama="'kapan'" :placeHolder="''"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mb-2">
                <div class="flex w-full">
                    <p class="mr-2">19.</p>
                    <div class="w-1/2">
                        <div class="mr-2">
                            <div class="flex w-full">
                                <p class="mb-1">Apakah anda belum menikah/menikah? </p>
                            </div>
                        </div>
                        
                        <div class="md:flex">
                            <div class="md:w-1/2"><Radio :values="'belum menikah'" v-model="status_perkawinan" :names="'menikah'" id="belumMenikah" :label="'BELUM MENIKAH'" @change="sudahMenikah=false"/></div>
                            <div class="md:w-1/2"><Radio :values="'sudah menikah'" v-model="status_perkawinan" :names="'menikah'" id="menikah" :label="'SUDAH MENIKAH'" @change="sudahMenikah=true"/></div>
                        </div>
                    </div>

                    <div class="w-1/2">
                        <div v-show="sudahMenikah">
                            <p>Nama Suami/Istri :</p>
                            <InputBio :type="'text'" v-model="data_old.status_nikah.nama_suami_istri" :nama="'nama_suami_istri'" :placeHolder="'Nama Suami/Istri'" />

                            <p class="mt-2">Nama Anak :</p>
                            <InputBio :type="'text'" v-model="data_old.status_nikah.nama_anak" :nama="'nama_anak'" :placeHolder="'Nama Anak'" />
                        </div>
                    </div>
                </div>

                
            </div>
            
            <div class="mb-2">
                <div class="flex mb-2">
                    <p class="mr-2">20.</p>
                    <p>PENDIDIKAN TERAKHIR</p>
                </div>
                <div class="md:ml-7">
                    <table class="table-fixed w-full font-semibold">
                        <thead class="bg-foreground-4-100 text-white">
                            <tr class="text-xs md:text-sm">
                                <th class="font-semibold w-2/12">TINGKAT / GELAR</th>
                                <th class="font-semibold w-2/12">JURUSAN</th>
                                <th class="font-semibold w-3/12">NAMA SEKOLAH</th>
                                <th class="font-semibold w-2/12">KOTA</th>
                                <th class="font-semibold w-2/12">TAHUN KELULUSAN</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-center odd:bg-foreground-4-50 even:bg-foreground-4-10 text-xs md:text-sm" v-for="i in pendidikan.length" :key="i">
                                <InputTable v-model="pendidikan[i-1].tingkat" :nama="'pendidikan[][tingkat]'" :placeHolder="'Tingkat / Gelar'" />
                                <InputTable v-model="pendidikan[i-1].jurusan" :nama="'pendidikan[][jurusan]'" :placeHolder="'Jurusan'" />
                                <InputTable v-model="pendidikan[i-1].nama_sekolah" :nama="'pendidikan[][nama_sekolah]'" :placeHolder="'Nama Sekolah'" />
                                <InputTable v-model="pendidikan[i-1].kota" :nama="'pendidikan[][kota]'" :placeHolder="'Kota'" />
                                <InputTable v-model="pendidikan[i-1].tahun_lulus" :nama="'pendidikan[][tahun_lulus]'" :placeHolder="'Tahun Kelulusan'" />
                            </tr>
                        </tbody>
                    </table>
                    <div class="flex gap-1 w-full justify-end mt-2 text-xs md:text-sm">
                        <button @click.prevent="subPendidikanCount" class="text-white bg-foreground-4-100 hover:bg-foreground-4-200
                                                duration-200 rounded-md h-auto w-auto px-5 py-1">
                                                    <i class="fa fa-minus mr-1"></i>
                                                    <span>Kurangi</span>
                                                </button>
                        <button @click.prevent="pendidikan.push({tingkat:'', jurusan:'', nama_sekolah:'', kota:'', tahun_lulus:''})" class="text-white bg-foreground-4-100 hover:bg-foreground-4-200
                                                duration-200 rounded-md h-auto w-auto px-5 py-1">
                                                <i class="fa fa-plus mr-1"></i>
                                                <span>Tambah</span>
                                                </button>
                    </div>
                </div>
            </div>

            <div>
                <div class="flex mb-2">
                    <p class="mr-2">21.</p>
                    <p>Mengapa Anda ingin bekerja di perusahaan kami? Jelaskan secara singkat:</p>
                </div>
                <div class="ml-7">
                    <TextArea v-model="data_old.alasan_bekerja" :nama="'alasan_bekerja'" :placeHolder="'Tulis di sini'" />                    
                </div>
            </div>

            <div class="mb-2">
                <div class="flex mb-2">
                    <p class="mr-2">22.</p>
                    <p>KELUARGA</p>
                </div>

                <!-- orang tua -->
                <div class="md:ml-7">
                    <table class="table-fixed w-full font-semibold">
                        <thead class="bg-foreground-4-100 text-white">
                            <tr class="text-xs md:text-sm">
                                <th class="font-semibold w-3/12">NAMA ORANG TUA</th>
                                <th class="font-semibold w-3/12">TEMPAT & TGL LAHIR</th>
                                <th class="font-semibold w-3/12">ALAMAT</th>
                                <th class="font-semibold w-2/12 text-[0.6rem] md:text-sm">PENDIDIKAN</th>
                                <th class="font-semibold w-2/12 text-[0.6rem] md:text-sm">PEKERJAAN</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-center odd:bg-foreground-4-50 even:bg-foreground-4-10 text-xs md:text-sm" v-for="i in keluarga[0].length" :key="i">
                                <InputTable v-model="keluarga[0][i-1].nama" :nama="'orang_tua[][nama]'" :placeHolder="'Nama'" />
                                <InputTable v-model="keluarga[0][i-1].ttl" :nama="'orang_tua[][ttl]'" :placeHolder="'Tempat & Tgl Lahir'" />
                                <InputTable v-model="keluarga[0][i-1].alamat" :nama="'orang_tua[][alamat]'" :placeHolder="'Alamat'" />
                                <InputTable v-model="keluarga[0][i-1].pendidikan" :nama="'orang_tua[][pendidikan]'" :placeHolder="'Pendidikan'" />
                                <InputTable v-model="keluarga[0][i-1].pekerjaan" :nama="'orang_tua[][pekerjaan]'" :placeHolder="'Pekerjaan'" />
                            </tr>
                        </tbody>
                    </table>
                    <div class="flex gap-1 w-full justify-end my-2 text-xs md:text-sm">
                        <button @click.prevent="subKeluargaCount(0)" class="text-white bg-foreground-4-100 hover:bg-foreground-4-200
                                                duration-200 rounded-md h-auto w-auto px-5 py-1">
                                                    <i class="fa fa-minus mr-1"></i>
                                                    <span>Kurangi</span>
                                                </button>
                        <button @click.prevent="keluarga[0].push({nama:'', ttl:'', alamat:'', pendidikan:'', pekerjaan:''})" class="text-white bg-foreground-4-100 hover:bg-foreground-4-200
                                                duration-200 rounded-md h-auto w-auto px-5 py-1">
                                                <i class="fa fa-plus mr-1"></i>
                                                <span>Tambah</span>
                                                </button>
                    </div>
                </div>

                <!-- istri/suami -->
                <div class="md:ml-7">
                    <table class="table-fixed w-full font-semibold">
                        <thead class="bg-foreground-4-100 text-white">
                            <tr class="text-xs md:text-sm">
                                <th class="font-semibold w-3/12">NAMA ISTRI/SUAMI</th>
                                <th class="font-semibold w-3/12">TEMPAT & TGL LAHIR</th>
                                <th class="font-semibold w-3/12">ALAMAT</th>
                                <th class="font-semibold w-2/12 text-[0.6rem] md:text-sm">PENDIDIKAN</th>
                                <th class="font-semibold w-2/12 text-[0.6rem] md:text-sm">PEKERJAAN</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-center odd:bg-foreground-4-50 even:bg-foreground-4-10 text-xs md:text-sm" v-for="i in keluarga[1].length" :key="i">
                                <InputTable v-model="keluarga[1][i-1].nama" :nama="'istri_suami[][nama]'" :placeHolder="'Nama'" />
                                <InputTable v-model="keluarga[1][i-1].ttl" :nama="'istri_suami[][ttl]'" :placeHolder="'Tempat & Tgl Lahir'" />
                                <InputTable v-model="keluarga[1][i-1].alamat" :nama="'istri_suami[][alamat]'" :placeHolder="'Alamat'" />
                                <InputTable v-model="keluarga[1][i-1].pendidikan" :nama="'istri_suami[][pendidikan]'" :placeHolder="'Pendidikan'" />
                                <InputTable v-model="keluarga[1][i-1].pekerjaan" :nama="'istri_suami[][pekerjaan]'" :placeHolder="'Pekerjaan'" />
                            </tr>
                        </tbody>
                    </table>
                    <div class="flex gap-1 w-full justify-end my-2 text-xs md:text-sm">
                        <button @click.prevent="subKeluargaCount(1)" class="text-white bg-foreground-4-100 hover:bg-foreground-4-200
                                                duration-200 rounded-md h-auto w-auto px-5 py-1">
                                                    <i class="fa fa-minus mr-1"></i>
                                                    <span>Kurangi</span>
                                                </button>
                        <button @click.prevent="keluarga[1].push({nama:'', ttl:'', alamat:'', pendidikan:'', pekerjaan:''})" class="text-white bg-foreground-4-100 hover:bg-foreground-4-200
                                                duration-200 rounded-md h-auto w-auto px-5 py-1">
                                                <i class="fa fa-plus mr-1"></i>
                                                <span>Tambah</span>
                                                </button>
                    </div>
                </div>

                <!-- anak kandung -->
                <div class="md:ml-7">
                    <table class="table-fixed w-full font-semibold">
                        <thead class="bg-foreground-4-100 text-white">
                            <tr class="text-xs md:text-sm">
                                <th class="font-semibold w-3/12">NAMA ANAK KANDUNG</th>
                                <th class="font-semibold w-3/12">TEMPAT & TGL LAHIR</th>
                                <th class="font-semibold w-3/12">ALAMAT</th>
                                <th class="font-semibold w-2/12 text-[0.6rem] md:text-sm">PENDIDIKAN</th>
                                <th class="font-semibold w-2/12 text-[0.6rem] md:text-sm">PEKERJAAN</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-center odd:bg-foreground-4-50 even:bg-foreground-4-10 text-xs md:text-sm" v-for="i in keluarga[2].length" :key="i">
                                <InputTable v-model="keluarga[2][i-1].nama" :nama="'anak_kandung[][nama]'" :placeHolder="'Nama'" />
                                <InputTable v-model="keluarga[2][i-1].ttl" :nama="'anak_kandung[][ttl]'" :placeHolder="'Tempat & Tgl Lahir'" />
                                <InputTable v-model="keluarga[2][i-1].alamat" :nama="'anak_kandung[][alamat]'" :placeHolder="'Alamat'" />
                                <InputTable v-model="keluarga[2][i-1].pendidikan" :nama="'anak_kandung[][pendidikan]'" :placeHolder="'Pendidikan'" />
                                <InputTable v-model="keluarga[2][i-1].pekerjaan" :nama="'anak_kandung[][pekerjaan]'" :placeHolder="'Pekerjaan'" />
                            </tr>
                        </tbody>
                    </table>
                    <div class="flex gap-1 w-full justify-end my-2 text-xs md:text-sm">
                        <button @click.prevent="subKeluargaCount(2)" class="text-white bg-foreground-4-100 hover:bg-foreground-4-200
                                                duration-200 rounded-md h-auto w-auto px-5 py-1">
                                                    <i class="fa fa-minus mr-1"></i>
                                                    <span>Kurangi</span>
                                                </button>
                        <button @click.prevent="keluarga[2].push({nama:'', ttl:'', alamat:'', pendidikan:'', pekerjaan:''})" class="text-white bg-foreground-4-100 hover:bg-foreground-4-200
                                                duration-200 rounded-md h-auto w-auto px-5 py-1">
                                                <i class="fa fa-plus mr-1"></i>
                                                <span>Tambah</span>
                                                </button>
                    </div>
                </div>

                <!-- saudara kandung -->
                <div class="md:ml-7">
                    <table class="table-fixed w-full font-semibold">
                        <thead class="bg-foreground-4-100 text-white">
                            <tr class="text-xs md:text-sm">
                                <th class="font-semibold w-3/12">NAMA SAUDARA KANDUNG</th>
                                <th class="font-semibold w-3/12">TEMPAT & TGL LAHIR</th>
                                <th class="font-semibold w-3/12">ALAMAT</th>
                                <th class="font-semibold w-2/12 text-[0.6rem] md:text-sm">PENDIDIKAN</th>
                                <th class="font-semibold w-2/12 text-[0.6rem] md:text-sm">PEKERJAAN</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-center odd:bg-foreground-4-50 even:bg-foreground-4-10 text-xs md:text-sm" v-for="i in keluarga[3].length" :key="i">
                                <InputTable v-model="keluarga[3][i-1].nama" :nama="'saudara_kandung[][nama]'" :placeHolder="'Nama'" />
                                <InputTable v-model="keluarga[3][i-1].ttl" :nama="'saudara_kandung[][ttl]'" :placeHolder="'Tempat & Tgl Lahir'" />
                                <InputTable v-model="keluarga[3][i-1].alamat" :nama="'saudara_kandung[][alamat]'" :placeHolder="'Alamat'" />
                                <InputTable v-model="keluarga[3][i-1].pendidikan" :nama="'saudara_kandung[][pendidikan]'" :placeHolder="'Pendidikan'" />
                                <InputTable v-model="keluarga[3][i-1].pekerjaan" :nama="'saudara_kandung[][pekerjaan]'" :placeHolder="'Pekerjaan'" />
                            </tr>
                        </tbody>
                    </table>
                    <div class="flex gap-1 w-full justify-end my-2 text-xs md:text-sm">
                        <button @click.prevent="subKeluargaCount(3)" class="text-white bg-foreground-4-100 hover:bg-foreground-4-200
                                                duration-200 rounded-md h-auto w-auto px-5 py-1">
                                                    <i class="fa fa-minus mr-1"></i>
                                                    <span>Kurangi</span>
                                                </button>
                        <button @click.prevent="keluarga[3].push({nama:'', ttl:'', alamat:'', pendidikan:'', pekerjaan:''})" class="text-white bg-foreground-4-100 hover:bg-foreground-4-200
                                                duration-200 rounded-md h-auto w-auto px-5 py-1">
                                                <i class="fa fa-plus mr-1"></i>
                                                <span>Tambah</span>
                                                </button>
                    </div>
                </div>
            </div>

            <div class="mb-2">
                <div class="flex mb-2">
                    <p class="mr-2">23.</p>
                    <p>RIWAYAT PEKERJAAN DI TEMPAT LAIN:</p>
                </div>
                <div class="md:ml-7">
                    <table class="table-fixed w-full font-semibold text-xs md:text-sm">
                        <thead class="bg-foreground-4-100 text-white">
                            <tr>
                                <th class="font-semibold w-2/12">DARI TGL / TAHUN</th>
                                <th class="font-semibold w-2/12">SAMPAI</th>
                                <th class="font-semibold w-3/12">NAMA PERUSAHAAN</th>
                                <th class="font-semibold w-2/12">KOTA</th>
                                <th class="font-semibold w-2/12">BID. USAHA</th>
                                <th class="font-semibold w-2/12">JABATAN / BAGIAN</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-center odd:bg-foreground-4-50 even:bg-foreground-4-10" v-for="i in riwayat.length" :key="i">
                                <InputTable v-model="riwayat[i-1].dari" :nama="'riwayat_pekerjaan[][dari]'" :placeHolder="'Tgl/Tahun'" />
                                <InputTable v-model="riwayat[i-1].sampai" :nama="'riwayat_pekerjaan[][sampai]'" :placeHolder="'Tgl/Tahun'" />
                                <InputTable v-model="riwayat[i-1].nama_perusahaan" :nama="'riwayat_pekerjaan[][nama_perusahaan]'" :placeHolder="'Nama Perusahaan'" />
                                <InputTable v-model="riwayat[i-1].kota" :nama="'riwayat_pekerjaan[][kota]'" :placeHolder="'Kota'" />
                                <InputTable v-model="riwayat[i-1].bidang_usaha" :nama="'riwayat_pekerjaan[][bidang_usaha]'" :placeHolder="'Bidang Usaha'" />
                                <InputTable v-model="riwayat[i-1].jabatan" :nama="'riwayat_pekerjaan[][jabatan]'" :placeHolder="'Jabatan/Bagian'" />
                            </tr>
                        </tbody>
                    </table>
                    <div class="flex gap-1 w-full justify-end mt-2 text-xs md:text-sm">
                        <button @click.prevent="subRiwayatCount" class="text-white bg-foreground-4-100 hover:bg-foreground-4-200
                                                duration-200 rounded-md h-auto w-auto px-5 py-1">
                                                    <i class="fa fa-minus mr-1"></i>
                                                    <span>Kurangi</span>
                                                </button>
                        <button @click.prevent="riwayat.push({dari:'', sampai:'', nama_perusahaan:'', kota:'', bidang_usaha:'', jabatan:''})" class="text-white bg-foreground-4-100 hover:bg-foreground-4-200
                                                duration-200 rounded-md h-auto w-auto px-5 py-1">
                                                <i class="fa fa-plus mr-1"></i>
                                                <span>Tambah</span>
                                                </button>
                    </div>
                </div>
                <div class="ml-7">
                    <p>Apabila Anda pernah bekerja di tempat lain coba sebutkan gaji yang anda peroleh? </p>
                    <InputBio :type="'text'" v-model="data_old.riwayat_pekerjaan.gaji_diperoleh" :nama="'gaji_diperoleh'" :placeHolder="'Tulis disini'" />

                    <p class="mb-1">Mengapa Anda berhenti dari pekerjaan yang lama, jelaskan secara singkat:</p>
                    <TextArea v-model="data_old.riwayat_pekerjaan.alasan_berhenti" :nama="'alasan_berhenti'" :placeHolder="'Tulis di sini'" />

                </div>
            </div>

            <div class="mb-2">
                <div class="flex mb-2">
                    <p class="mr-2">24.</p>
                    <p>TRAINING / KURSUS  YANG PERNAH DI IKUTI:</p>
                </div>
                <div class="md:ml-7">
                    <table class="table-fixed w-full font-semibold text-xs md:text-sm">
                        <thead class="bg-foreground-4-100 text-white">
                            <tr>
                                <th class="font-semibold w-3/12">MATERI</th>
                                <th class="font-semibold w-3/12">PENYELENGGARA</th>
                                <th class="font-semibold w-2/12">TAHUN</th>
                                <th class="font-semibold w-2/12">TEMPAT</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-center odd:bg-foreground-4-50 even:bg-foreground-4-10" v-for="i in training.length" :key="i">
                                <InputTable v-model="training[i-1].materi" :nama="'training_kursus[][materi]'" :placeHolder="'Materi'" />
                                <InputTable v-model="training[i-1].penyelenggara" :nama="'training_kursus[][penyelenggara]'" :placeHolder="'Penyelenggara'" />
                                <InputTable v-model="training[i-1].tahun" :nama="'training_kursus[][tahun]'" :placeHolder="'Tahun'" />
                                <InputTable v-model="training[i-1].tempat" :nama="'training_kursus[][tempat]'" :placeHolder="'Tempat'" />
                            </tr>
                        </tbody>
                    </table>
                    <div class="flex gap-1 w-full justify-end mt-2 text-xs md:text-sm">
                        <button @click.prevent="subTrainingCount" class="text-white bg-foreground-4-100 hover:bg-foreground-4-200
                                                duration-200 rounded-md h-auto w-auto px-5 py-1">
                                                    <i class="fa fa-minus mr-1"></i>
                                                    <span>Kurangi</span>
                                                </button>
                        <button @click.prevent="training.push({materi:'', penyelenggara:'', tahun:'', tempat:''})" class="text-white bg-foreground-4-100 hover:bg-foreground-4-200
                                                duration-200 rounded-md h-auto w-auto px-5 py-1">
                                                <i class="fa fa-plus mr-1"></i>
                                                <span>Tambah</span>
                                                </button>
                    </div>
                </div>
            </div>

            <div class="mb-2">
                <div class="flex mb-2">
                    <p class="mr-2">25.</p>
                    <p>ORGANISASI YANG PERNAH DI IKUTI:</p>
                </div>
                <div class="md:ml-7">
                    <table class="table-fixed w-full font-semibold text-xs md:text-sm">
                        <thead class="bg-foreground-4-100 text-white">
                            <tr>
                                <th class="font-semibold w-3/12">ORGANISASI</th>
                                <th class="font-semibold w-3/12">TEMPAT</th>
                                <th class="font-semibold w-2/12">MASA</th>
                                <th class="font-semibold w-2/12">JABATAN</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-center odd:bg-foreground-4-50 even:bg-foreground-4-10" v-for="i in organisasi.length" :key="i">
                                <InputTable v-model="organisasi[i-1].nama" :nama="'organisasi[][nama]'" :placeHolder="'Organisasi'" />
                                <InputTable v-model="organisasi[i-1].tempat" :nama="'organisasi[][tempat]'" :placeHolder="'Tempat'" />
                                <InputTable v-model="organisasi[i-1].masa" :nama="'organisasi[][masa]'" :placeHolder="'Masa'" />
                                <InputTable v-model="organisasi[i-1].jabatan" :nama="'organisasi[][jabatan]'" :placeHolder="'Jabatan'" />
                            </tr>
                        </tbody>
                    </table>
                    <div class="flex gap-1 w-full justify-end mt-2 text-xs md:text-sm">
                        <button @click.prevent="subOrganisasiCount" class="text-white bg-foreground-4-100 hover:bg-foreground-4-200
                                                duration-200 rounded-md h-auto w-auto px-5 py-1">
                                                    <i class="fa fa-minus mr-1"></i>
                                                    <span>Kurangi</span>
                                                </button>
                        <button @click.prevent="organisasi.push({nama:'', tempat:'', masa:'', jabatan:''})" class="text-white bg-foreground-4-100 hover:bg-foreground-4-200
                                                duration-200 rounded-md h-auto w-auto px-5 py-1">
                                                <i class="fa fa-plus mr-1"></i>
                                                <span>Tambah</span>
                                                </button>
                    </div>
                </div>
            </div>

            <div class="mb-2">
                <div class="flex mb-2">
                    <p class="mr-2">26.</p>
                    <p>BAHASA YANG DIKUASAI:</p>
                </div>
                <div class="md:ml-7">
                    <table class="table-fixed w-full font-semibold text-xs md:text-sm">
                        <thead class="bg-foreground-4-100 text-white">
                            <tr>
                                <th rowspan="2" class="font-semibold w-3/12">BAHASA</th>
                                <th class="font-semibold w-2/12 border-b-[1px] border-white">BERBICARA</th>
                                <th class="font-semibold w-2/12 border-b-[1px] border-white">MENDENGAR</th>
                                <th class="font-semibold w-2/12 border-b-[1px] border-white">MENULIS</th>
                            </tr>
                            <tr>
                                <th class="font-normal text-xs md:text-sm w-3/12">KURANG / CUKUP / BAIK</th>
                                <th class="font-normal text-xs md:text-sm w-2/12">KURANG / CUKUP / BAIK</th>
                                <th class="font-normal text-xs md:text-sm w-2/12">KURANG / CUKUP / BAIK</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-center odd:bg-foreground-4-50 even:bg-foreground-4-10" v-for="i in bahasa.length" :key="i">
                                <InputTable v-model="bahasa[i-1].bahasa" :nama="'bahasa[][bahasa]'" :placeHolder="'Bahasa'" />
                                <InputTable v-model="bahasa[i-1].berbicara" :nama="'bahasa[][berbicara]'" :placeHolder="'Kurang / Cukup / Baik'" />
                                <InputTable v-model="bahasa[i-1].mendengar" :nama="'bahasa[][mendengar]'" :placeHolder="'Kurang / Cukup / Baik'" />
                                <InputTable v-model="bahasa[i-1].menulis" :nama="'bahasa[][menulis]'" :placeHolder="'Kurang / Cukup / Baik'" />
                            </tr>
                        </tbody>
                    </table>
                    <div class="flex gap-1 w-full justify-end mt-2 text-xs md:text-sm">
                        <button @click.prevent="subBahasaCount" class="text-white bg-foreground-4-100 hover:bg-foreground-4-200
                                                duration-200 rounded-md h-auto w-auto px-5 py-1">
                                                    <i class="fa fa-minus mr-1"></i>
                                                    <span>Kurangi</span>
                                                </button>
                        <button @click.prevent="bahasa.push({bahasa:'',berbicara:'',menulis:'',mendengar:''})" class="text-white bg-foreground-4-100 hover:bg-foreground-4-200
                                                duration-200 rounded-md h-auto w-auto px-5 py-1">
                                                <i class="fa fa-plus mr-1"></i>
                                                <span>Tambah</span>
                                                </button>
                    </div>
                </div>
            </div>

            <div class="mb-2">
                <div class="flex">
                    <p class="mr-2">27.</p>
                    <p>Berapa lama Anda harus memberitahu pada perusahaan lama untuk berhenti bekerja:</p>
                </div>
                <div class="ml-7">
                    <InputBio :type="'text'" v-model="data_old.keterangan_kerja.lama_berhenti_kerja" :nama="'lama_berhenti_kerja'" :placeHolder="'Tulis disini'" />

                    <p class="mt-2">Dan mulai kapan Anda dapat mulai bekerja jika Anda di terima di PT. Adiputro Wirasejati :</p>
                    <InputBio :type="'text'" v-model="data_old.keterangan_kerja.bisa_mulai_kerja" :nama="'bisa_mulai_kerja'" :placeHolder="'Tulis disini'" />

                    <div class="mt-2">
                        <p class="mr-3 mb-1">Apakah Anda memiliki saudara / kenalan di perusahaan ini: </p>
                        <div class="flex w-1/2">
                            <div class="w-1/2"><Radio v-model="data_old.keterangan_kerja.kenalan_perusahaan" :values="'Ya'" :names="'kenalan_perusahaan'" :id="'kenalanYa'" :label="'YA'" @change="adaKenalan=true"/></div>
                            <div class="w-1/2"><Radio v-model="data_old.keterangan_kerja.kenalan_perusahaan" :values="'Tidak'" :names="'kenalan_perusahaan'" :id="'kenalanTidak'" :label="'TIDAK'" @change="adaKenalan=false"/></div>
                        </div>
                    </div>
                    
                    <div v-if="adaKenalan">
                        <p>Bila YA, Sebutkan:</p>
                        <div>
                            <p class="mt-1">Nama :</p>
                            <InputBio :type="'text'" v-model="data_old.keterangan_kerja.kenalan.nama" :nama="'kenalan_nama'" :placeHolder="'Nama Lengkap'" />
                            <p class="mt-1">Alamat :</p>
                            <InputBio :type="'text'" v-model="data_old.keterangan_kerja.kenalan.alamat" :nama="'kenalan_alamat'" :placeHolder="'Alamat'" />
                            <p class="mt-1">Jabatan :</p>
                            <InputBio :type="'text'" v-model="data_old.keterangan_kerja.kenalan.jabatan" :nama="'kenalan_jabatan'" :placeHolder="'Jabatan'" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex mb-2 mr-3">
                <p class="mr-2">28.</p>
                <div>
                    <p>Bersediakah Anda menjalani Pelatihan kerja selama 6 (enam) bulan di PT. Adiputro Wirasejati: </p>
                    <div class="flex w-1/2 mt-1">
                        <div class="w-1/2"><Radio v-model="data_old.pelatihan_kerja" :values="'Ya'" :names="'pelatihan_kerja'" :id="'pelatihanYa'" :label="'YA'"/></div>
                        <div class="w-1/2"><Radio v-model="data_old.pelatihan_kerja" :values="'Tidak'" :names="'pelatihan_kerja'" :id="'pelatihanTidak'" :label="'TIDAK'"/></div>
                    </div>
                </div>
            </div>

            <div>
                <div class="flex mb-2">
                    <p class="mr-2">29.</p>
                    <p>Apakah tujuan Anda bekerja, Jelaskan: </p>
                </div>
                <div class="ml-7">
                    <TextArea v-model="data_old.tujuan_kerja" :nama="'tujuan_kerja'" :placeHolder="'Tulis di sini'" />                    
                </div>
            </div>
            
            <div>
                <div class="flex mb-2">
                    <p class="mr-2">30.</p>
                    <p>Apakah anda memiliki kendaraan (sebutkan jenis kendaraan dan nomer kendaraan):</p>
                </div>
                <div class="ml-7">
                    <TextArea v-model="data_old.kendaraan.keterangan" :nama="'kendaraan_ket'" :placeHolder="'Tulis di sini'" />                    
                </div>
            </div>

            <div>
                <div class="mb-2 ml-7">
                    <p class="mr-3">Apakah kendaraan tersebut milik: </p>

                    <div class="lg:flex xl:w-1/2 mt-1">
                        <div class="md:w-1/4"><Radio v-model="data_old.kendaraan.kepemilikan" :values="'Pribadi'" :names="'kendaraan_milik'" :id="'kendaraan_pribadi'" :label="'Pribadi'"/></div>
                        <div class="md:w-1/4"><Radio v-model="data_old.kendaraan.kepemilikan" :values="'Orang Tua'" :names="'kendaraan_milik'" :id="'kendaraan_Orang_Tua'" :label="'Orang Tua'"/></div>
                        <div class="md:w-1/4"><Radio v-model="data_old.kendaraan.kepemilikan" :values="'Saudara'" :names="'kendaraan_milik'" :id="'kendaraan_Saudara'" :label="'Saudara'"/></div>
                        <div class="md:w-1/4"><Radio v-model="data_old.kendaraan.kepemilikan" :values="'dll'" :names="'kendaraan_milik'" :id="'kendaraan_dll'" :label="'dan lain-lain'"/></div>
                    </div>
                </div>
            </div>

            <div>
                <div class="flex mb-2">
                    <p class="mr-2">31.</p>
                    <p>Apa Hobby Anda? </p>
                </div>
                <div class="ml-7">
                    <TextArea v-model="data_old.hobi" :nama="'hobi'" :placeHolder="'Tulis di sini'" />                    
                </div>
            </div>

            <div>
                <div class="flex mb-2">
                    <p class="mr-2">32.</p>
                    <p>Apabila Anda diterima sebagai karyawan, gaji berapa yang Anda harapkan untuk tiap bulannya?</p>
                </div>
                <div class="ml-7">
                    <TextArea v-model="data_old.harapan_gaji" :nama="'harapan_gaji'" :placeHolder="'Tulis di sini'" />                    
                </div>
            </div>

            <div>
                <div class="flex mb-2">
                    <p class="mr-2">33.</p>
                    <p>Apakah Anda pernah bermasalah dengan Hukum?</p>
                </div>
                <div class="ml-7">
                    <TextArea v-model="data_old.masalah_hukum" :nama="'masalah_hukum'" :placeHolder="'Tulis di sini'" />                    
                </div>
            </div>

            <div>
                <div class="flex mb-2">
                    <p class="mr-2">34.</p>
                    <p>Apakah yang menjadi kelebihan dalam diri anda?</p>
                </div>
                <div class="ml-7">
                    <TextArea v-model="data_old.kelebihan" :nama="'kelebihan'" :placeHolder="'Tulis di sini'" />                    
                </div>
            </div>

            <div>
                <div class="flex mb-2">
                    <p class="mr-2">35.</p>
                    <p>Apakah yang menjadi kekurangan dalam diri anda?</p>
                </div>
                <div class="ml-7">
                    <TextArea v-model="data_old.kekurangan" :nama="'kekurangan'" :placeHolder="'Tulis di sini'" />                    
                </div>
            </div>

            <div>
                <div class="flex mb-2">
                    <p class="mr-2">36.</p>
                    <p>Apakah anda puas dengan keadaan diri anda saat ini? Jelaskan</p>
                </div>
                <div class="ml-7">
                    <TextArea v-model="data_old.kepuasan_keadaan_diri" :nama="'kepuasan_keadaan_diri'" :placeHolder="'Tulis di sini'" />                    
                </div>
            </div>

            <div>
                <div class="flex mb-2">
                    <p class="mr-2">37.</p>
                    <p>Apakah anda mempunyai prestasi / penghargaan selama ini? Bila ada silahkan disebutkan (jenis, bidang, dan tahun)</p>
                </div>
                
                <div class="md:ml-7">
                    <table class="table-fixed w-full font-semibold text-xs md:text-sm">
                        <thead class="bg-foreground-4-100 text-white">
                            <tr>
                                <th class="font-semibold w-4/12">JENIS</th>
                                <th class="font-semibold w-4/12">BIDANG</th>
                                <th class="font-semibold w-4/12">TAHUN</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-center odd:bg-foreground-4-50 even:bg-foreground-4-10" v-for="i in prestasi.length" :key="i">
                                <InputTable v-model="prestasi[i-1].jenis" :nama="`prestasi[][jenis]`" :placeHolder="'Jenis'" />
                                <InputTable v-model="prestasi[i-1].bidang" :nama="`prestasi[][bidang]`" :placeHolder="'Bidang'" />
                                <InputTable v-model="prestasi[i-1].tahun" :nama="`prestasi[][tahun]`" :placeHolder="'Tahun'" />
                            </tr>
                        </tbody>
                    </table>
                    <div class="flex gap-1 w-full justify-end my-2 text-xs md:text-sm">
                        <button @click.prevent="subPrestasiCount" class="text-white bg-foreground-4-100 hover:bg-foreground-4-200
                                                duration-200 rounded-md h-auto w-auto px-5 py-1">
                                                    <i class="fa fa-minus mr-1"></i>
                                                    <span>Kurangi</span>
                                                </button>
                        <button @click.prevent="prestasi.push({jenis:'',bidang:'',tahun:''})" class="text-white bg-foreground-4-100 hover:bg-foreground-4-200
                                                duration-200 rounded-md h-auto w-auto px-5 py-1">
                                                <i class="fa fa-plus mr-1"></i>
                                                <span>Tambah</span>
                                                </button>
                    </div>
                </div>
                <!-- <div class="ml-7">
                    <TextArea :modelValue="''" :nama="'prestasi'" :placeHolder="'Tulis di sini'" />                    
                </div> -->
            </div>

            <div>
                <div class="flex mb-2">
                    <p class="mr-2">38.</p>
                    <p>Adakah bidang seni yang Anda kuasai ? jika ada, sebutkan jenisnya (Musik, suara, dll)</p>
                </div>
                <div class="ml-7">
                    <TextArea v-model="data_old.seni_dikuasai.jenis" :nama="'seniDikuasai'" :placeHolder="'Tulis di sini'" />                    
                </div>
            </div>

            <div>
                <div class="flex mb-2">
                    <p class="mr-2">39.</p>
                    <p>Sebagai referensi, sebutkan 2 (dua) nama orang terdekat anda, beserta alamat dan telepon: </p>
                </div>
                <div class="ml-7">
                    <div class="md:flex md:gap-10 mb-2">
                        <div class="mb-2 md:w-1/2">
                            <p class="font-bold">Orang Terdekat 1</p>
                            <p>Nama</p>
                            <InputBio :type="'text'" v-model="orang_terdekat[0].nama" :nama="'orang_terdekat[][nama]'" :placeHolder="'Nama Lengkap'" />
                            <p>Alamat</p>
                            <InputBio :type="'text'" v-model="orang_terdekat[0].alamat" :nama="'orang_terdekat[][alamat]'" :placeHolder="'Alamat'" />
                            <p>No. Telepon</p>
                            <InputBio :type="'number'" v-model="orang_terdekat[0].telepon" :nama="'orang_terdekat[][telepon]'" :placeHolder="'081234567890'" />
                        </div>
                        <div class="md:w-1/2">
                            <p class="font-bold">Orang Terdekat 2</p>
                            <p>Nama</p>
                            <InputBio :type="'text'" v-model="orang_terdekat[1].nama" :nama="'orang_terdekat[][nama]'" :placeHolder="'Nama Lengkap'" />
                            <p>Alamat</p>
                            <InputBio :type="'text'" v-model="orang_terdekat[1].alamat" :nama="'orang_terdekat[][alamat]'" :placeHolder="'Alamat'" />
                            <p>No. Telepon</p>
                            <InputBio :type="'number'" v-model="orang_terdekat[1].telepon" :nama="'orang_terdekat[][telepon]'" :placeHolder="'081234567890'" />
                        </div>
                    </div>
                </div>
            </div>

            <p class="font-bold text-xl mt-10 mb-20">Bahwa segala biodata yang saya isi di atas adalah benar adanya. </p>
            <div class="flex justify-center md:justify-end font-bold">
                <div>
                    <div class="flex mb-2">
                        <input type="text" name="kota_ttd" id="" class="w-36 inline-block px-3 text-center outline-none bg-transparent border-b-2 border-stroke-100 placeholder-stroke-100" placeholder="Kota">
                        <p class="ml-1 mr-2 font-bold">, {{getDate()}}</p>
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
                    <div class="text-center mb-2">
                        <input type="file" name="imgSign" id="files" class="hidden" @change="signChange">
                        <label for="files" class="bg-foreground-3-300 ring-1 ring-inset ring-stroke-100 hover:bg-foreground-3-400
                                                    duration-200 rounded-xl py-1 px-5">Unggah Tanda Tangan</label>
                    </div>
                    
                    <div class="text-center">
                        {{fullname}}
                    </div>
                </div>
            </div>
            <div class="mt-10 mb-5 flex justify-end">
                <button type="submit" class="bg-foreground-4-100 hover:bg-foreground-4-200 text-white hover:bg-green-800 duration-200 rounded-full 
                        text-lg font-bold px-10 py-2">
                    Kirim
                </button>
            </div>
        </form>
        
        <div id="spinner-modal" class="fixed top-0 left-0 w-screen h-screen flex items-center bg-foreground-3-500 bg-opacity-70 justify-center z-20" style="display: none">
            <i class="fas fa-spinner animate-spin fa-7x inline-block text-foreground-4-100"></i>
        </div>
    </div>
</template>

<script>
import InputBio from '../components/input.vue'
import InputTable from '../components/table_input.vue'
import TextArea from '../components/textarea.vue'
import Radio from '../components/radiobutton.vue'

import axios from 'axios'
export default {
    components: {
        InputBio, InputTable, TextArea, Radio, axios
    },
    data(){
        return{
            judulHalaman: 'Biodata',
            url: null,
            fullname: "",
            ktp: "",
            ttl: "",
            jenis_kelamin: "",
            alamat: "",
            usia: "",
            noHp: "",
            status_perkawinan: "",
            sudahMenikah: false,
            sakitKeras: false,
            adaKenalan: false,
            adaCacat: false,
            pendidikan: [{tingkat:'', jurusan:'', nama_sekolah:'', kota:'', tahun_lulus:''}],
            keluarga:[[{nama:'', ttl:'', alamat:'', pendidikan:'', pekerjaan:''}],
                            [{nama:'', ttl:'', alamat:'', pendidikan:'', pekerjaan:''}],
                            [{nama:'', ttl:'', alamat:'', pendidikan:'', pekerjaan:''}],
                            [{ nama:'', ttl:'', alamat:'',pendidikan:'', pekerjaan:''}]],
            riwayat: [{dari:'', sampai:'', nama_perusahaan:'', kota:'', bidang_usaha:'', jabatan:''}],
            training: [{materi:'', penyelenggara:'', tahun:'', tempat:''}],
            organisasi: [{nama:'', tempat:'', masa:'', jabatan:''}],
            bahasa: [{bahasa:'',berbicara:'',menulis:'',mendengar:''}],
            prestasi: [{jenis:'',bidang:'',tahun:''}],
            orang_terdekat: [{nama:'', alamat:'',telepon:''},{nama:'', alamat:'',telepon:''}],
            data_old: {},
            month: ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],
            email: null,
            id_tes_result: null,
            exam_session: null,
            ready: false,
            port: import.meta.env.VITE_BACKEND_URL
        }
    },
    methods: {
        changeCacat(stat){
            if(stat) this.adaCacat=true
            else {
                this.adaCacat=false
                this.data_old.kesehatan.cacat_desc = ""
            }
        },
        kembali(){
            this.$router.go(-1) 
        },
        signChange(e){
            var input = e.target;
            if (input.files) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.url = e.target.result;
                }
                this.image=input.files[0];
                reader.readAsDataURL(input.files[0]);
            }
        },
        subPendidikanCount(){ if (this.pendidikan.length>1) this.pendidikan.pop() },
        subKeluargaCount(idx){ 
            if (this.keluarga[idx].length>1) this.keluarga[idx].pop()
        },
        subRiwayatCount(){ if (this.riwayat.length>1) this.riwayat.pop() },
        subTrainingCount(){ if (this.training.length>1) this.training.pop() },
        subOrganisasiCount(){ if (this.organisasi.length>1) this.organisasi.pop() },
        subBahasaCount(){ if (this.bahasa.length>1) this.bahasa.pop() },
        subPrestasiCount(){ if (this.prestasi.length>1) this.prestasi.pop() },
        getDate(){
            const today = new Date()
            const date = ('00'+today.getDate()).slice(-2) + " " + this.month[today.getMonth()] + " " + today.getFullYear()
            return date
        },
        dateFormatting(date){
            let arr = date.split('-')
            return arr[2]+"-"+arr[1]+"-"+arr[0]
        },
        submitForm(e){
            let data = Object.fromEntries(new FormData(e.target).entries());

            let res = []
            let res2 = {}
            let notInclude = ["imgSign","keadaan","sakit_keras","cacat","cacat_desc","kapan","menikah","nama_suami_istri","nama_anak","gaji_diperoleh",
                                "alasan_berhenti","lama_berhenti_kerja","bisa_mulai_kerja","kenalan_perusahaan","kenalan_nama","kenalan_alamat",
                                "kenalan_jabatan","kendaraan_ket","kendaraan_milik","seniDikuasai","kota_ttd"]
            Object.entries(data).map(d => {
                if(!d[0].includes("[") && !notInclude.includes(d[0])){
                    res.push([d[0],d[1]])
                }else if(!d[0].includes("[") && notInclude.includes(d[0])){
                    res2[d[0]] = d[1]
                }
            })
            // console.log(res)
            
            let formData = new FormData()
            for (let i = 0; i < res.length; i++) {
                formData.append(res[i][0], res[i][1])
            }

            let kesehatan = JSON.stringify({
                "keadaan": res2.keadaan,
                "cacat": res2.cacat,
                "cacat_desc": res2.cacat_desc,
                "sakit_keras": res2.sakit_keras,
                "kapan": res2.kapan,
            })
            formData.append("kesehatan", kesehatan)

            let nikah = JSON.stringify({
                "menikah": res2.menikah,
                "nama_suami_istri": res2.nama_suami_istri,
                "nama_anak": res2.nama_anak,
            })
            formData.append("status_nikah", nikah)
            
            formData.append("pendidikan", JSON.stringify(this.pendidikan))

            let kel = JSON.stringify({
                orang_tua: this.keluarga[0],
                istri_suami: this.keluarga[1],
                anak_kandung: this.keluarga[2],
                saudara_kandung: this.keluarga[3],
            })
            formData.append("keluarga", kel)

            let riwayats = JSON.stringify({
                "riwayat": this.riwayat,
                "gaji_diperoleh": res2.gaji_diperoleh,
                "alasan_berhenti": res2.alasan_berhenti,
            })
            formData.append("riwayat_pekerjaan", riwayats)

            formData.append("training_kursus", JSON.stringify(this.training))

            formData.append("organisasi", JSON.stringify(this.organisasi))

            formData.append("bahasa_dikuasai", JSON.stringify(this.bahasa))

            let keterangan_ker = JSON.stringify({
                "lama_berhenti_kerja": res2.lama_berhenti_kerja,
                "bisa_mulai_kerja": res2.bisa_mulai_kerja,
                "kenalan_perusahaan": res2.kenalan_perusahaan,
                "kenalan": JSON.stringify({
                    "nama": res2.kenalan_nama,
                    "alamat": res2.kenalan_alamat,
                    "jabatan": res2.kenalan_jabatan
                }), 
            })
            formData.append("keterangan_kerja",keterangan_ker)

            let kendaraans = JSON.stringify({
                "keterangan": res2.kendaraan_ket,
                "kepemilikan": res2.kendaraan_milik
            })
            formData.append("kendaraan", kendaraans)

            formData.append("prestasi", JSON.stringify(this.prestasi))

            formData.append("seni_dikuasai", JSON.stringify({"jenis": res2.seniDikuasai}))

            formData.append("orang_terdekat", JSON.stringify(this.orang_terdekat))

            formData.append("tanggal_biodata", res2.kota_ttd+", "+this.getDate())

            var fileTT = document.forms['biodataForm']['files'].files[0]
            if (fileTT!=undefined)
                fileTT.originalname = fileTT.name

            formData.append("updating_email", this.email)
            formData.append("tanda_tangan", fileTT)
            // let formData2 = {
            //     'updating_email': this.email,
            //     'biodata': formData,
            //     'tanda_tangan': fileLamaran,
            // }
            // let formData2 = new FormData()
            // formData2.append('updating_email', this.email)
            // formData2.append('biodata', formData)
            // formData2.append('tanda_tangan', fileLamaran)
            
            $('#spinner-modal').fadeIn("slow");
            
            let data_result = null
            axios.post(this.port+'/registrant/update', formData)
            .then((response) => {
                if (response.status==200){
                    axios
                    .get(this.port+`/test_result/${this.id_tes_result}`)
                    .then(({data}) => (
                        data_result = data,
                        axios.post(this.port+'/test_result/update',{
                            "updating_id": data_result.id,
                            "test_id": 19,
                            "exam_session": this.exam_session,
                            "start_date": data_result.start_date,
                            "finish_date": Date.now(),
                            "status": 2,
                            "result": formData
                        })
                        .then((response) => {
                            // console.log(response)
                            $('#spinner-modal').fadeOut("slow");
                            
                            Swal.fire(
                                'Sukses!',
                                'Biodata berhasil disimpan.',
                                'success'
                            )
                            .then(function(){
                                window.location = '/dashboard'
                            })
                        }).catch( error => { 
                            console.log('error: ' + error) 
                        })
                    )).catch( error => { 
                        console.log('error: ' + error) 
                    })
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
        },
        initKosong(){
            this.data_old.seni_dikuasai = {}
            this.data_old.kendaraan = {}
            this.data_old.keterangan_kerja = {}
            this.data_old.keterangan_kerja.kenalan = {}
            this.data_old.riwayat_pekerjaan = {}
            this.data_old.status_nikah = {}
            this.data_old.kesehatan = {}
        },
        initDataLama(data){
            this.data_old.seni_dikuasai = data.seni_dikuasai != undefined ? data.seni_dikuasai : {}
            this.data_old.kendaraan = data.kendaraan != undefined ? data.kendaraan : {}
            this.data_old.keterangan_kerja = data.keterangan_kerja != undefined ? data.keterangan_kerja : {}
            this.data_old.keterangan_kerja.kenalan = data.keterangan_kerja.kenalan != undefined ? data.keterangan_kerja.kenalan : {}
            this.data_old.riwayat_pekerjaan = data.riwayat_pekerjaan != undefined ? data.riwayat_pekerjaan : {}
            this.data_old.status_nikah = data.status_nikah != undefined ? data.status_nikah : {}
            this.data_old.kesehatan = data.kesehatan != undefined ? data.kesehatan : {}

            this.fullname = this.data_old.nama_lengkap
            this.ktp = this.data_old.no_identitas
            this.ttl = this.data_old.ttl
            this.jenis_kelamin = this.data_old.jenis_kelamin
            this.alamat = this.data_old.alamat_skg
            this.usia = this.data_old.usia
            this.noHp = this.data_old.no_hp
            this.noHp = this.data_old.no_hp

            this.status_perkawinan = this.data_old.status_nikah.menikah
            this.sudahMenikah = false
            if (this.status_perkawinan=="sudah menikah")
                this.sudahMenikah = true
    
            this.sakitKeras = false            
            if (this.data_old.kesehatan.cacat == "Ya") this.sakitKeras = true

            if(this.data_old.kesehatan.cacat_desc != "") this.adaCacat = true;
            console.log(this.data_old.kesehatan.cacat_desc != "")
            
            this.adaKenalan = false
            if (this.data_old.keterangan_kerja.kenalan_perusahaan == "Ya") this.adaKenalan = true

            if (data.pendidikan == undefined)
                this.pendidikan = [{tingkat:'', jurusan:'', nama_sekolah:'', kota:'', tahun_lulus:''}]
            else 
                this.pendidikan = data.pendidikan
            
            if (data.keluarga == undefined)
                this.keluarga = [[{nama:'', ttl:'', alamat:'', pendidikan:'', pekerjaan:''}],
                                [{nama:'', ttl:'', alamat:'', pendidikan:'', pekerjaan:''}],
                                [{nama:'', ttl:'', alamat:'', pendidikan:'', pekerjaan:''}],
                                [{ nama:'', ttl:'', alamat:'',pendidikan:'', pekerjaan:''}]]
            else
                this.keluarga = [data.keluarga.orang_tua, data.keluarga.istri_suami, data.keluarga.anak_kandung, data.keluarga.saudara_kandung]

            if (data.riwayat_pekerjaan.riwayat == undefined)
                this.riwayat = [{dari:'', sampai:'', nama_perusahaan:'', kota:'', bidang_usaha:'', jabatan:''}]
            else 
                this.riwayat = data.riwayat_pekerjaan.riwayat

            if (data.training_kursus == undefined)
                this.training = [{materi:'', penyelenggara:'', tahun:'', tempat:''}]
            else 
                this.training = data.training_kursus

            if (data.organisasi == undefined)
                this.organisasi = [{nama:'', tempat:'', masa:'', jabatan:''}]
            else 
                this.organisasi = data.organisasi
            
            if (data.bahasa_dikuasai == undefined)
                this.bahasa = [{bahasa:'',berbicara:'',menulis:'',mendengar:''}]
            else 
                this.bahasa = data.bahasa_dikuasai
                
            if (data.prestasi == undefined)
                this.prestasi = [{jenis:'',bidang:'',tahun:''}]
            else 
                this.prestasi = data.prestasi

             if (data.orang_terdekat == undefined)
                this.orang_terdekat = [{nama:'', alamat:'',telepon:''},{nama:'', alamat:'',telepon:''}]
            else 
                this.orang_terdekat = data.orang_terdekat

            // console.log(this.data_old)

            this.ready = true
        }
    },
    mounted() {
        this.email = this.$cookies.get('data_registrant').email

        axios
        .get(this.port+"/applicant/"+this.email)
        .then(({data}) => {
            if(data!==undefined){
                this.fullname = data.nama
                this.ktp = data.no_ktp
                this.ttl = data.tempat_lahir+" / "+this.dateFormatting(data.tanggal_lahir)
                this.jenis_kelamin = data.jenis_kelamin
                this.alamat = data.alamat_domisili
                this.usia = data.usia
                this.sudahMenikah = data.status_perkawinan=="belum menikah"?false:true
                this.status_perkawinan = data.status_perkawinan
                this.noHp = data.nomor_hp
                this.pendidikan[0].tingkat = data.pendidikan_terakhir
                this.pendidikan[0].nama_sekolah = data.nama_sekolah
                this.pendidikan[0].jurusan = data.jurusan
                this.initKosong()
                this.ready = true

            }else{
                axios
                .get(this.port+"/registrant/"+this.email)
                .then(({data}) => {
                    this.data_old = data.biodata,
                    this.initDataLama(data.biodata)
                })
            }
        })

        let datas = this.$cookies.get("data_registrant")
        this.exam_session = datas.exam_session;
        let tests = datas.test;
        for (let i = 0; i < tests.length; i++) {
            if (tests[i][0]==19)
                this.id_tes_result = tests[i][1]
        }
        
    },
    created(){
        this.$emit('updateJudul', this.judulHalaman)
    }
}
</script>

<style>

</style>