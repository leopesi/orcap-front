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
import Sellers from '../../../../controllers/persons/sellers'
/*import Cruds from '../../../../controllers/defaults/cruds'*/

import messages from './messages'
export default {
  name: 'SellerList',
  i18n: { messages },
  components: { List },
  data() {
    return {
      cols: ['name', 'phone', { sessions: ['mail'] }],
      itens: [],
      messages,
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      Sellers.list((result) => {
        this.itens = result.data
      })
    },
    create() {
      Methods.openPage(this, 'sellers/0')
    },
    edit(id) {
      Methods.openPage(this, 'sellers/' + id)
    },
    del(id) {
      Sellers.delete(id, (result) => {
        console.log(result)
        this.load()
      })
    },
  },
}
</script>
