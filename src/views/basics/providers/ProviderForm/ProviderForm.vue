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
      <div class="row">
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

        <!-- CPF/CNPJ -->
        <div class="col-sm-6">
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

        <!-- CIDADE -->
        <div class="col-sm-4">
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
        <div class="col-sm-4">
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
        <div class="col-sm-4">
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
        <div class="col-sm-4">
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
        <div class="col-sm-4">
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

        <!-- SITE -->
        <div class="col-sm-4">
          <div class="form-group">
            <label for="website">{{ $t('website') }}</label>
            <input
              class="form-control"
              id="website"
              v-model="form.website"
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
import Providers from '../../../../controllers/basics/providers'

import messages from './messages'
export default {
  name: 'ProviderForm',
  props: { id: String },
  i18n: { messages },
  components: { Form, Alert },
  data() {
    return {
      form: {
        id: null,
        name: '',
      },
      providers: [],
      alert: {},
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      if (this.id && this.id != 0) {
        Providers.get(this.id, (provider) => {
          this.form = {
            id: this.id && this.id != 0 ? this.id : null,
            name: provider.data.name,
            document: provider.data.document,
            city: provider.data.city,
            neighborhood: provider.data.neighborhood,
            street: provider.data.street,
            number: provider.data.number,
            zipcode: provider.data.zipcode,
            phone: provider.data.phone,
            mail: provider.data.mail,
            website: provider.data.website,
          }
        })
      }
      Providers.list((providers) => {
        this.providers = providers.data
      })
    },
    save() {
      if (this.id && this.id != 0) {
        Providers.update(this.form, (result) => {
          this.alert = {
            title: 'Salvar Marca',
            message: result.status + '<br/>' + result.error,
          }
        })
      } else {
        Providers.insert(this.form, (result) => {
          this.alert = {
            title: 'Salvar Marca',
            message: result.status + '<br/>' + result.error,
          }
          this.id = result.data.id
          this.form.id = result.data.id
          window.location.hash = 'providers/' + result.data.id
        })
      }
    },
  },
}
</script>
