<template>
  <div class="row">
    <div class="col-12 col-sm-12 col-md-2 mt-2 text-center"><img class="img-responsive" :src="imgUrl(item.good.photo)" alt="prewiew" width="120" height="80" /></div>
    <div class="col-12 text-sm-center col-sm-12 text-md-left col-md-6">
      <h4 class="product-name"><strong>{{item.good.name}}</strong></h4>
      <h4><small>{{item.good.short_text}}</small></h4>
    </div>
    <div class="col-12 col-sm-12 text-sm-center col-md-4 mt-3 text-md-right justify-content-around row">
      <div class="col-3 col-sm-3 col-md-6 text-md-right" style="padding-top: 5px">
        <h6><strong>{{item.amount}}<span class="text-muted">$</span></strong></h6>
      </div>
      <div class="col-4 col-sm-4 col-mt-2">
        <div class="quantity"><input class="plus" type="button" value="+" @click="$emit('plus', item.good.id, item.quantity)" /><input class="qty" type="number" v-model.lazy="item.quantity" disabled="" title="Qty" /><input class="minus" type="button" value="-" @click="$emit('minus', item.good.id, item.quantity)"
        /></div>
      </div>
      <div class="col-2 col-sm-2 col-md-2 text-right"><button class="btn btn-outline-danger btn-xs" type="button" @click="deleteFromCart(item.good.id)"><svg class="bi bi-trash" width="1em" height="1em" viewbox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"></path><path fill-rule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" clip-rule="evenodd"></path></svg></button></div>
    </div>
  </div>
</template>

<script>
import imgUrl from '../../mixins/imgUrl'
export default {
  name: 'Cart',
  mixins: [imgUrl],
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    deleteFromCart (id) {
      this.$emit('delete', id)
    }
  }
}
</script>

<style scoped>
  .quantity {
    float: left;
    margin-right: 15px;
    background-color: #eee;
    position: relative;
    width: 80px;
    overflow: hidden
  }

  .quantity input {
    margin: 0;
    text-align: center;
    width: 15px;
    height: 15px;
    padding: 0;
    float: right;
    color: #000;
    font-size: 20px;
    border: 0;
    outline: 0;
    background-color: #F6F6F6
  }

  .quantity input.qty {
    position: relative;
    border: 0;
    width: 100%;
    height: 40px;
    padding: 10px 25px 10px 10px;
    text-align: center;
    font-weight: 400;
    font-size: 15px;
    border-radius: 0;
    background-clip: padding-box
  }

  .quantity .minus, .quantity .plus {
    line-height: 0;
    background-clip: padding-box;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
    -webkit-background-size: 6px 30px;
    -moz-background-size: 6px 30px;
    color: #bbb;
    font-size: 20px;
    position: absolute;
    height: 50%;
    border: 0;
    right: 0;
    padding: 0;
    width: 25px;
    z-index: 3
  }

  .quantity .minus:hover, .quantity .plus:hover {
    background-color: #dad8da
  }

  .quantity .minus {
    bottom: 0
  }
  .shopping-cart {
    margin-top: 20px;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>
