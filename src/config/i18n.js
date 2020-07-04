import Vue from 'vue'
import VueI18n from 'vue-i18n'

 Vue.use(VueI18n)

const messages = {
  us: {
    message: {
      // t1 ******************/
      appTitle: 'Knowledge base',
      RegisterOrLogin: 'Register or Login',
      Enter: 'Enter',
      Password: 'Password',
      // t2******************/
      NotRegisteredRegisterHere: 'Not registered? Register here!',
      Copyright: 'Copyright',
      AlreadyRegisteredAccessLogin: 'Already registered? Access login!',
      Register: 'Register',
      Name: 'Name',
      ConfirmPassword: 'Confirm password',
      Categories: 'Categories',
      Articles: 'Articles',
      Users: 'Users',
      Administration: 'Administration',
      SystemAdministration: 'System administration',
      SignOut: 'Sign out',
      RegistrationAndOthers: 'Registration and others',
      Add: 'Add',
      Save: 'Save',
      Cancel: 'Cancel',
      Update: 'Update',
      Delete: 'Delete',
      Code: 'Code',
      Description: 'Description',
      Actions: 'Actions',
      Path: 'Path',
      Image: 'Image',
      Category: 'Category',
      Author: 'Author',
      Contents: 'Contents',
      CategoryParent: 'Category parent',
      Dashboard: 'Dashboard',
      EnterArticleContents: 'Enter article contents...'
    }
  },
  br: {
    message: {
      // t1 ******************/
      appTitle: 'Base de conhecimento',
      RegisterOrLogin: 'Registrar ou logar',
      Enter: 'Entrar',
      Password: 'Senha',
      // t2******************/
      NotRegisteredRegisterHere: 'Não cadastrado? Cadatre-se aqui!',
      Copyright: 'Direitos autorais',
      AlreadyRegisteredAccessLogin: 'Já cadastrado? Entre aqui!',
      Register: 'Cadastre-se',
      Name: 'Nome',
      ConfirmPassword: 'Confirmar senha',
      Categories: 'Categorias',
      Articles: 'Artigos',
      Users: 'Usuários',
      Administration: 'Administração',
      SystemAdministration: 'Administração do sistema',
      SignOut: 'Sair',
      RegistrationAndOthers: 'Registro e outros',
      Add: 'Adicionar',
      Save: 'Salvar',
      Cancel: 'Cancelar',
      Update: 'Atualizar',
      Delete: 'Deletar',
      Code: 'Código',
      Description: 'Descrição',
      Actions: 'Ações',
      Path: 'Caminho',
      Image: 'Imagem',
      Category: 'Categoria',
      Author: 'Autor',
      Contents: 'Conteúdo',
      CategoryParent: 'Categoria superior',
      Dashboard: 'Painel de controle',
      EnterArticleContents: 'Adicione um conteudo ao artigo...'
    }
  }
}

const i18n = new VueI18n({
  locale: localStorage.getItem('__user_lang') || 'us', 
  fallbackLocale: 'us',
  messages,   
})

export default i18n