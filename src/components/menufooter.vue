<template>
  <div class="menufooter">
    滚动字幕内容————滚动字幕内容————滚动字幕内容————滚动字幕内容————滚动字幕内容————
  </div>
</template>

<script>
import { BasicUrl, IMG, ajaxUrl, MapUrl } from "../config";
import { mapState } from "vuex";

export default {
  name: "menufooter",
  data() {
    return {};
  },
  computed: {
    ...mapState({})
  },
  mounted: function() {
    let vm = this;
  },
  methods: {}
};
</script>

<style lang="scss">
@import "../css/menufooter.scss";
</style>
