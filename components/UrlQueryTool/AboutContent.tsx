import { Card, Divider, Space, Typography } from '@douyinfe/semi-ui';
import { FC } from 'react';

const AboutContent: FC = () => {
  const { Title, Text } = Typography;
  const currentYear = new Date().getFullYear();

  return (
    <Card
      title="关于URL查询工具"
      style={{ marginBottom: '16px' }}
      headerStyle={{ backgroundColor: 'var(--semi-color-primary-light-default)' }}
    >
      <Space vertical align="start" style={{ width: '100%' }}>
        <div>
          <Title heading={5}>功能介绍</Title>
          <Text>URL查询工具是一款帮助开发者和网站管理员分析、编辑和构建URL的浏览器扩展。既支持弹出窗口，也支持侧边栏面板。</Text>
        </div>

        <Divider margin="12px" />

        <div>
          <Title heading={5}>主要功能</Title>
          <ul className="list-disc ml-5">
            <li><Text>分析当前页面URL结构</Text></li>
            <li><Text>查看、添加、编辑和删除URL参数</Text></li>
            <li><Text>区分原始参数（只读）和自定义参数（可编辑）</Text></li>
            <li><Text>支持参数搜索过滤</Text></li>
            <li><Text>复制完整URL或查询字符串部分</Text></li>
            <li><Text>以JSON或列表格式复制参数</Text></li>
            <li><Text>支持侧边栏模式和弹出窗口模式</Text></li>
          </ul>
        </div>

        <Divider margin="12px" />

        <div>
          <Title heading={5}>技术栈</Title>
          <ul className="list-disc ml-5">
            <li><Text>WXT 扩展开发框架</Text></li>
            <li><Text>React 18</Text></li>
            <li><Text>Semi Design 组件库</Text></li>
            <li><Text>Tailwind CSS</Text></li>
          </ul>
        </div>

        <Divider margin="12px" />

        <div className="w-full text-center mt-4">
          <Text type="tertiary">版本: 1.0.0 © {currentYear}</Text>
        </div>
      </Space>
    </Card>
  );
};

export default AboutContent;