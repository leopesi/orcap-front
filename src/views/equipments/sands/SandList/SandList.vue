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
import Sands from '../../../../controllers/equipments/sands'

import messages from './messages'
export default {
  name: 'SandList',
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
      Sands.list((result) => {
        this.itens = result.data
      })
    },
    create() {
      Methods.openPage(this, 'sands/0')
    },
    edit(id) {
      Methods.openPage(this, 'sands/' + id)
    },
    del(id) {
      Sands.delete(id, () => {
        this.load()
      })
    },
  },
}
</script>
