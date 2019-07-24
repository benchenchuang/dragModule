<template>
    <div class="template">
        <p class="header">标题栏设置</p>
        <div class="item">
            <span class="label">标题内容</span>
            <Input v-model="titleTemp" style="width:280px;" size="large" :maxlength="20" placeholder="请输入标题">
                <span slot="append">{{titleTemp.length}}/20</span>
            </Input>
        </div>
    </div>
</template>
<script>
export default {
    name:'titleTemplate',
    props: ['setData'],
    data () {
        return {
            titleTemp:this.setData.title
        }
    },
    watch: {
        titleTemp(){
            this.setTitle();
        },
        setData:{
            handler(val){
                this.titleTemp = val.title
            },
            deep:true
        }
    },
    methods: {
        setTitle(){
            let title = this.titleTemp;
            this.$emit('getComponent',{name:'commonData',data:{title}});
        }
    }
}
</script>

