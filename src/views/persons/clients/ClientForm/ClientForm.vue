<template>
  <div class="home">
    <Form @save="save">
      <div slot="title">
        {{ $t('title') }}

        <!-- ID -->
        <div class="row" v-if="this.form.id">
          <div class="col-sm-4">
            <div class="form-group">
              <label for="id">{{ $t('') }}</label>
              <div>
                <input
                  class="form-control"
                  id="id"
                  v-model="form.id"
                  type="text"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ****************** ROW ****************** -->

      <div class="row" v-if="this.form.id">
        <!-- NOME -->
        <div class="col-sm-6">
          <div class="form-group">
            <label for="name">{{ $t('name') }}</label>
            <input
              class="form-control"
              id="name"
              v-model="form.name"
              type="text"
            />
          </div>
        </div>
        <div class="col-sm-6"></div>

        <!-- CIDADE -->
        <div class="col-sm-3">
          <div class="form-group">
            <label for="city">{{ $t('city') }}</label>
            <input
              class="form-control"
              id="document"
              v-model="form.city"
              type="text"
            />
          </div>
        </div>

        <!-- BAIRRO -->
        <div class="col-sm-3">
          <div class="form-group">
            <label for="neighborhood">{{ $t('neighborhood') }}</label>
            <input
              class="form-control"
              id="document"
              v-model="form.neighborhood"
              type="text"
            />
          </div>
        </div>

        <!-- CEP -->
        <div class="col-sm-3">
          <div class="form-group">
            <label for="zipcode">{{ $t('zipcode') }}</label>
            <input
              class="form-control"
              id="document"
              v-model="form.zipcode"
              type="text"
            />
          </div>
        </div>
      </div>

      <!-- ****************** ROW ****************** -->
      <div class="row" v-if="!this.form.id">
        <!-- CPF/CNPJ -->
        <div class="col-sm-3">
          <div class="form-group">
            <label for="document">{{ $t('document') }}</label>
            <input
              class="form-control"
              id="document"
              v-model="form.document"
              type="text"
            />
          </div>
        </div>

        <!-- NOME -->
        <div class="col-sm-9">
          <div class="form-group">
            <label for="name">{{ $t('name') }}</label>
            <input
              class="form-control"
              id="name"
              v-model="form.name"
              type="text"
            />
          </div>
        </div>
      </div>

      <!-- ****************** ROW ****************** -->
      <div class="row">
        <!-- ENDEREÇO -->
        <div class="col-sm-6">
          <div class="form-group">
            <label for="street">{{ $t('street') }}</label>
            <input
              class="form-control"
              id="mail"
              v-model="form.street"
              type="text"
            />
          </div>
        </div>

        <!-- NÚMERO -->
        <div class="col-sm-6">
          <div class="form-group">
            <label for="number">{{ $t('number') }}</label>
            <input
              class="form-control"
              id="phone"
              v-model="form.number"
              type="text"
            />
          </div>
        </div>
      </div>

      <!-- ****************** ROW ****************** -->
      <div class="row">
        <!-- E-MAIL -->
        <div class="col-sm-6">
          <div class="form-group">
            <label for="mail">{{ $t('mail') }}</label>
            <input
              class="form-control"
              id="mail"
              v-model="form.mail"
              type="text"
            />
          </div>
        </div>

        <!-- TELEFONE -->
        <div class="col-sm-6">
          <div class="form-group">
            <label for="phone">{{ $t('phone') }}</label>
            <input
              class="form-control"
              id="phone"
              v-model="form.phone"
              type="text"
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
import Form from '../../../components/Form/Form'
import Alert from '../../../components/Alert/Alert'
import Clients from '../../../../controllers/persons/clients'

import messages from './messages'
export default {
  name: 'ClientsForm',
  props: { id: String },
  i18n: { messages },
  components: { Form, Alert },
  data() {
    return {
      form: {
        id: null,
        name: '',
      },
      alert: {},
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      if (this.id && this.id != 0) {
        Clients.get(this.id, (result) => {
          this.form = {
            id: this.id && this.id != 0 ? this.id : null,
            mail: result.data.sessions ? result.data.sessions.mail : '',
            document: result.data.document,
            name: result.data.name,
            phone: result.data.phone,

            city: result.data.city,
            neighborhood: result.data.neighborhood,
            street: result.data.street,
            number: result.data.number,
            zipcode: result.data.zipcode,
          }
        })
      }
    },
    save() {
      if (this.id && this.id != 0) {
        Clients.update(this.form, (result) => {
          this.alert = {
            title: 'Salvar Cliente',
            message: result.status,
          }
        })
      } else {
        Clients.insert(this.form, (result) => {
          this.alert = {
            title: 'Salvar Cliente',
            message: result.status,
          }
          this.id = result.data.id
          this.form.id = result.data.id
          window.location.hash = 'clients/' + result.data.id
        })
      }
    },
  },
}
</script>
