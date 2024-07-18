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
              <n-form-item label="姓名" path="user.name">
                <n-input
                  v-model:value="formValue.user.name"
                  placeholder="输入姓名"
                />
              </n-form-item>
              <n-form-item label="年龄" path="user.age">
                <n-input
                  v-model:value="formValue.user.age"
                  placeholder="输入年龄"
                />
              </n-form-item>
              <n-form-item label="电话号码" path="phone">
                <n-input
                  v-model:value="formValue.phone"
                  placeholder="电话号码"
                />
              </n-form-item>
              <n-form-item>
                <n-button attr-type="button" @click="handleValidateClick">
                  验证
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
  user: {
    name: "",
    age: "",
  },
  phone: "",
});

const rules = {
  user: {
    name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
    age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
  },
  phone: [{ required: true, message: "请输入电话号码", trigger: "blur" }],
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

let pagination = ref({
  pageSize: 5,
  total: 0,
  current: 1,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total) => `共 ${total} 条`,
});

const handleValidateClick = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      console.log("验证成功");
    } else {
      console.log("验证失败");
    }
  });
};

onMounted(() => {
  getActivityList().then((res) => {
    console.log(res);
    data.value = res.data;
    pagination.value.total = res.data.length;
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