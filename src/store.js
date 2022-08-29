export const store = {
    state: {
        //当前在展示的手机
        current_phone: {},
        //展示过的手机,key是手机id,value是字典，手机详情
        showed_phones: {},
        //购物车里的手机
        cart_phones: []
    },

    addToCart(phone_id) {
        //状态加入购物车的状态改为true
        console.log(phone_id)
        console.log(this.state.showed_phones[phone_id])
        this.state.showed_phones[phone_id].add_to_cart = true;
        this.state.cart_phones.push(this.state.showed_phones[phone_id])
    },
    addShowedPhone(phone) {
        //增加一个属性
        phone.add_to_cart = false
        this.state.showed_phones[phone.id] = phone
        this.state.current_phone = phone
    },
    setWarning() {
        this.state.current_phone.warning = true;
    }
}