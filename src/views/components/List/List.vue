<template>
  <div class="list card">
    <div class="card-header">
      <slot name="title" />
    </div>
    <div class="card-body">
      <table
        slot="table"
        class="table table-striped"
        cellpadding="0"
        cellspacing="0"
      >
        <thead class="thead-dark">
          <tr>
            <th v-for="(col, i) in this.columns" :key="i">
              <div v-if="typeof col === 'string'">{{ $t(col) }}</div>
              <div v-if="typeof col === 'object'">
                <div v-for="(rels, j) in col" :key="j">
                  {{ $t(j) }}
                </div>
              </div>
            </th>
            <th>{{ $t('edit') }}</th>
            <th>{{ $t('delete') }}</th>
          </tr>
        </thead>
        <tbody slot="body">
          <tr
            v-for="(item, i) in this.itens"
            :key="i"
            @click="buttonEdit(item.id)"
          >
            <td v-for="(col, c) in cols" :key="c">
              <div v-if="typeof col === 'string'">{{ item[col] }}</div>
              <div v-if="typeof col === 'object'">
                <div v-for="(rels, j) in col" :key="j">
                  <div v-for="(itemcol, k) in rels" :key="k">
                    {{ item[j] ? item[j][itemcol] : '' }}
                  </div>
                </div>
              </div>
            </td>
            <td>{{ $t('edit') }}</td>
            <td>{{ $t('delete') }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="card-footer">
      <button type="button" class="btn btn-primary" @click="buttonNew">
        Novo
      </button>
    </div>
  </div>
</template>

<script>
import Methods from '../../../helpers/methods'
import messages from './messages'
import './style.css'
export default {
  name: 'List',
  props: { cols: Array, itens: Array, messages: Object },
  i18n: { messages },
  data() {
    return {
      columns: []
    }
  },
  beforeMount() {
    const cols = this.cols
    this.columns = []
    for (const i in cols) {
      if (cols[i] != 'id') this.columns.push(cols[i])
    }
    Methods.setLocaleMessage(this, messages, this.messages)
  },
  methods: {
    buttonNew() {
      this.$emit('new', 0)
    },
    buttonEdit(id) {
      this.$emit('edit', id)
    },
  },
}
</script>
