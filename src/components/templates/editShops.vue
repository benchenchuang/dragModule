
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
            <Row class="sort_item">
                <Col span="5" class="title">样式选择：</Col>
                <Col span="19">
                    <div :class="[currentIndex==shopType.type?'on item':'item']" v-for="(shopType,index) in shopTypes" :key="index" @click="selectType(shopType.type)">
                        <img :src="shopType.typeUrl"/>
                        <p>{{shopType.title}}</p>
                    </div>
                </Col>
            </Row>
        </div>
        <div class="shops_wrap">
            <p class="title">展示商品：</p>
            <div class="shops_other">
                <Button size="large" @click="addShops({index:-1})" icon="md-add" type="primary">添加商品</Button>
                <span class="warning">必须添加 {{currentIndex==1?3:5}} 个商品</span>
                <span class="sub_tip">(上下拖动可调整商品顺序)</span>
            </div>
            <showShopList :shopData="shopData" :model="currentIndex" @changeShop="addShops"/>
        </div>
        
        <Modal v-model="modal" width="1100" footer-hide @on-cancel="cancelShops">
            <p slot="header" class="modal_header">
                <span>选择已上架商品</span>
            </p>
            <selectShops v-if="modal" :changeIndex="changeIndex" :sortType.sync="currentIndex" :firstData="firstData" :secondData="secondData" @getSection="getSelection"/>
        </Modal>
    </div>
</template>
<script>
import showShopList from './components/showShopList'
import selectShops from './components/selectShops'
export default {
    name:"shopsTemplate",
    props: ['setData'],
    components: {
        showShopList,
        selectShops
    },
    data () {
        console.log(this.setData)
        return {
            shopTypes:[
                {
                    type:1,
                    typeUrl:require('@/assets/images/shop_01.png'),
                    title:'三图'
                },
                {
                    type:2,
                    typeUrl:require('@/assets/images/shop_02.png'),
                    title:'五图'
                }
            ],
            shopData:[],
            firstData:[],
            secondData:[],
            mainTitle:'',
            mainDesc:'',
            currentIndex:1,
            modal:false,
            changeIndex:-1,
            selection:[]
        }
    },
    watch: {
        mainTitle(val){
            this.updateShops()
        },
        mainDesc(val){
            this.updateShops()
        },
        setData: {
            handler(newVal){
                let getData = JSON.parse(JSON.stringify(newVal))
                this.currentIndex = getData.shopType;
                this.mainTitle = getData.header.title;
                this.mainDesc = getData.header.desc;
                this.shopData = getData.list || [];
                this.firstData = getData.first || [];
                this.secondData = getData.second || [];
                this.copyData(getData.list);
                this.selectType(this.currentIndex)
            },
            deep: true
    　　}
    },
    methods: {
        selectType(type){//选择类型
            this.currentIndex = type;
            this.shopData = [];
            this.selection = [];
            if(type==1){//三图
                this.selection = this.firstData;
            }else{
                this.selection = this.secondData;
            }
            let newSelection = JSON.parse(JSON.stringify(this.selection));
            this.shopData = newSelection;
            this.updateShops(newSelection)
        },
        addShops(data){//添加商品 index->更换产品
            this.modal = false;
            this.shopPicture = data?data.picture:''
            this.$nextTick(()=>{
                if(data && data.index>=0){
                    this.changeIndex = data.index;
                }
                this.modal = true
            })
        },
        cancelShops(){//取消选择产品
            let shopData = this.shopData;
            this.selection = shopData;
            this.shopPicture = null
            this.changeIndex = -1;
        },
        getSelection(selection){
            let type = this.currentIndex;
            let newSelection = selection;
            this.copyData(selection)
            newSelection.map(item=>{
                this.shopData.map(shop=>{
                    if(shop.id == item.id){
                        item.picture = shop.picture || '';
                    }
                })
            })
            if(this.changeIndex>=0){
                newSelection[this.changeIndex].picture = this.shopPicture;
                if(type==1){
                    this.firstData[this.changeIndex].picture = this.shopPicture
                }else{
                    this.secondData[this.changeIndex].picture = this.shopPicture
                }
            }

            this.updateShops(newSelection)
            this.$nextTick(()=>{
                this.shopData = newSelection;
                this.modal = false;
                this.shopPicture = null;
                this.changeIndex = -1
            })
        },
        copyData(getData=[]){//模板类型赋值
            let type = this.currentIndex;
            if(type==1){//三图
                this.firstData = getData;
            }else{
                this.secondData = getData;
            }
        },
        updateShops(newSelection=this.shopData){
            this.$emit('getComponentStatus',{name:'shops',data:{header:{title:this.mainTitle,desc:this.mainDesc},shopType:this.currentIndex,list:newSelection,first:this.firstData,second:this.secondData}});
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
