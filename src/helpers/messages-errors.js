export default {
  getMessage(view, result, table, pageback) {
    if (result.error) {
      return {
        title: 'Erro',
        message: this.getFixedMessage(result.status, view.$i18n.t(table)),
      }
    } else {
      return {
        title: 'Sucesso!',
        message: this.getFixedMessage(result.status, view.$i18n.t(table)),
        pageback,
      }
    }
  },
  getFixedMessage(key, table) {
    if (this['pt-br']['global'][key]) {
      return this['pt-br']['global'][key]
    } else {
      for (const i in this['pt-br']['models']) {
        if (key.indexOf(i) !== -1) {
          return this['pt-br']['models'][i].split('$table').join(table)
        }
      }
      return 'MESSAGE_ERROR_NOT_FOUND'
    }
  },
  'pt-br': {
    global: {
      LOGIST_ID_INSERT_ERROR: 'Erro ao relaciondar dado com Lojista',
      CLIENTS_SAVE_ERROR: 'Erro ao salvar cliente',
      CLIENTS_BUDGET_SAVE_ERROR: 'Erro ao salvar cliente no Orçamento',
      SELLER_UPDATE_SESSION_ERROR: 'Erro ao atulizar sessão ao Vendedor',
      SESSION_DATA_NOT_FOUND: 'Dados da Sessão não encontrados',
      SESSION_ACTIVE_SUCCESS: 'Sessão ativada com sucesso',
      SESSION_EXPIRED_KEY: 'Chave de sessão expirada',
      SESSION_ACTIVE_ERROR: 'Erro ao ativar sessão',
      SESSION_SEND_MAIL_ACTIVE_SUCCESS: 'Email de sessão enviado com sucesso',
      SESSION_SEND_MAIL_ACTIVE_ERROR: 'Erro ao enviar email de sessão',
      SESSION_PASSWORD_CHANGED: 'Senha alterada com sucesso',
      SESSION_ERROR_PASSWORD: 'Erro ao alterar senha',
      LOGIST_IS_EMPTY: 'Logista não pode estar em branco',
      PROVIDER_IS_EMPTY: 'Fornecedor não pode estar em branco',
      BRAND_IS_EMPTY: 'Marca não pode estar em branco',
      EQUIPMENT_IS_EMPTY: 'Equipamento não pode estar em branco',
      SESSION_IS_EMPTY: 'Sessão não pode estar em branco',
      ENGINE_IS_EMPTY: 'Motor não pode estar em branco',
      LID_IS_EMPTY: 'Tampa de casa de máquinas não pode estar em branco',
      BRAND_FILTER_IS_EMPTY: 'Marca não pode estar em branco',
      BRAND_PROFILE_IS_EMPTY: 'Marca não pode estar em branco',
      BRAND_BLANKET_IS_EMPTY: 'Marca não pode estar em branco',
      BRAND_VINYL_IS_EMPTY: 'Marca não pode estar em branco',
      MAIL_LOGIST_EXISTS: 'Lojista já cadastrado com este email',
      MAIL_EXISTS: 'Email já cadastrado'
    },
    models: {
      _INSERT_SUCCESS: '$table inserido com sucesso',
      _INSERT_ERROR: 'Erro ao inserir $table',
      _UPDATE_SUCCESS: '$table atualizado com sucesso',
      _UPDATE_ERROR: 'Erro ao alterar $table',
      _DELETE_SUCCESS: '$table inserido com sucesso',
      _DELETE_ERROR: 'Erro ao deletar $table',
      _RESTORE_SUCCESS: '$table inserido com sucesso',
      _RESTORE_ERROR: 'Erro ao restaurar $table',
      _GET_SUCCESS: 'Registro encontrado',
      _GET_ERROR: 'Registro não encontrado',
      _LIST_SUCCESS: 'Lista de registros de $table com sucesso',
      _LIST_ERROR: 'Erro ao listar registros de $table',
      _QUERY_EMPTY: 'Pesquisa em branco',
      _NOT_FOUND: 'Registro não encontrado',
      _PERMISSION_ERROR: 'Sem permissão',
      _INVALID_PERMISSION: 'Permissão inválida',
    },
  },
}
