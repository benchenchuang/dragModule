<template>
    <div class="template">
        <p class="header">单行文本</p>
        <div class="item">
            <span class="label">类型</span>
            <div>
                <RadioGroup v-model="type" @on-change="changeType">
                    <Radio label="0"><span>自定义</span></Radio>
                    <Radio label="1"><span>性别</span></Radio>
                </RadioGroup>
            </div>
        </div>
        <div class="item">
            <span class="label">提示语</span>
            <div>
                <Input v-model="name" style="width:290px;" size="large" :maxlength="20" placeholder="请输入提示语">
                    <span slot="append"> {{name.length}}/20 </span>
                </Input>
            </div>
        </div>
        <div class="item" v-if="type==0">
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
    name:'singleSelectTemplate',
    props: ['setData'],
    data () {
        return {
            type:this.setData.type,
            name:this.setData.name,
            list:this.setData.list,
            required:this.setData.required
        }
    },
    watch: {
        type(){
            this.setNewData();
        },
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
                this.type = getData.type
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
            let type = this.type;
            let name = this.name;
            let list = this.list;
            let required = this.required;
            this.$emit('getComponent',{name:'commonData',data:{type,name,list,required}});
        },
        changeType(e){//改变类型
            this.type = e;
            this.name = e==0?'单选选择':'性别';
        }
    }
}
</script>

