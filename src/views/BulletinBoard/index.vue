<template>
  <n-card>
    <n-grid x-gap="12" :cols="24" style="height: 100%">
      <n-gi :span="7">
        <div class="light-green">
          <n-flex align="center" justify="center" style="height: 100%">
          <Linear :height="'300px'" :width="'100%'" />
          <Bar :height="'300px'" :width="'100%'" />
          <Pie :height="'300px'" :width="'100%'" />
          </n-flex>
        </div>
      </n-gi>
      <n-gi :span="10">
        <div class="green">
          <ChinaMap  :height="'500px'" :width="'100%'" />
        </div>
      </n-gi>
      <n-gi :span="7">
        <div class="light-green" >
          <!-- <MenuTest /> -->
        </div>
      </n-gi>
    </n-grid>
  </n-card>
</template>

<script scoped setup>
import { ref } from "vue";
import { MdSave } from "@vicons/ionicons4";
import Linear from "@/views/BulletinBoard/components/Line.vue";
import Bar from "@/views/BulletinBoard/components/Bar.vue";
import Pie from "@/views/BulletinBoard/components/Pie.vue";
import ChinaMap from "./components/ChinaMap.vue";
// import MenuTest from "./components/MenuTest.vue";

const text = ref("http://blog.suxin23.cn");
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
  height: 100%;
  background-color: rgba(0, 128, 0, 0.12);
}
.green {
  height: 100%;
  background-color: rgba(0, 128, 0, 0.24);
}
</style>