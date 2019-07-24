<template>
    <div class="form_common">
        <h3 class="item_label">
            <Icon type="ios-medical" class="required" v-if="required"></Icon>{{name}}
        </h3>
        <div class="item">
            <Select class="select" clearable style="width:100%">
                <Option v-for="(item,index) in list" :value="item.label+index" :key="index">{{ item.label }}</Option>
            </Select>
        </div>
    </div>
</template>
<script>
export default {
    name:'dropDown',
    props: ['moduleData'],
    data () {
        let getData = this.moduleData.data;
        return {
            name:getData.name,
            list:getData.list,
            required:getData.required
        }
    },
    watch: {
        moduleData:{
            handler(val){
                let data = val.data;
                this.name = data.name;
                this.list = data.list || [];
                this.required = data.required;
            },
            deep:true
        }
    }
}
</script>

