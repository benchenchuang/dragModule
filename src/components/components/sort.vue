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
</style>

<template>
    <div class="sort_template">
        <div class="sort_item" v-if="true">
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
        <div class="sort_item">
            <!-- <Tabs class="sort_two">
                <div v-for="(item,index) in tabs" :key="index">
                    <TabPane :label="item.title">
                        <Row class="tab_list" v-if="item.subNavs.length">
                            <div v-for="(tab,k) in item.subNavs" :key="k">
                                <Col span="8">
                                    <div class="tab_item">
                                        <img class="pic" :src="tab.icon"/>
                                        <p class="label">{{tab.title}}</p>
                                    </div>
                                </Col>
                            </div>
                        </Row>
                    </TabPane>
                </div>
            </Tabs> -->
            <div v-for="(item,index) in tabs" :key="index">
                <div class="sort_tabs">
                    <p>{{item.title}}</p>
                </div>
                <div class="sort_subNavs">
                    <div class="sub_item" v-for="(tab,k) in item.subNavs" :key="k">
                        <div class="sub">
                            <p class="label">{{tab.title}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'sortTemplate',
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
                }
            ]
        }
    }
}
</script>

