export type GameData = {
  id?: number;
  name: string;
  description?: string;
  playedTime?: number;
  startTime?: number;
  imgUrl?: string;
  isFavorite?: boolean;
  isPlaying?: boolean;
  isFinished?: boolean;
  isPaused?: boolean;
  score?: number;
};
import gameData from "./gameData.json";

export function getGameData(): GameData[] {
  // 直接返回导入的JSON数据，并断言为GameData数组类型
  return gameData as GameData[];
}
export type ListGameCardConfig = {
  showScore: boolean;
  showPlayedTime: boolean;
  showFavorite: boolean;
  showState: boolean;
};
