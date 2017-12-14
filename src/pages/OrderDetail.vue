<template>
  <div id="shop-order">
    <div class="reel">

      <h2 class="title">订单详情</h2>
      <div class="order">
        <div>
          <p>订单编号: {{ order.order_sn }}</p>
          <p>订单名称: {{ order.goods_name }}</p>
          <p>支付金额: ¥ {{ order.goods_price }}</p>
          <p>下单时间: {{ order.add_time }}</p>
          <p :class="{ unpaid: order.pay_status === '0' }">支付状态: {{ order.pay_status === '1' ? '已支付' : '未支付' }}</p>
        </div>
        <div v-if="order.pay_status === '1'">
          <p>支付时间: {{ order.pay_time }}</p>
          <p>服务开始时间: {{ order.service_begin }}</p>
          <p>服务结束时间: {{ order.service_end }}</p>
        </div>
        <div v-if="order.remark !== ''">
          <p>备注: {{ order.remark }}</p>
        </div>
      </div>

    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import footer from 'components/Footer'

  export default {
    name: 'shop-order',
    data() {
      return {
        order: {}
      }
    },
    components: {
      'v-footer': footer
    },
    methods: {
      timeConvert(date) {
        date = new Date(date)
        return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`
      },
      handleAllTimestampConvert() {
        this.order.add_time = this.timeConvert(this.order.add_time)
        this.order.pay_time = this.order.pay_time !== '' ? this.timeConvert(this.order.pay_time) : ''
        this.order.service_begin = this.order.service_begin !== '' ? this.timeConvert(this.order.service_begin) : ''
        this.order.service_end = this.order.service_end !== '' ? this.timeConvert(this.order.service_end) : ''
      }
    },
    created() {
      this.order = JSON.parse(window.sessionStorage.getItem('order.detail'))
      this.handleAllTimestampConvert()
      let intro = JSON.parse(window.sessionStorage.getItem('intro'))
      this._Global.ready(intro.title, intro.desc, intro.thumb[0], window.location)
    }
  }
</script>

<style lang="sass" scoped>
  #shop-order
    width: 100%
    min-height: 100vh
    background-size: 300% 120%
    .reel
      padding: 7vh 10vh 7vh 10vh
      height: 80vh
      color: rgb(137, 53, 62)
      overflow: hidden
      background: url("../assets/pageMuseum/reel.png") 50% no-repeat
      background-size: 95% 95%
    .title
      text-align: center
      margin-bottom: 30px
    p
      margin-bottom: 20px
    .unpaid
      color: rgba(7, 17, 27, 0.4)
</style>
