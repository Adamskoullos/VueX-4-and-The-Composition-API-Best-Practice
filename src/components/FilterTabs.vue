<template>
  <div class="filter-buttons">
    <span
      class="material-icons outline"
      :class="{ activeTab: st.filter == 'incomplete' }"
      @click="handleFilter('incomplete')"
      >check_box_outline_blank</span
    >
    <span
      class="material-icons outline"
      :class="{ activeTab: st.filter == 'complete' }"
      @click="handleFilter('complete')"
      >check_box</span
    >
    <span
      class="material-icons-outlined outline"
      :class="{ activeTab: st.filter == 'all' }"
      @click="handleFilter('all')"
    >
      all_inclusive
    </span>
  </div>
</template>

<script>
  import { useStore } from "vuex";

  export default {
    props: ["todo", "st"],
    setup(props) {
      const store = useStore();
      const handleFilter = (input) => {
        store.dispatch(props.todo + "/filterTodoList", input);
      };

      return { handleFilter };
    },
  };
</script>

<style lang="scss" scoped>
  .filter-buttons {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      margin: auto 5px;
      font-size: 32px;
      color: #81e597;
      border-radius: 4px;
      cursor: pointer;
      transition: all ease 0.2s;
    }
    span:hover {
      transform: scale(1.1);
      transition: all ease 0.2s;
    }

    span.outline {
      color: #a8a9aa7a;
      cursor: pointer;
    }
    span.outline:hover {
      color: #a8a9aa;
    }
    span.activeTab {
      color: #81e597;
    }
  }
</style>
