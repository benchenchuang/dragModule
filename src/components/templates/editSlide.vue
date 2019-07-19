<template>
    <div class="template">
        <div class="header">轮播图</div>
        <div class="template_content">
            <h3 class="title">添加轮播图：</h3>
            <p class="tip">(最多可添加5张图片，拖动可调整图片顺序)</p>
            <div class="slide_content">
                <div class="slide_item" v-for="(slide,index) in slideData" :key="index">
                    <Icon class="slide_del" type="ios-close" @click="delSlide(index)"></Icon>
                    <Row class="content">
                        <Col span="12">
                            <div class="content_side">
                                <div v-if="slide.picture">
                                    <div class="demo-upload-list-cover">
                                        <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                                        <Icon type="ios-trash-outline" @click.native="handleRemove(index)"></Icon>
                                    </div>
                                        <img class="show_pic" :src="slide.picture"/>
                                </div>
                                <Upload v-else ref="upload" :format="['jpg','jpeg','png']" :max-size="2048" action="//jsonplaceholder.typicode.com/posts/">
                                    <div>
                                        <Icon class="add_icon" type="plus-round"></Icon>
                                        <p class="text">添加图片</p>
                                    </div>
                                </Upload>
                            </div>
                        </Col>
                        <Col offset="1" span="11">
                            <p class="side_router">跳转路径：</p>
                            <Select v-model="slide.model" style="width:100%;margin-bottom:10px;">
                                <Option v-for="item in routerArray" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                            <span class="show_name">{{slide.linkData?slide.linkData[0].name:''}}</span><Button v-if="slide.model==1" size="large" icon="md-add" type="primary" @click="selectShop(index,slide.linkData)">选择商品</Button>
                            <Button v-if="slide.model==2" size="large" icon="md-add" type="primary">选择分类</Button>
                        </Col>
                    </Row>
                </div>
                <div class="slide_item">
                    <div class="item_add">
                        <Button @click="addSlide" size="large" icon="md-add" type="primary">添加图片</Button>
                        <p class="suggest">建议尺寸：375*210像素</p>
                    </div>
                </div>
            </div>
        </div>

        <Modal title="预览图片" v-model="visible" >
            <img :src="previewUrl" v-if="visible" style="width: 100%">
        </Modal>

        <Modal v-model="modal" width="1100" footer-hide @on-cancel="cancelShops">
            <p slot="header" class="modal_header">
                <span>选择已上架商品</span>
            </p>
            <selectShops v-if="modal" :changeIndex="changeIndex" :isRepeat="true" :recommendData="shopData" @getSection="getSelection"/>
        </Modal>

    </div>
</template>
<script>
import selectShops from './components/selectShops'
export default {
    name:'slideTemplate',
    props: {
        setData: {
            type: Object,
            default:()=>{
                return {}
            }
        }
    },
    components: {
        selectShops
    },
    data () {
        return {
            routerArray: [
                {
                    value: 0,
                    label: '无'
                },
                {
                    value: 1,
                    label: '商品'
                },
                {
                    value: 2,
                    label: '商品列表'
                },
                {
                    value: 3,
                    label: '名片页'
                },
                {
                    value: 4,
                    label: '官网页'
                },
                {
                    value: 5,
                    label: '动态页'
                }
            ],
            previewUrl: '',
            visible: false,
            modal:false,
            shopData:null,
            changeIndex:0,
            slideIndex:null,
            slideData: []
        }
    },
    watch:{
        setData: {
            handler(newVal){
                let getData = JSON.parse(JSON.stringify(newVal));
                this.slideData = getData.data || [];
                this.$emit('getComponentStatus',{name:'slides',data:this.slideData})
            },
            deep: true
    　　}
    },
    methods: {
        selectShop(index,shop){//选择商品
            this.modal = false;
            this.slideIndex = index;
            this.$nextTick(()=>{
                this.shopData = shop || [];
                this.modal = true
            })
        },
        getSelection(data){//获得选择商品
            let slideIndex = this.slideIndex;
            let slide = this.slideData[slideIndex];
            slide.linkData = data;
            this.slideData.splice(slideIndex,1,slide);
            console.log(this.slideData)
            this.$emit('getComponentStatus',{name:'slides',data:this.slideData});
            this.$nextTick(()=>{
                this.modal = false;
            })
        },
        handleRemove (index) {//删除图片

        },
        cancelShops(){//取消选择产品
            this.slideIndex = null;
            this.shopData = null;
        },
        handleView (url) {//预览图片
            this.previewUrl = url;
            this.visible = true;
        },
        delSlide(index){//删除轮播
            this.slideData.splice(index,1);
        },
        addSlide(){//添加轮播按钮
            this.slideData.push({});
            this.$emit('getComponentStatus',{name:'slides',data:this.slideData});
        }
    }
}
</script>
<style>
.ivu-table-row td{
    padding: 10px 0;
}
</style>
<style lang="less" scoped>
    .template_content{
        padding:20px;
        .title{
            text-align: left;
            font-size: 14px;
            color:#333;
        }
        .tip{
            text-align: right;
            font-size: 12px;
            color: #999;
        }
        .slide_item{
            margin-top: 20px;
            position: relative;
            width: 100%;
            padding: 20px;
            text-align: left;
            background: #f6f6f6;
            .slide_del{
                position: absolute;
                top: -10px;
                right: -10px;
                font-size: 30px;
                color: #ccc;
                cursor: pointer;
            }
            .item_add{
                padding: 30px 0;
                font-size: 12px;
                color:#999;
                text-align: center;
                .suggest{
                    margin-top: 8px;
                }
            }
            .content_side{
                width: 100%;
                height: 110px;
                border: 1px solid #ddd;
                text-align: center!important;
                font-size: 14px;
                color: #999;
                cursor: pointer;
                .add_icon{
                    margin-top: 25px;
                    font-size: 30px;
                }
                .show_pic{
                    width: 100%;
                    height: 110px;
                }
            }
            .side_router{
                margin-bottom: 6px;
            }
        }
        .show_name{
            margin-right:10px;
            font-size:14px;
            color:#666;
        }
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        line-height: 110px;
        font-size: 20px;
        color: #fff;
        background: rgba(0,0,0,.6);
    }
    .content_side:hover .demo-upload-list-cover{
        display: block;
    }
</style>
