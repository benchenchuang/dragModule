<template>
    <div class="template">
        <p class="header">单行文本</p>
        <div class="item">
            <span class="label">类型</span>
            <div>
                <RadioGroup v-model="typeTemp" @on-change="changeType">
                    <Radio label="1"><span>姓名</span></Radio>
                    <Radio label="2"><span>联系电话</span></Radio>
                    <Radio label="3"><span>邮箱</span></Radio>
                    <Radio label="0"><span>自定义</span></Radio>
                </RadioGroup>
            </div>
        </div>
        <div class="item" v-if="typeTemp!='3'">
            <span class="label">标题</span>
            <div>
                <Input v-model="nameTemp" style="width:300px;" size="large" :maxlength="6" placeholder="请输入提示语">
                    <span slot="append"> {{nameTemp.length}}/6 </span>
                </Input>
            </div>
        </div>
        <div class="item">
            <span class="label">字数限制</span>
            <div>
                <Input v-model="maxLengthTemp" style="width:300px;" size="large" placeholder="请输入限制字数">
                    <span slot="append"> 字 </span>
                </Input>
            </div>
        </div>
        <div class="item">
            <Checkbox v-model="requiredTemp">设为必填项</Checkbox>
        </div>
    </div>
</template>
<script>
export default {
    name:'singleLineTemplate',
    props: ['setData'],
    data () {
        return {
            typeTemp:this.setData.type || '1',
            nameTemp:this.setData.name || '姓名',
            maxLengthTemp:this.setData.maxLength || 0,
            requiredTemp:this.setData.required
        }
    },
    watch: {
        typeTemp(){
            this.setNewData();
        },
        nameTemp(){
            this.setNewData();
        },
        maxLengthTemp(){
            this.setNewData();
        },
        requiredTemp(){
            this.setNewData();
        },
        setData:{
            handler(val){
                let getData = JSON.parse(JSON.stringify(val))
                this.typeTemp = getData.type
                this.nameTemp = getData.name
                this.maxLengthTemp = getData.maxLength
                this.requiredTemp = getData.required
            },
            deep:true
        }
    },
    methods: {
        setNewData(){
            let type = this.typeTemp;
            let name = this.nameTemp;
            let maxLength = this.maxLengthTemp;
            let required = this.requiredTemp;
            this.$emit('getComponent',{name:'commonData',data:{type,name,maxLength,required}});
        },
        changeType(e){
            this.typeTemp = e;
            switch(e){
                case '1':
                    this.nameTemp='姓名';
                    break;
                case '2':
                    this.nameTemp='联系电话';
                    break;
                case '3':
                    this.nameTemp='邮箱';
                    break;
                default:
                    this.nameTemp="自定义"
            }
        }
    }
}
</script>

