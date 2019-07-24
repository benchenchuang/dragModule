<template>
    <div class="template">
        <p class="header">多项选择设置</p>
        <div class="item">
            <span class="label">标题</span>
            <div>
                <Input v-model="name" style="width:290px;" size="large" :maxlength="20" placeholder="请输入提示语">
                    <span slot="append"> {{name.length}}/20 </span>
                </Input>
            </div>
        </div>
        <div class="item">
            <span class="label">选项</span>
            <div class="select_item" v-for="(select,index) in list" :key='index'>
                <Input v-model="select.label" style="width:290px;" size="large" :maxlength="20" placeholder="请输入提示语">
                    <span slot="append"> {{select.label.length}}/20 </span>
                </Input>
                <Icon class="icon_plus" type="ios-plus-outline" @click="addSelect(index)"></Icon>
                <Icon class="icon_minus" v-if="list.length>2" type="ios-minus-outline" @click="delSelect(index)"></Icon>
            </div>
        </div>
        <div class="item">
            <Checkbox v-model="required">设为必填项</Checkbox>
        </div>
    </div>
</template>
<script>
export default {
    name:'multiSelectTemplate',
    props: ['setData'],
    data () {
        return {
            name:this.setData.name,
            list:this.setData.list,
            required:this.setData.required
        }
    },
    watch: {
        name(){
            this.setNewData();
        },
        list:{
            handler(val){
                this.setNewData();
            },
            deep:true
        },
        required(){
            this.setNewData();
        },
        setData:{
            handler(val){
                let getData = JSON.parse(JSON.stringify(val))
                this.name = getData.name
                this.list = getData.list
                this.required = getData.required
            },
            deep:true
        }
    },
    methods: {
        addSelect(index){//增加选项
            let item={label:'选项'};
            this.list.splice(index+1,0,item);
        },
        delSelect(index){//删除选项
            this.list.splice(index,1);
        },
        setNewData(){//更新数据
            let name = this.name;
            let list = this.list;
            let required = this.required;
            this.$emit('getComponent',{name:'commonData',data:{name,list,required}});
        }
    }
}
</script>

