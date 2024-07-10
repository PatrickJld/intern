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
        <div class="flex justify-between items-center relative" :class="{'bottom-2': print==='yes'}">
            <h1 class="font-bold">Hasil Tes Tintum Anak</h1>
            <div class="flex">
                <div class="font-bold text-sm">
                    <p>Nama :</p>
                </div>
                <div class="ml-3 text-sm">
                    <p>{{this.nama}}</p>
                </div>
            </div>
        </div>
        
        <div class="grow text-sm mt-2" v-if="arrTabel!=null">
            <div v-if="print==='no'" class="flex justify-center">
                <table class="table-fixed border-y-[1px] border-l-[1px] border-black w-1/2">
                    <thead class="bg-primary-900 text-white">
                        <tr>
                            <th class="font-bold w-1/3">Persoalan</th>
                            <th class="font-bold w-1/3">Benar</th>
                            <th class="font-bold w-1/3">Norma</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y-[1px] divide-black">
                        <tr class="text-center" v-for="(i, idx) in arrTabel" :key="idx">
                            <td class="border-black border-r-[0.5px] text-xs font-bold p-0">{{idx+1}}</td>
                            <td class="border-black border-r-[0.5px] text-xs p-0">{{this.arrTabel[idx].num_correct}}</td>
                            <td class="border-black border-r-[0.5px] text-xs p-0">
                                <div class="flex gap-2">
                                    <div class="w-1/3 text-right">{{this.arrTabel[idx].value}}</div>
                                    <div class="w-1/4"> - </div>
                                    <div class="w-1/3 text-left">{{this.arrTabel[idx].keterangan}}</div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="flex justify-center" v-if="print==='yes'">
                <table class="table-fixed border-collapse border-y-[1px] border-l-[1px] border-black w-1/2">
                    <thead class="bg-primary-900 text-white">
                        <tr>
                            <th class="font-bold w-1/3"><span class="relative bottom-2">Persoalan</span></th>
                            <th class="font-bold w-1/3"><span class="relative bottom-2">Benar</span></th>
                            <th class="font-bold w-1/3"><span class="relative bottom-2">Norma</span></th>
                        </tr>
                    </thead>
                    <tbody class="divide-y-[1px] divide-black">
                        <tr class="text-center" v-for="(i, idx) in arrTabel" :key="idx">
                            <td class="border-black border-r-[0.5px] text-xs font-bold"><span class="relative bottom-2">{{idx+1}}</span></td>
                            <td class="border-black border-r-[0.5px] text-xs"><span class="relative bottom-2">{{this.arrTabel[idx].num_correct}}</span></td>
                            <td class="border-black border-r-[0.5px] text-xs"><span class="relative bottom-2">
                                <div class="flex gap-2">
                                    <div class="w-1/3 text-right">{{this.arrTabel[idx].value}}</div>
                                    <div class="w-1/4"> - </div>
                                    <div class="w-1/3 text-left">{{this.arrTabel[idx].keterangan}}</div>
                                </div>
                            </span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
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
        "nama": { type: String, default: "", required: true },
        "print": { type: String, default: 'no', required: true },
    },
    data() {
        return {
            arrTabel: null,
            bio: null
        }
    },
    mounted() {
        // this.hasil = this.data[5]
        this.arrTabel = this.data.data
        // this.bio = this.biodata
        // console.log(this.bio)
        // console.log(this.arrTabel)
    },
}
</script>

<style>

</style>