<template>
    <div class="form_common">
        <h3 class="item_label">
            <Icon type="ios-medical" class="required" v-if="required"></Icon>{{name}}
        </h3>
        <div class="item">
            <CheckboxGroup>
                <Checkbox class="select" :label="item.label" v-for="(item,index) in list" :key="index"></Checkbox>
            </CheckboxGroup>
        </div>
    </div>
</template>
<script>
export default {
    name:'multiSelect',
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

