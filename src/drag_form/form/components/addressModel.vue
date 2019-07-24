<template>
    <div class="form_common">
        <h3 class="item_label item_address">
            <Icon type="ios-medical" class="required" v-if="required"></Icon>{{name}}
        </h3>
        <h3 class="item_label item_address" v-if="type==1">
            <Icon type="ios-medical" class="required" v-if="required"></Icon>详细地址
        </h3>
    </div>
</template>
<script>
export default {
    name:'addressModel',
    props: ['moduleData'],
    data () {
        let getData = this.moduleData.data;
        return {
            name:getData.name,
            type:getData.type,
            required:getData.required
        }
    },
    watch: {
        moduleData:{
            handler(val){
                let data = val.data;
                this.name = data.name;
                this.type = data.type;
                this.required = data.required;
            },
            deep:true
        }
    }
}
</script>

