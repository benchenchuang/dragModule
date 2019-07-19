<template>
    <div class="shops_template">
        <h2 class="shops_title">{{title?title:'推荐商品'}}<span class="sub_title">{{desc}}</span></h2>
        <div class="collage_list" v-if="showShops.length">
            <Row :gutter="16">
                <Col span="12" class="shop_item" v-for="(shop,index) in showShops" :key="index">
                    <img class="pro" :src="shop.pic"/>
                    <h3 class="title">{{shop.name}}</h3>
                    <div class="price"><span>￥{{shop.price?shop.price:'0.00'}}</span><del>￥{{shop.oldPrice?shop.oldPrice:'0.00'}}</del></div>
                </Col>
            </Row>
        </div>
        <div class="collage_list" v-else>
            <div class="item">
                <p>请在右侧添加商品</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'recommendModel',
    props:['moduleData'],
    data () {
        let moduleData = this.moduleData;
        let header = moduleData.header;
        return {
            title:header.title,
            desc:header.desc,
            showShops: moduleData.data || [],
        }
    },
    watch: {
        moduleData: {
            handler(val) {
                let getData = val;
                let header = getData.header;
                this.title = header.title;
                this.desc = header.desc;
                this.$nextTick(()=>{
                    this.showShops = getData.data || [];
                })
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
            font-size:24px;
            color:#fff;
            background:#e4e4e4;
        }
        .shop_item{
            margin:10px auto;
            text-align:left;
            font-size:13px;
            color:#333;
            .pro{
                width:100%;
                height:158px;
                vertical-align:top;
            }
            .title{
                margin-top:6px;
                height:42px;
                font-size:14px;
                font-weight:400;
                display: -webkit-box; 
                display: -moz-box;
                word-wrap: break-word;
                overflow: hidden; 
                text-overflow: ellipsis; 
                -webkit-box-orient: vertical; 
                -webkit-line-clamp:2; 
            }
            .price{
                margin-top:6px;
                del{
                    font-size:12px;
                    margin-left:5px;
                    color:#999;
                }
            }
        }
    }
}
</style>