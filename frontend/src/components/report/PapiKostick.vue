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
            <h1 class="font-bold">Hasil Tes Papi Kostick</h1>
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
            <div v-if="print==='no'">
                <table class="table-fixed border-y-[1px] border-l-[1px] border-black w-full">
                    <thead class="bg-primary-900 text-white">
                        <tr>
                            <th class="font-bold w-5/12" colspan="2">Aspek</th>
                            <th class="font-bold w-1/12">Faktor</th>
                            <th class="font-bold w-1/12">Nilai</th>
                            <th class="font-bold w-5/12">Analisis</th>
                        </tr>
                    </thead>
                </table>
                <table class="table-fixed border-y-[1px] border-l-[1px] border-black w-full">
                    <tbody class="border-black border-b-[0.5px] w-full" v-for="i in this.arrTabel" :key="i">
                        <tr>
                            <td class="border-black border-r-[0.5px] text-[0.6rem] text-center font-bold p-0 px-1 w-2/12" :rowspan="i.data.length">{{i.jenis}}</td>
                            <td class="border-black border-r-[0.5px] text-[0.6rem] text-xs leading-3 pt-0 px-1 pb-1 w-3/12 bg-background-300">{{i.data[0].aspek}}</td>
                            <td class="border-black border-r-[0.5px] text-[0.6rem] text-center text-xs p-0 w-1/12 bg-background-300">{{i.data[0].faktor}}</td>
                            <td class="border-black border-r-[0.5px] text-[0.6rem] text-center text-xs p-0 w-1/12 bg-background-300">{{i.data[0].nilai}}</td>
                            <td class="border-black border-r-[0.5px] text-[0.6rem] text-xs leading-3 p-0 px-1 pb-1 w-5/12 bg-background-300">{{i.data[0].keterangan}}</td>
                        </tr>
                        <tr v-for="j in i.data.length-1" :key="j">
                            <td class="border-black border-r-[0.5px] text-[0.6rem] text-xs leading-3 p-0 px-1 pb-1 w-3/12"
                            :class="{'bg-background-200': j%2==1, 'bg-background-300': j%2==0}">{{i.data[j].aspek}}</td>
                            <td class="border-black border-r-[0.5px] text-[0.6rem] text-center text-xs p-0 w-1/12"
                            :class="{'bg-background-200': j%2==1, 'bg-background-300': j%2==0}">{{i.data[j].faktor}}</td>
                            <td class="border-black border-r-[0.5px] text-[0.6rem] text-center text-xs p-0 w-1/12"
                            :class="{'bg-background-200': j%2==1, 'bg-background-300': j%2==0}">{{i.data[j].nilai}}</td>
                            <td class="border-black border-r-[0.5px] text-[0.6rem] text-xs leading-3 p-0 px-1 pb-1 w-5/12"
                            :class="{'bg-background-200': j%2==1, 'bg-background-300': j%2==0}">{{i.data[j].keterangan}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div v-if="print==='yes'">
                <table class="table-fixed border-y-[1px] border-l-[1px] border-black w-full">
                    <thead class="bg-primary-900 text-white">
                        <tr>
                            <th class="font-bold w-5/12" colspan="2"><span class="relative bottom-2">Aspek</span></th>
                            <th class="font-bold w-1/12"><span class="relative bottom-2">Faktor</span></th>
                            <th class="font-bold w-1/12"><span class="relative bottom-2">Nilai</span></th>
                            <th class="font-bold w-5/12"><span class="relative bottom-2">Analisis</span></th>
                        </tr>
                    </thead>
                </table>
                <table class="table-fixed border-y-[1px] border-l-[1px] border-black w-full">
                    <tbody class="border-black border-b-[0.5px] w-full" v-for="i in this.arrTabel" :key="i" >
                        <tr>
                            <td class="border-black border-r-[0.5px] text-[0.6rem] text-center font-bold p-0 px-1 w-2/12" :rowspan="i.data.length"><span class="relative bottom-1.5">{{i.jenis}}</span></td>
                            <td class="border-black border-r-[0.5px] text-[0.6rem] text-xs leading-3 p-0 px-1 w-3/12 bg-background-300"><span class="relative bottom-1.5">{{i.data[0].aspek}}</span></td>
                            <td class="border-black border-r-[0.5px] text-[0.6rem] text-center text-xs p-0 w-1/12 bg-background-300"><span class="relative bottom-1.5">{{i.data[0].faktor}}</span></td>
                            <td class="border-black border-r-[0.5px] text-[0.6rem] text-center text-xs p-0 w-1/12 bg-background-300"><span class="relative bottom-1.5">{{i.data[0].nilai}}</span></td>
                            <td class="border-black border-r-[0.5px] text-[0.6rem] text-xs leading-3 p-0 px-1 w-5/12 bg-background-300"><span class="relative bottom-1.5">{{i.data[0].keterangan}}</span></td>
                        </tr> 
                        <tr v-for="j in i.data.length-1" :key="j">
                            <td class="border-black border-r-[0.5px] text-[0.6rem] text-xs leading-3 p-0 px-1 pb-1 w-3/12"
                            :class="{'bg-background-200': j%2==1, 'bg-background-300': j%2==0, 'border-b-[0.5px]': j==i.data.length-1}"><span class="relative bottom-1.5">{{i.data[j].aspek}}</span></td>
                            <td class="border-black border-r-[0.5px] text-[0.6rem] text-center text-xs p-0 w-1/12"
                            :class="{'bg-background-200': j%2==1, 'bg-background-300': j%2==0, 'border-b-[0.5px]': j==i.data.length-1}"><span class="relative bottom-1.5">{{i.data[j].faktor}}</span></td>
                            <td class="border-black border-r-[0.5px] text-[0.6rem] text-center text-xs p-0 w-1/12"
                            :class="{'bg-background-200': j%2==1, 'bg-background-300': j%2==0, 'border-b-[0.5px]': j==i.data.length-1}"><span class="relative bottom-1.5">{{i.data[j].nilai}}</span></td>
                            <td class="border-black border-r-[0.5px] text-[0.6rem] text-xs leading-3 p-0 px-1 pb-1 w-5/12"
                            :class="{'bg-background-200': j%2==1, 'bg-background-300': j%2==0, 'border-b-[0.5px]': j==i.data.length-1}"><span class="relative bottom-1.5">{{i.data[j].keterangan}}</span></td>
                        </tr>
                    </tbody>
                </table>
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
            hasil: null,
            bio: null
        }
    },
    mounted() {
        this.arrTabel = this.data
        // this.bio = this.biodata
        // console.log(this.bio)
        // console.log(this.arrTabel)
        // console.log(this.hasil)
    },
}
</script>

<style>

</style>