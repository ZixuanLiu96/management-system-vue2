// 混入
export default {
  data() {
    return {
      breadList: [],
    };
  },
  watch: {
    $route() {
      this.getBreadList();
    },
  },
  created() {
    this.getBreadList();
  },
  methods: {
    getBreadList() {
      this.breadList = this.$route.meta.bread;
    },
  },
};
