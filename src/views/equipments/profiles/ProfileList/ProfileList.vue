<template>
  <div class="home">
    <List
      :cols="this.cols"
      :itens="this.itens"
      @new="create"
      @edit="edit"
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
import Profiles from '../../../../controllers/equipments/profiles'

import messages from './messages'
export default {
  name: 'ProfileList',
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
      Profiles.list((result) => {
        this.itens = result.data
      })
    },
    create() {
      Methods.openPage(this, 'profiles/0')
    },
    edit(id) {
      Methods.openPage(this, 'profiles/' + id)
    },
    del(id) {
      Profiles.delete(id, (result) => {
        console.log(result)
        this.load()
      })
    },
  },
}
</script>
