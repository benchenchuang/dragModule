<template>
    <div>
        <div class="shops_sort">
            <Row>
                <Col span="5">
                    <Select v-model="params.typeId" size="large" clearable style="width:200px" placeholder="请选择分类">
                        <Option v-for="item in sortData" :value="item.id" :key="item.id">{{ item.typeName }}</Option>
                    </Select>
                </Col>
                <Col span="7">
                    <Input style="width:200px" v-model="params.offerName" size="large" placeholder="请输入商品名称"/>
                    <Button size="large" type="primary" icon="ios-search" @click="searchShops">搜索</Button>
                </Col>
                <Col offset="21">
                    <Button type="primary" v-if="selection.length" size="large" @click="selectResult">确定选择</Button>
                    <Button type="primary" v-else size="large" disabled>确定选择</Button>
                </Col>
            </Row>
        </div>
        <div class="shops_table">
            <Table ref="selection" @on-selection-change="selectionChange" :columns="columns" align="center" :data="shopsList"></Table>
            <div class="page_num">
                <Page :total="total" :page-size="params.pageSize" @on-change="onChange"/>
            </div>
        </div>
    </div>
</template>
<script>
import {storeOfferApi,storeCategoryApi} from '@/api/ems'
export default {
    name:"SelectShops",
    // props: ['sortType','firstData','secondData','changeIndex'],
    props: {
        isRepeat:{
            default:function(){
                return false
            }
        },
        sortType:{
            default: function () {
                return ''
            }
        },
        recommendData:{
            default: function () {
                return []
            }
        },
        firstData:{
            default: function () {
                return []
            }
        },
        secondData:{
            default: function () {
                return []
            }
        },
        changeIndex:{
            default: function () {
                return ''
            }
        }
    },
    data () {
        return {
            total:0,
            params:{
                typeId:'',
                offerName:'',
                pageSize:5,
                pageNum:1
            },
            sortData:[],
            selection:[],
            radioColumn:{
                title:' ',
                width: 80,
                align: 'center',
                render:(h,params)=>{
                    let checked = params.row._checked || false;
                    return ("div",[
                        h("Radio",{
                            props:{
                                value:checked
                            },
                            on:{
                                input:()=>{
                                    this.shopsList.map((item,index)=>{
                                        item._checked = false;
                                        this.shopsList.splice(index,1,item);
                                    })
                                    this.shopsList[params.index]._checked = true;
                                    this.selection = [];
                                    this.selection[0] = this.shopsList[params.index];
                                }
                            }
                        })
                    ]);
                }
            },
            selectionColumn:{
                type: 'selection',
                width: 80,
                align: 'center'
            },
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '商品图片',
                    align: 'center',
                    key: 'normsPic',
                    render: (h, params) => {
                        return <img src={params.row.normsPic} style={{width:'60px',height:'60px'}}/>
                    }
                },
                {
                    title: '商品名称',
                    align: 'center',
                    key: 'offerName'
                },
                {
                    title: '商品类别',
                    align: 'center',
                    key: 'typeName',
                    render:(h,params)=>{
                        let sortName = params.row.typeName.join(',');
                        return <p>{sortName}</p>
                    }
                },
                {
                    title: '商品单价',
                    align: 'center',
                    key: 'offerPrice'
                },
                {
                    title: '库存',
                    align: 'center',
                    key: 'offerLeave'
                },
                {
                    title: '创建时间',
                    align: 'center',
                    key: 'createTime',
                    render:(h,params)=>{
                        let commonTime = this.toLocaleString(params.row.createTime);
                        return <p>{commonTime}</p>;
                    }
                }
            ],
            shopsList: [],
            oneData:this.firstData,
            twoData:this.secondData,
            allData:this.recommendData,
            switchIndex:this.changeIndex,
            shopType:this.sortType,
            validateRepeat:this.isRepeat
        }
    },
    created () {
        this.getSortList();
        this.initShopList();
    },
    methods: {
        getSortList(){
            storeCategoryApi.list().then(res=>{
                this.sortData = res;
            })
        },
        initShopList(){//初始化商品列表
            storeOfferApi.list(this.params).then(res=>{
                let storeList = res.dataList || [];
                this.total = res.totalNum;
                this.shopsList = [];
                let addData = storeList;
                let currentType = this.shopType;
                let selection = [];
                let firstData = JSON.parse(JSON.stringify(this.oneData));
                let secondData = JSON.parse(JSON.stringify(this.twoData));
                let shopsData = JSON.parse(JSON.stringify(this.allData));
                let index = this.switchIndex;
                if(index>=0){
                    this.columns.splice(0,1,this.radioColumn);
                    if(currentType==1){//三图
                        selection[0] = firstData[index];
                    }else if(currentType==2){//五张图
                        selection[0] = secondData[index];
                    }else{
                        selection[0] = shopsData.length?shopsData[index]:[];
                    }
                }else{
                    this.columns.splice(0,1,this.selectionColumn);
                    if(currentType==1){//三图
                        selection = this.selection = firstData;
                    }else if(currentType==2){//五张图
                        selection = this.selection = secondData;
                    }else{
                        selection = this.selection = shopsData;
                    }
                }
                this.checkShops(selection,addData)
                this.$nextTick(()=>{
                    this.selection = this.selection;
                    this.shopsList = addData;
                })
            })
            
        },
        searchShops(){//搜索商品
            this.params.pageNum =1;
            this.initShopList();
        },
        onChange(page){//翻页
            this.params.pageNum = page;
            this.initShopList();
        },
        selectionChange(selection){
            this.selection = selection;
        },
        selectResult(){//确定选择产品
            let currentType = this.shopType;
            let selection = JSON.parse(JSON.stringify(this.selection));
            let shopIndex = this.switchIndex;
            let isSame= false;
            if(shopIndex>=0){
                let changeShop = JSON.parse(JSON.stringify(this.selection))[0];
                if(currentType==1){
                    this.oneData.map(item=>{
                        if(item.id==changeShop.id){
                            isSame = true;
                        }
                    })
                    if(isSame){
                        this.$Message.warning('商品已存在列表中');
                        return false;
                    }
                    this.oneData.splice(shopIndex,1,changeShop)
                    selection = this.oneData;
                }else if(currentType==2){//五张图
                    this.twoData.map(item=>{
                        if(item.id==changeShop.id){
                            isSame = true;
                        }
                    })
                    if(isSame){
                        this.$Message.warning('商品已存在列表中');
                        return false;
                    }
                    this.twoData.splice(shopIndex,1,changeShop)
                    selection = this.twoData;
                }else{//推荐商品
                    if(!this.validateRepeat){
                        this.allData.map(item=>{
                            if(item.id==changeShop.id){
                                isSame = true;
                            }
                        })
                        if(isSame){
                            this.$Message.warning('商品已存在列表中');
                            return false;
                        }
                    }
                    this.allData.splice(shopIndex,1,changeShop)
                    selection = this.allData;
                }
            }else{
                if(currentType==1){//三张图
                    if(selection.length>3){
                        this.$Message.warning('最多选择3个商品');
                        return;
                    }
                    this.oneData = selection;
                }else if(currentType==2){//五张图
                    if(selection.length>5){
                        this.$Message.warning('最多选择5个商品');
                        return;
                    }
                    this.twoData = selection;
                }else{//推荐商品
                    if(selection.length>20){
                        this.$Message.warning('最多选择20个商品');
                        return;
                    }
                    this.allData = selection;
                }
            }
            this.shopData = selection;
            this.$emit('getSection',selection);
        },
        checkShops(selection,addData){//显示选中的商品
            if(selection.length && addData){
                selection.map(select=>{
                    addData.map((item,index)=>{
                        if(select.id == item.id){
                            item._checked = true;
                            addData.splice(index,1,item);
                        }
                    })
                })
            }
        },
        toLocaleString(seconds) {
            let time = new Date(seconds)
            return time.getFullYear() + "-" + this.addZero(time.getMonth() + 1) + "-" + this.addZero(time.getDate()) + " " +
                this.addZero(time.getHours()) + ":" + this.addZero(time.getMinutes()) + ":" + this.addZero(time.getSeconds());
        },
        addZero(num) {
            if(num<10)
                return "0" + num;
            return num;
        }
    }
}
</script>
<style lang="less" scoped>
.shops_table{
    margin: 20px 0;
    .page_num{
        margin-top: 20px;
        text-align: right;
    }
}
</style>
