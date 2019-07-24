<template>
    <div class="form_common">
        <h3 class="item_label">
            <Icon type="ios-medical" class="required" v-if="required"></Icon>{{name}}
        </h3>
    </div>
</template>
<script>
export default {
    name:'singleLine',
    props: ['moduleData'],
    data () {
        return {
            name:this.moduleData.data.name,
            required:this.moduleData.data.required
        }
    },
    watch: {
        moduleData:{
            handler(val){
                let data = val.data;
                this.name = data.name;
                this.required = data.required;
            },
            deep:true
        }
    }
}
</script>

