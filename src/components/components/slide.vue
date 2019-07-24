<template>
     <div>
        <Carousel v-model="value" v-if="slideData.length">
            <CarouselItem v-for="(item,index) in slideData" :key="index">
                <div class="template_carousel" v-if="item.picture">
                    <img :src="item.picture" />
                </div>
                <div v-else class="template_carousel">
                    <Icon class="carousel_icon" type="images"></Icon>
                </div>
            </CarouselItem>
        </Carousel>
        <div v-else>
            <div class="no_slide">
                添加轮播图
            </div>
        </div>
     </div>
</template>
<script>
export default {
    name:'slideSwiper',
    props:['moduleData'],
    data () {
        return {
            value:0,
            slideData:this.moduleData.data.slides || []
        }
    },
    watch:{
        moduleData: {
            handler(val) {
                let getData= val;
                this.$nextTick(()=>{
                    this.slideData = getData.data.slides || [];
                })
            },
            deep: true
    　　}
    }
}
</script>
<style lang="less" scoped>
    .no_slide{
        width: 100%;
        height: 210px;
        line-height: 210px;
        font-size: 30px;
        color: #999;
        background: #ddd;
    }
    .template_carousel,
    .template_carousel img{
        width: 100%;
        height: 210px;
    }
    .template_carousel{
        background:#e4e4e4;
        .carousel_icon{
            font-size:60px;
            color:#fff;
            line-height:210px;
        }
    }
</style>
