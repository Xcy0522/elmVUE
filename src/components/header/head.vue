<template>
    <div class="headCom">
        <span  v-html="head.left" class="head_left"></span>
        <span  v-html="head.cont" class="head_cont"></span>
        <span  v-html="head.right" class="head_right"></span>
    </div>
</template>

<script>
export default {
    name:"headcom",
    props:["head"],
    data() {
        return {
        }
    },
    created(){
    }
}
</script>

<style lang="scss">
    .headCom {
        width: 100%;
        height: 45px;
        line-height: 50px;
        position: fixed;
        top: 0;
        font-family: Microsoft Yahei;
        font-size: 16px;
        background-color: #3190e8;
        overflow: hidden;
        color:white;
        z-index: 1000;
        a{
            color:white;
        }
        .head_left{
            padding-left:10px;
            float:left;
        }
        .head_cont{
            float:left;
            position: absolute;
            width:210px;
            left:0;
            right:0;
            margin:0 auto;
            text-align: center;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
            font-size: 20px;
        }
        .head_right{
            padding-right:10px;
            float:right;
        }
    }
</style>