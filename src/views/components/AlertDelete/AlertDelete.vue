<template>
  <div
    v-if="this.show"
    :class="'modal fade ' + (this.show ? 'show' : '')"
    id="modal-alert"
    tabindex="-1"
    aria-labelledby="modal-alert-label"
    aria-hidden="true"
    :style="this.show ? 'display: block;' : 'display: none;'"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modal-alert-label">{{ this.title }}</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click="close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <!-- <div class="modal-body">
          {{ this.message }}
        </div> -->
        <div class="modal-footer">

			<button 
        type="button" 
        class="btn btn-secondary" 
        data-dismiss="modal" 
        @click="yes">
          {{ $t('yes') }}
			</button>

			<button 
        type="button" 
        class="btn btn-secondary" 
        data-dismiss="modal" 
        @click="close">
          {{ $t('no') }}
			</button>
      
		</div>
      </div>
    </div>
  </div>
</template>

<script>
import messages from './messages'
import './style.css'
export default {
  name: 'Alert',
  props: { title: String, message: String, status: String, pageback: String, positive: Boolean },
  i18n: { messages },
  data() {
    return {
      show: false,
      eventListener: undefined,
    }
  },
  mounted() {},
  watch: {
    message(to) {
      if (to) {
        this.show = true
        this.eventListener = (e) => {
          this.keyUp(e)
        }
        document.addEventListener('keyup', this.eventListener)
      } else {
        this.show = false
        document.removeEventListener('keyup', this.eventListener)
      }
    },
  },
  methods: {
    close() {
      if (this.pageback) {
        this.$router.push(this.pageback)
      }
      this.$emit('close')
      document.removeEventListener('keyup', this.eventListener)
    },
     keyUp(e) {
      if (e.code == 'Escape') {
        this.close()
      }
	},
    yes() {
      this.$emit("yes")
    },
    
    
  },
}
</script>

<style scoped>
#modal-alert {
  background: #00000066;
}
</style>
