<template>
    <div class="flex items-center w-full bg-foreground-4-100 px-4 py-2">
        <!-- <img src="../../assets/logo.png" alt="" class="w-14 h-10"> -->
        <div class="text-center bg-background-400 rounded-xl flex items-center px-1 h-12">
            <img src="../../assets/logo.png" alt="" class="w-14 h-10">
        </div>
        <div class="text-white text-center w-full relative bottom-2" v-if="print==='yes'">
            <p class="font-bold text-sm">PT. Adiputro Wirasejati</p>
            <div class="text-xs">
                <p>Jl. Raya Balearjosari no. 35, Malang, Jawa Timur - Indonesia 65126</p>
                <p>+62 (0) 341 491 139 | Adiputrogroup.com</p>
            </div>
        </div>
        <div class="text-white text-center w-full" v-if="print==='no'">
            <p class="font-bold text-sm">PT. Adiputro Wirasejati</p>
            <div class="text-[0.6rem]">
                <p>Jl. Raya Balearjosari no. 35, Malang, Jawa Timur - Indonesia 65126</p>
                <p>+62 (0) 341 491 139 | Adiputrogroup.com</p>
            </div>
        </div>
    </div>
    
    <div class="px-2 py-1">
        <div class="flex mt-2">
            <div class="flex">
                <div class="font-bold text-sm">
                    <p>Nama</p>
                    <p>Jenis Kelamin (L/P)</p>
                </div>
                <div class="ml-2 text-sm">
                    <p>: {{this.nama}}</p>
                    <p>: {{this.jk}}</p>
                </div>
            </div>
            
            <div class="flex ml-3">
                <div class="font-bold text-sm">
                    <p>Pendidikan</p>
                    <p>Kode</p>
                </div>
                <div class="ml-3 text-sm">
                    <p>: {{this.pendidikan}}</p>
                    <p>: {{this.kode}}</p>
                </div>
            </div>
        </div>

        <div class="grow text-sm mt-3" v-if="arrTabel!=null">
            <table class="table-fixed border-collapse border border-primary-200 w-full text-white">
                <thead class="bg-primary-900">
                    <tr v-if="print==='yes'">
                        <th class="font-semibold w-1/12"><span class="relative bottom-2 font-bold">Faktor</span></th>
                        <th class="font-semibold w-1/12"><span class="relative bottom-2 font-bold">r</span></th>
                        <th class="font-semibold w-1/12"><span class="relative bottom-2 font-bold">c</span></th>
                        <th class="font-semibold w-1/12"><span class="relative bottom-2 font-bold">RS</span></th>
                        <th class="font-semibold w-1/12"><span class="relative bottom-2 font-bold">%</span></th>
                        <th class="font-semibold w-3/12"><span class="relative bottom-2 font-bold">Kategori</span></th>
                        <th class="font-semibold w-1/12"><span class="relative bottom-2 font-bold">Ket</span></th>
                    </tr>
                    <tr v-else-if="print==='no'">
                        <th class="font-semibold w-1/12">Faktor</th>
                        <th class="font-semibold w-1/12">r</th>
                        <th class="font-semibold w-1/12">c</th>
                        <th class="font-semibold w-1/12">RS</th>
                        <th class="font-semibold w-1/12">%</th>
                        <th class="font-semibold w-3/12">Kategori</th>
                        <th class="font-semibold w-1/12">Ket</th>
                    </tr>
                </thead>
                <tbody v-if="print==='yes'" class="bg-primary-500 divide-y divide-primary-400">
                    <tr class="text-center" v-for="(report, idx) in arrTabel" :key="idx">
                        <td><span class="relative bottom-2">{{report[0]}}</span></td>
                        <td><span class="relative bottom-2">{{report[1].r}}</span></td>
                        <td><span class="relative bottom-2">{{report[1].c}}</span></td>
                        <td><span class="relative bottom-2">{{report[1].RS}}</span></td>
                        <td class="font-bold"><span class="relative bottom-2">{{report[1].Percentile}}</span></td>
                        <td class="font-bold"><span class="relative bottom-2">{{report[1].Kategori}}</span></td>
                        <td class="font-bold"><span class="relative bottom-2">{{report[1].Ket}}</span></td>
                    </tr>
                </tbody>
                <tbody v-else-if="print==='no'" class="bg-primary-500 divide-y divide-primary-400">
                    <tr class="text-center" v-for="(report, idx) in arrTabel" :key="idx">
                        <td>{{report[0]}}</td>
                        <td>{{report[1].r}}</td>
                        <td>{{report[1].c}}</td>
                        <td>{{report[1].RS}}</td>
                        <td class="font-bold">{{report[1].Percentile}}</td>
                        <td class="font-bold">{{report[1].Kategori}}</td>
                        <td class="font-bold">{{report[1].Ket}}</td>
                    </tr>
                </tbody>
            </table>

            <table class="table-fixed w-full mb-2">
                <thead class="">
                    <tr>
                        <th class="font-semibold w-1/12"></th>
                        <th class="font-semibold w-1/12"></th>
                        <th class="font-semibold w-1/12"></th>
                        <th class="font-semibold w-1/12"></th>
                        <th class="font-semibold w-1/12"></th>
                        <th class="font-semibold w-3/12"></th>
                        <th class="font-semibold w-1/12"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="text-center">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td class="font-bold" v-if="arrData!=null">{{arrData[1][1]}}</td>
                        <td class="font-bold text-red-500" v-if="arrData!=null">{{arrData[1][1]}}</td>
                        <td class="font-bold">(total harus 210)</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            
            <div class="flex mr-2 mb-1" v-if="arrData!=null">
                <div class="text-right mr-2 font-bold">
                    <p>M :</p>
                    <p>AW :</p>
                    <p>con :</p>
                </div>
                
                <div class="mr-2">
                    <p>{{arrData[2][1]}}</p>
                    <p>{{arrData[4][1]}}</p>
                    <p>{{arrData[0][1].RS}} <span class="font-bold">(RS)</span> {{arrData[0][1].Percentile}} <span class="font-bold">(Percentile)</span></p>
                </div>
                
                <div class="font-bold">
                    <p>{{arrData[3][1]}}</p>
                    <p>{{arrData[5][1]}}</p>
                    <p>{{arrData[0][1].Kategori}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        "data": { type: Object, default: [], required: true },
        "print": { type: String, default: 'no', required: true },
        "nama": { type: String, default: '', required: true },
        "jk": { type: String, default: '', required: true },
        "pendidikan": { type: String, default: '', required: true },
        "kode": { type: String, default: '', required: true },
    },
    data() {
        return {
            arrData: null,
            arrTabel: null
        }
    },
    mounted() {
        var temp = Object.entries(this.data)
        this.arrData = temp.slice(15,21)
        this.arrTabel = temp.slice(0,15)
        // console.log(this.arrData)
        // console.log(this.arrTabel)
        // console.log(this.arrData[0][1].RS)
    },
}
</script>

<style>

</style>