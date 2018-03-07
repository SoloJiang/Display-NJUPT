<template>
  <div id="shop-order">
    <div class="reel">
      <div class="order-list">

        <div class="order-item" v-for="order in orders" :key="order.id" @click="handleClickOnOrderItem(order.detail)">
          <div class="left">
            <div class="pay-logo">
              <img src="../assets/pageShopOrder/dem.png" width="40" height="40" alt="pay item">
            </div>
          </div>

          <div class="center">
            <div class="desc">
              <p>{{ order.desc }}</p>
            </div>
            <div class="timestamp">
              <p>{{ order.timestamp }}</p>
            </div>
          </div>

          <div class="right">
            <span class="price" :class="{ paid: order.paid, unpaid: !order.paid }">¥ {{ order.price }}</span>
          </div>

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
        orders: []
      }
    },
    components: {
      'v-footer': footer
    },
    methods: {
      handleClickOnOrderItem(detail) {
        window.sessionStorage.setItem('order.detail', detail)
        this.$router.push('/order_detail')
      },
      timeConvert(date) {
        date = new Date(date)
        return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`
      }
    },
    created() {
      this.$http.get(`ShopOrder/lists?token=${window.sessionStorage.getItem('token')}`)
        .then(response => {
          this.orders = response.data.map(item => {
            const order = {}
            order.timestamp = this.timeConvert(item.add_time)
            order.id = item.order_sn
            order.desc = item.goods_name
            order.price = item.goods_price
            order.paid = item.pay_status === '1'
            order.detail = JSON.stringify(item)
            return order
          })
        })
        .catch(e => {
          console.log(e)
        })
      let intro = JSON.parse(window.sessionStorage.getItem('intro'))
      this._Global.ready(intro.title, intro.desc, intro.thumb[0], window.location)
    }
  }</script>

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
    .order-list
      max-height: 100%
      overflow: scroll
      .order-item
        display: flex
        padding: 10px 0
        align-items: center
        font-size: 16px
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .left, .right
          flex: 1
        .center
          flex: 3
          .timestamp
            color: rgba(7, 17, 27, 0.4)
            font-size: 12px
        .right
          font-weight: bold
          .unpaid
            color: rgba(7, 17, 27, 0.4)
</style>
