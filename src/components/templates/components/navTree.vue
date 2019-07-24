<style>
.ivu-tree-title{
    margin-left: 18px;
    position: relative;
}
.ivu-tree-title::before{
    content: '';
    position: absolute;
    left:-18px;
    top:50%;
    width:16px;
    height: 16px;
    margin-top: -8px;
    border: 1px solid #e4e4e4;
    border-radius: 2px;
}
.ivu-tree-title.ivu-tree-title-selected::before{
    content: '';
    background: #2d8cf0;
    border-color: #2d8cf0;
    color: #fff;
}
.ivu-tree-title.ivu-tree-title-selected::after{
    content: '';
    position: absolute;
    left: -14px;
    top: 4px;
    width: 10px;
    height: 10px;
    background: url('../../../../../assets/images/icon_right.png') no-repeat;
    background-size: 10px 10px;
}
</style>

<template>
    <div>
        <Tree ref="tree" :data="treeData" @on-select-change="checkChange"></Tree>
    </div>
</template>
<script>
import { storeCategoryApi } from '@/api/ems'
export default {
    name:'navComponent',
    props:['slideSort'],
    data () {
        return {
            treeData:[]
        }
    },
    // watch: {
    //     treeData: {
    //         handler(newVal){
    //             this.$nextTick(()=>{
    //                 this.treeData = newVal;
    //             })
    //         },
    //         deep: true
    // 　　} 
    // },
    created () {
        this.loadNavData();
    },
    methods: {
        loadNavData(){
            storeCategoryApi.list().then(res=>{
                let tree = res;
                let selectId = this.slideSort.length?this.slideSort[0].id:''
                let newTreeData = this.filterTree(tree,selectId);
                this.treeData = newTreeData;
            })
        },
        checkChange(e){
            let thisId = e.length?e[0].id:'';
            let newTreeData = this.filterTree(this.treeData,thisId);
            this.treeData = newTreeData;
            this.$emit('getSortList',e)
        },
        filterTree(tree,id){
            // return asyncRouterMap
            let newTree = tree.map((item,index) => {
                item.title = item.typeName;
                item.expand = true;
                if(item.id == id){
                    this.$set(item,"checked",true);
                    this.$set(item,"selected",true);
                }else{
                    this.$set(item,"selected",false);
                    this.$set(item,"checked",false);
                }
                if(item.lists && item.lists.length){
                    item.children = this.filterTree(item.lists,id)
                }
                return item
            })
            return newTree;
        },
    }
}
</script>

