<style lang="less">
    .title{
        font-size: 30px;
        height: 50px;
    }
    .sort_head{
        position: relative;
        .ivu-tabs-nav{
            margin-left: 10px;
            width: 310px!important;
            text-align: center;
            box-sizing: border-box;
            .ivu-tabs-tab{
                width: 90px;
                font-weight: 600;
            }
        }
        .more_sort{
            position: absolute;
            right: 0;
            top: 6px;
            font-size: 20px;
            height: 22px;
            width: 40px;
            text-align: center;
            line-height: 22px;
            color: #999;
            border-left: 1px solid #aaa;
        }
    }
    .tab_list{
        width: 375px;
        height: 232px;
        .tab_item{
            margin: 8px 0;
            .pic{
                width: 72px;
                height: 72px;
                border-radius: 100%;
                overflow: hidden;
            }
            .label{
                margin-top: 5px;
                color: #666;
            }
        }
    }
    .main_tabs,
    .main_navs{
        margin-bottom: 10px;
        overflow-x: auto;
        overflow-y: hidden;
        white-space: nowrap;
        .sort_tabs{
            width: 100%;
            padding: 6px 0;
            margin-bottom: 4px;
            height: 30px;
            line-height: 30px;
            text-align: left;
            box-sizing: content-box;
            .sort_label{
                position: relative;
                display: inline-block;
                padding: 0 25px;
                margin: 0 5px;
                font-size: 14px;
                font-weight: 700;
                cursor: pointer;
                &.on{
                    color:#2d8cf0;
                    &::before{
                        content: '';
                        position: absolute;
                        left: 0;
                        right: 0;
                        bottom:0;
                        height: 2px;
                        background: #2d8cf0;
                    }
                }
                &.more{
                    padding: 0 10px;
                    color:#999;
                    border-left: 1px solid #ddd;
                }
            }
        }
    }
    .sort_subNavs{
        text-align: left;
        .sub_item{
            overflow-x: auto;
            overflow-y: hidden;
            white-space: nowrap;
            padding-bottom: 10px;
        }
        .sub{
            display: inline-block;
            width: 30%;
            text-align: center;
            img{
                width:72px;
                height: 72px;
            }
        }
    }
    .main_navs{
        margin-top: 10px;
        .sort_navs{
            display: inline-block;
            width: 28%;
            text-align: center;
            .nav_icon{
                width: 72px;
                height: 72px;
            }
        }
    }
</style>

<template>
    <div class="sort_template">
        <div class="sort_item" v-if="moduleData.moduleType==1">
            <div class="sort_head">
                <Tabs>
                    <div v-for="(item,index) in tabs" :key="index">
                        <TabPane :label="item.title" v-if="index<3">
                            <Row class="tab_list" v-if="item.subNavs.length">
                                <div v-for="(tab,k) in item.subNavs" :key="k">
                                    <Col span="8" v-if="k<6">
                                        <div class="tab_item">
                                            <img class="pic" :src="tab.icon"/>
                                            <p class="label">{{tab.title}}</p>
                                        </div>
                                    </Col>
                                </div>
                            </Row>
                        </TabPane>
                    </div>
                </Tabs>
                <div class="more_sort">
                    <Icon type="md-list" />
                </div>
            </div>
        </div>
        <div class="sort_item" v-else-if="moduleData.moduleType==2">
            <div class="main_tabs">
                <div class="sort_tabs">
                    <p @click="switchTab(index)" :class="thisIndex==index?'on sort_label':'sort_label'" v-for="(item,index) in tabs" :key="index">{{item.title}}</p>
                    <p class="sort_label more">全部 <Icon type="ios-arrow-forward" /></p>
                </div>
            </div>
            <div class="sort_subNavs">
                <div v-for="(item,index) in tabs" :key="index">
                    <div class="sub_item" v-if="index==thisIndex">
                        <div class="sub" v-for="(tab,k) in item.subNavs" :key="k">
                            <img :src="tab.icon" />
                            <p class="label">{{tab.title}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="sort_item" v-else>
            <div class="main_navs">
                <div class="sort_navs" v-for="(item,index) in tabs" :key="index">
                    <img class="nav_icon" :src="item.icon"/>
                    <p class="label">{{item.title}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'sortTemplate',
    props:['moduleData'],
    data () {
        return {
            tabs:[
                {
                    title:'女鞋',
                    icon:'https://resource.aijiatui.com/bm/pkugf0dl2q40.png',
                    subNavs:[
                        {
                            title:'测试1',
                            icon:'https://resource.aijiatui.com/bm/pkugf0dl2q40.png',
                            path:'/'
                        },
                        {
                            title:'测试2',
                            icon:'https://resource.aijiatui.com/bm/pkugf0dl2q40.png',
                            path:'/'
                        },
                        {
                            title:'测试3',
                            icon:'https://resource.aijiatui.com/bm/pkugf0dl2q40.png',
                            path:'/'
                        }
                    ]
                },
                {
                    title:'华为',
                    icon:'https://resource.aijiatui.com/bm/pkugf0dl2q40.png',
                    subNavs:[
                        {
                            title:'测试2',
                            icon:'https://resource.aijiatui.com/bm/pkugf0dl2q40.png',
                            path:'/'
                        }
                    ]
                },
                {
                    title:'小米',
                    icon:'https://resource.aijiatui.com/bm/pkugf0dl2q40.png',
                    subNavs:[]
                },
                {
                    title:'OPPO',
                    icon:'https://resource.aijiatui.com/bm/pkugf0dl2q40.png',
                    subNavs:[]
                },
                {
                    title:'小米',
                    icon:'https://resource.aijiatui.com/bm/pkugf0dl2q40.png',
                    subNavs:[]
                },
                {
                    title:'OPPO',
                    icon:'https://resource.aijiatui.com/bm/pkugf0dl2q40.png',
                    subNavs:[]
                }
            ],
            thisIndex:0,
        }
    },
    methods: {
        switchTab(index){
            this.thisIndex = index;
        }
    }
}
</script>

