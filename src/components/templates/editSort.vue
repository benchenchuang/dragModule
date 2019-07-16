<style lang="less" scoped>
    .header{
        height: 60px;
        line-height: 60px;
        font-size: 18px;
        color: #333;
        border-bottom: 1px solid #e4e4e4;
    }
    .sort_box{
        padding: 20px;
        color: #333;
        text-align: left;
        .title{
            font-size: 14px;
            font-weight: 600;
        }
        .sort_item{
            margin-bottom: 20px;
            line-height: 36px;
            .blue{
                color: #2d8cf0;
            }
            .item{
                margin-left: 8px;
                float: left;
                cursor: pointer;
                &:first-child{
                    margin-left: 0;
                }
                img{
                    vertical-align: top;
                    border: 2px solid #fff;
                }
                p{
                    line-height: 28px;
                }
                &.on{
                    color: #2d8cf0;
                    img{
                        border: 2px solid #2d8cf0;
                        box-sizing: border-box;
                    }
                }
            }
        }
        .tip{
            margin-top: 20px;
            font-size: 12px;
            color: #ff9900;
            font-weight: 300;
        }
    }
</style>
<template>
    <div class="template">
        <div class="header">分类模块</div>
        <div class="sort_box">
            <Row class="sort_item">
                <Col span="4" class="title">样式选择：</Col>
                <Col span="20">
                    <div class="item" :class="[currentIndex==sort.type?'on':'']" v-for="(sort,index) in sortArray" :key="index" @click="selectSort(sort.type)">
                        <img :src="sort.sortUrl"/>
                        <p>{{sort.title}}</p>
                    </div>
                </Col>
            </Row>
            <Row class="sort_item">
                <Col span="4" class="title">分类管理：</Col>
                <Col span="20">
                    <Button type="text" class="blue" size="large">编辑商品分类</Button>
                </Col>
            </Row>
            <div class="tip">
                <p>分类展示说明：</p>
                <p>分类名称、图片数据均从“商品管理-商品分组”中获取，可进入“商品管理-商品分组”中编辑。</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'sortTemplate',
    props: {
        moduleData: {
            type: Number,
            default:()=>{
                return 1
            }
        }
    },
    data () {
        return {
            sortArray:[
                {
                    type:1,
                    sortUrl:require('../../assets/sort_01.png'),
                    title:'1级、2级分类圆图'
                },
                {
                    type:2,
                    sortUrl:require('../../assets/sort_02.png'),
                    title:'1级、2级分类方图'
                },
                {
                    type:3,
                    sortUrl:require('../../assets/sort_03.png'),
                    title:'仅1级分类'
                }
            ],
            currentIndex:this.moduleData
        }
    },
    methods: {
        selectSort(index){
            this.currentIndex = index;
            this.$emit('getComponentStatus',{name:'sortModel',type:index})
        }
    }
}
</script>

