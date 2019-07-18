<template>
  <div>
    <div class="drag_header">装修商城 <Button type="default" class="fr" ghost>发布并查看</Button></div>
    <div class="drag_component">
      <div class="component_side">
        <h3 class="side_title">可用组件列表</h3>
        <draggable class="origin_area" :list="fromItems" :options='originDragOptions'>
          <transition-group type="transition" :name="'flip-list'" tag="div">
            <div class="origin_item" v-for="element in fromItems" :key="element.id">
              <Icon class="origin_icon" :type="element.icon"/>
              <p class="name">{{ element.name }}</p>
            </div>
          </transition-group>
        </draggable>
      </div>
      
      <div class="component_show">
          <component :is="editComponent" :setData="setComponentData" @getComponentStatus="editComponentStatus"></component>
      </div>
      <div class="component_wrap">
        <div class="component_box">
          <div class="component_header"><img src="../assets/mini_header.png"/></div>
          <draggable :list="targetItems" :options="tragetOptions" @change="dragItem" >
            <transition-group class="targetArea" type="transition" :name="'flip-list'" tag="div">

              <div class="group_item" :class="[selectItem==index?'on':'']" v-for="(element,index) in targetItems" :key="'my-name'+index" @click="handleItem(element.componentName,index)">
                <div class="group_move" v-if="selectItem==index">
                  <p class="move_btn" @click.stop="moveItem(index,'up')" v-if="index"><Icon type="md-arrow-up" /></p>
                  <p class="move_btn" @click.stop="moveItem(index,'down')" v-if="index!=(targetItems.length-1)"><Icon type="md-arrow-down" /></p>
                  <p class="move_btn" @click.stop="deleteItem(index)"><Icon type="md-close" /></p>
                </div>
                <components :is="element.type" :moduleData="element"></components>
              </div>

            </transition-group>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import slideSwiper from './components/slide'
