<template>
    <div class="editForm">
        <div class="header">
            <Row class="form_header">
                <Col span="12" class="form_name"><span class="label">表单名称</span><Input size="large" v-model="createForm.name" :maxlength='20' placeholder="请输入表单名称" class="input"></Input><span class="count">{{createForm.name.length}} / 20</span></Col>
                <Col span="12" class="form_control">
                    <span class="tip"><Icon type="ios-information"></Icon>表单更新后需前往对应的动态或官网重新关联新表单</span>
                    <Button size="large">取消</Button>
                    <Button size="large" type="primary">保存</Button>
                </Col>
            </Row>
            <div class="form_header">
                <div class="form_name">
                    <span class="label">表单引用</span>
                    <ButtonGroup size="large">
                        <Button type="primary">空白表单</Button>
                        <Button>客户信息表</Button>
                        <Button>在线预约表</Button>
                        <Button>活动邀请表</Button>
                        <Button>意见反馈表</Button>
                        <Button>复用历史表单<Icon class="icon_more" type="arrow-right-b"></Icon></Button>
                    </ButtonGroup>
                </div>
            </div>
        </div>

        <div class="form_wrap">
            <div class="form_side">
                <h3 class="title">基础组件</h3>
                <draggable class="temp_list" :list="componentsItems" ghost-class="ghost" :sort="false" :group="{ name: 'shared', pull: 'clone', revertClone: false}">
                    <transition-group type="transition" :name="'flip-list'" >
                        <div class="temp_item" v-for="(element,index) in componentsItems" :key="'type-'+index">
                            <Icon class="icon" :type="element.icon"/>
                            <span class="name">{{ element.name }}</span>
                        </div>
                    </transition-group>
                </draggable>
            </div>
            <div class="form_template"><!--编辑组件-->
                <component :is="componentName" :setData="componentData" @getComponent="getComponentData"></component>
            </div>
            <div class="form_show"><!--已选组件列表-->
                <div class="phone_wrap">
                    <div class="phone_header">表 单<img class="mini_top" src="../../../assets/images/mini_top.png"/></div>
                    <draggable :list="createForm.data" ghost-class="ghost" animation="300" sort="false" :group="{ put: ['shared']}" @change="dragItem" >
                        <transition-group class="phone_box" type="transition" :name="'flip-list'" tag="div">
                            <div class="group_item" :class="[selectItem==index?'on':'']" v-for="(element,index) in createForm.data" :key="'my-name'+index" @click="handleItem(element.componentName,index)">
                                <div class="group_move" v-if="selectItem==index">
                                    <p class="move_btn" @click.stop="moveItem(index,'up')" v-if="index"><Icon type="arrow-up-c" /></p>
                                    <p class="move_btn" @click.stop="moveItem(index,'down')" v-if="index!=(createForm.data.length-1)"><Icon type="arrow-down-c" /></p>
                                    <p class="move_btn" @click.stop="deleteItem(index)"><Icon type="close-round" /></p>
                                </div>
                                <components :is="element.type" :moduleData="element"></components>
                            </div>
                            <div class="submit_btn" key="submit" v-if="createForm.data.length">
                                <Button class="submit" type="primary" size="large">
                                    <Input class="put_submit" v-model="createForm.submit" size="large"></Input>
                                </Button>
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
import titleModel from './components/titleModel'
import singleLine from './components/singleLine'
import multiLine from './components/multiLine'
import timeModel from './components/timeModel'
import dateModel from './components/dateModel'
import singleSelect from './components/singleSelect'
import multiSelect from './components/multiSelect'
import dropDown from './components/dropDown'
import uploadModel from './components/uploadModel'
import addressModel from './components/addressModel'
import textModel from './components/textModel'
import titleTemplate from './templates/titleTemplate'
import singleLineTemplate from './templates/singleLineTemplate'
import multiLineTemplate from './templates/multiLineTemplate'
import timeTemplate from './templates/timeTemplate'
import dateTemplate from './templates/dateTemplate'
import singleSelectTemplate from './templates/singleSelectTemplate'
import multiSelectTemplate from './templates/multiSelectTemplate'
import dropDownTemplate from './templates/dropDownTemplate'
import uploadTemplate from './templates/uploadTemplate'
import addressTemplate from './templates/addressTemplate'
import textTemplate from './templates/textTemplate'
export default {
    name:'formEdit',
    components: {
        draggable,
        titleModel,
        singleLine,
        multiLine,
        timeModel,
        dateModel,
        singleSelect,
        multiSelect,
        dropDown,
        uploadModel,
        addressModel,
        textModel,
        titleTemplate,
        singleLineTemplate,
        multiLineTemplate,
        timeTemplate,
        dateTemplate,
        singleSelectTemplate,
        multiSelectTemplate,
        dropDownTemplate,
        uploadTemplate,
        addressTemplate,
        textTemplate
    },
    data () {
        return {
            componentsItems: [//页面上可拖拽的组件
                { name: "标题", icon:'android-create', type:'titleModel',componentName:'titleTemplate',data:{title:'标题'}},
                { name: "单行文本", icon:'ios-compose-outline',type:'singleLine',componentName:'singleLineTemplate',data:{type:'1',name:'姓名',maxLength:15,required:true}},
                { name: "多行文本", icon:'ios-paper-outline', type:'multiLine',componentName:'multiLineTemplate',data:{name:'文本内容',maxLength:300,required:true}},
                { name: "时间", icon:'ios-stopwatch-outline',type:'timeModel',componentName:'timeTemplate',data:{name:'时间', required:true}},
                { name: "日期", icon:'ios-calendar-outline', type:'dateModel',componentName:'dateTemplate',data:{name:'日期', required:true}},
                { name: "单项选择", icon:'android-checkmark-circle',type:'singleSelect',componentName:'singleSelectTemplate',data:{type:'0',name:'单项选择',list:[{label:'选项一'},{label:'选项二'},{label:'选项三'}],required:true}},
                { name: "多项选择", icon:'android-checkbox-outline', type:'multiSelect',componentName:'multiSelectTemplate',data:{name:'多项选择',list:[{label:'选项一'},{label:'选项二'},{label:'选项三'}],required:true}},
                { name: "下拉框", icon:'ios-settings-strong', type:'dropDown',componentName:'dropDownTemplate',data:{name:'下拉框',list:[{label:'选项一'},{label:'选项二'},{label:'选项三'}],required:true}},
                { name: "上传图片", icon:'images', type:'uploadModel',componentName:'uploadTemplate',data:{name:'上传图片',count:4,required:true}},
                { name: "选择省市", icon:'map', type:'addressModel',componentName:'addressTemplate',data:{name:'选择地址',type:'1',required:true}},
                { name: "文字说明", icon:'clipboard', type:'textModel',componentName:'textTemplate',data:{title:'文字说明'}},
            ],
            createForm:{
                name:'',
                submit:'立即提交',
                data:[]
            },
            componentName:null,//显示编辑的组件名称
            selectItem:0,//当前选中的第几个组件
            componentData:null,//显示组件的数据回显
        }
    },
    methods:{
        dragItem(evt){//拖拽组件
            if (evt.added) {
                let addItem = evt.added;
                let thisIndex = addItem.newIndex;
                thisIndex = (thisIndex!=0 && thisIndex ==this.createForm.data.length)?(thisIndex-1):thisIndex
                let item = addItem.element;
                this.selectItem = thisIndex;
                let componentName = item.componentName;
                this.componentName = componentName;
                let temp =this.cloneData(this.createForm.data);
                this.componentData=temp[thisIndex].data
                this.createForm.data = temp;
            }
            if(evt.moved){
                let moveItem = evt.moved;
                let newIndex = moveItem.newIndex;
                this.selectItem = newIndex;
            }
        },
        handleItem(name,index){//选择组件编辑
            this.selectItem = index;
            this.componentName = name;
            let data = this.createForm.data[index].data;
            this.componentData=data
        },
        getComponentData(object){//编辑模板对应内容
            let moduleName = object.name;//模块名称
            let thisIndex = this.selectItem;
            let thisItem = this.createForm.data[thisIndex];
            let data = object.data;
            thisItem.data= data;
            this.createForm.data.splice(thisIndex,1,thisItem)
        },
        deleteItem(index){//删除模板
            this.createForm.data.splice(index, 1);
            if(this.createForm.data.length){
                let thisIndex = index-1>0?(index-1):0;
                let componentName = this.createForm.data[thisIndex].componentName
                this.selectItem = thisIndex;
                this.componentName = componentName;
                this.handleItem(componentName,thisIndex)
            }else{
                this.selectItem = null;
                this.componentName = null;
            }
            },
        moveItem(index,orient){//模板上升、下降排序
            let moveIndex;
            if(orient=='up'){
                moveIndex = [index-1]
            }else{
                moveIndex =[index+1]
            }
            let targetItem = this.createForm.data[moveIndex];
            let thisItem = this.createForm.data[index];
            this.createForm.data.splice(moveIndex,1,thisItem)
            this.createForm.data.splice(index,1,targetItem);
            this.selectItem = moveIndex;
        },
        cloneData(original) {//拷贝对象
            return JSON.parse(JSON.stringify(original));
        },
    }
}
</script>

<style src='@/assets/css/components/form.css'></style>
