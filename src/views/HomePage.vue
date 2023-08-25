<template>
  <!-- <div class="gotop">
    <a href="#"> ⬆ </a>
  </div> -->
  <div class="lbt">
    <div class="header" id="top" :class="{ header2: isActive }">
      <div class="nav-new">
        <div class="nav-new-l">
          <div class="logo" @click="gohome">
            <img src="@/assets/images/logo3.png" alt="" />
          </div>
          <div class="nav-new-l-menu">
            <div class="nav-new-title" @click="gohome">
              <a href="javascript:;" class="mune-css">首页</a>
            </div>
            <div class="nav-new-title">
              <a class="mune-css">
                <n-popselect
                  v-model:value="selectedCategory"
                  :options="categoryOptions"
                  trigger="click"
                  @update:value="searchCategory"
                >
                  <div>前端</div>
                </n-popselect>
              </a>
            </div>
            <div class="nav-new-title">
              <a class="mune-css">
                <n-popselect
                  v-model:value="selectedCategory"
                  :options="categoryOptions"
                  trigger="click"
                  @update:value="searchCategory"
                >
                  <div>后端</div>
                </n-popselect>
              </a>
            </div>
            <div class="nav-new-title" @click="dashboard">
              <a class="mune-css">后台</a>
            </div>
          </div>
        </div>
        <div class="nav-new-r">
          <div class="nav-new-r-search">
            <n-input-group>
              <n-input
                v-model:value="pageInfo.keyword"
                @keydown.enter="getArtiles(1)"
                placeholder="请输入关键字"
                class="nav-new-r-search-input"
                style="background-color: rgba(255, 255, 255, 0.5)"
              />
              <n-button
                type="primary"
                @click="getArtiles(1)"
                class="nav-new-r-search-button"
              >
                搜索
              </n-button>
            </n-input-group>
          </div>
        </div>
      </div>
    </div>
    <div class="carousel1">
      <section style="background: #00b5d1">
        <n-carousel autoplay draggable v-if="lunbotu.value">
          <img
            class="carousel-img"
            :src="item.newhref"
            v-for="item in JSON.parse(lunbotu.content)"
            :key="item.id"
          />
        </n-carousel>
        <div class="title-h1">
          <h1 v-if="notice.value">{{ notice.content }}</h1>
          <p class="title-h1-page" v-if="noticecontent.value">
            {{ noticecontent.content }}
          </p>
        </div>
        <div class="wave wave1"></div>
        <div class="wave wave2"></div>
        <div class="wave wave3"></div>
        <div class="wave wave4"></div>
      </section>
    </div>

    <div class="main">
      <n-divider />
      <!--头部↑-->
      <div class="main-body">
        <div class="main-body-l">
          <n-spin :show="show">
            <div class="card" @click="toMsg()">
              <div class="bg">
                <span @click="toMsg()">点此留言版</span>
                <span>🤡广告位招租...🤡</span>
              </div>
              <div class="blob"></div>
            </div>
            <div
              v-for="blog in blogListInfo"
              :key="blog.id"
              class="main-body-l-item"
            >
              <n-card
                content-style="color: #888888"
                :title="blog.title"
                hoverable
                @click="toDetail(blog)"
              >
                <span>{{ blog.content }}</span>
                <template #footer>
                  <span class="create-time">
                    {{
                      categoryOptions.find(
                        (item) => item.value === blog.category_id
                      ).label
                    }}/👍999点赞 /👁999阅读</span
                  >
                  <span style="float: right"> ⏱{{ blog.created_at }} </span>
                </template>
              </n-card>
            </div>
          </n-spin>
        </div>

        <div class="main-body-r">
          <div class="stk">
            <n-space vertical>
              <n-card hoverable>
                <div class="myavatar" v-if="!adminStore.token">
                  <n-avatar
                    round
                    :size="60"
                    src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
                  />
                  <p>也许，将会是最好用的简约博客</p>
                  <n-space>
                    <n-button type="primary" @click="tologin"> 登录 </n-button>
                    <n-button type="primary" @click="tologin"> 注册 </n-button>
                  </n-space>
                </div>
                <div class="myavatar" v-else>
                  <n-avatar
                    round
                    :size="60"
                    src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
                  />
                  <p>
                    {{
                      adminStore.nickname
                        ? adminStore.nickname
                        : adminStore.username
                    }}
                    {{ adminStore.is_root ? "👑" : "" }}
                  </p>
                  <n-space>
                    <n-button type="primary" @click="logout"> 注销 </n-button>
                  </n-space>
                </div>
              </n-card>
              <n-card title="分类" hoverable>
                <n-space>
                  <n-tag
                    :bordered="false"
                    type="success"
                    v-for="categoryname in categoryOptions"
                    :key="categoryname.value"
                  >
                    {{ categoryname.label }}
                  </n-tag>
                </n-space>
              </n-card>
              <n-card title="友链" hoverable>
                <n-space>
                  <a href="http://www.suxin23.cn/">
                    <n-button quaternary type="primary">
                      苏辛博客(原)
                    </n-button>
                  </a>
                  <a href="https://github.com/suxin0203">
                    <n-button quaternary type="primary">
                      GitHub-suxin
                    </n-button>
                  </a>

                  <a href="https://www.naiveui.com/">
                    <n-button quaternary type="primary"> Naive UI </n-button>
                  </a>
                  <a href="https://www.itbooks.work/">
                    <n-button quaternary type="primary"> 天界程序员 </n-button>
                  </a>
                </n-space>
              </n-card>
              <n-card title="📖 如何成功" embedded :bordered="false" hoverable>
                <n-space>
                  <n-tag :bordered="false" type="info" size="small">
                    教程 </n-tag
                  ><n-tag :bordered="false" type="info" size="small">
                    思维 </n-tag
                  ><n-tag :bordered="false" type="info" size="small">
                    联想
                  </n-tag>
                </n-space>

                如果你年轻的时候不 996，你什么时候可以 996？你一辈子没有
                996，你觉得你就很骄傲了？这个世界上，我们每一个人都希望成功，都希望美好生活，都希望被尊重，我请问大家，你不付出超越别人的努力和时间，你怎么能够实现你想要的成功？
              </n-card>
            </n-space>
          </div>
        </div>
      </div>
      <n-back-top :right="50" :bottom="100" />

      <n-pagination
        class="fenye"
        v-model:page="pageInfo.page"
        @update:page="getArtiles()"
        v-model:page-count="pageInfo.totalPages"
        :page-sizes="[5, 10, 20, 50]"
        @update:page-size="changePageSize"
        show-quick-jumper
        show-size-picker
      />

      <!-- <n-pagination
        @update:page="getArtiles(page)"
        @update:page-size="getArtiles(pageSize)"
        v-model:page="pageInfo.page"
        v-model:page-size="pageInfo.pageSize"
        :page-count="pageInfo.totalPages"
        :page-sizes="[5, 10, 20, 50]"
        show-quick-jumper
        show-size-picker
        class="fenye"
      /> -->

      <!--分页组件-->
      <n-divider />
    </div>

    <MyFooterVue />
  </div>
