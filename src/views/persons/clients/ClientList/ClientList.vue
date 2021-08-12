<template>
  <div class="home">
    <List
      :cols="this.cols"
      :itens="this.itens"
      @new="create"
      @edit="edit"
      @delete="del"
      :messages="this.messages"
    >
      <div slot="title">
        {{ $t('title') }}
      </div>
    </List>
  </div>
</template>

<script>
import Methods from '../../../../helpers/methods'
import List from '../../../components/List/List'
import Clients from '../../../../controllers/persons/clients'

import messages from './messages'
export default {
  name: 'ClientsList',
  i18n: { messages },
  components: { List },
  data() {
    return {
      cols: ['name', 'phone', { sessions: ['mail'] }, 'city', 'neighborhood'],
      itens: [],
      messages,
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      Clients.list((result) => {
        this.itens = result.data
      })
    },
    create() {
      Methods.openPage(this, 'clients/0')
    },
    edit(id) {
      Methods.openPage(this, 'clients/' + id)
    },
    del(id) {
      Clients.delete(id, (result) => {
        console.log(result)
      })
    },
  },
}
</script>
