<template>
  <n-card>
    <n-grid x-gap="12" :cols="24" style="height: 100%">
      <n-gi :span="4">
        <div class="light-green">
          <n-anchor :show-rail="showRail" :show-background="showBackground">
            <n-anchor-link title="表">
              <n-anchor-link title="基础用法" />
              <n-anchor-link title="忽略间隔" />
              <n-anchor-link title="固定" />
              <n-anchor-link title="滚动到" />
            </n-anchor-link>
            <n-anchor-link title="API" href="#API" />
          </n-anchor>
        </div>
      </n-gi>
      <n-gi :span="20">
        <div class="green">
          <n-flex>
            <n-form
              ref="formRef"
              inline
              label-placement="left"
              label-width="auto"
              :model="formValue"
              :rules="rules"
              :size="size"
            >
              <n-form-item label="活动名称" path="name">
                <n-input
                  v-model:value="formValue.name"
                  placeholder="输入活动名称"
                />
              </n-form-item>
              <n-form-item label="Token" path="token">
                <n-input
                  v-model:value="formValue.token"
                  placeholder="输入Token"
                />
              </n-form-item>
              <n-form-item label="内容" path="content">
                <n-input v-model:value="formValue.content" placeholder="内容" />
              </n-form-item>
              <n-form-item label="备注" path="remarks">
                <n-input v-model:value="formValue.remarks" placeholder="备注" />
              </n-form-item>
              <n-form-item>
                <n-button attr-type="button" @click="handleValidateClick">
                  搜索
                </n-button>
              </n-form-item>
            </n-form>
            <n-data-table
              :max-height="'calc(100vh - 240px)'"
              :bordered="false"
              :single-line="false"
              :columns="columns"
              :data="data"
              :pagination="pagination"
              :size="size"
              striped
            />
          </n-flex>
        </div>
      </n-gi>
    </n-grid>
  </n-card>
</template>

<script scoped setup>
import { ref, onMounted } from "vue";
import { getActivityList } from "@/api/api";

const showRail = ref(true);
const showBackground = ref(true);

const formValue = ref({
  name: "",
  token: "",
  content: "",
  remarks: "",
  limit: 10,
  page: 1,
});

const rules = {
  name: [{ required: false, message: "请输入活动名称", trigger: "blur" }],
  token: [{ required: false, message: "请输入Token", trigger: "blur" }],
  content: [{ required: false, message: "请输入内容", trigger: "blur" }],
  remarks: [{ required: false, message: "请输入备注", trigger: "blur" }],
};

const size = "small";

const columns = [
  {
    title: "ID",
    key: "id",
    width: "50px",
  },
  {
    title: "项目",
    key: "name",
    width: "100px",
  },
  {
    title: "Token",
    key: "token",
    width: "400px",
  },
  {
    title: "内容",
    key: "content",
  },
  {
    title: "时间",
    key: "created_at",
    width: "200px",
  },
  {
    title: "注释",
    key: "remarks",
    width: "100px",
  },
  {
    title: "值",
    key: "value",
    width: "50px",
  },
];

let data = ref([]);
let formRef = ref(null);

let pagination = ref({
  page: 1,
  pageSize: 10,
  itemCount : 0,
  pageCount: 0,
  pageSizes: [10, 20, 30],
  showSizeChanger: true,
  // showQuickJumper: true,
  onChange: (page) => {
    console.log(page);
    pagination.value.page = page;
    formValue.value.page = page;
    handleValidateClick();
  },
  onSizeChange: (size) => {
    console.log(size);
    pagination.value.pageSize = size;
    formValue.value.limit = size;
    handleValidateClick();
  },
  showTotal: (itemCount) => `共 ${itemCount} 条`,
});

const handleValidateClick = () => {
  // formRef.value.validate((valid) => {
  // if (valid) {
  // console.log("验证成功");
  // 模糊查询
  getActivityList(formValue.value).then((res) => {
    data.value = res.data;
    pagination.value.itemCount = res.pagination.total;
  });
  // } else {
  //   console.log("验证失败");
  // }
  // });
};

onMounted(() => {
  let obj = {
    limit: pagination.value.pageSize,
    page: pagination.value.page,
  };
  getActivityList(formValue.value).then((res) => {
    data.value = res.data;
    pagination.value.itemCount = res.pagination.total;

  });
});
</script>

<style scoped>
.n-card {
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  /* padding: 20px; */
  height: 100vh;
  width: 100vw;
}
.light-green {
  height: calc(100% - 40px);
  background-color: rgba(0, 128, 0, 0.12);
  padding: 20px;
}
.green {
  height: calc(100% - 40px);
  background-color: rgba(0, 128, 0, 0.24);
  padding: 20px;
}
</style>