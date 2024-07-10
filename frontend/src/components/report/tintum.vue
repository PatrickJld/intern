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
        <div class="flex relative">
            <div class="font-bold">
                <p>Nama</p>
                <p>Jenis Kelamin (L/P)</p>
                <p>Pendidikan</p>
            </div>
            <div class="ml-3">
                <p>: {{this.nama}}</p>
                <p>: {{this.jk}}</p>
                <p>: {{this.pendidikan}}</p>
            </div>
        </div>

        <div v-if="data!=null" class="grow text-sm mt-3">
            <table class="table-fixed border-collapse border border-primary-200 w-full text-white mb-2">
                <thead class="bg-primary-900">
                    <tr v-if="print==='yes'">
                        <th class="font-semibold w-3/12"><span class="relative bottom-2 font-bold">Persoalan</span></th>
                        <th class="font-semibold w-3/12"><span class="relative bottom-2 font-bold">Nilai</span></th>
                        <th class="font-semibold w-3/12"><span class="relative bottom-2 font-bold">Norma</span></th>
                        <th class="font-semibold w-3/12"><span class="relative bottom-2 font-bold">Tintum</span></th>
                    </tr>
                    <tr v-else-if="print==='no'">
                        <th class="font-semibold w-3/12">Persoalan</th>
                        <th class="font-semibold w-3/12">Nilai</th>
                        <th class="font-semibold w-3/12">Norma</th>
                        <th class="font-semibold w-3/12">Tintum</th>
                    </tr>
                </thead>
                <tbody v-if="print==='yes'" class="bg-primary-500 divide-y divide-primary-400">
                    <tr class="text-center" v-for="(report, idx) in data.data" :key="idx">
                        <td><span class="relative bottom-2">{{idx+1}}</span></td>
                        <td><span class="relative bottom-2">{{report.num_correct}}</span></td>
                        <td><span class="relative bottom-2">{{report.norm}}</span></td>
                        <td><span class="relative bottom-2">{{report.tintum}}</span></td>
                    </tr>
                </tbody>
                <tbody v-else-if="print==='no'" class="bg-primary-500 divide-y divide-primary-400">
                    <tr class="text-center" v-for="(report, idx) in data.data" :key="idx">
                        <td>{{idx+1}}</td>
                        <td>{{report.num_correct}}</td>
                        <td>{{report.norm}}</td>
                        <td>{{report.tintum}}</td>
                    </tr>
                </tbody>
            </table>
            
            <div class="flex justify-end mr-2">
                <div class="text-right mr-2 font-bold">
                    <p>Total :</p>
                    <p>Total / 10 :</p>
                    <p>IQ :</p>
                </div>
                <div>
                    <p>{{data.norms_sum}}</p>
                    <p>{{data.norms_sum/10}}</p>
                    <p>{{data.iq}}</p>
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
    },
    data() {
        return {
            arrData: null
        }
    },
    mounted() {
        this.arrData = Object.entries(this.data)
        // console.log(this.arrData)
        // console.log(this.arrTabel)
        // console.log(this.arrData[0][1].RS)
    },
}
</script>

<style>

</style>