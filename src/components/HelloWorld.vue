<template>
  <v-data-table
    :headers="headers"
    :items="users"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:item.avatar="{ item }">
      <img :src="`http://127.0.0.7/storage/profile_images/${item.avatar}`"/>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'name',
          align: 'start',
          filterable: true,
          value: 'name',
        },
        { text: 'avatar', value: 'avatar' },
        { text: 'email', value: 'email' },
        { text: 'Signed Up', value: 'signedup' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
    }),
    mounted() {
        this.$store.dispatch("getusers");
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      users(){
        return this.$store.state.users;
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {

    },

    methods: {
      deleteItem (item) {
        this.$http.post('http://127.0.0.7/api/deleteuser', {"id": item.id})
        .then(response => {
          console.log(response.data);
        });
        // this.editedIndex = this.desserts.indexOf(item)
        // this.editedItem = Object.assign({}, item)
        // this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
    },
  }
</script>
