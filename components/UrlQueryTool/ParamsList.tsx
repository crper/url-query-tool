import { IconCopy } from '@douyinfe/semi-icons';
import { Button, Card, Empty, Space, Tag, Typography } from '@douyinfe/semi-ui';
import { FC } from 'react';
import { UrlParam } from './types';

interface ParamsListProps {
  params: UrlParam[];
  onCopyQuery: () => void;
  onCopyParamsAsList: () => void;
  onCopyParamsAsJson: () => void;
}

const ParamsList: FC<ParamsListProps> = ({
  params,
  onCopyQuery,
  onCopyParamsAsList,
  onCopyParamsAsJson
}) => {
  const { Text } = Typography;

  return (
    <Card
      title="参数列表"
      style={{ marginBottom: '16px' }}
      headerStyle={{ backgroundColor: 'var(--semi-color-primary-light-default)' }}
      headerExtraContent={
        <Space>
          <Button
            icon={<IconCopy />}
            onClick={onCopyQuery}
            type="secondary"
            size="small"
          >
            复制查询字符串
          </Button>
          <Button
            icon={<IconCopy />}
            onClick={onCopyParamsAsJson}
            type="secondary"
            size="small"
          >
            复制为JSON
          </Button>
          <Button
            icon={<IconCopy />}
            onClick={onCopyParamsAsList}
            type="secondary"
            size="small"
          >
            复制为列表
          </Button>
        </Space>
      }
    >
      {params.length > 0 ? (
        <div className="mt-4">
          {params.map((item, index) => (
            <div key={`${item.key}-${index}`} className="flex mb-3 items-center">
              <div className="flex items-center w-1/3">
                <Tag
                  color={item.isOriginal ? "blue" : "green"}
                  size="small"
                  shape="circle"
                >
                  {item.isOriginal ? "原始" : "自定义"}
                </Tag>
                <Text strong className="ml-2">{item.key}</Text>
              </div>
              <div className="w-2/3">
                <Text>{item.value}</Text>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Empty description="暂无参数" />
      )}
    </Card>
  );
};

export default ParamsList;