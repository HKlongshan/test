# 網站性能優化說明

## 圖片壓縮建議

P1-P6 資料夾的照片（共36張，約12.8MB）可以進行以下優化：

### 推薦工具

1. **TinyPNG** (https://tinypng.com)
   - 支持 JPG/PNG 在線壓縮
   - 可保持良好畫質下減少 50-70% 文件大小

2. **ImageOptim** (Mac)
   - 無損壓縮工具
   - 下载地址：https://imageoptim.com

3. **Squoosh** (Google)
   - 支持 WebP 格式轉換
   - 可視化壓縮對比
   - 网址：https://squoosh.app

### 建議參數

| 圖片類型 | 格式 | 質量 | 預期大小 |
|---------|------|------|---------|
| 活動照片 | JPEG | 80% | 100-200KB |
| 圖標/Banner | PNG/WebP | 90% | 50-100KB |

### 批量處理

使用 ImageOptim 或 TinyPNG API 可一次性處理整個資料夾。

---

## 已啟用的優化

### 1. 瀏覽器緩存
`.htaccess` 文件已配置：
- 圖片：緩存 1 年
- CSS/JS：緩存 1 個月
- HTML：不緩存（確保更新即時生效）

**部署時**：將 `.htaccess` 上傳到網站根目錄

### 2. GZIP 壓縮
已啟用 GZIP 壓縮，可減少 60-70% 的傳輸大小

### 3. CDN 建議（可選）

如需進一步提升速度，可考慮：
- **Cloudflare** (免費 CDN)
- **jsDelivr** (針對靜態資源)
- **阿里雲 CDN** (香港節點)

---

## 監控工具建議

1. **Google PageSpeed Insights** (https://pagespeed.web.dev)
   - 測試網站性能
   - 提供改進建議

2. **GTmetrix** (https://gtmetrix.com)
   - 詳細性能分析

3. **WebPageTest** (https://webpagetest.org)
   - 深度測試網站速度
