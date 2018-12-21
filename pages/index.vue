<template>
  <section class="container">
    <div>
      <logo/>
      <h1
        class="title">
        Nuxt-Server with a bit of <span class="spice">Spice</span>
      </h1>
      <h2
        class="subtitle">
        Nuxt.js + MongoDB + Routes Generator
      </h2>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green">Documentation</a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey">GitHub</a>
      </div>
    </div>
  </section>
</template>

<script>
  import Logo from '~/components/Logo.vue'
  import api from '~/src/api'

  export default {
    components: {
      Logo
    },
    mounted() {
			// this.addRouteName('Spicy!')
			// this.deleteRouteName('5c1b73f20e6b2353b7f886a2')
			// this.updateRouteName('5c1b73f00e6b2353b7f889a1', 'Hello Potato')
			this.getRouteName()
    },
    methods: {
			getRouteName: function() {
				api.request('GET', 'routeName/all').then(function(response){
					if (response.data) {
						console.log(response)
					}else{
						console.log('No instances found in the database')
					}
				})
			},
      addRouteName: function(nname) {
	      api.request('POST', 'routeName/add', { name: nname }).then(function (response) {
	        console.log(response)
				})
			},
			deleteRouteName: function(nid) {
				api.request('GET', `routeName/delete/${nid}`).then(function (response) {
					if (response.data) {
						console.log('RouteName Found')
					}else{
						console.log(`No RouteName found with ID ${nid}`)
						alert('norambe')
					}
				})
			},
			updateRouteName: function(nid, nname) {
				api.request('POST', `routeName/update/${nid}`, {name: nname}).then(function (response){
					if (response.data){
						console.log(response)
					}else {
						console.log(`Could not find RouteName with ID ${nid}`)
					}
				})
			}
    }
  }
</script>

<style>

 .container {
	 min-height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
	}

	.title {
		font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
		'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
		display: block;
		font-weight: 300;
		font-size: 100px;
		color: #35495e;
		letter-spacing: 1px;
	}
	.subtitle {
		font-weight: 300;
		font-size: 42px;
		color: #526488;
		word-spacing: 5px;
		padding-bottom: 15px;
	}

	.links {
		padding-top: 15px;
	 }
	.spice {
		color: #A40606;
	}
</style>
