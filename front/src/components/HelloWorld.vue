<template>
  <h1>{{ msg }}</h1>

</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: '',
    }
  },
  methods: {
    async getHello() {
      await this.axios.get(`user/${1}`)
      .then( response => {
        console.log(response);
      })
      .catch( error => {
        console.log(error);
      });
    },
    async login() {
      await this.axios.post('/login', {login:'waiter1',password:'1234'})
      .then( response => {
        console.log(response);
        if (response.data) {
          localStorage.setItem('token', response.data.token);
          this.acess();
        }
      })
      .catch( error => {
        console.log(error);
      });
    },
    async acess() {
      await this.axios.get('/protect')
      .then( response => {
        console.log(response);
        console.log(response.data);
      })
      .catch( error => {
        console.log(error);
      })
    },
    async tte() {
      await this.pinia.loginClient(this.$route.params.tag);
      console.log(this.pinia.isClientLoggedIn);
      this.pinia.logout();
    }
  },
  mounted() {
    //console.log(this.$route.params);
    //this.tte();
    //this.getHello();
    this.login();
  }
}
</script>
<style scoped>

</style>