</template>

<script setup>
import { reactive, ref, inject, onMounted, computed } from "vue";

import { router, routes } from "@/common/router.js";

import MyFooterVue from "@/components/MyFooter.vue";
import { AdminStore } from "@/stores/AdminStore";
import { getCategoryList, getArticleList, getOtherswitch } from "@/api/api";

const adminStore = AdminStore();
// const axios = inject("axios");
// const message = inject("message");
// const dialog = inject("dialog");

const selectedCategory = ref(0);
const categoryOptions = ref([]); //分类列表

const blogListInfo = ref([]);
const isActive = ref(false);
const fileList = ref([]);
const show = ref(true);

const seting = adminStore.globalOptions;
const notice = seting.find((item) => item.name === "notice");
const noticecontent = seting.find((item) => item.name === "noticecontent");
const lunbotu = seting.find((item) => item.name === "lunbotu");

onMounted(async() => {
  await getCategories();
  await getArtiles();
  // loadlbt();
});

const loadlbt = async () => {
  let res = await axios.get("/lbt/imglist");

  fileList.value = res.data.data.map((item) => {
    return {
      id: item.id,
      name: item.url,
      status: "finished",
      url: item.href,
    };
  });
};

// 获取全部分类
const getCategories = async () => {
  let res = await getCategoryList();
  categoryOptions.value = res.data.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });
  categoryOptions.value.unshift({
    label: "全部分类",
    value: 0,
  });
};

