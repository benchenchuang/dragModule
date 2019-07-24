<template>
    <div class="template">
        <div class="header">商品组合</div>
        <div class="shops_info">
            <Row class="sort_item">
                <Col span="5" class="title">主标题：</Col>
                <Col span="19" class="set_item">
                    <Input type="text" v-model="mainTitle" :maxlength="6" size="large" placeholder="最多显示6个字" />
                    <span class="left_number">{{mainTitle.length}} / 6</span>
                </Col>
            </Row>
            <Row class="sort_item">
                <Col span="5" class="title">描述内容：</Col>
                <Col span="19" class="set_item">
                    <Input type="text" v-model="mainDesc" :maxlength="10" size="large" placeholder="选填" />
                    <span class="left_number">{{mainDesc.length}} / 10</span>
                </Col>
            </Row>
            <p class="tip">此模块默认显示进行中的拼团商品，按照创建时间倒序排列</p>
        </div>
    </div>
</template>
<script>
export default{
    name:'collageTemplate',
    props: ['setData'],
    data () {
        return {
            mainTitle:this.setData.header.title,
            mainDesc:this.setData.header.desc,
        }
    },
    watch: {
        mainTitle(val){
            this.setShopText();
        },
        mainDesc(val){
            this.setShopText();
        },
        setData: {
            handler(newVal){
                let getData = JSON.parse(JSON.stringify(newVal))
                this.mainTitle = getData.header.title;
                this.mainDesc = getData.header.desc;
            },
            deep: true
    　　}
    },
    methods:{
        setShopText(){//标题 副标题
            let title = this.mainTitle;
            let desc = this.mainDesc;
            this.$emit('getComponentStatus',{name:'collage',data:{header:{title,desc}}});
        },
    }
}
</script>
<style lang="less" scoped>
.title{
    font-size: 14px;
    color: #333;
    font-weight: 600;
    line-height: 36px;
    text-align: left;
}

.shops_info{
    padding: 20px;
    .sort_item{
        margin: 10px 0;
        .set_item{
            position: relative;
            .left_number{
                position: absolute;
                right: 10px;
                top: 0;
                height: 36px;
                line-height: 36px;
                color: #999;
            }
        }
    }
    .tip{
        margin-top:20px;
        text-align:left;
        font-size:12px;
        color:#ff9900;
    }
}
</style>