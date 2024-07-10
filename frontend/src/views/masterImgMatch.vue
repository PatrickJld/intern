<template>
    <div class="h-full w-9/12 m-auto text-white relative mt-5">
        <div>
            <div class="flex justify-between mb-3 text-primary-900">
                <h1 class="text-3xl font-bold">Image Matching Test List</h1>
                <div class="flex">
                    <p class="text-xl font-bold mr-2">Number of Questions: 20</p>
                    <button class="bg-primary-800 text-white ring-2 ring-inset hover:ring-primary-900 hover:bg-primary-400 hover:text-primary-900 duration-200 rounded-full px-5 h-auto w-auto text-base" 
                        @click="this.$router.push({path: '/addSoalImage'})">
                        <i class="fa fa-plus mr-2"></i>   
                        <span>Add Question</span>
                    </button>
                </div>
            </div>
            <div class="overflow-auto w-full no-scrollbar mt-5" style="height: 34rem;">
                <table class="table-fixed border-collapse border border-primary-200 w-full">
                    <thead class="bg-primary-800 divide-y divide-primary-200">
                        <tr>
                            <th class="font-semibold w-2/12">Question Number</th>
                            <th class="font-semibold w-3/12">Question</th>
                            <th class="font-semibold w-3/12">Choices</th>
                            <th class="font-semibold w-2/12">Answer Keys</th>
                            <th class="font-semibold w-3/12">Action</th>
                        </tr>
                    </thead>
                    <tbody class="bg-primary-600 divide-y divide-primary-500" id="user-table">
                        <tr class="text-center" v-for="i in 20" :key="i">
                            <td>{{i}}</td>
                            <td class="flex justify-center py-2"><img src="../assets/soal1.png" alt="" class="max-h-16"></td>
                            <td class="py-2"><img src="../assets/jawaban1.png" alt="" class="max-h-16"></td>
                            <td>A</td>
                            <td>
                                <button class="bg-green-800 text-white ring-2 ring-inset ring-primary-200 hover:bg-primary-200 hover:text-primary-900 
                                                duration-200 rounded-full h-auto w-auto text-base px-5 py-2 mr-1" 
                                    @click="this.$router.push({path: '/'})"> 
                                    <i class="fa fa-refresh mr-2"></i>
                                    <span>Update</span>
                                </button>
                                <button class="bg-red-600 text-white ring-2 ring-inset ring-primary-200 hover:bg-primary-200 hover:text-primary-900 
                                                duration-200 rounded-full h-auto w-auto text-base px-5 py-2" 
                                    @click="this.$router.push({path: '/'})"> 
                                    <i class="fa fa-trash-alt mr-2"></i>
                                    <span>Delete</span>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
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
    },
    
}
</script>

<style>

</style>