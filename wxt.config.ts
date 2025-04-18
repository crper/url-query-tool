import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    name: 'URL查询工具',
    description: 'URL查询工具帮助开发者和网站管理员分析、编辑和构建URL',
    permissions: ['activeTab', 'tabs', 'storage', 'sidePanel', 'contextMenus'],
    host_permissions: ['*://*/*'],
    action: {
      default_title: "URL查询工具",
      default_popup: "popup.html"
    },
    side_panel: {
      default_path: "sidebar.html"
    }
  },
  modules: ['@wxt-dev/module-react', '@wxt-dev/auto-icons'],
  autoIcons: {},
  vite: () => ({
    plugins: [tailwindcss()],
  }),
});
