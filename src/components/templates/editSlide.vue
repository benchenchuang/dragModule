<style lang="less" scoped>
    .header{
        height: 60px;
        line-height: 60px;
        font-size: 18px;
        color: #333;
        border-bottom: 1px solid #e4e4e4;
    }
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
<template>
    <div class="template">
        <div class="header">轮播图</div>
        <div class="template_content">
            <h3 class="title">添加轮播图：</h3>
            <p class="tip">(最多可添加5张图片，拖动可调整图片顺序)</p>
            <div class="slide_content">
                <div class="slide_item" v-if="moduleData.length">
                    <Icon class="slide_del" type="ios-close-circle-outline" />
                    <Row class="content">
                        <Col span="12">
                            <div class="content_side" v-for="(slide,index) in moduleData" :key="index">
                                <!-- <div>
                                    <Icon class="add_icon" type="md-add" />
                                    <p class="text">添加图片</p>
                                </div> -->
                                <div>
                                    <div class="demo-upload-list-cover">
                                        <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                                        <Icon type="ios-trash-outline" @click.native="handleRemove(index)"></Icon>
                                    </div>
                                    <Upload ref="upload" :format="['jpg','jpeg','png']" :max-size="2048" action="//jsonplaceholder.typicode.com/posts/">
                                        <img class="show_pic" src="https://res.mekeai.com/00107ebb-dd6f-46a0-9429-a7d3495b7889"/>
                                    </Upload>
                                </div>
                            </div>
                        </Col>
                        <Col offset="1" span="11">
                            <p class="side_router">跳转路径：</p>
                            <Select v-model="model" style="width:100%;margin-bottom:10px;">
                                <Option v-for="item in routerArray" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                            <Button v-if="model==1" size="large" icon="md-add" type="primary">选择商品</Button>
                            <Button v-if="model==2" size="large" icon="md-add" type="primary">选择分类</Button>
                        </Col>
                    </Row>
                </div>
                <div class="slide_item">
                    <div class="item_add">
                        <Upload ref="upload" :show-upload-list="false" :max-size="2048" action="//jsonplaceholder.typicode.com/posts/">
                            <Button size="large" icon="md-add" type="primary">添加图片</Button>
                            <p class="suggest">建议尺寸：375*210像素</p>
                        </Upload>
                    </div>
                </div>
            </div>
        </div>

        <Modal title="View Image" v-model="visible">
            <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
        </Modal>
    </div>
</template>
<script>
export default {
    name:'slideTemplate',
    props: {
        moduleData: {
            type: Array,
            default:()=>{
                return []
            }
        }
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
            model: '',
            imgName: '',
            visible: false,
        }
    },
    methods: {
        handleView (url) {
            this.previewUrl = url;
            this.visible = true;
        },
        handleRemove (index) {
            console.log(index)
        },
    }
}
</script>

