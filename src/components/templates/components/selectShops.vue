<template>
    <div>
        <div class="shops_sort">
            <Row>
                <Col span="5">
                    <Select v-model="params.sortModel" size="large" clearable style="width:200px" placeholder="请选择分类">
                        <Option v-for="item in sortData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </Col>
                <Col span="5">
                    <Input v-model="params.shopName" size="large" search enter-button placeholder="请输入商品名称" @on-search="searchShops"/>
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
            total:100,
            params:{
                sortModel:'',
                shopName:'',
                pageSize:10,
                pageNum:1
            },
            sortData:[
                {
                    value:1,
                    label:'新品'
                },
                {
                    value:2,
                    label:'最新'
                },
                {
                    value:3,
                    label:'最热'
                }
            ],
            selection:[],
            testData:[
                {
                    id:1,
                    pic: 'https://resource.aijiatui.com/18550589214/company/mall/banner/767df5f06de1b8bdbddb7ae1d1acd65e.jpeg?imageMogr2/thumbnail/60x',
                    name: '鞋子',
                    sortName: '最新',
                    price: '29.00',
                    stock: '30',
                    createTime: '2018-10-03 14:12:13'
                },
                {
                    id:2,
                    pic: 'https://resource.aijiatui.com/bm/pgfhmnmun6c0.jpeg?imageMogr2/thumbnail/60x',
                    name: '鞋子',
                    sortName: '最新',
                    price: '29.00',
                    stock: '30',
                    createTime: '2018-10-03 14:12:13'
                },
                {
                    id:3,
                    pic: 'https://resource.aijiatui.com/bm/11ci6fsqtqdg0.jpeg?imageMogr2/thumbnail/60x',
                    name: '鞋子',
                    sortName: '最新',
                    price: '29.00',
                    stock: '30',
                    createTime: '2018-10-03 14:12:13'
                },
                {
                    id:4,
                    pic: 'https://resource.aijiatui.com/bm/vu35nfnj89o0.jpeg?imageMogr2/thumbnail/60x',
                    name: '鞋子',
                    sortName: '最新',
                    price: '29.00',
                    stock: '30',
                    createTime: '2018-10-03 14:12:13'
                }
            ],
            radioColumn:{
                title:' ',
                width: 60,
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
                width: 60,
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
                    key: 'pic',
                    render: (h, params) => {
                        return <img src={params.row.pic} style={{width:'60px',height:'60px'}}/>
                    }
                },
                {
                    title: '商品名称',
                    align: 'center',
                    key: 'name'
                },
                {
                    title: '商品类别',
                    align: 'center',
                    key: 'sortName'
                },
                {
                    title: '商品单价',
                    align: 'center',
                    key: 'price'
                },
                {
                    title: '库存',
                    align: 'center',
                    key: 'stock'
                },
                {
                    title: '创建时间',
                    align: 'center',
                    key: 'createTime'
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
        this.initShopList();
    },
    methods: {
        initShopList(){//初始化商品列表
            this.shopsList = [];
            let addData = JSON.parse(JSON.stringify(this.testData));
            let currentType = this.shopType;
            let selection = [];
            let firstData = JSON.parse(JSON.stringify(this.oneData));
            let secondData = JSON.parse(JSON.stringify(this.twoData));
            let shopsData = JSON.parse(JSON.stringify(this.allData));
            let index = this.switchIndex;
            if(index>=0){
                this.columns[0] = this.radioColumn;
                if(currentType==1){//三图
                    selection[0] = firstData[index];
                }else if(currentType==2){//五张图
                    selection[0] = secondData[index];
                }else{
                    selection[0] = shopsData.length?shopsData[index]:[];
                }
            }else{
                this.columns[0] = this.selectionColumn;
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
        },
        searchShops(){//搜索商品
            console.log(this.params.shopName)
        },
        onChange(page){//翻页
            console.log(page)
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
