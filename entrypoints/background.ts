export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id });

  // 创建右键菜单
  browser.contextMenus.removeAll().then(() => {
    // 创建父菜单
    browser.contextMenus.create({
      id: 'url-query-tool',
      title: 'URL查询工具',
      contexts: ['all'],
    });

    // 创建子菜单 - 在弹出窗口中打开
    browser.contextMenus.create({
      id: 'open-in-popup',
      parentId: 'url-query-tool',
      title: '在弹出窗口中打开',
      contexts: ['all'],
    });

    // 创建子菜单 - 在侧边栏中打开
    browser.contextMenus.create({
      id: 'open-in-sidebar',
      parentId: 'url-query-tool',
      title: '在侧边栏中打开',
      contexts: ['all'],
    });
  });

  // 监听菜单点击事件
  browser.contextMenus.onClicked.addListener((info, tab) => {
    if (!tab?.id) return;

    switch (info.menuItemId) {
      case 'open-in-popup':
        // 打开弹出窗口
        browser.action.openPopup();
        break;

      case 'open-in-sidebar':
        // 打开侧边栏
        browser.sidePanel.open({ tabId: tab.id });
        break;
    }
  });
});
