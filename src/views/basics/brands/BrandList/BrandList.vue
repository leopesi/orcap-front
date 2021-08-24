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
import Brands from '../../../../controllers/basics/brands'

import messages from './messages'
export default {
  name: 'BrandList',
  i18n: { messages },
  components: { List },
  data() {
    return {
      cols: ['name', { providers: ['name'] }],
      itens: [],
      messages,
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      Brands.list((result) => {
        this.itens = result.data
      })
    },
    create() {
      Methods.openPage(this, 'brands/0')
    },
    edit(id) {
      Methods.openPage(this, 'brands/' + id)
    },
    del(id) {
      Brands.delete(id, (result) => {
        console.log(result)
        this.load()
      })
    },
  },
}
</script>
