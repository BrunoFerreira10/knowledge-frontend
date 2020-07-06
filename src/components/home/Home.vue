<template>
  <div class="home">
    <PageTitle icon="fa fa-home" :title="$t('message.Statistics')" :subtitle="$t('message.appTitle')"></PageTitle>
    <div class="stats">
      <Stat :title="$t('message.Categories')" :value="stat.categories" icon="fa fa-folder" color="#d54d50" />
      <Stat :title="$t('message.Articles')" :value="stat.articles" icon="fa fa-file" color="#3bc480" />
      <Stat :title="$t('message.Users')" :value="stat.users" icon="fa fa-user" color="#3282cd" />
    </div>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle";
import Stat from "./Stat";
import axios from "axios";
import { baseApiUrl } from "@/global";

export default {
  name: "Home",
  components: {
    PageTitle,
    Stat
  },
  data: function() {
    return {
      stat: {}
    };
  },
  methods: {
    getStats() {
      axios.get(`${baseApiUrl}/stats`).then(res => (this.stat = res.data));
    }
  },
  mounted() {
    this.getStats();
  }
}
</script>

<style>
  .stats {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
</style>