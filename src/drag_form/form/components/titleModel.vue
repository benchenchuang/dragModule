<template>
    <div class="form_common">
        <h3 class="title">{{title?title:'标题'}}</h3>
    </div>
</template>
<script>
export default {
    name:'titleModel',
    props: ['moduleData'],
    data () {
        return {
            title:''
        }
    },
    watch: {
        moduleData:{
            handler(val){
                this.title = val.data.title || '';
            },
            deep:true
        }
    }
}
</script>

