<template>
    <div :class="[{ flexStart: step === 1 }, 'wrapper']">
        <Transition name="slide">
          <img src="./assets/logo.svg" class="logo" alt="Spacer" v-if="step === 1"/>
        </Transition>
        <Transition name="fade">
          <HeroImageComponent v-if="step === 0" />
        </Transition>
        <ClaimComponent v-if="step === 0" />
        <SearchInputComponent v-model="searchValue" @input="handleInput" :dark="step === 1" />
        <!-- v-model="x" zawiera w sobie zapis :value="x" stad mamy value w propsach komponentu -->
        <div class="results" v-if="results && !loading && step === 1">
          <ItemComponent v-for="item in results" v-bind:key="item.data[0].nasa_id" :item="item"
            @click.native="handleModalOpen(item)" />
        </div>
        <ModalComponent v-if="modalOpen" :item="modalItem" @closeModal="modalOpen = false" />
        <div class="loader" v-if="step === 1 && loading">
          <div>
          </div>
          <div>
          </div>
          <div>
          </div>
        </div>
    </div>
</template>

<script>
// eslint-disable-next-line
import axios from 'axios';
import debounce from 'lodash.debounce';
import ClaimComponent from '@/components/ClaimComponent.vue';
import SearchInputComponent from '@/components/SearchInputComponent.vue';
import HeroImageComponent from '@/components/HeroImageComponent.vue';
import ItemComponent from '@/components/ItemComponent.vue';
import ModalComponent from './components/ModalComponent.vue';

const API = 'https://images-api.nasa.gov/search';

export default {
  name: 'SearchView',
  components: {
    ClaimComponent,
    SearchInputComponent,
    HeroImageComponent,
    ItemComponent,
    ModalComponent,
  },
  data() {
    return {
      modalOpen: false,
      modalItem: null,
      loading: false,
      step: 0,
      searchValue: '',
      results: [],
    };
  },
  methods: {
    /* eslint-disable */
    handleModalOpen(item) {
      this.modalOpen = true;
      this.modalItem = item;
    },
    handleInput: debounce(function () {
      this.loading = true;
      axios.get(`${API}?q=${this.searchValue}&media_type=image`)
        .then((response) => {
          this.results = response.data.collection.items;
          this.loading = false;
          this.step = 1;
        })
        .catch((error) => {
          console.log(error);
        });
    }, 500),
  },
};
</script>
<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,400;0,700;1,200;1,400;1,700&display=swap');
  * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  body {
    font-family: 'Montserrat', sans-serif;
    margin: 0;
    padding: 0;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s ease;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .slide-enter-active, .slide-leave-active {
    transition: margin-top .3s ease;
  }
  .slide-enter, .slide-leave-to {
    margin-top: -50px;
  }
  .wrapper {
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
    margin: 0;
    padding: 30px;

    &.flexStart {
      justify-content: flex-start;
    }
  }  
  .logo {
    position: absolute;
    top: 30px;
  }
  .results {
    margin-top: 50px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr 1fr;
    }  
  }
  .loader {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  margin-top: 100px;

  @media (min-width: 769px) {
    width: 100px;
    height: 100px;
  }
  }
  .loader div {
    display: inline-block;
    position: absolute;
    left: 8px;
    width: 16px;
    background: #1e3d4a;
    animation: loader 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  }
  .loader div:nth-child(1) {
    left: 8px;
    animation-delay: -0.24s;
  }
  .loader div:nth-child(2) {
    left: 32px;
    animation-delay: -0.12s;
  }
  .loader div:nth-child(3) {
    left: 56px;
    animation-delay: 0;
  }
  @keyframes loader {
    0% {
      top: 8px;
      height: 64px;
    }
    50%, 100% {
      top: 24px;
      height: 32px;
    }
  }
</style>
