<template>
    <!-- <img :src="photo" :alt="title" /> wyjda nierowne,
        zamiast tego zastosujemy grida css-owego-->
    <div :style="style" class="item" />
</template>
<script>
export default {
  name: 'ItemComponent',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      photo: this.item.links[0].href,
      title: this.item.data[0].title,
    };
  },
  computed: {
    style() {
      return `background-image: url("${this.photo}")`;
    },
  },
  //  alternatywny sposob
  //   mounted() {
  //     this.photo = this.item.links[0].href
  //   }
  // wtedy computed bylby niepotrzebny a w data() {photo: ''}
};
</script>
<style lang="scss" scoped>
    .item {
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50%;
        width: 40vw;
        height: 250px;
        @media (min-width: 768px) {
            width: 25vw;
        }
    }
</style>
