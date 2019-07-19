
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
        </div>
        <div class="shops_wrap">
            <p class="title">企业商品：</p>
            <div class="shops_other">
                <Button size="large" @click="addShops" icon="md-add" type="primary">添加商品</Button>
                <span class="warning">最多上传 20 个商品</span>
                <span class="sub_tip">(上下拖动可调整商品顺序)</span>
            </div>
            <recommendList :shopData="shopData" @changeShop="addShops"/>
        </div>
        
        <Modal v-model="modal" width="1100" footer-hide @on-cancel="cancelShops">
            <p slot="header" class="modal_header">
                <span>选择已上架商品</span>
            </p>
            <selectShops v-if="modal" :changeIndex="changeIndex" :recommendData="shopData" @getSection="getSelection"/>
        </Modal>
    </div>
</template>
<script>
import recommendList from './components/recommendList'
import selectShops from './components/selectShops'
export default {
    name:"shopsTemplate",
    props: ['setData'],
    components: {
        recommendList,
        selectShops
    },
    data () {
        return {
            shopData:this.setData.data,
            mainTitle:this.setData.title,
            modal:false,
            changeIndex:-1
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
                this.mainTitle = getData.title;
                this.shopData = getData.data || [];
                this.getSelection(this.shopData)
            },
            deep: true
    　　}
    },
    methods: {
        setShopText(){//标题 副标题
            let title = this.mainTitle;
            this.$emit('getComponentStatus',{name:'recommend',data:{title,data:this.shopData}});
        },
        addShops(index){//添加商品 index->更换产品
            this.modal = false;
            this.$nextTick(()=>{
                if(index>=0){
                    this.changeIndex = index;
                }
                this.modal = true
            })
        },
        cancelShops(){//取消选择产品
            let shopData = this.shopData;
            this.selection = shopData;
            this.changeIndex = -1;
        },
        getSelection(selection){
            this.$emit('getComponentStatus',{name:'recommend',data:{title:this.mainTitle,data:selection}});
            this.$nextTick(()=>{
                this.shopData = selection;
                this.modal = false;
            })
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
        .item{
            margin-top: 10px;
            margin-right: 30px;
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
}
.shops_wrap{
    padding: 0 20px;
    text-align: left;
    .shops_other{
        font-size: 12px;
        .warning{
            margin-left: 5px;
            color: #ff9900;
        }
        .sub_tip{
            margin-top: 15px;
            float: right;
            color: #808695;
        }
    }
    
}
.modal_header{
    height: 28px;
    line-height: 28px;
    font-size: 20px;
    font-weight: 500;
}
</style>
