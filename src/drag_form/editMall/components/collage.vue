<template>
    <div class="shops_template">
        <h2 class="shops_title">{{title?title:'低价拼团'}}<span class="sub_title">{{desc}}</span></h2>
        <div class="collage_list">
            <div class="item">
                <p>暂无拼团</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'collageModel',
    props:['moduleData'],
    data () {
        let moduleData = this.moduleData.data;
        let header = moduleData.header;
        return {
            title:header.title,
            desc:header.desc,
        }
    },
    watch: {
        moduleData: {
            handler(val) {
                let getData = val.data;
                let header = getData.header;
                this.title = header.title;
                this.desc = header.desc;
            },
            deep: true
    　　}
    },
 }
</script>
<style lang="less" scoped>
.shops_template{
    padding: 20px;
    .shops_title{
        font-size: 13px;
        color: #333;
        font-weight: 600;
        text-align: left;
        .sub_title{
            margin-left: 5px;
            font-size: 12px;
            color: #999;
            font-weight: 300;
        }
    }
    .collage_list{
        .item{
            margin-top:20px;
            width:100%;
            height:210px;
            line-height:210px;
            font-size:30px;
            color:#fff;
            background:#e4e4e4;
        }
    }
}
</style>