<template>
    <div>
        <v-head></v-head>        
        <div class="content" style="margin-top:120px;min-height:600px">
            <transition name="move" mode="out-in"><router-view></router-view></transition>
        </div>
        <v-foot></v-foot>
    </div>
</template>

<script>
    import vHead from '@/components/common/Header'; 
    import vFoot from '@/components/common/Footer'; 
       
    export default {
        name:'Home',
        components:{
            vHead,
            vFoot
        }
    }
</script>