const gohome = () => {
  router.push("/"); //跳转到首页
};

const toMsg = () => {
  router.push("/sendmsg"); //跳转到留言页面
};

const dashboard = () => {
  router.push("/dashboard/article"); //跳转到管理页面
};

const tologin = () => {
  router.push("/login"); //跳转到登录页面
};
const logout = () => {
  // delToken
  adminStore.delToken();
  console.log("退出登录");
};

const changePageSize = (pageSize) => {
  pageInfo.pageSize = pageSize;
  getArtiles(1);
}; //改变每页显示条数

const pageInfo = reactive({
  page: 1, //当前页码
  pageSize: 5, //每页显示条数
  totalPages: 1, //总页数
  count: 0, //总条数
  keyword: "", //搜索关键字
  category_id: 0, //  分类id
});

// 获取博客列表
const getArtiles = async (page) => {
  // 分页 搜索 分类 默认第一页
  if (page === 1) {
    pageInfo.page = page;
  }
  pageInfo.category_id === 0 ? delete pageInfo.category_id : "";
  getArticleList(pageInfo).then((res) => {
    blogListInfo.value = res.data;
    pageInfo.totalPages = res.pagination.totalPages;
    pageInfo.count = res.pagination.total;
  });
  show.value = false;
};

//跳转到详情页
const toDetail = (blog) => {
  router.push({ path: "/detail", query: { id: blog.id } });
};

//搜索分类
const searchCategory = (category_id) => {
  category_id === 0
    ? delete pageInfo.category_id
    : (pageInfo.category_id = category_id);
  getArtiles(1); //搜索默认第一页
};

onMounted(() => {
  // 监听滚动条位置
  window.addEventListener("scroll", getScrollPosition, false);
});
// 滚动条距顶部距离
const getScrollPosition = () => {
  let top = document.documentElement.scrollTop || document.body.scrollTop;
  isActive.value = top > 50;
};
</script>

