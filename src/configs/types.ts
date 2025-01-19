export type Platform = {
  name: string;
  accountName: string;
  icon?: string;
  iconSrc?: string;
  url: string;
};

export type PlayerData = {
  nickname: string[];
  avatar: string[];
  bio: string[];
  platforms: Platform[];
};

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

export type ListGameCardConfig = {
  showScore: boolean;
  showPlayedTime: boolean;
  showFavorite: boolean;
  showState: boolean;
};

let G_gameData: GameData[] = [];
let G_playerData: PlayerData | null = null;

async function loadDataFile<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to load file");
    }
    return (await response.json()) as T;
  } catch (error) {
    console.error("Error loading:", error);
    return null;
  }
}

// 在页面加载时立即加载数据
(async () => {
  const [gameData, playerData] = await Promise.all([
    loadDataFile<GameData[]>("/data/gameData.json"),
    loadDataFile<PlayerData>("/data/playerData.json")
  ]);

  if (gameData) {
    G_gameData = gameData;
  }
  if (playerData) {
    G_playerData = playerData;
  }
})();

export function getGameData(): GameData[] {
  return G_gameData;
}

export function getTotalPlayedTime(): number {
  return G_gameData.reduce((total, game) => total + (game.playedTime || 0), 0);
}

export function gettotalPlayed(): number {
  return G_gameData.length;
}

export function getPlayerData(): PlayerData | null {
  return G_playerData;
}

export { G_gameData, G_playerData };
