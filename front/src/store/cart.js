import { defineStore } from 'pinia';

const cartStore = defineStore('cart', {
    state: () => ({
        orders: [],
    }),
    actions: {
        addProduct(product) {
            if(!this.orders.find((p) => p.id === product.id)){
                this.orders.push({...product, amount: 1});
            }
        },
        removeProduct(id) {
            this.orders = this.orders.filter((p) => p.id != id);

        },
        addProductAmount(product, amount) {
         
            let productExist = this.orders.find((p) => p.id === product.id);

            if(productExist) {
                productExist.amount = amount;
            }else {
                this.orders.push({...product, amount: amount});
            };

        },
        clearOrders() {
            this.orders = [];
        },
        sumOne(id){
            const p = this.orders.find((p) => p.id === id);

            if(p){
                p.amount += 1;
            }
        },
        lessOne(id){
            const p = this.orders.find((p) => p.id === id);

            if(p){
                p.amount -= 1;
            }
        },
        attAmount(id, amount) {
            const p = this.orders.find((p) => p.id === id);

            if(p) p.amount = amount;
        }
    },
    getters: {
        totalPrice: (state) => {
            let total = 0;
            state.orders.forEach(product => {
                total += (product.amount * product.price);
            });

            return total;
        }
    },
    persist: true,
});

export default cartStore;