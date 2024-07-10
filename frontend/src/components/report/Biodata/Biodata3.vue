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
            
            <div>
                <div class="flex font-bold">
                    <p class="mr-2">30.</p>
                    <p>Apakah anda memiliki kendaraan (sebutkan jenis kendaraan dan nomer kendaraan):</p>
                </div>
                <div class="ml-5">
                    {{biodata.kendaraan.keterangan}}                
                </div>
            </div>

            <div>
                <div class="mb-2 ml-5 flex gap-2">
                    <p class="font-bold">Kendaraan tersebut milik :</p>
                    <p>{{biodata.kendaraan.kepemilikan}} </p>
                </div>
            </div>

            <div class="mb-2">
                <div class="flex font-bold">
                    <p class="mr-2">31.</p>
                    <p>Apa Hobby Anda? </p>
                </div>
                <div class="ml-5">
                    {{biodata.hobi}}               
                </div>
            </div>
            
            <div class="mb-2">
                <div class="flex font-bold">
                    <p class="mr-2">32.</p>
                    <p>Apabila Anda diterima sebagai karyawan, gaji berapa yang Anda harapkan untuk tiap bulannya?</p>
                </div>
                <div class="ml-5">
                    {{biodata.harapan_gaji}}                    
                </div>
            </div>

            <div class="mb-2">
                <div class="flex font-bold">
                    <p class="mr-2">33.</p>
                    <p>Apakah Anda pernah bermasalah dengan Hukum?</p>
                </div>
                <div class="ml-5">
                    {{biodata.masalah_hukum}}                
                </div>
            </div>

            <div class="mb-2">
                <div class="flex font-bold">
                    <p class="mr-2">34.</p>
                    <p>Apakah yang menjadi kelebihan dalam diri anda?</p>
                </div>
                <div class="ml-5">
                    {{biodata.kelebihan}} 
                </div>
            </div>

            <div class="mb-2">
                <div class="flex font-bold">
                    <p class="mr-2">35.</p>
                    <p>Apakah yang menjadi kekurangan dalam diri anda?</p>
                </div>
                <div class="ml-5">
                    {{biodata.kekurangan}}                   
                </div>
            </div>

            <div class="mb-2">
                <div class="flex font-bold">
                    <p class="mr-2">36.</p>
                    <p>Apakah anda puas dengan keadaan diri anda saat ini? Jelaskan</p>
                </div>
                <div class="ml-5">
                    {{biodata.kepuasan_keadaan_diri}}               
                </div>
            </div>

            <div class="mb-2">
                <div class="flex font-bold">
                    <p class="mr-2">37.</p>
                    <p>Apakah anda mempunyai prestasi / penghargaan selama ini? Bila ada silahkan disebutkan (jenis, bidang, dan tahun)</p>
                </div>
                <div class="ml-5">
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
                <div class="ml-5">
                    <span>{{biodata.seni_dikuasai.jenis}}</span>
                    <!-- <span v-for="i in biodata.seni_dikuasai.jenis.length" :key="i">, {{biodata.seni_dikuasai.jenis[i-1]}}</span> -->
                </div>
            </div>

            <div>
                <div class="flex font-bold">
                    <p class="mr-2">39.</p>
                    <p>Sebagai referensi, sebutkan 2 (dua) nama orang terdekat anda, beserta alamat dan telepon: </p>
                </div>
                <div class="ml-5">
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

            <p class="font-bold mt-10 mb-10">Bahwa segala biodata yang saya isi di atas adalah benar adanya. </p>
            <div class="flex justify-end font-bold">
                <div>
                    <div>
                        {{biodata.tanggal_biodata}}
                    </div>
                    <p class="mb-2 text-center">Pelamar,</p>
                    <div class="text-center">
                        <img v-if="url!=null" :src="url" alt="" id="imgSoal" class="h-20 w-20 mb-2 inline-block">
                        <div v-else class="h-20 w-20 mb-2 inline-block bg-[#C4C4C4]">
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
    </div>
</template>

<script>
export default {
    props: {
        "data": { type: Object, default: {}, required: true }
    },
    data() {
        return {
            biodata: null,
            url: null
        }
    },
    methods: {
        getImg(data){
            var id = data.match(/[-\w]{25,}/);
            return "https://drive.google.com/uc?export=view&id="+id
        },
    },
    mounted() {
        this.biodata = this.data
        this.url = this.getImg(this.biodata.tanda_tangan)
    },
}
</script>

<style>

</style>