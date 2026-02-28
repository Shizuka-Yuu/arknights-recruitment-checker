import React from "react";
import { useApp } from "../hooks/useApp";
import { getUIText, getTagName } from "../constants/dictionary";

interface TagSelectorProps {
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  onClearAll: () => void;
  guaranteedCount?: number;
  totalCombosCount?: number;
  hideLowRarity?: boolean;
  onHideLowRarityChange?: (hide: boolean) => void;
}

const TAG_CATEGORIES = {
  type: ["先鋒", "前衛", "重装", "狙撃", "術師", "医療", "補助", "特殊"],
  position: ["近距離", "遠距離"],
  tags: [
    "火力",
    "防御",
    "COST回復",
    "範囲攻撃",
    "生存",
    "治療",
    "支援",
    "弱化",
    "減速",
    "強制移動",
    "牽制",
    "爆発力",
    "召喚",
    "高速再配置",
    "元素",
    "初期",
    "ロボット",
  ],
  confirmed: ["上級エリート", "エリート"],
};

export const TagSelector: React.FC<TagSelectorProps> = ({
  selectedTags,
  onTagToggle,
  onClearAll,
  guaranteedCount = 0,
  totalCombosCount = 0,
  hideLowRarity = false,
  onHideLowRarityChange,
}) => {
  const { language, theme } = useApp();
  const ui = getUIText(language);
  const maxTags = 5;
  const isMaxReached = selectedTags.length >= maxTags;

  const getTagColor = (tag: string) => {
    const isSelected = selectedTags.includes(tag);
    const isDisabled = isMaxReached && !isSelected;

    if (isSelected) {
      return "bg-blue-500 text-white border-blue-500";
    }
    if (isDisabled) {
      return theme === "dark"
        ? "bg-gray-700 text-gray-400 border-gray-600"
        : "bg-gray-100 text-gray-400 border-gray-200";
    }
    return theme === "dark"
      ? "bg-gray-700 text-gray-200 border-gray-500"
      : "bg-white text-gray-700 border-gray-300";
  };

  const getTagStyle = (tag: string) => {
    const isSelected = selectedTags.includes(tag);
    if (isSelected) {
      return {
        backgroundColor: "#0196d9",
        color: "white",
        borderColor: "#0196d9",
      };
    }
    return {};
  };

  const getTooltipText = (tag: string) => {
    const isDisabled = isMaxReached && !selectedTags.includes(tag);
    return isDisabled
      ? language === "ja"
        ? "最大5タグまで選択できます"
        : "Maximum 5 tags can be selected"
      : language === "ja"
        ? `${getTagName(tag, language)}を選択`
        : `Select ${getTagName(tag, language)}`;
  };

  const getCursorClass = (tag: string) => {
    const isDisabled = isMaxReached && !selectedTags.includes(tag);
    return isDisabled ? "cursor-not-allowed" : "cursor-pointer";
  };

  const handleTagClick = (tag: string) => {
    if (isMaxReached && !selectedTags.includes(tag)) {
      return; // 最大数に達している場合は何もしない
    }
    onTagToggle(tag);
  };

  const getSelectionStatus = () => {
    if (selectedTags.length === 0) {
      return {
        text:
          language === "ja" ? "タグを選択してください" : "Please select tags",
        color: "text-gray-500",
      };
    }

    // 1〜4タグでも結果数を表示
    if (selectedTags.length < 5) {
      let message =
        language === "ja"
          ? `${selectedTags.length}タグ選択中 - 全${totalCombosCount}件の組み合わせ`
          : `${selectedTags.length} tags selected - ${totalCombosCount} combinations`;

      if (guaranteedCount > 0) {
        message +=
          language === "ja"
            ? `（確定結果 ${guaranteedCount}件）`
            : ` (${guaranteedCount} guaranteed)`;
      }

      return {
        text: message,
        color: guaranteedCount > 0 ? "text-green-600" : "text-blue-600",
      };
    }

    // 5タグ選択時の詳細メッセージ
    let message = language === "ja" ? "5タグ選択完了！" : "5 tags selected!";

    // エリート・上級エリートタグの検出
    const hasSeniorElite = selectedTags.includes("上級エリート");
    const hasElite = selectedTags.includes("エリート");

    if (guaranteedCount > 0) {
      if (hasSeniorElite || hasElite) {
        message +=
          language === "ja"
            ? ` ${guaranteedCount}件 / 全${totalCombosCount}件`
            : ` ${guaranteedCount} / ${totalCombosCount} total`;
      } else {
        message +=
          language === "ja"
            ? ` ${guaranteedCount}件 / 全${totalCombosCount}件`
            : ` ${guaranteedCount} / ${totalCombosCount} total`;
      }
    } else {
      message +=
        language === "ja"
          ? ` 全${totalCombosCount}件`
          : ` ${totalCombosCount} total`;
    }

    // エリート・上級エリート選択時の特別メッセージ
    if ((hasSeniorElite || hasElite) && guaranteedCount > 0) {
      const eliteMessage = hasSeniorElite
        ? language === "ja"
          ? "⚠️上級エリート選択中！"
          : "⚠️Senior Elite selected!"
        : language === "ja"
          ? "⚠️エリート選択中！"
          : "⚠️Elite selected!";

      message += language === 'ja' 
        ? ` ★4以上の確定結果があります！${eliteMessage}` 
        : ` ★4+ guaranteed results available!${eliteMessage}`;
    } else if (guaranteedCount > 0) {
      message +=
        language === "ja"
          ? " ★4以上の確定結果があります！"
          : " ★4+ guaranteed results available!";
    }

    return {
      text: message,
      color: guaranteedCount > 0 ? "text-green-600" : "text-blue-600",
    };
  };

  const selectionStatus = getSelectionStatus();

  return (
    <div
      className="space-y-4 p-4 rounded-lg shadow relative"
      style={{
        backgroundColor: "var(--bg-secondary)",
        color: "var(--text-primary)",
        zIndex: 1,
      }}
    >
      <div
        className="flex justify-between items-center relative"
        style={{ zIndex: 2 }}
      >
        <div className="flex items-center space-x-3">
          <h2
            className="text-lg font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            {ui.tagSelection}
          </h2>
          {/* ★1~2非表示トグル */}
          <div className="flex items-center gap-2">
            <label
              className="text-xs"
              style={{ color: "var(--text-secondary)" }}
            >
              {language === "ja"
                ? "★1~2を検索結果に非表示"
                : "Hide ★1~2 from results"}
            </label>
            <button
              onClick={() => onHideLowRarityChange?.(!hideLowRarity)}
              className="relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer"
              style={{
                backgroundColor: hideLowRarity
                  ? "#0196d9" // 統一カラー
                  : theme === "dark"
                    ? "#4b5563"
                    : "#d1d5db",
              }}
              title={
                language === "ja"
                  ? hideLowRarity
                    ? "★1~2オペレーターを検索結果に表示する"
                    : "★1~2オペレーターを検索結果から非表示にする"
                  : hideLowRarity
                    ? "Show ★1~2 operators in search results"
                    : "Hide ★1~2 operators from search results"
              }
            >
              <span
                className="inline-block h-4 w-4 transform rounded-full transition-colors"
                style={{
                  transform: hideLowRarity
                    ? "translateX(20px)"
                    : "translateX(2px)",
                  backgroundColor: "#ffffff", // ダークテーマ時も白に固定
                }}
              />
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onClearAll}
            className="hidden sm:block px-2 py-1 text-xs font-medium hover:opacity-90 transition-opacity cursor-pointer"
            style={{
              backgroundColor: "#0196d9",
              color: "white",
              borderRadius: "4px",
            }}
            title={ui.clearAll}
          >
            {language === "ja" ? "タグをリセット" : "Reset Tags"}
          </button>
          <button
            onClick={onClearAll}
            className="h-8 w-8 flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
            style={{ backgroundColor: "transparent" }}
            title={ui.clearAll}
          >
            <img
              src={`${import.meta.env.DEV ? '' : (import.meta.env.BASE_URL || "")}images/ui/reset_btn.png`}
              alt={ui.clearAll}
              className="h-full w-full object-contain"
            />
          </button>
        </div>
      </div>

      {/* 選択ステータス */}
      <div
        className="p-3 rounded-lg"
        style={{ backgroundColor: "var(--bg-tertiary)" }}
      >
        <div className="flex items-center justify-between">
          <span
            className="text-sm font-medium"
            style={{
              color:
                selectionStatus.color === "text-blue-600"
                  ? theme === "dark"
                    ? "#60a5fa"
                    : "#2563eb" // ダークモードでは明るい青
                  : theme === "dark"
                    ? "#4ade80"
                    : "#16a34a", // ダークモードでは明るい緑
            }}
          >
            {selectionStatus.text}
          </span>
          {selectedTags.length > 0 && (
            <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
              {selectedTags.length}/{maxTags}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-2">
        {/* スマホでは縦並び、PCでは横並び */}
        <div className="space-y-2">
          {/* タイプ */}
          <div className="flex items-center gap-2 sm:gap-3">
            <h3
              className={`text-sm font-medium text-gray-600 dark:text-gray-400 ${language === "en" ? "min-w-[70px]" : "min-w-[45px]"} text-left h-8 flex items-center`}
            >
              {ui.tagCategories.type}
            </h3>
            <div className="flex flex-wrap gap-2 text-left flex-1 items-start">
              {TAG_CATEGORIES.type.map((tag) => (
                <button
                  key={`type-${tag}`}
                  title={getTooltipText(tag)}
                  onClick={() => handleTagClick(tag)}
                  disabled={isMaxReached && !selectedTags.includes(tag)}
                  className={`px-3 py-1 text-sm rounded-sm border transition-colors text-left ${getTagColor(tag)} ${getCursorClass(tag)} hover:scale-105 hover:shadow-md`}
                  style={getTagStyle(tag)}
                >
                  {getTagName(tag, language)}
                </button>
              ))}
            </div>
          </div>

          {/* 位置 */}
          <div className="flex items-center gap-2 sm:gap-3">
            <h3
              className={`text-sm font-medium text-gray-600 dark:text-gray-400 ${language === "en" ? "min-w-[70px]" : "min-w-[45px]"} text-left h-8 flex items-center`}
            >
              {ui.tagCategories.position}
            </h3>
            <div className="flex flex-wrap gap-2 text-left flex-1 items-start">
              {TAG_CATEGORIES.position.map((tag) => (
                <button
                  key={`position-${tag}`}
                  title={getTooltipText(tag)}
                  onClick={() => handleTagClick(tag)}
                  disabled={isMaxReached && !selectedTags.includes(tag)}
                  className={`px-3 py-1 text-sm rounded-sm border transition-colors text-left ${getTagColor(tag)} ${getCursorClass(tag)} hover:scale-105 hover:shadow-md`}
                  style={getTagStyle(tag)}
                >
                  {getTagName(tag, language)}
                </button>
              ))}
            </div>
          </div>

          {/* タグ */}
          <div className="flex items-center gap-2 sm:gap-3">
            <h3
              className={`text-sm font-medium text-gray-600 dark:text-gray-400 ${language === "en" ? "min-w-[70px]" : "min-w-[45px]"} text-left h-8 flex items-center`}
            >
              {ui.tagCategories.tags}
            </h3>
            <div className="flex flex-wrap gap-2 text-left flex-1 items-start">
              {TAG_CATEGORIES.tags.map((tag) => (
                <button
                  key={`tags-${tag}`}
                  title={getTooltipText(tag)}
                  onClick={() => handleTagClick(tag)}
                  disabled={isMaxReached && !selectedTags.includes(tag)}
                  className={`px-3 py-1 text-sm rounded-sm border transition-colors text-left ${getTagColor(tag)} ${getCursorClass(tag)} hover:scale-105 hover:shadow-md`}
                  style={getTagStyle(tag)}
                >
                  {getTagName(tag, language)}
                </button>
              ))}
            </div>
          </div>

          {/* 確定 */}
          <div className="flex items-center gap-2 sm:gap-3">
            <h3
              className={`text-sm font-medium text-gray-600 dark:text-gray-400 ${language === "en" ? "min-w-[70px]" : "min-w-[45px]"} text-left h-8 flex items-center`}
            >
              {ui.tagCategories.confirmed}
            </h3>
            <div className="flex flex-wrap gap-2 text-left flex-1 items-start">
              {TAG_CATEGORIES.confirmed.map((tag) => (
                <button
                  key={`confirmed-${tag}`}
                  title={getTooltipText(tag)}
                  onClick={() => handleTagClick(tag)}
                  disabled={isMaxReached && !selectedTags.includes(tag)}
                  className={`px-3 py-1 text-sm rounded-sm border transition-colors text-left ${getTagColor(tag)} ${getCursorClass(tag)} hover:scale-105 hover:shadow-md`}
                  style={getTagStyle(tag)}
                >
                  {getTagName(tag, language)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 選択中のタグ表示 */}
      {selectedTags.length > 0 && (
        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {language === "ja" ? "選択中のタグ" : "Selected Tags"}
          </p>
          <div className="flex justify-between items-start">
            <div className="flex flex-wrap gap-1">
              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  title={getTooltipText(tag)}
                  className="px-2 py-1 text-xs rounded flex items-center gap-1"
                  style={{
                    backgroundColor: "#0196d9",
                    color: "white",
                    border: "none",
                  }}
                >
                  {getTagName(tag, language)}
                  <button
                    onClick={() => onTagToggle(tag)}
                    className="text-white hover:text-gray-200"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <button
              onClick={onClearAll}
              className="text-xs hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap"
              style={{
                backgroundColor: "#0196d9",
                color: "white",
                borderRadius: "4px",
                padding: "4px 8px",
                height: "24px", // タグボタンの高さに合わせる
              }}
            >
              {ui.clear}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
