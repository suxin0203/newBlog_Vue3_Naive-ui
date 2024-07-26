<template>
  <n-spin :show="loading">
          <template #description>
        正在处理数据中...
      </template>
    <n-card id="main" loading="{{ loading }}">
      <n-grid x-gap="12" :cols="24" style="height: calc(100vh-40px)">
        <n-gi :span="6">
          <div class="light-green">
            <n-flex align="center" justify="center" style="height: 100%">
              <Linear :height="'30%'" :width="'100%'" :optionData="data" />
              <Bar :height="'30%'" :width="'100%'" :optionData="data" />
              <Pie :height="'30%'" :width="'100%'" :optionData="data" />
            </n-flex>
          </div>
        </n-gi>
        <n-gi :span="12">
          <div class="green">
            <n-flex justify="space-between" class="title-counts">
              <div
                class="title-counts-item"
                v-for="item in titleCounts"
                :key="item.title"
              >
                <n-text type="h2">{{ item.count }}</n-text>
                <hr />
                <n-text>{{ item.title }}</n-text>
              </div>
            </n-flex>
            <ChinaMap :height="'calc(100vh - 540px)'" :width="'100%'" />
            <div class="datatable">
              <n-table :bordered="false" :single-line="false">
                <thead>
                  <tr>
                    <th>Abandon</th>
                    <th>Abnormal</th>
                    <th>Abolish</th>
                    <th>...</th>
                    <th>万事开头难</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>放弃</td>
                    <td>反常的</td>
                    <td>彻底废除</td>
                    <td>...</td>
                    <td>干！我刚才背的是啥</td>
                  </tr>
                  <tr>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                  </tr>
                  <tr>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                  </tr>
                  <tr>
                    <td>放弃</td>
                    <td>反常的</td>
                    <td>彻底废除</td>
                    <td>...</td>
                    <td>干！我刚才背的是啥</td>
                  </tr>
                  <tr>
                    <td>放弃</td>
                    <td>反常的</td>
                    <td>彻底废除</td>
                    <td>...</td>
                    <td>干！我刚才背的是啥</td>
                  </tr>
                  <tr>
                    <td>放弃</td>
                    <td>反常的</td>
                    <td>彻底废除</td>
                    <td>...</td>
                    <td>干！我刚才背的是啥</td>
                  </tr>
                </tbody>
              </n-table>
            </div>
          </div>
        </n-gi>
        <n-gi :span="6">
          <div class="light-green">
            <n-flex align="center" justify="center" style="height: 100%">
              <Pie :height="'30%'" :width="'100%'" :optionData="data" />
              <Bar :height="'30%'" :width="'100%'" :optionData="data" />
              <Linear :height="'30%'" :width="'100%'" :optionData="data" />
            </n-flex>
          </div>
        </n-gi>
      </n-grid>
    </n-card>
  </n-spin>
</template>

<script scoped setup>
import { ref, reactive, onMounted } from "vue";
import { getActivityList } from "@/api/api";
import { router } from "@/common/router";
import Linear from "@/views/BulletinBoard/components/Line.vue";
import Bar from "@/views/BulletinBoard/components/Bar.vue";
import Pie from "@/views/BulletinBoard/components/Pie.vue";
import ChinaMap from "./components/ChinaMap.vue";
import { create } from "naive-ui";
import { Create } from "@vicons/ionicons5";
import { omit } from "naive-ui/es/_utils";
// import MenuTest from "./components/MenuTest.vue";

let loading = ref(false);

const formValue = ref({
  name: "",
  token: "",
  content: "",
  remarks: "",
  limit: 999,
  page: 1,
});

let titleCounts = ref([
  {
    title: "项目类型",
    count: 16,
  },
  {
    title: "总次数",
    count: 382,
  },
  {
    title: "参与人数",
    count: 261,
  },
  {
    title: "参与城市",
    count: 26,
  },
  {
    title: "今日事件",
    count: 5,
  },
]);

const data = ref([]);

const fetchActivityList = async () => {
  loading.value = true;
  let res = await getActivityList(formValue.value);
  if (res.code === 401) {
    // router.push("/login");
    setTimeout(() => {
      router.push("/login");
    }, 3000);
    return;
  }
  console.log(res);
  data.value = res;
  loading.value = false;
  // 运行统计title函数
  titleCountsData();
};

// titleCounts数据统计
const titleCountsData = () => {
  // 项目类型
  let projectType = data.value.data.map((item) => item.name);
  let projectTypeSet = new Set(projectType);
  let projectTypeArr = Array.from(projectTypeSet);
  titleCounts.value[0].count = projectTypeArr.length;

  // 总次数
  titleCounts.value[1].count = data.value.pagination.total;

  // 参与人数
  let people = data.value.data.map((item) => item.content);
  let peopleSet = new Set(people);
  let peopleArr = Array.from(peopleSet);
  titleCounts.value[2].count = peopleArr.length;

  // 参与城市
  let city = data.value.data.map((item) => item.remarks);
  let citySet = new Set(city);
  let cityArr = Array.from(citySet);
  titleCounts.value[3].count = cityArr.length;

  // 今日事件
  let today = new Date();
  let todayStr = `${
    today.getMonth() + 1
  }/${today.getDate()}/${today.getFullYear()}`;
  let todayArr = data.value.data.filter((item) => {
    let date = item.created_at.split(",")[0].trim();
    return date === todayStr;
  });
  titleCounts.value[4].count = todayArr.length;
};

onMounted(() => {
  // loading.value = true;
  fetchActivityList();
  // loading.value = false;
});
</script>

<style scoped lang="less">
#main {
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  /* padding: 20px; */
  height: 100vh;
  width: 100vw;
  .title-counts {
    padding: 20px;
    height: 120px;

    .title-counts-item {
      width: 15%;
      border-radius: 8px;
      text-align: center;
      font-size: 20px;
      font-weight: 600;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: rgba(96, 185, 181, 0.2);
      .n-text {
        color: #3a8486;
      }
      hr {
        width: 50%;
        margin: 0 auto;
        border: 1px solid #e8e8e8;
      }
    }
  }
  .datatable {
    // padding: 20px;
    height: 330px;
    overflow: auto;
    background-color: rgba(255, 255, 255, 0) !important;
    table {
      background-color: rgba(255, 255, 255, 0) !important;
    }
    thead {
      background-color: rgba(255, 255, 255, 0.4) !important;
    }
    tbody {
      // 透明背景
      background-color: rgba(255, 255, 255, 0) !important;
    }
    th {
      background-color: rgba(255, 255, 255, 0) !important;
    }
    tr {
      background-color: rgba(255, 255, 255, 0) !important;
    }
    td {
      background-color: rgba(255, 255, 255, 0) !important;
    }
  }
}
.light-green {
  height: 100%;
  background-color: rgba(0, 128, 0, 0.12);
  border-radius: 6px;
}
.green {
  height: 100%;
  background-color: rgba(0, 128, 0, 0.24);
  border-radius: 6px;
}
</style>