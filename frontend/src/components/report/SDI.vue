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
            <!-- <div class="flex w-1/2">
                <div class="font-bold text-sm">
                    <p>Nama :</p>
                </div>
                <div class="ml-2 text-sm">
                    <p>{{this.nama}}</p>
                </div>
            </div> -->
            
            <h1 class="font-bold">Hasil Jawaban Tes SDI</h1>
            <div class="flex">
                <div class="font-bold text-sm">
                    <p>Nama :</p>
                </div>
                <div class="ml-3 text-sm">
                    <p>{{this.nama}}</p>
                </div>
            </div>
        </div>
        
        <div class="grow text-sm mt-1" v-if="arrTabel!=null">
            <div class="flex gap-2" v-if="print==='no'">
                <table class="table-fixed border-y-[1px] border-l-[1px] border-black w-1/2">
                    <thead class="bg-primary-900 text-white">
                        <tr>
                            <th class="font-bold w-1/3">No.</th>
                            <th class="font-bold w-1/3">Jawab</th>
                            <th class="font-bold w-1/3">Hasil</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y-[1px] divide-black">
                        <tr class="text-center" v-for="idx in 26" :key="idx">
                            <td class="border-black border-r-[0.5px] text-xs font-bold p-0">{{this.arrTabel.numbers[idx-1]}}</td>
                            <td class="border-black border-r-[0.5px] text-xs p-0">{{this.arrTabel.answers[idx-1]==1?"Ya":this.arrTabel.answers[idx-1]==0?"Tidak":"-"}}</td>
                            <td class="border-black border-r-[0.5px] text-xs p-0">{{this.arrTabel.correct_data[idx-1]}}</td>
                        </tr>
                    </tbody>
                </table>
                <table class="table-fixed border-collapse border-y-[1px] border-l-[1px] border-black w-1/2">
                    <thead class="bg-primary-900 text-white">
                        <tr>
                            <th class="font-bold w-1/3">No.</th>
                            <th class="font-bold w-1/3">Jawab</th>
                            <th class="font-bold w-1/3">Hasil</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y-[1px] divide-black">
                        <tr class="text-center" v-for="idx in 29" :key="idx">
                            <td class="border-black border-r-[0.5px] text-xs font-bold">{{this.arrTabel.numbers[idx+25]}}</td>
                            <td class="border-black border-r-[0.5px] text-xs">{{this.arrTabel.answers[idx+25]==1?"Ya":this.arrTabel.answers[idx+25]==0?"Tidak":"-"}}</td>
                            <td class="border-black border-r-[0.5px] text-xs">{{this.arrTabel.correct_data[idx+25]}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="flex gap-2" v-if="print==='yes'">
                <table class="table-fixed border-collapse border-y-[1px] border-l-[1px] border-black w-1/2">
                    <thead class="bg-primary-900 text-white">
                        <tr>
                            <th class="font-bold w-1/3"><span class="relative bottom-2">No.</span></th>
                            <th class="font-bold w-1/3"><span class="relative bottom-2">Jawab</span></th>
                            <th class="font-bold w-1/3"><span class="relative bottom-2">Hasil</span></th>
                        </tr>
                    </thead>
                    <tbody class="divide-y-[1px] divide-black">
                        <tr class="text-center" v-for="idx in 26" :key="idx">
                            <td class="border-black border-r-[0.5px] text-xs font-bold"><span class="relative bottom-2">{{this.arrTabel.numbers[idx-1]}}</span></td>
                            <td class="border-black border-r-[0.5px] text-xs"><span class="relative bottom-2">{{this.arrTabel.answers[idx-1]==1?"Ya":this.arrTabel.answers[idx-1]==0?"Tidak":"-"}}</span></td>
                            <td class="border-black border-r-[0.5px] text-xs"><span class="relative bottom-2">{{this.arrTabel.correct_data[idx-1]}}</span></td>
                        </tr>
                    </tbody>
                </table>
                <table class="table-fixed border-collapse border-y-[1px] border-l-[1px] border-black w-1/2">
                    <thead class="bg-primary-900 text-white">
                        <tr>
                            <th class="font-bold w-1/3"><span class="relative bottom-2">No.</span></th>
                            <th class="font-bold w-1/3"><span class="relative bottom-2">Jawab</span></th>
                            <th class="font-bold w-1/3"><span class="relative bottom-2">Hasil</span></th>
                        </tr>
                    </thead>
                    <tbody class="divide-y-[1px] divide-black">
                        <tr class="text-center" v-for="idx in 26" :key="idx">
                            <td class="border-black border-r-[0.5px] text-xs font-bold"><span class="relative bottom-2">{{this.arrTabel.numbers[idx+25]}}</span></td>
                            <td class="border-black border-r-[0.5px] text-xs"><span class="relative bottom-2">{{this.arrTabel.answers[idx+25]==1?"Ya":this.arrTabel.answers[idx+25]==0?"Tidak":"-"}}</span></td>
                            <td class="border-black border-r-[0.5px] text-xs"><span class="relative bottom-2">{{this.arrTabel.correct_data[idx+25]}}</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="flex justify-end mt-5">
                <div class="text-right mr-2 font-bold">
                    <p>Total :</p>
                    <p>Keterangan :</p>
                </div>
                <div>
                    <p>{{this.arrTabel.sum_correct}}</p>
                    <p>{{this.arrTabel.keterangan}}</p>
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
        this.arrTabel = this.data[0]
    },
}
</script>

<style>

</style>