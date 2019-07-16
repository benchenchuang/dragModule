<style lang="less" scoped>
    .no_slide{
        width: 100%;
        height: 160px;
        line-height: 160px;
        font-size: 30px;
        color: #999;
        background: #ddd;
    }
    .template_carousel,
    .template_carousel img{
        width: 100%;
        height: 160px;
    }
</style>

<template>
     <div>
        <div v-if="!items.length">
            <div class="no_slide">
                添加轮播图
            </div>
        </div>
        <Carousel v-model="value" loop v-else>
            <CarouselItem v-for="(item ,index) in items" :key="index">
                <div class="template_carousel">
                    <img :src="item.img" />
                </div>
            </CarouselItem>
        </Carousel>
     </div>
</template>
<script>
export default {
    name:'slideSwiper',
    props:{
        items: {
            type: Array,
            default:()=>{
                return []
            }
        },
    },
    data () {
        return {
            value:0
        }
    }
}
</script>