import sortModel from './components/sort'
import shopsModel from './components/shop'
import slideTemplate from './templates/editSlide'
import sortTemplate from './templates/editSort'
import shopsTemplate from './templates/editShops'
export default {
  name: "dragProject",
  components: {
    draggable,
    slideSwiper,
    sortModel,
    shopsModel,
    slideTemplate,
    sortTemplate,
    shopsTemplate
  },
  data() {
    return {
      fromItems: [//页面上可拖拽的组件
        { name: "轮播图", id: 1,icon:'md-images', type:'slideSwiper',componentName:'slideTemplate'},
        { name: "分类模块", id: 2,icon:'ios-keypad',moduleType:1, type:'sortModel',componentName:'sortTemplate'},
        { name: "商品组合", id: 3,icon:'md-browsers',shopType:1,idType:0, header:{title:'',desc:''}, type:'shopsModel',componentName:'shopsTemplate'},
        { name: "拼团活动", id: 4,icon:'md-flag', type:'shopsModel',componentName:'slideTemplate'},
        { name: "推荐商品", id: 5,icon:'md-pricetags', type:'shopsModel',componentName:'slideTemplate'}
      ],
      targetItems: [],//页面拖拽的组件
      editComponent:null,//显示编辑的组件名称
      selectItem:0,//当前选中的第几个组件
      setComponentData:null,//显示组件的数据回显
    };
  },
  computed:{
      originDragOptions() {
        return {
          animation: 0,
          ghostClass: "ghost",
          // 分组
          group: {
            name: "shared",
            pull: "clone",
            revertClone: false
          },
          // 禁止拖动排序
          sort: false
        };
      },
      // 拖拽表单2
      tragetOptions() {
        return {
          animation: 300,
          ghostClass: "ghost",
          group: {
            // 只允许放置shared的控件,禁止pull
            put: ["shared"]
          }
        };
      },
  },
  methods: {
    cloneData(original) {//拷贝对象
      return JSON.parse(JSON.stringify(original));
    },
    dragItem(evt){//拖拽组件
      if (evt.added) {
        let addItem = evt.added;
        let thisIndex = addItem.newIndex;
        let item = addItem.element;
        this.selectItem = thisIndex;
        let componentName = item.componentName;
        this.editComponent = componentName;
        let temp =this.cloneData(this.targetItems);
        if(componentName=='sortTemplate'){
          temp[thisIndex].moduleType = 1;
          this.setComponentData={
            moduleType:1
          }
        }else if(componentName=='shopsTemplate'){
          temp[thisIndex].shopType = 1;
          this.setComponentData={
            shopType:1,
            title:'',
            desc:''
          }
        }
        this.targetItems = temp;
      }
      if(evt.moved){
        let moveItem = evt.moved;
        let newIndex = moveItem.newIndex;
        this.selectItem = newIndex;
      }
    },
    handleItem(name,index){//选择组件编辑
      this.selectItem = index;
      this.editComponent = name;
      if(name=='sortTemplate'){
        let thisType = this.targetItems[index].moduleType;
        this.setComponentData={
          moduleType:thisType
        }
      }else if(name=='shopsTemplate'){
        let shopType = this.targetItems[index].shopType;
        let thisHeader = this.targetItems[index].header;
        let title = thisHeader.title;
        let desc = thisHeader.desc;
        this.setComponentData={
          shopType,
          title,
          desc,
        }
      }
    },
    editComponentStatus(object){//编辑模板对应内容
      let moduleName = object.name;//模块名称
      let thisIndex = this.selectItem;
      let thisItem = this.targetItems[thisIndex];
      if(moduleName=='setSort'){//分类样式选择 1-2-3；
        let sortType = object.type;
        thisItem.moduleType = sortType;
      }
      if(moduleName=='shopTxt'){//商品组合传标题和描述
        let header = object.data;
        thisItem.header = header;
      }
      if(moduleName=='shopType'){
        let type = object.type;
        let data = object.data || '';
        thisItem.shopType = type;
        if(data){
          thisItem.data = data;
          thisItem.idType +=1;
        }
      }
      if(moduleName=='shops'){
        thisItem.data =  object.data;
        thisItem.idType +=1;
      }
      this.targetItems.splice(thisIndex,1,thisItem)
    },
    deleteItem(index){//删除模板
      this.targetItems.splice(index, 1);
      if(this.targetItems.length){
        let thisIndex = index-1>0?(index-1):0;
        let componentName = this.targetItems[thisIndex].componentName
        this.selectItem = thisIndex;
        this.editComponent = componentName;
        this.handleItem(componentName,thisIndex)
      }else{
        this.selectItem = null;
        this.editComponent = null;
      }
    },
    moveItem(index,orient){//模板上升、下降排序
      let moveIndex;
      if(orient=='up'){
        moveIndex = [index-1]
      }else{
        moveIndex =[index+1]
      }
      let targetItem = this.targetItems[moveIndex];
      let thisItem = this.targetItems[index];
      this.targetItems.splice(moveIndex,1,thisItem)
      this.targetItems.splice(index,1,targetItem);
      this.selectItem = moveIndex;
    },
  }
};
</script>
<style lang="less">
body{
  background:#f5f5f5;
}
.header{
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    font-weight: 600;
    color: #333;
    border-bottom: 1px solid #e4e4e4;
}
.drag_header{
  padding:0 30px;
  height:70px;
  line-height:70px;
  text-align:left;
  font-size:20px;
  color:#fff;
  background:#373E41;
  .fr{
    margin-right: 60px;
    margin-top: 20px;
    float: right;
  }
}
.drag_component{
  margin-top: -70px;
  padding-top: 70px;
  height: 100vh;
  box-sizing: border-box;
  .component_side{
    position:absolute;
    left:0;
    top:70px;
    bottom:0;
    width: 218px;
    background:#fff;
    border-right:1px solid #ddd;
    overflow:hidden;
    .side_title{
      height:50px;
      line-height:50px;
      font-size:16px;
      text-align:center;
    }
    .origin_area{
      width:101%;
      .origin_item{
        float:left;
        padding-top: 30px;
        margin-top:-1px;
        margin-left:-1px;
        width:110px;
        height:110px;
        font-size:16px;
        border:1px solid #ddd;
        cursor:pointer;
        .origin_icon{
          font-size:24px;
        }
        .name{
          margin-top: 4px;
        }
      }
    }
  }
  .component_show{
    float: right;
    width: 500px;
    height: 100%;
    overflow-y: scroll;
    border-left: 1px solid #e4e4e4;
    background:#fff;
  }
  .component_wrap{
    padding-top: 60px;
    margin: 0 500px 0 221px;
    height: 100%;
    box-sizing: border-box;
    overflow-y: scroll;
    .component_box{
      margin: 0 auto;
      width: 375px;
      height: 100%;
      .component_header{
        img{
          width: 100%;
          vertical-align: top;
          margin-bottom: 1px;
        }
      }
      .targetArea{
        padding-bottom: 20px;
        margin: 0 auto;
        width:375px;
        min-height: 70vh;
        text-align: center;
        background:#fff;
        .group_item{
          position: relative;
          border: 2px solid transparent;
          &.on{
            border-color: #1989fa;
            box-sizing: content-box;
          }
          .group_move{
            position: absolute;
            right: -40px;
            top: 0;
            width: 40px;
            text-align: center;
            .move_btn{
              height: 40px;
              line-height: 40px;
              font-size: 20px;
              color: #fff;
              background: #373E41;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>

