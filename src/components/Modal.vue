<style lang="scss">
  .modal{
    width: 100%;
    height: 100vh;
    z-index: 98;
    position: fixed;
    top: 0;
    left: 0;
    &-mask{
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 99;
      background: rgba(0,0,0,.3);
    }
    &-content{
      position: absolute;
      width: calc(100% - 110px);
      min-height: 300px;
      background: white;
      left: 55px;
      top: 329px;
      z-index: 100;
      border-radius: 10px;
      padding: 32px;
      .modal-title{
        text-align: center;
        font-size: 36px;
        color: $default;
        font-weight: bold;
      }
    }
  }
</style>

<template>
  <transition>
  <div class="modal" v-if="visible" style="z-index:98">
    <div class="modal-mask" @click="close"></div>
    <div class="modal-content">
      <div class="modal-title">{{title}}</div>
      <slot></slot>
    </div>
  </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    }
  },
  methods: {
    close() {
      this.$emit('update:visible', false)
    }
  }
}
</script>