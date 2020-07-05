<template>
  <div class="admin">
    <PageTitle icon="fa fa-cogs" :title="$t('message.SystemAdministration')" :subtitle="$t('message.RegistrationAndOthers')">      
    </PageTitle>
    <div class="admin-pages-tabs">
      <b-card no-body>
        <b-tabs card>
          <b-tab :title="$t('message.Articles')" active lazy>     
            <ArticleAdmin></ArticleAdmin>
          </b-tab>
          <b-tab :title="$t('message.Categories')" lazy>
            <CategoryAdmin></CategoryAdmin>
          </b-tab>
          <b-tab :title="$t('message.Users')" lazy>
            <UserAdmin></UserAdmin>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import ArticleAdmin from './ArticleAdmin'
import CategoryAdmin from './CategoryAdmin'
import UserAdmin from './UserAdmin'

export default {
  name: 'AdminPages',
  components: {
    PageTitle,
    ArticleAdmin,
    CategoryAdmin,
    UserAdmin
  }
}
</script>

<style>
  .admin-pages-tabs .card-header {
    padding-top: 0px;
    font-size: 0.9rem;
  }
</style>