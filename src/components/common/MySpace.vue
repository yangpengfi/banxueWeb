<template>
    <div>
        <innerHeader></innerHeader>        
        <div class="content">
            <transition name="move" mode="out-in"><router-view></router-view></transition>
        </div>
        <v-foot></v-foot>
    </div>
</template>

<script>
    import innerHeader from '@/components/common/InnerHeader'; 
    import vFoot from '@/components/common/Footer'; 
       
    export default {
        name:'MySpace',
        components:{
            innerHeader,
            vFoot
        }
    }
</script>



