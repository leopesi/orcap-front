<template>
  <div class="home">
    <!-- <div class="card-header">
      {{ $t('man_power') }}
    </div> -->
    <Form @save="save" v-if="this.token && this.form">
      <div class="row">
        <!-- M.O Construção -->
        <div class="col-sm-3">
          <div class="form-group">
            <label for="construction_labor">
              {{ $t('construction_labor') }}
            </label>
            <input
              class="form-control"
              id="construction_labor"
              type="number"
              v-model="form.construction_labor"
            />
          </div>
        </div>

        <!-- M.O Escavação -->
        <div class="col-sm-3">
          <div class="form-group">
            <label for="excavation_labor">
              {{ $t('excavation_labor') }}
            </label>
            <input
              class="form-control"
              id="excavation_labor"
              type="number"
              v-model="form.excavation_labor"
            />
          </div>
        </div>

        <!-- M.O Remoção de Terra -->
        <div class="col-sm-3">
          <div class="form-group">
            <label for="earth_removal_labor">
              {{ $t('earth_removal_labor') }}
            </label>
            <input
              class="form-control"
              id="earth_removal_labor"
              type="number"
              v-model="form.earth_removal_labor"
            />
          </div>
        </div>

        <!-- M.O Mureta -->
        <div class="col-sm-3">
          <div class="form-group">
            <label for="short_wall_labor">
              {{ $t('short_wall_labor') }}
            </label>
            <input
              class="form-control"
              id="short_wall_labor"
              type="number"
              v-model="form.short_wall_labor"
            />
          </div>
        </div>

        <!-- M.O Contrapiso -->
        <div class="col-sm-3">
          <div class="form-group">
            <label for="subfloor_labor">{{ $t('subfloor_labor') }}</label>
            <input
              class="form-control"
              id="subfloor_labor"
              type="number"
              v-model="form.subfloor_labor"
            />
          </div>
        </div>

        <!-- M.O Reserva -->
        <div class="col-sm-3">
          <div class="form-group">
            <label for="reserve">{{ $t('reserve') }}</label>
            <input
              class="form-control"
              id="reserve"
              type="number"
              v-model="form.reserve"
            />
          </div>
        </div>

        <!-- M.O Colocação de Materiais -->
        <div class="col-sm-3">
          <div class="form-group">
            <label for="material_placement_labor">
              {{ $t('material_placement_labor') }}
            </label>
            <input
              class="form-control"
              id="material_placement_labor"
              type="number"
              v-model="form.material_placement_labor"
            />
          </div>
        </div>

        <!-- Taxa de acompanhamento de obra -->
        <div class="col-sm-3">
          <div class="form-group">
            <label for="job_monitoring_fee">
              {{ $t('job_monitoring_fee') }}
            </label>
            <input
              class="form-control"
              id="job_monitoring_fee"
              type="number"
              v-model="form.job_monitoring_fee"
            />
          </div>
        </div>
      </div>
    </Form>
    <Alert
      :title="this.alert.title"
      :message="this.alert.message"
      @close="alert = {}"
    />
  </div>
</template>

<script>
import Form from '../../../../components/Form/Form'
import Alert from '../../../../components/Alert/Alert.vue'
import Logists from '../../../../../controllers/persons/logists'

import messages from '../messages'
export default {
  name: 'ManPowers',
  props: { token: String, form: Object, brands: Array },
  i18n: { messages },
  components: { Form, Alert },
  data() {
    return {
      alert: {},
    }
  },
  mounted() {},
  methods: {
    save() {
      Logists.update(this.form, (result) => {
        this.alert = {
          title: 'Alteração dos Meus Dados',
          message: result.status,
        }
      })
    },
  },
}
</script>
