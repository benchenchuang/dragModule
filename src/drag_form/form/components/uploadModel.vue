<template>
    <div class="form_common">
        <h3 class="item_label">
            <Icon type="ios-medical" class="required" v-if="required"></Icon>{{name}}
        </h3>
        <div class="item">
            <div class="upload_item">
                <Icon type="android-add"></Icon>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'uploadModel',
    props: ['moduleData'],
    data () {
        let getData = this.moduleData.data;
        return {
            name:getData.name,
            count:getData.count,
            required:getData.required
        }
    },
    watch: {
        moduleData:{
            handler(val){
                let data = val.data;
                this.name = data.name;
                this.count = data.count;
                this.required = data.required;
            },
            deep:true
        }
    }
}
</script>

