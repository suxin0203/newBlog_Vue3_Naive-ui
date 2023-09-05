<template>
  <div class="header" id="top" :class="{ headercolor: isActive }">
    <div class="nav-new">
      <div class="nav-new-l">
        <div class="logo" @click="toHome">
          <img src="@/assets/images/logo3.png" alt="" />
        </div>
        <div class="nav-new-l-menu">
          <div class="nav-new-title" @click="toHome">
            <a href="javascript:;" class="mune-css">首页</a>
          </div>
          <div class="nav-new-title" @click="toArticle">
            <a href="javascript:;" class="mune-css">文章</a>
          </div>
          <div class="nav-new-title">
            <n-popselect
              :value="category_id"
              :options="options"
              trigger="click"
              @update:value="searchCategory"
            >
              <a class="mune-css"> 分类 </a>
            </n-popselect>
          </div>
          <div class="nav-new-title" @click="toMessage">
            <a href="javascript:;" class="mune-css">留言</a>
          </div>
          <div class="nav-new-title" @click="toAboutMe">
            <a href="javascript:;" class="mune-css">关于我</a>
          </div>
        </div>
      </div>
      <div class="nav-new-r">
        <div class="nav-new-r-search">
          <n-input-group>
            <n-input
              :value="keyword"
              @input="$emit('update:keyword', $event)"
              @keydown.enter="emit('updateKeyword', keyword)"
              placeholder="请输入关键字"
              class="nav-new-r-search-input"
              style="background-color: rgba(255, 255, 255, 0.5)"
            />
            <n-button
              type="primary"
              @click="emit('updateKeyword', keyword)"
              class="nav-new-r-search-button"
            >
              搜索
            </n-button>
          </n-input-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits, computed } from "vue";
import { router, routes } from "@/common/router.js";

const props = defineProps({
  options: {
    type: Array,
    default: () => [{ label: "全部分类", value: 0 }],
  },
  keyword: {
    type: String,
    default: "",
  },
  category_id: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits([
  "update:keyword",
  "update:category_id",
  "updateKeyword",
  "updateCategory",
]);
const isActive = ref(false);

computed(() => {});

const search = () => {
  getArtiles(1);
};

onMounted(() => {
  setupScrollListener();
});

//搜索分类
const searchCategory = (category_id) => {
  emit("updateCategory", category_id);
};

const toAboutMe = (blog) => {
  router.push("/aboutme"); //跳转到关于我
};

const toMessage = (blog) => {
  router.push("/sendmsg"); //跳转到留言
};

const toHome = (blog) => {
  router.push("/"); //跳转到首页
};

const toArticle = (blog) => {
  router.push("/article"); //跳转到首页
};

const setupScrollListener = () => {
  window.addEventListener("scroll", getScrollPosition, false);
};
const getScrollPosition = () => {
  let top = document.documentElement.scrollTop || document.body.scrollTop;
  isActive.value = top > 50;
};
</script>

<style lang="less" scoped>
.header {
  position: sticky;
  top: 0px;
  width: 100%;
  box-shadow: 0.5px 0.5px 5px #888888;
  z-index: 99;
  // background-image: radial-gradient(transparent 1px, #fff 4px);
  // background-size: 8px 8px;
  // backdrop-filter: saturate(50%) blur(4px);
  // background-color: rgba(255, 255, 255, 0.8);
}
.headercolor {
  background-color: #fff;
  a {
    color: gray !important;
  }
}
.nav-new {
  height: 80px;
  width: 1200px;
  display: flex;
  margin: 0 auto;
  justify-content: space-between;

  &-title :hover {
    color: #fff !important;
  }

  &-title {
    user-select: none; /* CSS3属性 */
    a {
      position: relative;
      z-index: 1;
    }

    a::before {
      content: "";
      position: absolute;
      z-index: -1;
      top: 0;
      bottom: 0;
      left: -0.25em;
      right: -0.25em;
      background-color: #36ad6a;
      transform-origin: center right;
      transform: scaleX(0);
      transition: transform 0.2s ease-in-out;
    }

    a:hover::before {
      transform: scaleX(1);
      transform-origin: center left;
    }
  }
  &-l {
    height: 80px;
    display: flex;
    &-menu {
      // width: 280px;
      width: 330px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      a {
        line-height: 70px;
        font-size: 18px;
        color: #fff;
      }
    }
  }

  .logo {
    height: 80px;
    display: flex;
    align-items: center;

    user-select: none; /* CSS3属性 */
    img {
      height: 40px;
      width: auto;
      background-color: gray;
      border-radius: 4px;
    }
  }

  &-r {
    // background-color: greenyellow;
    height: 80px;
    display: flex;
    justify-content: right;
    align-items: center;
    width: 40%;
    &-search {
      width: 100%;
      height: 80px;
      display: flex;
      align-items: center;
    }
  }
}
@media screen and (max-width: 1250px) {
  .nav-new {
    width: 90vw;
  }
}
@media screen and (max-width: 820px) {
  .nav-new {
    width: 95vw;
  }
}
@media screen and (max-width: 600px) {
  html,
  body {
    display: flex;
    width: 100vw;
  }

  .header {
    height: 120px;
    width: 100vw;
    background-color: #fff;
  }
  .nav-new {
    height: 120px;
    display: block;
    width: 100vw;
  }
  .nav-new-l {
    width: 100vw;
    height: 60px;
    display: flex;
    &-menu {
      // width: 250px;
      flex: 1;
      a {
        line-height: 70px;
        font-size: 18px;
        color: #888888;
      }
    }
  }
  .nav-new-l .logo {
    height: 60px;
    margin-left: 10px;
  }
  .nav-new-r {
    width: 100vw;
    height: 60px;

    &-search {
      width: 90vw;
      margin: 0 auto;
      height: 60px;
      display: flex;
      align-items: center;
    }
  }

  .title-h1-page {
    display: none;
  }
}
</style>
