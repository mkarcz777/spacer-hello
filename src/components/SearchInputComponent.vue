<template>
  <div class="searchWrapper">
    <input id="search"
       name="search"
       placeholder="Search..."
       v-model="searchValue"
       @input="handleInput" />
  </div>
</template>
<script>
// eslint-disable-next-line
export default {
  name: 'SearchInputComponent',
};
</script>
<style lang="scss" scoped>
    .searchWrapper {
        margin-top: 50px;
        display: flex;
        flex-direction: column;
        width: 300px;

        label {
            font-family: 'Montserrat', sans-serif;
        }

        input {
            height: 30px;
            border: 0;
            border-bottom: 1px solid black;
            background: none;
        }

    }
</style>
