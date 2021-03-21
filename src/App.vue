<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            v-bind="attrs"
            v-on="on"
          >Add A User</v-btn>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar
              color="primary"
              dark
            >Add User</v-toolbar>
            <v-card-text>
              <div class="text-h2 pa-12">
                <v-text-field 
                  label="New User Email Address" 
                  hide-details="auto"
                  v-model="create.user">
                </v-text-field>
              </div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn text
              @click="adduser"              
              >
                Add</v-btn>
              <v-btn
                text
                @click="dialog.value = false"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-app-bar>

    <v-main>
      <HelloWorld/>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    create: {
      user: ''
    }
  }),
  methods: {
    adduser(){
      const email = this.create.user;
      if(email > ''){
        // this.$store.dispatch("addusers", email);
        this.$http.post('http://127.0.0.7/api/sendinvitation', {"email": email})
        .then(response => {
          if(response.data.response){
            this.create.user = "";
          }
        })
      }
    }
  }
};
</script>
