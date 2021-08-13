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
import Providers from '../../../../controllers/basics/providers'

import messages from './messages'
export default {
  name: 'ProviderList',
  i18n: { messages },
  components: { List },
  data() {
    return {
      cols: ['name', { providers: ['name'] }, 'phone', 'mail'],
      itens: [],
      messages,
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      Providers.list((result) => {
        this.itens = result.data
      })
    },
    create() {
      Methods.openPage(this, 'providers/0')
    },
    edit(id) {
      Methods.openPage(this, 'providers/' + id)
    },
    del(id) {
      Providers.delete(id, (result) => {
        console.log(result)
      })
    },
  },
}
</script>
