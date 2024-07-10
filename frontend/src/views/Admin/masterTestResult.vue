<template>
    <div class="h-full w-9/12 m-auto text-white relative mt-5">
        <div>
            <div class="flex justify-between mb-3">
                <h1 class="text-3xl font-bold text-primary-900">Test Result List</h1>
                <!-- <div class="flex gap-3">
                    <p class="text-xl font-bold">Selesai: 5</p>
                    <p class="text-xl font-bold">Belum Selesai: 5</p>
                </div> -->
            </div>
            <div class="overflow-auto w-full no-scrollbar mt-5" style="height: 30rem;">
                <table class="table-fixed border-collapse border border-primary-200 w-full">
                    <thead class="bg-primary-800 divide-y divide-primary-200">
                        <tr>
                            <th class="font-semibold w-2/12">Registrant</th>
                            <th class="font-semibold w-2/12">Jenis Tes</th>
                            <th class="font-semibold w-2/12">Tes Belum Selesai</th>
                            <th class="font-semibold w-2/12">Tes Selesai</th>
                            <th class="font-semibold w-3/12">Deadline</th>
                            <th class="font-semibold w-2/12">Action</th>
                        </tr>
                    </thead>
                    <tbody class="bg-primary-600 divide-y divide-primary-500" id="user-table">
                        <tr class="text-center" v-for="i in 5" :key="i">
                            <td>Registrant {{i}}</td>
                            <td>Tes Tintum</td>
                            <td>7</td>
                            <td>3</td>
                            <td>02 Februari 2022 23:59:59</td>
                            <td class="py-2">
                                <button class="bg-green-800 text-white ring-2 ring-inset ring-primary-200 hover:bg-primary-200 hover:text-primary-900 
                                                duration-200 rounded-full h-auto w-auto text-base px-5 py-1" 
                                    @click="this.$router.push({path: '/testResult'})"> 
                                    <i class="fa fa-info-circle mr-2"></i>
                                    <span>Detail</span>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- <div class="my-5 flex justify-end">
                <button class="bg-green-800 text-white ring-2 ring-inset ring-primary-300 
                                hover:bg-primary-200 hover:text-primary-900 duration-200 rounded-full text-lg px-10 py-2">
                                <i class="fa fa-print mr-2"></i>
                                <span>Print Result</span>
                                </button>
            </div> -->
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            judulHalaman: 'Master',
        }
    },
    methods: {
        
    },
    created(){
        this.$emit('updateJudul', this.judulHalaman)
    }
}
</script>

<style>

</style>