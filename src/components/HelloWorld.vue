<style lang="less">
body{
  background:#f5f5f5;
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
          &.on{
            border: 2px solid #1989fa;
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
        <div v-if="editComponent">
          <component :is="editComponent" @getComponentStatus="editComponentStatus"></component>
        </div>
      </div>

      <div class="component_wrap">
        <div class="component_box">
          <div class="component_header"><img src="../assets/mini_header.png"/></div>
          <draggable :list="targetItems" :options="tragetOptions" @change="dragItem" >
            <transition-group class="targetArea" type="transition" :name="'flip-list'" tag="div">

              <div class="group_item" :class="[selectItem==index?'on':'']" v-for="(element,index) in targetItems" :key="index" @click="handleItem(element.componentName,index)">
                <div class="group_move" v-if="selectItem==index">
                  <p class="move_btn" @click.stop="moveItem(index,'up')" v-if="index"><Icon type="md-arrow-up" /></p>
                  <p class="move_btn" @click.stop="moveItem(index,'down')" v-if="index!=(targetItems.length-1)"><Icon type="md-arrow-down" /></p>
                  <p class="move_btn" @click.stop="deleteItem(index)"><Icon type="md-close" /></p>
                </div>
                <components :is="element.type" :moduleData="targetItems.data"></components>
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
import slideTemplate from './templates/editSlide'
import sortTemplate from './templates/editSort'
export default {
  name: "dragProject",
  components: {
    draggable,
    slideSwiper,
    sortModel,
    slideTemplate,
    sortTemplate
  },
  data() {
    return {
      fromItems: [
        { name: "轮播图", id: 1,icon:'md-images', type:'slideSwiper',componentName:'slideTemplate'},
        { name: "分类模块", id: 2,icon:'ios-keypad', type:'sortModel',componentName:'sortTemplate'},
        { name: "商品组合", id: 3,icon:'md-browsers', type:'box2',componentName:'slideTemplate'},
        { name: "拼团活动", id: 4,icon:'md-flag', type:'BoxSlide3',componentName:'slideTemplate'},
        { name: "推荐商品", id: 5,icon:'md-pricetags', type:'box4',componentName:'slideTemplate'}
      ],
      targetItems: [],
      editComponent:null,
      selectItem:0,
      slideItems:[
        {
          img:'https://res.mekeai.com/00107ebb-dd6f-46a0-9429-a7d3495b7889'
        }
      ]
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
        let newItem = this.cloneData(item)
        let componentName = item.componentName;
        this.editComponent = componentName;
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
    },
    deleteItem(index){//删除模板
      this.targetItems.splice(index, 1);
      if(this.targetItems.length){
        let thisIndex = index-1>0?(index-1):0;
        this.selectItem = thisIndex;
        this.editComponent = this.targetItems[thisIndex].componentName;
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
    editComponentStatus(object){
      console.log(object)
    }
  }
};
</script>

