<template>
    <div class="form_common">
        <h3 class="item_label">
            <Icon type="ios-medical" class="required" v-if="required"></Icon>{{name}}
        </h3>
        <div class="item" v-if="type==0">
            <RadioGroup>
                <Radio class="select" :label="item.label" v-for="(item,index) in list" :key="index"></Radio>
            </RadioGroup>
        </div>
    </div>
</template>
<script>
export default {
    name:'singleSelect',
    props: ['moduleData'],
    data () {
        let getData = this.moduleData.data;
        return {
            type:getData.type,
            name:getData.name,
            list:getData.list,
            required:getData.required
        }
    },
    watch: {
        moduleData:{
            handler(val){
                let data = val.data;
                this.type = data.type;
                this.name = data.name;
                this.list = data.list || [];
                this.required = data.required;
            },
            deep:true
        }
    }
}
</script>

