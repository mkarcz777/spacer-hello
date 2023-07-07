<template>
  <input id="search"
    name="search"
    placeholder="Search..."
    :class="{ dark }"
    :value="value"
    @input="handleChange" />
    <!-- :class="{ dark }" - rownowazny zapisowi :class="{ dark: dark}" (ES6 pozwala skrocic).
    Pierwszy dark to nazwa klasy, drugi to warunek (step === 1) -->
</template>
<script>
// eslint-disable-next-line
export default {
  name: 'SearchInputComponent',
  props: {
    value: {
      type: String,
      required: true,
    },
    dark: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleChange(e) {
      this.$emit('input', e.target.value);
    },
  },
};
</script>
<style lang="scss" scoped>
    input {
        margin-top: 50px;
        display: flex;
        flex-direction: column;
        width: 300px;
        height: 30px;
        border: 0;
        border-bottom: 1px solid white;
        background: none;
        transition: box-shadow .3s ease-out;
        color: white;
        text-align: center;
        font-size: 18px;
        font-weight: 300;

        @media (min-width: 1024px) {
            font-weight: 400;
        }

        &:focus {
            outline: none;
            box-shadow: 0 10px 20px -8px rgba(255,255,255, .5);
        }

    }
    .dark {
          color: #1e3d4a;
          border-bottom-color: #1e3d4a;

          &:focus {
            box-shadow: 0 10px 20px -8px rgba(#1e3d4a, .2);
          }
      }
</style>
