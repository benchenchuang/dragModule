<template>
    <div>
        <div class="shops_table">
            <Row class="table_header">
                <Col span="5">商品图片</Col>
                <Col span="4">商品</Col>
                <Col span="4">价格</Col>
                <Col span="6">展示图</Col>
                <Col span="5">操作</Col>
            </Row>
            <div class="table_list">
                <draggable :list="shopData" ghost-class="ghost" animation="300" sort="false" :group="{ put: ['shared']}">
                    <Row class="shop_item" v-for="(shop,index) in shopData" :key="index">
                        <Col span="5">
                            <img class="shop_pic" :src="shop.normsPic"/>
                        </Col>
                        <Col span="4" class="shop_title">{{shop.offerName}}</Col>
                        <Col span="4">￥{{shop.offerPrice}}</Col>
                        <Col span="6" class="show_cover">
                            <div class="cover">
                                <div v-if="shop.picture">
                                    <div class="demo-upload-list-cover">
                                        <Icon type="eye" @click.native="handleView(shop.picture)"></Icon>
                                        <Icon type="trash-a" @click.native="handleRemove(index)"></Icon>
                                    </div>
                                    <img class="cover_pic" :src="shop.picture"/>
                                </div>
                                <span v-else @click="uploadIndex=index">
                                    <Upload 
                                    ref="upload"
                                    :show-upload-list="false"
                                    :data="qiNiuData"
                                    :on-error="onError"
                                    :on-exceeded-size="onExceeded"
                                    :on-success="uploadSuccess"
                                    :action="uploadUrl"
                                    :format="['jpg','jpeg','png']" 
                                    :max-size="2048">
                                        <div class="no_cover">
                                            <Icon class="add_icon" type="plus" />
                                            <p>点击上传</p>
                                        </div>
                                    </Upload>
                                </span>
                            </div>
                            <p class="suggest" v-if="model==1">建议尺寸<br/>{{index==0?'222*222':'109*109'}}</p>
                            <p class="suggest" v-else>建议尺寸<br/>{{index==0?'335*188':'81*81'}}</p>
                        </Col>
                        <Col span="5">
                            <span @click="delShop(index)">删除</span>
                            <span @click="switchShop(index)">更换</span>
                        </Col>
                    </Row>
                </draggable>
            </div>
        </div>
        <Modal title="预览图片" v-model="visible">
            <img :src="previewUrl" v-if="visible" style="width: 100%">
        </Modal>
    </div>
</template>
<script>
import draggable from "vuedraggable";
import {uploadApi} from "@/api/common"
import {qiuNiuMixin} from '@/mixins'
export default {
    name:'showShopList',
    props:['shopData','model'],
    mixins: [qiuNiuMixin],
    components: {
        draggable,
    },
    data () {
        return {
            previewUrl: '',
            visible: false,
        }
    },
    methods: {
        uploadSuccess(res, file){//图片上传成功
            let thisIndex = this.uploadIndex;
            let generalUrl = uploadApi.generalUrl(this.configData, res);
            let thisShop = this.shopData[thisIndex]
            thisShop.picture = generalUrl;
            this.shopData.splice(thisIndex,1,thisShop);
            // this.$emit('getComponentStatus',{name:'slides',data:this.slideData});
        },
        handleView (url) {//预览图片
            this.previewUrl = url;
            this.visible = true;
        },
        handleRemove(index){//删除展示图
            let shops = this.shopData;
            let thisShop = this.shopData[index]
            thisShop.picture = '';
            this.shopData.splice(index,1,thisShop);
        },
        delShop(index){//删除商品
            let shops = this.shopData;
            shops.splice(index,1)
        },
        switchShop(index){//更换商品
            let shops = this.shopData;
            let picture = shops[index].picture;
            this.$emit('changeShop',{index,picture})
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


