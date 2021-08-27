<template>
  <div class="home">
    <List
      :cols="this.cols"
      :filters="this.filters" 
      :itens="this.filteredItens"
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
      filters:  { name: ''} ,
      itens: [],
      messages,
    }
  },
  mounted() {
    this.load()
  },
  computed: {
			filteredItens() {
				return this.itens.filter((item) => {
					if (!this.filters.name) this.filters.name = ''
          
					if (!item.name) item.name = ''
          
					if (	
						item.name
							.toString()
							.toLowerCase()
							.indexOf(this.filters.name.toString().toLowerCase()) !== -1  
					) {
						return item
					}
				})
			},
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
      Brands.delete(id, () => {
        this.load()
      })
    },
  },
}
</script>
