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
import Blankets from '../../../../controllers/equipments/blankets'

import messages from './messages'
export default {
  name: 'BlanketList',
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
      Blankets.list((result) => {
        this.itens = result.data
      })
    },
    create() {
      Methods.openPage(this, 'blankets/0')
    },
    edit(id) {
      Methods.openPage(this, 'blankets/' + id)
    },
    del(id) {
      Blankets.delete(id, () => {
        this.load()
      })
    },
  },
}
</script>
