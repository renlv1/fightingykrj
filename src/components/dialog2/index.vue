<template>
  <transition name="dialog">
    <div class="g-dialog" v-if="visible">
      <div class="g-dialog-mask"></div>
      <div class="g-dialog-wrap border-bg">
        <div class="g-dialog-title" v-show="title" v-html="title"></div>
        <div class="g-dialog-btn-wrap" :class="{'btn-w-i': type === 'alert'}">
          <button class="g-dialog-btn g-dialog-ok"  @click="okCallback">确认</button>
          <button class="g-dialog-btn g-dialog-cancel" @click="cancelCallback"  v-if="type !== 'alert'">取消</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      visible: false
    }
  },
  props: {
    type: String,
    title: String,
    msg: String,
    okFn: Function,
    okText: String,
    cancelFn: Function,
    cancelText: String,
    align: String
  },
  methods: {
    okCallback () {
      this.visible = false
      this.okFn && this.okFn()
    },
    cancelCallback () {
      this.visible = false
      this.cancelFn && this.cancelFn()
    }
  }
}
</script>
