
<template>
    <div class="shops_template">
        <h2 class="shops_title">{{title?title:'优选商品'}}<span class="sub_title">{{desc}}</span></h2>
        <div class="shops_module" v-if="shopType==1">
            <div class="shop_side">
                <img class="cover" v-if="showShops.length" :src="showShops[0].picture || showShops[0].normsPic">
                <Icon v-else class="shop_icon" type="image" />
            </div>
            <div class="shop_aside">
                <div class="small_shop">
                    <img class="cover" v-if="showShops.length>=2" :src="showShops[1].picture || showShops[1].normsPic">
                    <Icon v-else class="shop_icon" type="image" />
                </div>
                <div class="small_shop">
                    <img class="cover" v-if="showShops.length>=3" :src="showShops[2].picture || showShops[2].normsPic">
                    <Icon v-else class="shop_icon" type="image" />
                </div>
            </div>
        </div>
        <div class="shops_module" v-else>
            <div class="large_shop">
                <img class="cover" v-if="showShops.length" :src="showShops[0].picture || showShops[0].normsPic">
                <Icon v-else class="shop_icon" type="image" />
            </div>
            <div class="shops_list">
                <span v-for="(item,index) in showShops" :key="index">
                    <div :class="[index==4?'more_shop small_shop':'small_shop']" v-if="index>=1">
                        <img class="cover" v-if="showShops[index]" :src="showShops[index].picture || showShops[index].normsPic">
                        <Icon v-else class="shop_icon" type="image" />
                    </div>
                </span>
                <span v-if="!showShops.length">
                    <div :class="[k==3?'more_shop small_shop':'small_shop']" v-for="(item,k) in 4" :key="k">
                        <Icon class="shop_icon" type="image" />
                    </div>
                </span>
                <span v-else-if="showShops.length">
                    <div :class="[k==(4-showShops.length)?'more_shop small_shop':'small_shop']" v-for="(item,k) in (5-showShops.length)" :key="k">
                        <Icon class="shop_icon" type="image" />
                    </div>
                </span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'shopsTemplate',
    props:['moduleData'],
    data () {
        let moduleData = this.moduleData;
        let header = moduleData.data.header;
        return {
            title:header.title,
            desc:header.desc,
            shopType: moduleData.data.shopType,
            showShops: moduleData.data.list || [],
            index:0,
        }
    },
    watch: {
        moduleData: {
            handler(val) {
                // let getData = JSON.parse(JSON.stringify(val));
                let getData = val;
                this.showShops = this.index++ ;
                let header = getData.data.header;
                this.title = header.title;
                this.desc = header.desc;
                this.shopType = getData.data.shopType;
                this.$nextTick(()=>{
                    this.showShops = getData.data.list || [];
                })
            },
            deep: true
    　　}
    },
}
</script>
<style lang="less" scoped>
.shops_template{
    padding: 20px;
    .shops_title{
        font-size: 13px;
        color: #333;
        font-weight: 600;
        text-align: left;
        .sub_title{
            margin-left: 5px;
            font-size: 12px;
            color: #999;
            font-weight: 300;
        }
    }
    .shops_module{
        margin-top: 20px;
        overflow: hidden;
        .cover{
            width:100%;
            height: 100%;
        }
        .shop_side{
            float: left;
            display: inline-block;
            width: 220px;
            height: 220px;
            line-height: 220px;
            background: #e4e4e4;
        }
        .shop_aside{
            float: right;
            width:107px;
            height: 220px;
            overflow: hidden;
            .small_shop{
                margin-bottom: 5px;
                width: 100%;
                height: 107px;
                line-height: 107px;
                background: #e4e4e4;
            }
        }
        .shop_icon{
            font-size: 40px;
            color: #fff;
        }
        .large_shop{
           width: 100%;
           height: 188px;
           line-height: 188px;
           background: #e4e4e4;
           .shop_icon{
                font-size: 60px;
           }
        }
        .shops_list{
            margin-top: 10px;
            overflow: hidden;
            margin-left: -5px;
            .small_shop{
                position: relative;
                float: left;
                width: 78px;
                height: 78px;
                line-height: 78px;
                margin-left: 6px;
                background: #e4e4e4;
                &.more_shop::before{
                    content: "全部";
                    position: absolute;
                    left: 0;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    font-size: 14px;
                    color: #fff;
                    background: rgba(0,0,0,.6);
                }
            }
        }
    }
}
</style>

