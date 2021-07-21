<template>
  <div class="list">
    <div :class="'card mx-auto form-' + this.size">
      <div class="card-header">
        <slot name="title" />
      </div>
      <form class="card-body" @keyup="keyUp">
        <slot name="default" />
      </form>
      <div class="card-footer">
        <div class="row">
          <div class="col-sm-6">
            <button type="button" class="btn btn-primary" @click="saveForm">
              {{ $t('save') }}
            </button>
          </div>
          <div class="col-sm-6 text-right">
            <button type="button" class="btn btn-secondary" @click="back">
              {{ $t('back') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import messages from './messages'
import './style.css'
export default {
  name: 'List',
  i18n: { messages },
  props: { size: String },
  mounted() {},
  beforeDestroy() {},
  methods: {
    saveForm() {
      this.$emit('save')
    },
    back() {
      this.$router.back()
    },
    keyUp(e) {
      if (e.key == 'Enter') {
        e.srcElement.blur()
        this.saveForm()
      }
    },
  },
}
</script>
