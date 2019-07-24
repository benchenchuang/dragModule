<template>
    <div class="template">
        <p class="header">时间</p>
        <div class="item">
            <span class="label">提示语</span>
            <div>
                <Input v-model="nameTemp" style="width:300px;" size="large" :maxlength="6" placeholder="请输入提示语">
                    <span slot="append"> {{nameTemp.length}}/6 </span>
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
            nameTemp:this.setData.name || '文本内容',
            requiredTemp:this.setData.required
        }
    },
    watch: {
        nameTemp(){
            this.setNewData();
        },
        requiredTemp(){
            this.setNewData();
        },
        setData:{
            handler(val){
                let getData = JSON.parse(JSON.stringify(val))
                this.nameTemp = getData.name
                this.requiredTemp = getData.required
            },
            deep:true
        }
    },
    methods: {
        setNewData(){
            let name = this.nameTemp;
            let required = this.requiredTemp;
            this.$emit('getComponent',{name:'commonData',data:{name,required}});
        }
    }
}
</script>

