<template>
    <div class="form_common">
        <h3 class="text_tip">{{title?title:'文字说明'}}</h3>
    </div>
</template>
<script>
export default {
    name:'textModel',
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

