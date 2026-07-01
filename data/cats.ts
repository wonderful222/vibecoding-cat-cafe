import type { CatProfile } from "@/types/cat";

export const cats: CatProfile[] = [
  {
    id: "nuomi",
    name: "糯米",
    age: "两岁",
    gender: "妹妹",
    image: "/images/cat-nuomi.png",
    heroImage: "/images/cat-nuomi-hero.png",
    tags: ["温柔", "慢热", "爱晒太阳"],
    energy: "安静",
    interaction: "慢热",
    status: "适合安静陪伴",
    matchReason: "糯米不急着靠近人，但会在你保持安静时慢慢放松。",
    bestFor: "第一次来、希望节奏轻一点的人",
    gentleTip: "先坐在她侧前方，伸手前给她一点观察时间。",
    detail: "她喜欢稳定、轻声的互动。比起追逐玩具，她更愿意在熟悉的距离里陪你待一会儿。"
  },
  {
    id: "xueqiu",
    name: "雪球",
    age: "一岁半",
    gender: "弟弟",
    image: "/images/cat-xueqiu.png",
    heroImage: "/images/cat-xueqiu-hero.png",
    tags: ["亲人", "好奇", "轻快"],
    energy: "适中",
    interaction: "主动",
    status: "今天状态很好",
    matchReason: "雪球会主动观察新朋友，适合想快速建立互动的人。",
    bestFor: "希望被回应、但不想太热闹的人",
    gentleTip: "用逗猫棒慢慢划小弧线，他会更容易跟上。",
    detail: "他喜欢短距离游戏，也会在玩累后靠近休息。互动时保持动作轻一点，会让他更愿意停留。"
  },
  {
    id: "lizi",
    name: "栗子",
    age: "三岁",
    gender: "哥哥",
    image: "/images/cat-lizi.png",
    heroImage: "/images/cat-lizi-hero.png",
    tags: ["稳定", "沉着", "爱趴着"],
    energy: "安静",
    interaction: "亲近",
    status: "适合久坐陪伴",
    matchReason: "栗子不需要太多技巧，适合想慢慢靠近猫咪的人。",
    bestFor: "想拍照、聊天、安静待一会儿的人",
    gentleTip: "坐下后把手放低，让他自己决定要不要靠近。",
    detail: "他对突然的声音比较敏感，但对稳定的陪伴很友好。只要你不急，他通常会给出温柔回应。"
  },
  {
    id: "naihuang",
    name: "奶黄",
    age: "九个月",
    gender: "妹妹",
    image: "/images/cat-naihuang.png",
    heroImage: "/images/cat-naihuang-hero.png",
    tags: ["活泼", "爱玩", "反应快"],
    energy: "活泼",
    interaction: "主动",
    status: "适合短时游戏",
    matchReason: "奶黄很容易被玩具吸引，适合愿意轻松玩一会儿的人。",
    bestFor: "想体验明显回应、喜欢轻快节奏的人",
    gentleTip: "一次只玩三五分钟，给她留下休息的间隙。",
    detail: "她的注意力来得快也走得快。把互动拆成短段，会比一直逗她更自然。"
  }
];

export function getCatById(id: string) {
  return cats.find((cat) => cat.id === id);
}

export const todayCompanion = cats[0];
