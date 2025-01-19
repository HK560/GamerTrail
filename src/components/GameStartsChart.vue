<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from "vue";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DataZoomComponent,
  LegendComponent
} from "echarts/components";
import VChart from "vue-echarts";
import type { EChartsOption } from "echarts";
import { t } from "@/plugins/i18n";
import { isMobile } from "vue-device-detect";
import "@quasar/extras/animate/fadeIn.css";
import "@quasar/extras/animate/fadeOut.css";

use([
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DataZoomComponent,
  LegendComponent
]);

const props = defineProps<{
  period: "year" | "month";
}>();

const chartOption = ref<EChartsOption>({
  backgroundColor: "transparent",
  title: {
    text: t("title.gameStarts"),
    left: "center",
    top: 0,
    textStyle: {
      color: "#ffffff",
      fontSize: 14,
      fontWeight: "normal"
    }
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow"
    },
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderColor: "rgba(255, 255, 255, 0.2)",
    textStyle: {
      color: "#ffffff",
      fontSize: 12
    }
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "8%",
    top: "15%",
    containLabel: true
  },
  xAxis: {
    type: "time",
    axisLabel: {
      formatter: (value: number) => {
        const date = new Date(value);
        if (props.period === "year") {
          return `${date.getFullYear()}`;
        } else {
          return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`;
        }
      },
      color: "rgba(255, 255, 255, 0.7)",
      fontSize: 11,
      margin: 8
    },
    axisLine: {
      lineStyle: {
        color: "rgba(255, 255, 255, 0.2)"
      }
    },
    splitLine: {
      show: false
    }
  },
  yAxis: {
    type: "value",
    name: t("title.quantity"),
    nameTextStyle: {
      color: "rgba(255, 255, 255, 0.7)",
      fontSize: 11,
      padding: [0, 0, 0, 0]
    },
    axisLabel: {
      color: "rgba(255, 255, 255, 0.7)",
      fontSize: 11,
      margin: 8
    },
    axisLine: {
      lineStyle: {
        color: "rgba(255, 255, 255, 0.2)"
      }
    },
    splitLine: {
      lineStyle: {
        color: "rgba(255, 255, 255, 0.1)",
        type: "dashed"
      }
    }
  },
  series: [
    {
      name: t("title.gameStarts"),
      type: "bar",
      barWidth: "50%",
      data: [] as [number, number][],
      itemStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "rgba(255, 255, 255, 0.3)"
            },
            {
              offset: 1,
              color: "rgba(255, 255, 255, 0.1)"
            }
          ]
        },
        borderRadius: [3, 3, 0, 0]
      },
      emphasis: {
        itemStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(255, 255, 255, 0.5)"
              },
              {
                offset: 1,
                color: "rgba(255, 255, 255, 0.3)"
              }
            ]
          }
        }
      }
    }
  ]
}) as { value: { series: { data: [number, number][] }[] } };

// 添加窗口宽度响应式引用
const windowWidth = ref(window.innerWidth);

// 更新窗口宽度的处理函数
const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

const loadData = async () => {
  try {
    const response = await fetch("/data/gameData.json");
    const games = await response.json();

    // 过滤有开始时间的游戏
    const gamesWithStartTime = games.filter((game: any) => game.startTime);

    if (props.period === "month") {
      // 获取当前日期
      const now = new Date();
      // 根据设备类型和窗口宽度决定显示的月份数量
      const monthsToShow = isMobile || windowWidth.value < 1024 ? 6 : 12;
      // 生成最近N个月的数据结构
      const lastMonths = Array.from({ length: monthsToShow }, (_, i) => {
        const date = new Date(
          now.getFullYear(),
          now.getMonth() - (monthsToShow - 1 - i),
          1
        );
        return {
          key: `${date.getFullYear()}-${date.getMonth() + 1}`,
          time: date.getTime(),
          count: 0
        };
      });

      // 统计游戏数据
      gamesWithStartTime.forEach((game: any) => {
        const date = new Date(game.startTime * 1000);
        const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
        const monthData = lastMonths.find((m) => m.key === key);
        if (monthData) {
          monthData.count++;
        }
      });

      // 转换为图表数据格式
      chartOption.value.series[0].data = lastMonths.map((item) => [
        item.time,
        item.count
      ]);
    } else {
      // 按年份分组统计
      const groupedData = gamesWithStartTime.reduce((acc: any, game: any) => {
        const date = new Date(game.startTime * 1000);
        const key = `${date.getFullYear()}`;

        if (!acc[key]) {
          acc[key] = {
            time: new Date(date.getFullYear(), 0, 1).getTime(),
            count: 0
          };
        }
        acc[key].count++;
        return acc;
      }, {});

      // 转换为图表数据格式
      const chartData = Object.values(groupedData)
        .sort((a: any, b: any) => a.time - b.time)
        .map((item: any) => [item.time, item.count]) as [number, number][];

      chartOption.value = {
        ...chartOption.value,
        series: [
          {
            ...chartOption.value.series?.[0],
            data: chartData
          }
        ]
      };
    }
  } catch (error) {
    console.error("加载游戏数据失败:", error);
  }
};

// 获取周数的辅助函数
function getWeekNumber(date: Date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

// 监听周期变化重新加载数据
watch(
  () => props.period,
  () => {
    loadData();
  }
);

// 监听窗口宽度变化重新加载数据
watch(
  () => windowWidth.value,
  () => {
    if (props.period === "month") {
      loadData();
    }
  }
);

// 在组件挂载时添加事件监听
onMounted(() => {
  window.addEventListener("resize", handleResize);
  loadData();
});

// 在组件卸载时移除事件监听
onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <transition
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
    mode="out-in"
  >
    <div
      class="w-full h-[300px] bg-black/10 rounded-xl backdrop-blur-md border border-white/20 shadow-lg p-4"
    >
      <v-chart class="w-full h-full" :option="chartOption" autoresize />
    </div>
  </transition>
</template>

<style scoped>
.chart {
  width: 100%;
  height: 250px;
}
</style>
