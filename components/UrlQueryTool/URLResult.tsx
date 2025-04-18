import { IconCopy } from '@douyinfe/semi-icons';
import { Button, Card, Divider, Space, Typography } from '@douyinfe/semi-ui';
import { FC } from 'react';

interface URLResultProps {
  fullUrl: string;
  queryPart: string;
  onCopyFullUrl: () => void;
  onCopyQueryPart: () => void;
}

const URLResult: FC<URLResultProps> = ({
  fullUrl,
  queryPart,
  onCopyFullUrl,
  onCopyQueryPart
}) => {
  const { Text } = Typography;

  return (
    <Card
      title="URL结果"
      style={{ marginBottom: '16px' }}
      headerStyle={{ backgroundColor: 'var(--semi-color-primary-light-default)' }}
    >
      <Space vertical spacing="loose" align="start" style={{ width: '100%' }}>
        <div style={{ width: '100%' }}>
          <div className="flex justify-between items-center mb-2">
            <Text strong>编码后完整URL</Text>
            <Button
              icon={<IconCopy />}
              onClick={onCopyFullUrl}
              type="secondary"
              size="small"
            >
              复制
            </Button>
          </div>
          <div className="p-2 bg-white border border-gray-200 rounded break-all">
            <Text code copyable={false}>{fullUrl || '无URL数据'}</Text>
          </div>
        </div>

        <Divider margin="12px" />

        <div style={{ width: '100%' }}>
          <div className="flex justify-between items-center mb-2">
            <Text strong>查询字符串部分</Text>
            <Button
              icon={<IconCopy />}
              onClick={onCopyQueryPart}
              type="secondary"
              size="small"
            >
              复制
            </Button>
          </div>
          <div className="p-2 bg-white border border-gray-200 rounded break-all">
            <Text code copyable={false}>{queryPart || '无查询参数'}</Text>
          </div>
        </div>
      </Space>
    </Card>
  );
};

export default URLResult;