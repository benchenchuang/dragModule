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
.shops_table{
    margin: 20px 0;
    .page_num{
        margin-top: 20px;
        text-align: right;
    }
}
</style>

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
                <Button size="large" @click="addShops" icon="md-add" type="primary">添加商品</Button>
                <span class="warning">必须添加 {{currentIndex==1?3:5}} 个商品</span>
                <span class="sub_tip">(上下拖动可调整商品顺序)</span>
            </div>
            <showShopList :shopData="shopData" @changeShop="addShops"/>
        </div>
        
        <Modal v-model="modal" width="1100" footer-hide @on-cancel="cancelShops">
            <p slot="header" class="modal_header">
                <span>选择已上架商品</span>
            </p>
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
                <Table ref="selection" v-if="modal" @on-selection-change="selectionChange" :columns="columns" align="center" :data="shopsList"></Table>
                <div class="page_num">
                    <Page :total="total" :page-size="params.pageSize" @on-change="onChange"/>
                </div>
            </div>
            
        </Modal>
    </div>
</template>
<script>
import showShopList from './components/showShopList'
export default {
    name:"shopsTemplate",
    props: ['setData'],
    components: {
        showShopList,
    },
    data () {
        return {
            shopTypes:[
                {
                    type:1,
                    typeUrl:require('../../assets/shop_01.png'),
                    title:'三图'
                },
                {
                    type:2,
                    typeUrl:require('../../assets/shop_02.png'),
                    title:'五图'
                }
            ],
            shopData:[],
            firstData:[],
            secondData:[],
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
            phone:1,
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
            total:100,
            params:{
                sortModel:'',
                shopName:'',
                pageSize:10,
                pageNum:1
            },
            mainTitle:this.setData.title,
            mainDesc:this.setData.desc,
            currentIndex:this.setData.shopType,
            modal:false,
            selection:[],
            changeIndex:null,
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
            ]
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
            handler(newVal, oldVal){
                this.currentIndex = newVal.shopType;
                this.mainTitle = newVal.title;
                this.mainDesc = newVal.desc;
            },
            deep: true
    　　}
    },
    methods: {
        setShopText(){//标题 副标题
            let title = this.mainTitle;
            let desc = this.mainDesc;
            this.$emit('getComponentStatus',{name:'shopTxt',data:{title,desc}});
        },
        selectType(type){//选择类型
            this.currentIndex = type;
            if(type==1){//三图
                this.selection = this.firstData;
            }else{
                this.selection = this.secondData;
            }
            this.shopData = this.selection;
            this.$emit('getComponentStatus',{name:'shopType',type:type,data:this.selection})
        },
        addShops(index){//添加商品 index->更换产品
            this.modal = false;
            this.shopsList = [];
            let addData = JSON.parse(JSON.stringify(this.testData));
            let currentType = this.currentIndex;
            let selection = [];
            this.changeIndex = index;
            let firstData = JSON.parse(JSON.stringify(this.firstData));
            let secondData = JSON.parse(JSON.stringify(this.secondData));
            if(index>=0){
                this.columns[0] = this.radioColumn;
                if(currentType==1){//三图
                    selection[0] = firstData[index];
                }else{
                    selection[0] = secondData[index];
                }
            }else{
                this.columns[0] = this.selectionColumn;
                if(currentType==1){//三图
                    selection = this.selection = firstData;
                }else{
                    selection = this.selection = secondData;
                }
            }
            this.checkShops(selection,addData)
            this.$nextTick(()=>{
                this.modal = true
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
            let currentType = this.currentIndex;
            let selection = this.selection;
            let changeIndex = this.changeIndex;
            let isSame= false;
            if(changeIndex>=0){
                let changeShop = JSON.parse(JSON.stringify(this.selection))[0];
                if(currentType==1){
                    this.firstData.map(item=>{
                        console.log(item.id)
                        if(item.id==changeShop.id){
                            isSame = true;
                        }
                    })
                    if(isSame){
                        this.$Message.warning('商品已存在列表中');
                        return false;
                    }
                    this.firstData.splice(changeIndex,1,changeShop)
                    selection = this.firstData;
                }else{
                    this.secondData.map(item=>{
                        if(item.id==changeShop.id){
                            isSame = true;
                        }
                    })
                    if(isSame){
                        this.$Message.warning('商品已存在列表中');
                        return false;
                    }
                    this.secondData.splice(changeIndex,1,changeShop)
                    selection = this.secondData;
                }
            }else{
                if(currentType==1){//三张图
                    if(selection.length>3){
                        this.$Message.warning('最多选择3个商品');
                        return;
                    }
                    this.firstData = selection;
                }else{//五张图
                    if(selection.length>5){
                        this.$Message.warning('最多选择5个商品');
                        return;
                    }
                    this.secondData = selection;
                }
            }
            this.shopData = selection;
            this.$emit('getComponentStatus',{name:'shops',data:selection});
            this.modal = false;
        },
        cancelShops(){//取消选择产品
            let shopData = this.shopData;
            this.selection = shopData;
            this.changeIndex = null;
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

