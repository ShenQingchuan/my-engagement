// 使用 Google Fonts CDN 注入字体，替代 @fontsource 本地包

/** 组件统一字体栈 */
export const WEDDING_FONT_FAMILY =
    "Nunito, 'Noto Sans SC', 'Zen Maru Gothic', 'HarmonyOS Sans SC', 'MiSans', -apple-system, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif";

const GOOGLE_FONTS_CSS_URL =
    'https://fonts.googleapis.com/css2?family=Nunito:wght@500;700;900&family=Noto+Sans+SC:wght@400;500;700&family=Zen+Maru+Gothic:wght@500;700;900&display=swap';

// ---------- 网页用：模块加载即把 Google Fonts CSS 注入 <head> ----------
let injected = false;
export const injectWeddingFonts = (): void => {
    if (injected || typeof document === 'undefined') return;
    injected = true;

    // 通过 link 预加载 Google Fonts
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = GOOGLE_FONTS_CSS_URL;
    document.head.appendChild(link);
};

// ---------- 导出 PNG 用：直接返回空字符串，字体已通过 link 加载 ----------
export const prepareWeddingFontsForExport = (): Promise<string> => {
    return Promise.resolve('');
};
