import { IconDelete, IconLink, IconPlus, IconSearch } from '@douyinfe/semi-icons';
import { Button, Card, Empty, Input, Space, Table, Tag, Typography } from '@douyinfe/semi-ui';
import { FC } from 'react';
import { UrlParam } from './types';

interface ParamsTableProps {
  originalParams: UrlParam[];
  customParams: UrlParam[];
  filterKey: string;
  onFilterChange: (value: string) => void;
  onAddCustomParam: () => void;
  onDeleteParam: (index: number, isOriginal: boolean) => void;
  onUpdateCustomParam: (index: number, field: 'key' | 'value', value: string) => void;
}

const ParamsTable: FC<ParamsTableProps> = ({
  originalParams,
  customParams,
  filterKey,
  onFilterChange,
  onAddCustomParam,
  onDeleteParam,
  onUpdateCustomParam
}) => {
  const { Text } = Typography;

  // 过滤参数
  const filteredOriginalParams = filterKey.trim()
    ? originalParams.filter(param => param.key.toLowerCase().includes(filterKey.toLowerCase()))
    : originalParams;

  const filteredCustomParams = filterKey.trim()
    ? customParams.filter(param => param.key.toLowerCase().includes(filterKey.toLowerCase()))
    : customParams;

  // 表格列定义 - 原始参数（只读）
  const originalParamsColumns = [
    {
      title: 'Key',
      dataIndex: 'key',
      key: 'key',
      render: (text: string) => (
        <Input
          value={text}
          readOnly
          placeholder="参数名"
          addonBefore={<Tag color="blue" size="small" shape="circle">原始</Tag>}
        />
      ),
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      render: (text: string) => (
        <Input value={text} readOnly placeholder="参数值" />
      ),
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (_: any, _record: UrlParam, index: number) => (
        <Button
          type="danger"
          icon={<IconDelete />}
          onClick={() => onDeleteParam(index, true)}
          size="small"
        >
          删除
        </Button>
      ),
    },
  ];

  // 表格列定义 - 自定义参数（可编辑）
  const customParamsColumns = [
    {
      title: 'Key',
      dataIndex: 'key',
      key: 'key',
      render: (text: string, _record: UrlParam, index: number) => (
        <Input
          value={text}
          onChange={(value) => onUpdateCustomParam(index, 'key', value)}
          onCompositionEnd={(e: React.CompositionEvent<HTMLInputElement>) => onUpdateCustomParam(index, 'key', e.currentTarget.value)}
          placeholder="参数名"
          addonBefore={<Tag color="green" size="small" shape="circle">自定义</Tag>}
        />
      ),
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      render: (text: string, _record: UrlParam, index: number) => (
        <Input
          value={text}
          onChange={(value) => onUpdateCustomParam(index, 'value', value)}
          onCompositionEnd={(e: React.CompositionEvent<HTMLInputElement>) => onUpdateCustomParam(index, 'value', e.currentTarget.value)}
          placeholder="参数值"
        />
      ),
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (_: any, _record: UrlParam, index: number) => (
        <Button
          type="danger"
          icon={<IconDelete />}
          onClick={() => onDeleteParam(index, false)}
          size="small"
        >
          删除
        </Button>
      ),
    },
  ];

  return (
    <Card
      title="URL参数"
      style={{ marginBottom: '16px' }}
      headerStyle={{ backgroundColor: 'var(--semi-color-primary-light-default)' }}
      headerExtraContent={
        <Space>
          <Input
            prefix={<IconSearch />}
            placeholder="搜索参数名"
            value={filterKey}
            onChange={onFilterChange}
            style={{ width: 200 }}
            showClear
          />
        </Space>
      }
    >
      {/* 自定义参数表格 - 移动到最上方 */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <div>
            <Tag color="green" size="large">自定义参数</Tag>
            <Text className="ml-2" type="secondary">（可自由修改）</Text>
          </div>
          <Button
            icon={<IconPlus />}
            onClick={onAddCustomParam}
            type="primary"
            theme="solid"
          >
            添加参数
          </Button>
        </div>
        {filteredCustomParams.length > 0 ? (
          <Table
            columns={customParamsColumns}
            dataSource={filteredCustomParams.map((param, index) => ({ ...param, id: `custom-${index}` }))}
            pagination={false}
            size="small"
            rowKey="id"
          />
        ) : (
          <Empty
            image={<IconLink size="large" />}
            title={customParams.length > 0 ? "无匹配参数" : "暂无自定义参数"}
            description={customParams.length > 0 ? "尝试其他搜索关键词" : "点击添加参数按钮开始编辑URL参数"}
          />
        )}
      </div>

      {/* 原始参数表格 */}
      {filteredOriginalParams.length > 0 && (
        <>
          <div className="mb-2 mt-4">
            <Tag color="blue" size="large">原始参数</Tag>
            <Text className="ml-2" type="secondary">（只可删除，不可修改）</Text>
          </div>
          <Table
            columns={originalParamsColumns}
            dataSource={filteredOriginalParams.map((param, index) => ({ ...param, id: `original-${index}` }))}
            pagination={false}
            size="small"
            rowKey="id"
          />
        </>
      )}
    </Card>
  );
};

export default ParamsTable;