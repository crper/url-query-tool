import { IconInfoCircle, IconLink, IconRefresh, IconSetting } from '@douyinfe/semi-icons';
import { Button, Layout, Notification, TabPane, Tabs, Typography } from '@douyinfe/semi-ui';
import { useCallback, useEffect, useState } from 'react';

import AboutContent from './AboutContent';
import ErrorContent from './ErrorContent';
import ParamsList from './ParamsList';
import ParamsTable from './ParamsTable';
import SiteInfoCard from './SiteInfoCard';
import { DEFAULT_SITE_INFO, SiteInfo, TAB_KEYS, UrlParam, UrlQueryToolProps } from './types';
import URLResult from './URLResult';

const UrlQueryTool = ({ className = '', mode }: UrlQueryToolProps) => {
  // 状态管理
  const [url, setUrl] = useState<string>('');
  const [baseUrl, setBaseUrl] = useState<string>('');
  const [originalParams, setOriginalParams] = useState<UrlParam[]>([]);
  const [customParams, setCustomParams] = useState<UrlParam[]>([]);
  const [siteInfo, setSiteInfo] = useState<SiteInfo>(DEFAULT_SITE_INFO);
  const [queryPart, setQueryPart] = useState<string>('');
  const [fullUrl, setFullUrl] = useState<string>('');
  const [filterKey, setFilterKey] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>(TAB_KEYS.FUNCTION);
  const [detectedMode, setDetectedMode] = useState<'popup' | 'sidebar'>(mode || 'popup');
  const [isValidUrl, setIsValidUrl] = useState<boolean>(true);

  // UI 组件引用
  const { Title } = Typography;
  const { Header, Content, Sider } = Layout;

  // 检测运行环境
  useEffect(() => {
    if (mode) {
      setDetectedMode(mode);
    } else {
      const detectMode = () => {
        setDetectedMode(window.innerWidth <= 400 ? 'sidebar' : 'popup');
      };

      detectMode();
      window.addEventListener('resize', detectMode);

      return () => {
        window.removeEventListener('resize', detectMode);
      };
    }
  }, [mode]);

  // 获取当前标签页的URL
  useEffect(() => {
    getCurrentTabUrl();
  }, []);

  // 生成完整URL和查询部分 - 使用useEffect而不是在渲染过程中调用
  useEffect(() => {
    generateFullUrl();
  }, [originalParams, customParams, baseUrl]);

  // Tab API 相关方法
  const getCurrentTabUrl = async () => {
    try {
      const tabs = await browser.tabs.query({ active: true, currentWindow: true });
      if (!tabs[0]?.url) {
        setIsValidUrl(false);
        return;
      }

      const currentUrl = tabs[0].url;

      // 检查是否是有效URL (非浏览器内部页面)
      if (currentUrl.startsWith('chrome://') ||
          currentUrl.startsWith('edge://') ||
          currentUrl.startsWith('about:')) {
        setIsValidUrl(false);
        return;
      }

      setIsValidUrl(true);
      setUrl(currentUrl);
      processUrl(currentUrl);
    } catch (error) {
      console.error('Error getting current tab:', error);
      setIsValidUrl(false);
      Notification.error({
        title: '获取标签页失败',
        content: '无法获取当前标签页信息',
        duration: 3,
      });
    }
  };

  // URL 处理相关方法
  const processUrl = (inputUrl: string) => {
    try {
      const urlObj = new URL(inputUrl);
      const urlParams: UrlParam[] = [];

      // 提取参数
      urlObj.searchParams.forEach((value, key) => {
        urlParams.push({ key, value, isOriginal: true });
      });

      // 设置基础URL（不含参数部分）
      const base = `${urlObj.origin}${urlObj.pathname}`;
      setBaseUrl(base);
      setOriginalParams(urlParams);
      setCustomParams([]); // 重置自定义参数

      // 设置站点信息
      setSiteInfo({
        domain: urlObj.hostname,
        protocol: urlObj.protocol.replace(':', ''),
        path: urlObj.pathname
      });

      // 设置查询字符串部分
      setQueryPart(urlObj.search);
    } catch (error) {
      console.error('Error processing URL:', error);
      setIsValidUrl(false);
      Notification.error({
        title: '处理URL失败',
        content: '无效的URL格式',
        duration: 3,
      });
    }
  };

  // 生成完整URL和查询部分 - 被useEffect调用，不会导致无限循环
  const generateFullUrl = useCallback(() => {
    try {
      if (!baseUrl || baseUrl.trim() === '') {
        setFullUrl('');
        setQueryPart('');
        return;
      }

      const urlObj = new URL(baseUrl);

      // 添加原始参数
      originalParams.forEach(param => {
        if (param.key.trim()) {
          urlObj.searchParams.set(param.key, param.value);
        }
      });

      // 添加自定义参数
      customParams.forEach(param => {
        if (param.key.trim()) {
          urlObj.searchParams.set(param.key, param.value);
        }
      });

      // 更新查询部分和完整URL
      const newFullUrl = urlObj.toString();
      setQueryPart(urlObj.search);
      setFullUrl(newFullUrl);
    } catch (error) {
      console.error('Error generating URL:', error);
      setFullUrl('');
      setQueryPart('');
    }
  }, [baseUrl, originalParams, customParams]);

  // 参数管理相关方法
  const addCustomParam = () => {
    setCustomParams([...customParams, { key: '', value: '', isOriginal: false }]);
  };

  const deleteParam = (index: number, isOriginal: boolean) => {
    if (isOriginal) {
      const newParams = [...originalParams];
      newParams.splice(index, 1);
      setOriginalParams(newParams);
    } else {
      const newParams = [...customParams];
      newParams.splice(index, 1);
      setCustomParams(newParams);
    }
  };

  const updateCustomParam = (index: number, field: 'key' | 'value', value: string) => {
    const newParams = [...customParams];
    newParams[index][field] = value;
    setCustomParams(newParams);
  };

  // 工具方法
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        Notification.success({
          title: '复制成功',
          content: '已复制到剪贴板',
          duration: 3,
        });
      })
      .catch(err => {
        console.error('Failed to copy:', err);
        Notification.error({
          title: '复制失败',
          content: '无法复制到剪贴板',
          duration: 3,
        });
      });
  };

  const copyFullUrl = () => {
    copyToClipboard(fullUrl);
  };

  const copyQueryPart = () => {
    copyToClipboard(queryPart);
  };

  const copyParamsAsJson = () => {
    const params = [...originalParams, ...customParams].reduce((obj, param) => {
      obj[param.key] = param.value;
      return obj;
    }, {} as Record<string, string>);

    copyToClipboard(JSON.stringify(params, null, 2));
  };

  const copyParamsAsList = () => {
    const paramsList = [...originalParams, ...customParams].map(param => `${param.key}=${param.value}`).join('\n');
    copyToClipboard(paramsList);
  };

  const refreshUrl = () => {
    getCurrentTabUrl();
  };

  // 所有参数（用于展示）
  const allParams = [...originalParams, ...customParams];

  // 功能内容
  const functionContent = !isValidUrl ? (
    <ErrorContent onRetry={refreshUrl} />
  ) : (
    <>
      <SiteInfoCard siteInfo={siteInfo} />

      <Tabs type="line" style={{ marginBottom: '16px' }}>
        <TabPane
          tab={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span>参数编辑</span>
            </div>
          }
          itemKey="params-edit"
        >
          <ParamsTable
            originalParams={originalParams}
            customParams={customParams}
            filterKey={filterKey}
            onFilterChange={setFilterKey}
            onAddCustomParam={addCustomParam}
            onDeleteParam={deleteParam}
            onUpdateCustomParam={updateCustomParam}
          />
        </TabPane>
        <TabPane
          tab={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span>URL结果</span>
            </div>
          }
          itemKey="url-result"
        >
          <URLResult
            fullUrl={fullUrl}
            queryPart={queryPart}
            onCopyFullUrl={copyFullUrl}
            onCopyQueryPart={copyQueryPart}
          />

          <ParamsList
            params={allParams}
            onCopyQuery={copyQueryPart}
            onCopyParamsAsList={copyParamsAsList}
            onCopyParamsAsJson={copyParamsAsJson}
          />
        </TabPane>
      </Tabs>
    </>
  );

  // 样式和布局相关计算
  const containerStyle = detectedMode === 'sidebar'
    ? { maxWidth: '100%', minHeight: '100vh' }
    : { maxWidth: '800px', minHeight: '600px' };

  // 渲染标签页结构
  const renderTabs = () => {
    const tabProps = {
      activeKey: activeTab,
      onChange: (key: string) => setActiveTab(key),
      type: 'line' as const
    };

    if (detectedMode === 'popup') {
      return (
        <>
          <Sider style={{ background: 'var(--semi-color-bg-1)' }}>
            <Tabs
              {...tabProps}
              style={{ height: '100%' }}
              tabPosition="left"
            >
              <TabPane
                tab={
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 0' }}>
                    <IconSetting style={{ marginRight: '8px' }} />
                    <span>功能</span>
                  </div>
                }
                itemKey={TAB_KEYS.FUNCTION}
              />
              <TabPane
                tab={
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 0' }}>
                    <IconInfoCircle style={{ marginRight: '8px' }} />
                    <span>关于</span>
                  </div>
                }
                itemKey={TAB_KEYS.ABOUT}
              />
            </Tabs>
          </Sider>
          <Content style={{ padding: '16px' }}>
            {activeTab === TAB_KEYS.FUNCTION ? functionContent : <AboutContent />}
          </Content>
        </>
      );
    } else {
      return (
        <Content style={{ padding: '16px' }}>
          <Tabs
            {...tabProps}
            style={{ width: '100%' }}
            tabPosition="top"
          >
            <TabPane
              tab={
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <IconSetting style={{ marginRight: '8px' }} />
                  <span>功能</span>
                </div>
              }
              itemKey={TAB_KEYS.FUNCTION}
            >
              {functionContent}
            </TabPane>
            <TabPane
              tab={
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <IconInfoCircle style={{ marginRight: '8px' }} />
                  <span>关于</span>
                </div>
              }
              itemKey={TAB_KEYS.ABOUT}
            >
              <AboutContent />
            </TabPane>
          </Tabs>
        </Content>
      );
    }
  };

  // 主渲染
  return (
    <Layout className={`${className}`} style={containerStyle}>
      <Header style={{ padding: '16px', background: 'var(--semi-color-bg-1)' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <IconLink size="large" style={{ marginRight: '12px', color: 'var(--semi-color-primary)' }} />
            <Title heading={3} style={{ margin: 0 }}>URL查询工具</Title>
          </div>
          <Button
            icon={<IconRefresh />}
            onClick={refreshUrl}
            type="primary"
            theme="solid"
          >
            刷新
          </Button>
        </div>
      </Header>
      <Layout>
        {renderTabs()}
      </Layout>
    </Layout>
  );
};

export default UrlQueryTool;