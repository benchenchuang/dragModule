<template>
    <div class="template">
        <p class="header">多行文本</p>
        <div class="item">
            <span class="label">提示语</span>
            <div>
                <Input v-model="name" style="width:300px;" size="large" :maxlength="20" placeholder="请输入提示语">
                    <span slot="append"> {{name.length}}/20 </span>
                </Input>
            </div>
        </div>
        <div class="item">
            <span class="label">字数限制</span>
            <div>
                <Input v-model="maxLength" style="width:300px;" size="large" placeholder="请输入限制字数">
                    <span slot="append"> 字 </span>
                </Input>
            </div>
        </div>
        <div class="item">
            <Checkbox v-model="required">设为必填项</Checkbox>
        </div>
    </div>
</template>
<script>
export default {
    name:'singleLineTemplate',
    props: ['setData'],
    data () {
        return {
            name:this.setData.name || '文本内容',
            maxLength:this.setData.maxLength || 0,
            required:this.setData.required
        }
    },
    watch: {
        name(){
            this.setNewData();
        },
        maxLength(){
            this.setNewData();
        },
        required(){
            this.setNewData();
        },
        setData:{
            handler(val){
                let getData = JSON.parse(JSON.stringify(val))
                this.name = getData.name
                this.maxLength = getData.maxLength
                this.required = getData.required
            },
            deep:true
        }
    },
    methods: {
        setNewData(){
            let name = this.name;
            let maxLength = this.maxLength;
            let required = this.required;
            this.$emit('getComponent',{name:'commonData',data:{name,maxLength,required}});
        }
    }
}
</script>

