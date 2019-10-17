<template>
  <v-app>
		<router-view name='navigation'/>
		<v-content>
			<v-container fluid fill-height>
        <v-fade-transition mode='out-in'>
          <router-view/>
        </v-fade-transition>
			</v-container>
		</v-content>
	</v-app>
</template>

<script>
export default {
 name: 'home-page',
 data() {
	 return {}
 }
}
</script>

<style>
html {
  overflow: hidden;
}
</style>