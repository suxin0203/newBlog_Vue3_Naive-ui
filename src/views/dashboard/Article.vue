<template>
  <n-card title="文章管理">
    <n-tabs v-model:value="tabValue" justify-content="start" type="line">
      <n-tab-pane name="list" tab="文章列表">
        <div
          v-for="blog in blogListInfo"
          :key="blog.id"
          style="margin-bottom: 10px"
          @click="goArticle(blog)"
        >
          <n-card :title="blog.title" hoverable>
            <template #header-extra> / </template>
            {{ blog.content }}
            <template #footer>
              <n-space align="center">
                <n-tag :bordered="false">
                  创建时间：{{ blog.updated_at }}
                </n-tag>
                <n-button
                  type="primary"
                  ghost
                  size="small"
                  @click.stop="toUpdate(blog)"
                >
                  修改
                </n-button>
                <n-button
                  type="error"
                  ghost
                  size="small"
                  @click.stop="toDelete(blog)"
                >
                  删除
                </n-button>
              </n-space>
            </template>
          </n-card>
        </div>

        <n-space v-if="blogListInfo.length > 0">
          <div
            v-for="pageNum in pageInfo.pageCount"
            :key="pageNum"
            @click="toPage(pageNum)"
          >
            <n-button
              ghost
              :type="pageNum == pageInfo.page ? 'info' : 'default'"
            >
              {{ pageNum }}
            </n-button>
          </div>
        </n-space>
      </n-tab-pane>
      <n-tab-pane name="add" tab="添加文章">
        <n-form ref="addForm">
          <n-form-item label="标题">
            <n-input
              v-model:value="addArticleData.title"
              placeholder="请输入标题"
            />
          </n-form-item>
          <n-form-item label="分类">
            <n-select
              v-model:value="addArticleData.category_id"
              :options="categoryOptions"
            />
          </n-form-item>
          <n-form-item label="状态">
            <n-select
              v-model:value="addArticleData.status"
              :options="statusOptions"
            />
          </n-form-item>
          <n-form-item label="内容">
            <rich-text-editor
              v-model="addArticleData.content"
            ></rich-text-editor>
          </n-form-item>

          <n-button tertiary type="info" @click="add"> 确认添加 </n-button>
        </n-form>
      </n-tab-pane>
      <n-tab-pane name="update" tab="修改文章" :disabled="true">
        <n-form ref="updateForm">
          <n-form-item :label="'标题' + '  [' + updateArticle.id + ']'">
            <n-input
              v-model:value="updateArticle.title"
              placeholder="请输入标题"
            />
          </n-form-item>
          <n-form-item label="分类">
            <n-select
              v-model:value="updateArticle.category_id"
              :options="categoryOptions"
            />
          </n-form-item>
          <n-form-item label="状态">
            <n-select
              v-model:value="updateArticle.status"
              :options="statusOptions"
            />
          </n-form-item>
          <n-form-item label="内容">
            <rich-text-editor
              :height="'350px'"
              v-model="updateArticle.content"
            ></rich-text-editor>
          </n-form-item>

          <n-button tertiary type="info" @click="update"> 确认修改 </n-button>
        </n-form>
      </n-tab-pane>
      <n-tab-pane name="delete" tab="回收站" :disabled="false">
        <n-card title="回收站">
          <n-space>
            <n-button type="error">清空回收站</n-button>
          </n-space>
        </n-card>
        <hr />
        <div
          v-for="blog in blogListInfo"
          :key="blog.id"
          style="margin-bottom: 10px"
          @click="goArticle(blog)"
        >
          <n-card :title="blog.title" hoverable>
            <template #header-extra> / </template>
            {{ blog.content }}
            <template #footer>
              <n-space align="center">
                <n-tag :bordered="false">
                  创建时间：{{ blog.updated_at }}
                </n-tag>
                <n-button
                  type="primary"
                  ghost
                  size="small"
                  @click.stop="toUpdate(blog)"
                >
                  修改
                </n-button>
                <n-button
                  ghost
                  size="small"
                  @click.stop="toRestore(blog)"
                >
                  恢复
                </n-button>
              </n-space>
            </template>
          </n-card>
        </div>
        <n-space v-if="blogListInfo.length > 0">
          <div
            v-for="pageNum in pageInfo.pageCount"
            :key="pageNum"
            @click="toPage(pageNum)"
          >
            <n-button
              ghost
              :type="pageNum == pageInfo.page ? 'info' : 'default'"
            >
              {{ pageNum }}
            </n-button>
          </div>
        </n-space>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<script setup>
