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

        <div class="grow text-sm mt-3">
            <canvas :id="id" width="400" height="350"></canvas>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        "data": { type: Object, default: [], required: true },
        "id": { type: String, required: true },
        "nama": { type: String, default: '', required: true },
        "jk": { type: String, default: '', required: true },
        "pendidikan": { type: String, default: '', required: true },
        "kode": { type: String, default: '', required: true },
        "print": { type: String, default: 'no', required: true },
    },
    data() {
        return {
            dataGrafik: null,
            plugin: {
                id: 'custom_canvas',
                beforeDraw: (chart) => {
                    const ctx = chart.canvas.getContext('2d');
                    ctx.save();
                    ctx.globalCompositeOperation = 'destination-over';
                    ctx.fillStyle = 'white';
                    ctx.fillRect(0, 0, chart.width, chart.height);
                    ctx.restore();
                }
            }
        }
    },
    mounted() {
        var temp = Object.entries(this.data)
        var data = []
        for (let i = 0; i < 15; i++) {
            data.push(temp[i][1].Percentile)
        }

        this.dataGrafik = data
        const ctx = $('#'+this.id)
        const percentileChart = new Chart(ctx, {
            plugins: [this.plugin],
            type: 'line',
            data: {
                labels: ['ach', 'def', 'ord', 'exh', 'aut', 'aff','int','suc','dom','aba','nur','chg','end','het','agg'],
                datasets: [{
                    label: 'Grafik Precentile',
                    data: this.dataGrafik,
                    backgroundColor: [
                        'red'
                    ],
                    borderColor: [
                        'blue'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    xAxes:{
                        ticks:{
                        color: 'black'
                        },
                        grid: { 
                        color: "#ffffff",
                        }
                    },
                    yAxes: {
                        beginAtZero: true,
                        min: 0,
                        max: 100,
                        ticks:{
                        stepSize: 5,
                        color: 'black'
                        },
                        grid: { color: "#000000" }
                    }
                },
                plugins:{
                    legend: {
                        display: false,
                    },
                    title: {
                        display: true,
                        text: 'Grafik Percentile',
                        color: "black",
                        font: {
                            size: 20
                        }
                    }
                }
            }
        });
    },
}
</script>

<style>

</style>