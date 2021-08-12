<template>
  <div class="home">
    <List
      :cols="this.cols"
      :itens="this.itens"
      @new="create"
      :messages="this.messages"
      @edit="edit"
      @delete="del"
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
import Budgets from '../../../../controllers/budgets/budgets'

import messages from './messages'
export default {
  name: 'LogistList',
  i18n: { messages },
  components: { List },
  data() {
    return {
      cols: [
        // 'id',
        { clients: ['name'] },
        { sellers: ['name'] },
      ],
      itens: [],
      messages,
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      Budgets.budgets((result) => {
        this.itens = result.data
      })
    },
    create() {
      Methods.openPage(this, 'budget')
    },
    edit(id) {
      Methods.openPage(this, 'budget/' + id)
    },
    del(id) {
      Budgets.delete(id, (result) => {
        console.log(result)
      })
    },
  },
}
</script>