import { AdminStore } from "@/stores/AdminStore";
import { reactive, ref, inject, onMounted } from "vue";
import RichTextEditor from "@/components/RichTextEditor.vue";
import { router, routes } from "@/common/router.js";
import {
  getArticleList,
  getCategoryList,
  addArticle,
  getArticleById,
  updateArticleById,
  deleteArticleById,
} from "@/api/api";

const message = inject("message");
const dialog = inject("dialog");
const adminStore = AdminStore();

let addForm = ref("addForm");

const addArticleData = reactive({
  category_id: null,
  title: "",
  content: "",
  status: 0,
});

const updateArticle = reactive({
  id: 0,
  category_id: null,
  title: "",
  content: "",
  status: 0,
});

const categoryOptions = ref([]);
const statusOptions = ref([
  { label: "展示", value: 0 },
  { label: "置顶", value: 1 },
  { label: "删除", value: 2 },
]);
const blogListInfo = ref([]);
const restoreBlogListInfo = ref([]);
const tabValue = ref("list");

const pageInfo = reactive({
  page: 1,
  pageSize: 3,
  pageCount: 1,
  count: 0,
});

onMounted(() => {
  getArticles();
  getCategories();
});

//  获取文章列表
const getArticles = async () => {
  let res = await getArticleList(pageInfo);
  blogListInfo.value = res.data;
  pageInfo.pageCount = res.pagination.totalPages;
  pageInfo.count = res.pagination.total;
};

// const getRestoreArticles = async () => {
//   let res = await getArticleList(pageInfo);
//   restoreBlogListInfo.value = res.data;
//   pageInfo.pageCount = res.pagination.totalPages;
//   pageInfo.count = res.pagination.total;
// };

// 获取全部分类
const getCategories = async () => {
  let res = await getCategoryList();
  categoryOptions.value = res.data.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });
  addArticleData.category_id = categoryOptions.value[0].value;
};

// 新增文章
const add = async () => {
  if (addArticleData.title == "") {
    message.error("标题不能为空");
    return;
  }
  if (addArticleData.content == "") {
    message.error("内容不能为空");
    return;
  }
  let res = await addArticle(addArticleData);
  if (res.code == 200) {
    message.info(res.message);
    // 清除表单内容
    addArticleData.title = "";
    addArticleData.content = "";
    getArticles();
    tabValue.value = "list";
  } else {
    message.error(res.message);
  }
};

// 分页跳转
const toPage = async (pageNum) => {
  pageInfo.page = pageNum;
  getArticles();
};

const goArticle = (blog) => {
  router.push({ path: "/detail", query: { id: blog.id } });
};

// 获取更新的文章内容
const toUpdate = async (blog) => {
  let res = await getArticleById(blog.id);
  let { id, title, content, category_id, status } = res.data[0];
  updateArticle.id = id;
  updateArticle.title = title;
  updateArticle.content = content;
  updateArticle.category_id = category_id;
  updateArticle.status = status;
  tabValue.value = "update";
};

// 更新文章
const update = async () => {
  if (updateArticle.title == "") {
    message.error("标题不能为空");
    return;
  }
  if (updateArticle.content == "") {
    message.error("内容不能为空");
    return;
  }
  let res = await updateArticleById(updateArticle.id, updateArticle);
  if (res.code == 200) {
    message.info(res.message);
    getArticles();
    tabValue.value = "list";
  } else {
    message.error(res.message);
  }
};

// 删除文章
const toDelete = async (blog) => {
  dialog.warning({
    title: "警告",
    content: "你确定删除吗？",
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: async () => {
      let res = await deleteArticleById(blog.id);
      if (res.code == 200) {
        message.info(res.message);
        getArticles();
      } else {
        message.error(res.message);
      }
    },
    onNegativeClick: () => {
      message.error("用户取消");
    },
  });
};
</script>

<style lang="less" scoped>
</style>
