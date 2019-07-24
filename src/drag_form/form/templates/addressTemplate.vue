<template>
    <div class="template">
        <p class="header">单行文本</p>
        <div class="item">
            <span class="label">标题内容</span>
            <div>
                <Input v-model="name" style="width:300px;" size="large" :maxlength="6" placeholder="请输入提示语">
                    <span slot="append"> {{name.length}}/6 </span>
                </Input>
            </div>
        </div>

        <div class="item">
            <span class="label">类型</span>
            <div>
                <RadioGroup v-model="type" @on-change="changeType">
                    <Radio label="1"><span>省-市-区-详细地址</span></Radio>
                    <Radio label="2"><span>省-市-区</span></Radio>
                    <Radio label="3"><span>省-市</span></Radio>
                    <Radio label="4"><span>省</span></Radio>
                </RadioGroup>
            </div>
        </div>
        <div class="item">
            <span class="label">设置</span>
            <div>
                <Checkbox v-model="required">设为必填项</Checkbox>
            </div>
        </div>
        
    </div>
</template>
<script>
export default {
    name:'singleLineTemplate',
    props: ['setData'],
    data () {
        return {
            type:this.setData.type || '1',
            name:this.setData.name || '姓名',
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
        required(){
            this.setNewData();
        },
        setData:{
            handler(val){
                let getData = JSON.parse(JSON.stringify(val))
                this.type = getData.type
                this.name = getData.name
                this.required = getData.required
            },
            deep:true
        }
    },
    methods: {
        setNewData(){
            let type = this.type;
            let name = this.name;
            let required = this.required;
            this.$emit('getComponent',{name:'commonData',data:{type,name,required}});
        },
        changeType(e){
            this.type = e;
        }
    }
}
</script>

