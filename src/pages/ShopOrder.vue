<template>
  <div id="shop-order">
    <div class="reel">
      <div class="order-list">

        <div class="order-item" v-for="order in orders" :key="order.id">
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
//        desc: '',
//        timestamp: '',
//        price: ''
        orders: [
          {
            desc: '展览馆费用',
            timestamp: '2017年2月2日 17:00',
            price: '8.00',
            paid: true
          },
          {
            desc: '展览馆费用',
            timestamp: '2017年2月2日 17:00',
            price: '8.00',
            paid: true
          },
          {
            desc: '展览馆费用',
            timestamp: '2017年2月2日 17:00',
            price: '8.00',
            paid: false
          },
          {
            desc: '展览馆费用',
            timestamp: '2017年2月2日 17:00',
            price: '8.00',
            paid: true
          },
          {
            desc: '展览馆费用',
            timestamp: '2017年2月2日 17:00',
            price: '8.00',
            paid: false
          },
          {
            desc: '展览馆费用',
            timestamp: '2017年2月2日 17:00',
            price: '8.00',
            paid: false
          },
          {
            desc: '展览馆费用',
            timestamp: '2017年2月2日 17:00',
            price: '8.00',
            paid: false
          },
          {
            desc: '展览馆费用',
            timestamp: '2017年2月2日 17:00',
            price: '8.00',
            paid: false
          },
          {
            desc: '展览馆费用',
            timestamp: '2017年2月2日 17:00',
            price: '8.00',
            paid: false
          },
          {
            desc: '展览馆费用',
            timestamp: '2017年2月2日 17:00',
            price: '8.00',
            paid: false
          },
          {
            desc: '展览馆费用',
            timestamp: '2017年2月2日 17:00',
            price: '8.00',
            paid: false
          },
          {
            desc: '展览馆费用',
            timestamp: '2017年2月2日 17:00',
            price: '8.00',
            paid: false
          },
          {
            desc: '展览馆费用',
            timestamp: '2017年2月2日 17:00',
            price: '8.00',
            paid: false
          }
        ]
      }
    },
    components: {
      'v-footer': footer
    },
    created() {
      this.$http.get(`ShopOrder/lists?token=${window.sessionStorage.getItem('token')}`)
        .then(response => {
          this.timestamp = response.data.data.pay_time
          this.price = response.data.data.goods_price
        })
        .catch(e => {
          console.log(e)
        })
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
