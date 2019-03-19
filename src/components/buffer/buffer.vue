<template>
  <div class="buffer">
     <div>
         <img :src="buffer" alt="">
     </div>
  </div>
</template>

<script>
import buffer from '../../images/buffer.png'
export default {
  name: "city",
  data() {
    return {
      buffer,
     
    };
  },
  created() {
   
  },
  methods: {
   
  }
} 
</script>

<style lang="scss" scoped>
.buffer {
    div {
        width: 1rem;
        height: 1rem;
        position: fixed;
        top: 50%;
        left: 50%;
        margin-left: -.5rem;
        margin-top: -.5rem;
        background-color: aqua;
        overflow: hidden;
        img {
            position:absolute;
            
        }
    }
}
</style>