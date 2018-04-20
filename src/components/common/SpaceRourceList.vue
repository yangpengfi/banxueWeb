<template>
  <div>
    <ul class="space-reource">
        <li v-for="item in infos">
            <img src="../../assets/imgs/space/t17.png" alt="人员照片">
            <div>
                <h1>{{item.name}}</h1>
                <span>{{item.subject}}</span>
                <p>{{item.school}}</p>
            </div>
        </li>
    </ul>
  </div>
</template>
<script>
export default {
  
}
</script>
<style scoped>

</style>

