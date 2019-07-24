<template>
    <div>
        <div class="shops_table">
            <Row class="table_header">
                <Col span="6">商品图片</Col>
                <Col span="6">商品</Col>
                <Col span="6">价格</Col>
                <Col span="6">操作</Col>
            </Row>
            <div class="table_list">
                <draggable :list="shopData" ghost-class="ghost" animation="300" sort="false" :group="{ put: ['shared']}">
                    <Row class="shop_item" v-for="(shop,index) in shopData" :key="index">
                        <Col span="6">
                            <img class="shop_pic" :src="shop.normsPic"/>
                        </Col>
                        <Col span="6" class="shop_title">{{shop.offerName}}</Col>
                        <Col span="6">￥{{shop.offerPrice}}</Col>
                        <Col span="6">
                            <span @click="delShop(index)">删除</span>
                            <span @click="switchShop(index)">更换</span>
                        </Col>
                    </Row>
                </draggable>
            </div>
        </div>
    </div>
</template>
<script>
import draggable from "vuedraggable";
export default {
    name:'showShopList',
    props:['shopData'],
    components: {
        draggable,
    },
    data () {
        return {
        }
    },
    methods: {
        delShop(index){//删除商品
            let shops = this.shopData;
            shops.splice(index,1)
        },
        switchShop(index){//更换商品
            let shops = this.shopData;
            this.$emit('changeShop',index)
        }
    }
}
</script>
<style lang="less" scoped>
.shops_table{
    margin: 10px 0 30px;
    text-align: center;
    .table_header{
        font-size: 14px;
        height: 36px;
        line-height: 36px;
        background: #e8eaec;
    }
    .shop_item{
        display: flex;
        display: -webkit-flex;
        padding: 20px 0;
        align-items: center;
        font-size: 13px;
        border-bottom: 1px solid #e4e4e4;
        cursor: pointer;
        .shop_pic{
            width: 48px;
            height: 48px;
        }
        .shop_title{
            line-height: 1.2;
            font-weight: 400;
            overflow: hidden;
            text-align: center;
            text-overflow: ellipsis;
            -webkit-line-clamp: 3;
            display: -webkit-box;
            align-items: center;
            -webkit-box-orient: vertical;
        }
        .show_cover{
            .suggest{
                color:#808695;
            }
            .cover{
                position: relative;
                margin: 0 auto 5px;
                width: 78px;
                height: 78px;
                background: #f1f1f1;
                border:1px solid #ddd;
                .no_cover{
                    padding-top: 10px;
                    cursor: pointer;
                }
                .add_icon{
                    font-size: 36px;
                }
                .cover_pic{
                    width: 78px;
                    height: 78px;
                }
                .demo-upload-list-cover{
                    display: none;
                    position: absolute;
                    top: 0;
                    bottom: -1px;
                    left: 0;
                    right: -1px;
                    line-height: 78px;
                    font-size: 20px;
                    color: #fff;
                    background: rgba(0,0,0,.6);
                }
                &:hover .demo-upload-list-cover{
                    display: block;
                }
            }
        }
    }
    
}
</style>


