import React, { useState } from "react";
import { useApp } from "../hooks/useApp";
import { getCharacterName, getTagName } from "../constants/dictionary";
import type { Character, ComboResult } from "../types";

interface AllCombinationResultsProps {
  allCombos: ComboResult[];
  guaranteedResults: ComboResult[];
  hideLowRarity?: boolean;
}

const tryImagePaths = (iconName: string): string[] => {
  // 開発環境ではBASE_URLを無視してルートパスを使用
  const isDev = import.meta.env.DEV;
  const basePath = isDev ? "" : import.meta.env.BASE_URL || "";
  const cleanName = iconName
    .replace(/^img_/, "")
    .replace(/^icon_/, "")
    .replace(/\.png$/, "");

  const paths = [
    `${basePath}images/${iconName}`, // ファイル名そのまま
    `${basePath}images/${cleanName}.png`, // プレフィックスなし
    `${basePath}images/${cleanName}_icon.png`, // _iconサフィックス
    `${basePath}images/img_${cleanName}.png`, // img_プレフィックス
    `${basePath}images/icon_${cleanName}.png`, // icon_プレフィックス
  ];

  // 重複を除去
  return [...new Set(paths)];
};

const CharacterImage: React.FC<{ character: Character; size?: number }> = ({
  character,
  size = 60,
}) => {
  const [currentPathIndex, setCurrentPathIndex] = useState(0);
  const [isError, setIsError] = useState(false);

  const imagePaths = tryImagePaths(character.icon);
  const currentPath = imagePaths[currentPathIndex];

  const handleError = () => {
    if (currentPathIndex < imagePaths.length - 1) {
      setCurrentPathIndex(currentPathIndex + 1);
    } else {
      setIsError(true);
    }
  };

  if (isError) {
    return (
      <div
        className="bg-gray-300 rounded flex items-center justify-center text-xs text-gray-600"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        ?
      </div>
    );
  }

  return (
    <div
      className="flex items-center justify-center"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <img
        src={currentPath}
        alt={character.name}
        className="object-cover flex-shrink-0"
        style={{
          width: "85px",
          height: "85px",
          minWidth: "85px",
          maxWidth: "85px",
          minHeight: "85px",
          maxHeight: "85px",
        }}
        onError={handleError}
        key={currentPath} // パス変更時に画像を再読み込みさせるため
      />
    </div>
  );
};

