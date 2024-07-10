<template>
    <!-- <div class="h-full w-9/12 m-auto bg-yellow-500 text-white relative">
      <div class="fixed top-0 inset-x-0 w-screen h-screen flex justify-center items-center">
          <div>
            <input type="text" name="" id="" placeholder="Input Test Code" class="text-black px-2 py-1 mb-2 rounded-lg w-96 h-10 text-center text-xl"> <br>
            <button class="bg-blue-600 hover:bg-blue-800 duration-200 rounded-full px-5 mr-2 h-16 w-28 text-base" @click="this.$router.push({path: '/preExam'})">Image Matching</button>
            <button class="bg-blue-600 hover:bg-blue-800 duration-200 rounded-full px-5 mr-2 h-16 w-28 text-base" @click="this.$router.push({path: '/masterImage'})">Master Image</button>
            <button class="bg-blue-600 hover:bg-blue-800 duration-200 rounded-full px-5 h-16 w-28 text-base" @click="this.$router.push({path: '/dashboard'})">Dashboard</button>
          </div>
      </div>
    </div> -->
    <div class="absolute top-0 z-0 w-full h-full flex justify-center items-center">
        <div class="w-3/4 h-3/4 rounded-xl
                    md:flex md:w-1/2">
            <div class="w-full md:w-5/12 flex justify-center items-center">
                <div class="bg-foreground-4-100 h-56 w-56 md:w-full rounded-full p-5 flex justify-center items-center
                    md:h-full md:rounded-none">
                    <div class="text-center">
                        <img src="../assets/logo2.png" alt="" class="h-56 md:h-44 lg:h-56 xl:64 inline-block">
                    </div>
                </div>
            </div>
            <div class="h-full flex justify-center pt-10 xl:px-10
                md:w-7/12 md:items-center md:pt-0 md:bg-background-50">
                <div class="w-full h-auto text-center">
                    <h1 class="font-bold text-4xl">LOGIN</h1>
                    <form @submit.prevent="login" class="text-left px-5 mt-5">
                        <label for="userEmail">E-Mail</label>
                        <input type="email" name="email" id="userEmail" class="w-full bg-background-300 ring-1 ring inset ring-stroke-100 placeholder-stroke 
                                    mt-1 mb-5 px-3 py-1.5 rounded-lg text-black" placeholder="Enter Your Email Here"
                                    :disabled="isDisabled">

                        <label for="userToken">Token Tes</label>
                        <input type="text" name="test_token" id="userToken" class="w-full bg-background-300 ring-1 ring inset ring-stroke-100 placeholder-stroke
                                    mt-1 px-3 py-1.5 rounded-lg text-black" placeholder="Enter Your Test Token Here"
                                    :disabled="isDisabled">

                        <button type="submit" class="w-full mt-5 px-3 py-2 text-white font-bold bg-foreground-4-100 rounded-full ring-1 ring-inset ring-stroke
                                                    hover:bg-foreground-4-200 duration-300"
                                                :disabled="isDisabled">Login</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import {publicClient, setAccessToken} from '../utilities/axios'
export default {
    components: {
        axios
    },
    computed: {
        isDisabled() {
            let details = navigator.userAgent;
            console.log(details);
            let regex = /android|iphone|kindle|ipad/i;
            let isMobile = regex.test(details);
            console.log(isMobile);

            return isMobile;
        }
    },
    data(){
        return {
            judulHalaman: 'Login',
            info: null,
            port: import.meta.env.VITE_BACKEND_URL,
        }
    },
    methods: {
        login(submitEvent) {
            let elements = submitEvent.target.elements;

            (async() => {
                try {
                    let resp = await publicClient.post('/auth/login', {
                            email: elements.email.value,
                            test_token: elements.test_token.value
                        });
                    let {token, age} = resp.data.refresh_token;
                    let data_user = {
                        "test": resp.data.tests, 
                        "email": resp.data.email,
                        "exam_session": resp.data.exam_session
                    };
                    // this.$cookies.set('refresh_token', token, age);
                    this.$cookies.set('data_registrant', JSON.stringify(data_user), age*10);
                    
                    setAccessToken(resp.data.token);
                    // localStorage.setItem('LS_ACCESS_KEY_VAR', `Bearer ${e.data.token}`)
                    // localStorage.setItem('LS_USER_KEY_VAR', `${token}`)

                    if(resp.data.is_admin) this.$router.push('/admin')
                    else this.$router.push('/dashboard')
                } catch (error) {
                    Swal.fire({
                            title: error.response.data,
                            icon: 'error',
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'OK'
                        });
                }
            })();
        }
    },
    created(){
        this.$emit('updateJudul', this.judulHalaman);
    },
    mounted () {
        
    }
}
</script>