<style lang="less" scoped>
.header2 {
  background-color: #fff;
  a {
    color: gray !important;
  }
}
.lbt {
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(#ffffff 30%, #eee 40%);
}
.main {
  width: 1200px;
  margin: 0 auto;
  // background-color: pink;
  &-body {
    display: flex;
    justify-content: space-between;
    &-l {
      .card {
        position: relative;
        // width: 200px;
        width: 100%;
        height: 60px;
        border-radius: 7px;
        z-index: 10;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-shadow: 5px 5px 15px #bebebe, -5px -5px 15px #ffffff;
      }

      .bg {
        position: absolute;
        top: 4px;
        left: 4px;
        // width: 190px;
        width: calc(100% - 8px);
        height: 52px;
        z-index: 2;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(24px);
        border-radius: 5px;
        overflow: hidden;
        outline: 2px solid white;
        font-size: 18px;
        cursor: pointer;
        // padding: 0 20px;
        display: flex;
        align-items: center;
        justify-content: space-around;
      }

      .blob {
        position: absolute;
        z-index: 1;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 60px;
        border-radius: 50%;
        background-color: #18a058;
        opacity: 1;
        filter: blur(12px);
        animation: blob-bounce 5s infinite ease;
      }

      @keyframes blob-bounce {
        0% {
          transform: translate(-100%, -100%) translate3d(0, 0, 0);
        }

        25% {
          transform: translate(-100%, -100%) translate3d(100%, 0, 0);
        }

        50% {
          transform: translate(-100%, -100%) translate3d(100%, 100%, 0);
        }

        75% {
          transform: translate(-100%, -100%) translate3d(0, 100%, 0);
        }

        100% {
          transform: translate(-100%, -100%) translate3d(0, 0, 0);
        }
      }
      flex: 1;
      &-item:nth-child(n + 2) {
        margin-top: 20px;
        cursor: pointer;
      }
    }
    &-r {
      width: 288px;
      margin-left: 12px;

      // background-color: pink;
    }
  }
}
.carousel1 {
  margin-top: -80px;
}
.carousel-img {
  width: 100%;
  height: 500px;
  object-fit: cover;
}

.myavatar {
  width: 100%;
  height: 150px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.stk {
  position: sticky;
  top: 100px;
}
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
.nav-new {
  height: 80px;
  width: 1200px;
  display: flex;
  margin: 0 auto;
  justify-content: space-between;

  &-title :hover {
    color: #36ad6a !important;
  }

  // &-title :hover::after {
  //   opacity: 1;
  // }
  &-l {
    height: 80px;
    display: flex;
    &-menu {
      width: 280px;
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

.create-time {
  font-size: 14px;
  color: gray;
}

section {
  position: relative;
  width: 100%;
  height: 500px;
  background: #fff;
  overflow: hidden;
}
.title-h1 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  color: #cbcbcb;
  font-weight: bold;
  text-align: center;
}
section .wave {
  width: 100%;
  height: 100px;
  position: absolute;
  bottom: 0;
  left: 0;
  background: url("@/assets/images/wave.png");
  background-size: 1000px 100px;
}

section .wave.wave1 {
  animation: animate1 20s linear infinite;
  z-index: 10;
  opacity: 1;
  animation-delay: 0s;
  bottom: 0;
}

section .wave.wave2 {
  animation: animate2 15s linear infinite;
  z-index: 9;
  opacity: 0.5;
  animation-delay: -5s;
  bottom: 10px;
}

section .wave.wave3 {
  animation: animate1 10s linear infinite;
  z-index: 8;
  opacity: 0.2;
  animation-delay: -7s;
  bottom: 15px;
}

section .wave.wave4 {
  animation: animate2 2s linear infinite;
  z-index: 7;
  opacity: 0.71;
  animation-delay: -5s;
  bottom: 20px;
}

@keyframes animate1 {
  0% {
    background-position-x: 0;
  }
  100% {
    background-position-x: 1000px;
  }
}

@keyframes animate2 {
  0% {
    background-position-x: 0;
  }
  100% {
    background-position-x: -1000px;
  }
}
.fenye {
  width: 74%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
@media screen and (max-width: 1250px) {
  .nav-new {
    width: 90vw;
  }
  .main {
    width: 90vw;
  }
}
@media screen and (max-width: 820px) {
  .main {
    width: 95vw;
  }
  .nav-new {
    width: 95vw;
  }
  .main-body {
    &-l {
      flex: 1;
    }
    &-r {
      width: 250px;
    }
  }
}
@media screen and (max-width: 600px) {
  html,
  body {
    display: flex;
    width: 100vw;
  }
  .fenye {
    width: 95vw;
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
  .lbt {
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
  .carousel1 {
    height: 500px;
  }

  .main {
    width: 100vw;

    // background-color: pink;
    &-body {
      display: block;
      &-l {
        width: 95vw;
        margin: 0 auto;
      }
      &-r {
        width: 95vw;
        margin: 0 auto;
        // background-color: pink;
      }
    }
  }

  .title-h1-page {
    display: none;
  }
}

.nav-new-title {
  position: relative;
}

.nav-new-title::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background-color: #36ad6a;
  transform-origin: bottom right;
  transform: scaleX(0);
  transition: transform 0.5s ease;
}

.nav-new-title:hover::before {
  transform-origin: bottom left;
  transform: scaleX(1);
}
</style>
