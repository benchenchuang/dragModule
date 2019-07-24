<template>
    <div class="template">
        <p class="header">上传图片设置</p>
        <div class="item">
            <span class="label">标题内容</span>
            <div>
                <Input v-model="name" style="width:290px;" size="large" :maxlength="20" placeholder="请输入标题内容">
                    <span slot="append"> {{name.length}}/20 </span>
                </Input>
            </div>
        </div>
        <div class="item">
            <span class="label" style="width:100%">图片数量限制</span>
            <div class="select_item">
                <InputNumber :max="9" :min="1" :step="1" v-model="count"></InputNumber>
            </div>
        </div>
        <div class="item">
            <Checkbox v-model="required">设为必填项</Checkbox>
        </div>
    </div>
</template>
<script>
export default {
    name:'uploadTemplate',
    props: ['setData'],
    data () {
        return {
            name:this.setData.name,
            count:this.setData.count,
            required:this.setData.required
        }
    },
    watch: {
        name(){
            this.setNewData();
        },
        count(){
            this.setNewData();
        },
        required(){
            this.setNewData();
        },
        setData:{
            handler(val){
                let getData = JSON.parse(JSON.stringify(val))
                this.name = getData.name
                this.count = getData.count
                this.required = getData.required
            },
            deep:true
        }
    },
    methods: {
        setNewData(){//更新数据
            let name = this.name;
            let count = this.count;
            let required = this.required;
            this.$emit('getComponent',{name:'commonData',data:{name,count,required}});
        }
    }
}
</script>