export const AllCombinationResults: React.FC<AllCombinationResultsProps> = ({
  allCombos,
  guaranteedResults,
  hideLowRarity = false,
}) => {
  const { language } = useApp();
  const [showAllCombos, setShowAllCombos] = useState(false);

  // 確定結果内の最小レアリティを計算
  const getMinRarityInGuaranteed = () => {
    if (!guaranteedResults || guaranteedResults.length === 0) return null;

    let minRarity = 6;
    guaranteedResults.forEach((result) => {
      result.characters.forEach((char) => {
        const rarity = parseInt(char.rarity);
        if (rarity < minRarity) {
          minRarity = rarity;
        }
      });
    });

    return minRarity;
  };

  // 同じオペレーターセットを持つ確定結果をフィルタリング
  const getUniqueGuaranteedResults = () => {
    if (!guaranteedResults || guaranteedResults.length === 0) return [];

    const seenCharacterSets = new Set<string>();
    const uniqueResults: typeof guaranteedResults = [];

    guaranteedResults.forEach((result) => {
      // オペレーターセットを文字列ソートして一意のキーを生成
      const sortedCharacters = [...result.characters].sort((a, b) =>
        a.name.localeCompare(b.name),
      );
      const characterSetKey = sortedCharacters
        .map((char) => char.name)
        .join(",");

      // まだ見ていないオペレーターセットの場合のみ追加
      if (!seenCharacterSets.has(characterSetKey)) {
        seenCharacterSets.add(characterSetKey);
        uniqueResults.push(result);
      }
    });

    return uniqueResults;
  };

  // 同じオペレーターセットを持つ全組み合わせ結果をフィルタリング（最小タグ数のみ）
  const getUniqueAllCombos = () => {
    if (!allCombos || allCombos.length === 0) return [];

    // オペレーターセットごとにグループ化
    const characterSetGroups = new Map<string, typeof allCombos>();

    allCombos.forEach((result) => {
      // オペレーターセットを文字列ソートして一意のキーを生成
      const sortedCharacters = [...result.characters].sort((a, b) =>
        a.name.localeCompare(b.name),
      );
      const characterSetKey = sortedCharacters
        .map((char) => char.name)
        .join(",");

      if (!characterSetGroups.has(characterSetKey)) {
        characterSetGroups.set(characterSetKey, []);
      }
      characterSetGroups.get(characterSetKey)!.push(result);
    });

    // 各グループから最小タグ数の組み合わせを選択
    const uniqueResults: typeof allCombos = [];
    characterSetGroups.forEach((group) => {
      // タグ数が少ない順にソートして最初のものを選択
      const sortedByTagCount = [...group].sort(
        (a, b) => a.combo.length - b.combo.length,
      );
      uniqueResults.push(sortedByTagCount[0]);
    });

    return uniqueResults;
  };

  const getCharacterRarityColor = (rarity: string) => {
    switch (rarity) {
      case "6":
        return "border-orange-500 bg-orange-100 dark:bg-orange-900/40 shadow-orange-300 dark:shadow-orange-700/30";
      case "5":
        return "border-yellow-500 bg-yellow-100 dark:bg-yellow-900/40 shadow-yellow-300 dark:shadow-yellow-700/30";
      case "4":
        return "border-purple-400 bg-purple-100 dark:bg-purple-900/40 shadow-purple-300 dark:shadow-purple-700/30";
      case "3":
        return "border-blue-400 bg-blue-100 dark:bg-blue-900/40 shadow-blue-300 dark:shadow-blue-700/30";
      case "2":
        return "border-green-400 bg-green-100 dark:bg-green-900/40 shadow-green-300 dark:shadow-green-700/30";
      case "1":
        return "border-gray-400 bg-gray-100 dark:bg-gray-800/40 shadow-gray-300 dark:shadow-gray-600/30";
      default:
        return "border-gray-400 bg-gray-100 dark:bg-gray-800/40";
    }
  };

  const getComboColor = (characters: Character[]) => {
    // 最も低レアリティのオペレーターを特定
    const lowestRarity = characters.reduce((min, char) => {
      const rarity = parseInt(char.rarity);
      return rarity < min ? rarity : min;
    }, 6);

    switch (lowestRarity) {
      case 6:
        return "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800";
      case 5:
        return "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800";
      case 4:
        return "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800";
      case 3:
        return "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800";
      case 2:
        return "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800";
      case 1:
        return "bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-700";
      default:
        return "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700";
    }
  };

  const getTagColor = (characters: Character[]) => {
    // 最も低レアリティのオペレーターを特定
    const lowestRarity = characters.reduce((min, char) => {
      const rarity = parseInt(char.rarity);
      return rarity < min ? rarity : min;
    }, 6);

    switch (lowestRarity) {
      case 6:
        return "bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200";
      case 5:
        return "bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200";
      case 4:
        return "bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200";
      case 3:
        return "bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200";
      case 2:
        return "bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200";
      case 1:
        return "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200";
      default:
        return "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200";
    }
  };

  if (
    (!allCombos || allCombos.length === 0) &&
    (!guaranteedResults || guaranteedResults.length === 0)
  ) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        {language === "ja"
          ? "該当する組み合わせが見つかりません"
          : "No combinations found"}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 確定結果を優先的に表示 */}
      {guaranteedResults && guaranteedResults.length > 0 && (
        <div className="space-y-4">
          <div
            className="flex items-center gap-2 p-4 rounded-lg"
            style={{
              backgroundColor: "var(--bg-tertiary)",
              border: "1px solid var(--border-color)",
            }}
          >
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <h3 className="text-lg font-semibold" style={{ color: "#16a34a" }}>
              {language === "ja" ? "確定結果" : "Guaranteed Results"} (
              {getUniqueGuaranteedResults().length}件)
            </h3>
            <span
              className="text-sm"
              style={{ color: "#16a34a", fontSize: "1rem" }}
            >
              {(() => {
                const uniqueGuaranteedResults = getUniqueGuaranteedResults();
                const minRarity = getMinRarityInGuaranteed();
                if (minRarity) {
                  const hasSeniorEliteTag = uniqueGuaranteedResults.some(
                    (result) => result.combo.includes("上級エリート"),
                  );
                  const hasEliteTag = uniqueGuaranteedResults.some(
                    (result) =>
                      result.combo.includes("エリート") &&
                      !result.combo.includes("上級エリート"),
                  );

                  if (hasSeniorEliteTag) {
                    return language === "ja"
                      ? "上級エリートタグ選択中"
                      : "Senior Elite tag selected";
                  }

                  if (hasEliteTag) {
                    return language === "ja"
                      ? "エリートタグ選択中"
                      : "Elite tag selected";
                  }

                  return language === "ja"
                    ? `★${minRarity}+確定結果があります`
                    : `★${minRarity}+ guaranteed results available`;
                }
                return language === "ja"
                  ? "★3+確定結果があります"
                  : "★3+ guaranteed results available";
              })()}
            </span>
          </div>

          <div className="grid gap-3">
            {getUniqueGuaranteedResults().map((result, index) => {
              // ★3以下を非表示設定の場合はフィルタリングして表示
              const filteredCharacters = result.characters.filter(
                (character) =>
                  !hideLowRarity || parseInt(character.rarity) >= 3,
              );

              if (filteredCharacters.length === 0) return null;

              return (
                <div
                  key={`guaranteed-${index}`}
                  className={`p-3 border rounded-lg transition-all hover:shadow-md ${getComboColor(result.characters)}`}
                >
                  <div className="flex flex-wrap gap-2 mb-3">
                    {result.combo.map((tag) => (
                      <span
                        key={tag}
                        className={`px-2 py-1 text-sm rounded ${getTagColor(result.characters)}`}
                      >
                        {getTagName(tag, language)}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-2">
                    {filteredCharacters.map((character) => (
                      <div
                        key={character.name}
                        className={`relative flex flex-col items-center border-2 transition-transform hover:scale-105 overflow-hidden ${getCharacterRarityColor(character.rarity)}`}
                      >
                        <div className="w-[75px] h-[75px] flex items-center justify-center overflow-hidden flex-shrink-0">
                          <a
                            href={`https://arknights.wikiru.jp/?${getCharacterName(character.icon.replace(".png", ""), "ja")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full h-full flex items-center justify-center cursor-pointer"
                          >
                            <CharacterImage character={character} size={75} />
                          </a>
                        </div>
                        <div className="w-full bg-black bg-opacity-75 text-white text-[10px] font-medium text-center py-1 leading-tight truncate px-1">
                          {getCharacterName(
                            character.icon.replace(".png", ""),
                            language,
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-start relative">
                    <div
                      className="text-xs text-left"
                      style={{
                        color: "var(--text-primary)",
                        textAlign: "left",
                        display: "block",
                        width: "100%",
                      }}
                    >
                      {result.combo.length}
                      {language === "ja" ? "タグで確定" : " tags guaranteed"} (
                      {result.characters.length}{" "}
                      {language === "ja" ? "オペ" : "operators"})
                      {result.combo.includes("上級エリート") && (
                        <span
                          style={{
                            color: "#dc2626",
                            display: "block",
                            width: "100%",
                          }}
                        >
                          <span
                            className="font-medium"
                            style={{ display: "block" }}
                          >
                            {language === "ja"
                              ? "9時間設定が必須条件"
                              : "9-hour setting is required"}
                          </span>
                          <span style={{ display: "block", color: "#dc2626" }}>
                            {language === "ja"
                              ? "上級エリート以外の併用タグ消失リスク（星6内でのランダム抽選になる）あり"
                              : "Other tags may disappear (random selection within ★6 only)"}
                          </span>
                        </span>
                      )}
                      {!result.combo.includes("上級エリート") &&
                        result.combo.includes("エリート") && (
                          <span
                            style={{
                              color: "#dc2626",
                              display: "block",
                              width: "100%",
                            }}
                          >
                            <span
                              className="font-medium"
                              style={{ display: "block" }}
                            >
                              {language === "ja"
                                ? "9時間設定が必須条件"
                                : "9-hour setting is required"}
                            </span>
                            <span
                              style={{ display: "block", color: "#dc2626" }}
                            >
                              {language === "ja"
                                ? "エリート以外の併用タグ消失リスク（星5内でのランダム抽選になる）あり"
                                : "Other tags may disappear (random selection within ★5 only)"}
                            </span>
                          </span>
                        )}
                      {result.isGuaranteed &&
                        !result.combo.includes("上級エリート") &&
                        !result.combo.includes("エリート") &&
                        !result.characters.some((char) =>
                          char.tags.includes("ロボット"),
                        ) && (
                          <span
                            style={{
                              color: "#f59e0b",
                              display: "block",
                              width: "100%",
                            }}
                          >
                            <span style={{ display: "block" }}>
                              {language === "ja"
                                ? "9時間設定推奨（レアタグ消失リスクあり）"
                                : "9-hour setting recommended (rare tag loss risk)"}
                            </span>
                          </span>
                        )}
                      {!result.combo.includes("上級エリート") &&
                        result.characters.some((char) =>
                          char.tags.includes("ロボット"),
                        ) && (
                          <div
                            className="flex flex-col items-start"
                            style={{ display: "block", width: "100%" }}
                          >
                            <div
                              className="flex items-center text-xs"
                              style={{
                                color: "var(--text-secondary)",
                                display: "block",
                              }}
                            >
                              <span>
                                {language === "ja"
                                  ? "ロボット狙い: 3時間50分以下に設定"
                                  : "Robot target: set to 3h50m"}
                              </span>
                            </div>
                            <div
                              className="text-xs mt-1"
                              style={{ color: "#f59e0b" }}
                            >
                              {language === "ja"
                                ? "▼短時間はタグ消失リスク"
                                : "▼Short time has tag loss risk"}
                            </div>
                          </div>
                        )}
                    </div>
                    <div
                      className="flex items-center gap-1"
                      style={{
                        minWidth: "80px",
                        justifyContent: "flex-end",
                        alignSelf: "flex-end",
                      }}
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: "#16a34a" }}
                      ></div>
                      <span className="text-xs" style={{ color: "#16a34a" }}>
                        {language === "ja" ? "確定" : "Guaranteed"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* その他の全ての組み合わせ結果 - 重複排除して表示 */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h4 className="text-md font-medium" style={{ color: 'var(--text-primary)' }}>
            {language === 'ja' ? '全ての組み合わせ' : 'All Combinations'}
          </h4>
          <span className="px-2 py-1 text-xs rounded" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
            {getUniqueAllCombos().length} {language === 'ja' ? '組み合わせ' : 'combinations'}
          </span>
        </div>
        <div className="grid gap-2">
          {/* 表示する組み合わせを最初の5件に制限、それ以上は全て表示 */}
          {(showAllCombos ? getUniqueAllCombos() : getUniqueAllCombos().slice(0, 5)).map((result, index) => {
              // ★3以下を非表示設定の場合はフィルタリングして表示
              const filteredCharacters = result.characters.filter(
                (character) =>
                  !hideLowRarity || parseInt(character.rarity) >= 3,
              );

              if (filteredCharacters.length === 0) return null;

              return (
                <div
                  key={`combo-${index}`}
                  className={`p-3 border rounded-lg transition-all hover:shadow-md ${getComboColor(result.characters)}`}
                >
                  <div className="flex flex-wrap gap-2 mb-3">
                    {result.combo.map((tag) => (
                      <span
                        key={tag}
                        className={`px-2 py-1 text-sm rounded ${getTagColor(result.characters)}`}
                      >
                        {getTagName(tag, language)}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-2">
                    {filteredCharacters.map((character) => (
                      <div
                        key={character.name}
                        className={`relative flex flex-col items-center border-2 transition-transform hover:scale-105 overflow-hidden ${getCharacterRarityColor(character.rarity)}`}
                      >
                        <div className="w-[75px] h-[75px] flex items-center justify-center overflow-hidden flex-shrink-0">
                          <a
                            href={`https://arknights.wikiru.jp/?${getCharacterName(character.icon.replace(".png", ""), "ja")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full h-full flex items-center justify-center"
                          >
                            <CharacterImage character={character} size={75} />
                          </a>
                        </div>
                        <div className="w-full bg-black bg-opacity-75 text-white text-[10px] font-medium text-center py-1 leading-tight truncate px-1">
                          {getCharacterName(
                            character.icon.replace(".png", ""),
                            language,
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-start relative">
                    <div
                      className="text-xs text-left"
                      style={{
                        color: "var(--text-primary)",
                        textAlign: "left",
                        display: "block",
                        width: "100%",
                      }}
                    >
                      {result.combo.length}
                      {language === "ja" ? "タグ" : " tags"} (
                      {result.characters.length}{" "}
                      {language === "ja" ? "オペ" : "operators"})
                      {result.combo.includes("上級エリート") && (
                        <span
                          style={{
                            color: "#dc2626",
                            display: "block",
                            width: "100%",
                          }}
                        >
                          <span
                            className="font-medium"
                            style={{ display: "block" }}
                          >
                            {language === "ja"
                              ? "9時間設定が必須条件"
                              : "9-hour setting is required"}
                          </span>
                          <span style={{ display: "block", color: "#dc2626" }}>
                            {language === "ja"
                              ? "上級エリート以外の併用タグ消失リスク（星6内でのランダム抽選になる）あり"
                              : "Other tags may disappear (random selection within ★6 only)"}
                          </span>
                        </span>
                      )}
                      {!result.combo.includes("上級エリート") &&
                        result.combo.includes("エリート") && (
                          <span
                            style={{
                              color: "#dc2626",
                              display: "block",
                              width: "100%",
                            }}
                          >
                            <span
                              className="font-medium"
                              style={{ display: "block" }}
                            >
                              {language === "ja"
                                ? "9時間設定が必須条件"
                                : "9-hour setting is required"}
                            </span>
                            <span
                              style={{ display: "block", color: "#dc2626" }}
                            >
                              {language === "ja"
                                ? "エリート以外の併用タグ消失リスク（星5内でのランダム抽選になる）あり"
                                : "Other tags may disappear (random selection within ★5 only)"}
                            </span>
                          </span>
                        )}
                      {result.isGuaranteed &&
                        !result.combo.includes("上級エリート") &&
                        !result.combo.includes("エリート") &&
                        !filteredCharacters.some((char) =>
                          char.tags.includes("ロボット"),
                        ) && (
                          <span
                            style={{
                              color: "#f59e0b",
                              display: "block",
                              width: "100%",
                            }}
                          >
                            <span style={{ display: "block" }}>
                              {language === "ja"
                                ? "9時間設定推奨（レアタグ消失リスクあり）"
                                : "9-hour setting recommended (rare tag loss risk)"}
                            </span>
                          </span>
                        )}
                      {!result.combo.includes("上級エリート") &&
                        filteredCharacters.some((char) =>
                          char.tags.includes("ロボット"),
                        ) && (
                          <div className="flex flex-col items-start">
                            <div
                              className="flex items-center text-xs"
                              style={{ color: "var(--text-secondary)" }}
                            >
                              <span>
                                {language === "ja"
                                  ? "ロボット狙い: 3時間50分以下に設定"
                                  : "Robot target: set to 3h50m"}
                              </span>
                            </div>
                            <div
                              className="text-xs mt-1"
                              style={{ color: "#f59e0b" }}
                            >
                              {language === "ja"
                                ? "▼短時間はタグ消失リスク"
                                : "▼Short time has tag loss risk"}
                            </div>
                          </div>
                        )}
                    </div>
                    <div
                      className="flex items-center gap-1"
                      style={{
                        minWidth: "80px",
                        justifyContent: "flex-end",
                        alignSelf: "flex-end",
                      }}
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: "#6366f1" }}
                      ></div>
                      <span className="text-xs" style={{ color: "#6366f1" }}>
                        {language === "ja" ? "候補" : "Candidate"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            },
          )}
        </div>

        {/* もっと見る/折りたたむボタン - 組み合わせ数が5件を超える場合に表示 */}
        {getUniqueAllCombos().length > 5 && (
          <button
            onClick={() => setShowAllCombos(!showAllCombos)}
            className="w-full p-2 text-center text-sm rounded transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            style={{ 
              backgroundColor: 'var(--bg-secondary)', 
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)'
            }}
          >
            {showAllCombos 
              ? (language === 'ja' ? `▲ 折りたたむ (${getUniqueAllCombos().length}件中5件表示)` : `▲ Show less (${getUniqueAllCombos().length} combinations, showing 5)`)
              : (language === 'ja' ? `▼ もっと見る (${getUniqueAllCombos().length - 5}件残り)` : `▼ Show more (${getUniqueAllCombos().length - 5} remaining)`)}
          </button>
        )}
      </div>
    </div>
  );
};
