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
import Lids from '../../../../controllers/equipments/lids'

import messages from './messages'
export default {
  name: 'LidList',
  i18n: { messages },
  components: { List },
  data() {
    return {
      cols: [
        { equipments: ['name'] },
        { providers: ['name'] },
        { brands: ['name'] },
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
      Lids.list((result) => {
        this.itens = result.data
      })
    },
    create() {
      Methods.openPage(this, 'lids/0')
    },
    edit(id) {
      Methods.openPage(this, 'lids/' + id)
    },
    del(id) {
      Lids.delete(id, (result) => {
        console.log(result)
      })
    },
  },
}
</script>
