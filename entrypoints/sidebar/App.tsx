import { ConfigProvider } from '@douyinfe/semi-ui';
import '@douyinfe/semi-ui/dist/css/semi.min.css';
import zh_CN from '@douyinfe/semi-ui/lib/es/locale/source/zh_CN';
import UrlQueryTool from '../../components/UrlQueryTool';

function App() {
  return (
    <ConfigProvider locale={zh_CN}>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <UrlQueryTool mode="sidebar" />
      </div>
    </ConfigProvider>
  );
}

export default App;