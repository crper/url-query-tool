import { IconInfoCircle, IconRefresh } from '@douyinfe/semi-icons';
import { Button, Empty } from '@douyinfe/semi-ui';
import { FC } from 'react';

interface ErrorContentProps {
  onRetry: () => void;
}

const ErrorContent: FC<ErrorContentProps> = ({ onRetry }) => {
  return (
    <Empty
      image={<IconInfoCircle size="large" />}
      title="无法处理当前页面"
      description="当前页面可能是浏览器内部页面或者URL格式无效，请访问正常网页后再使用该扩展。"
    >
      <Button
        type="primary"
        onClick={onRetry}
        icon={<IconRefresh />}
        style={{ marginTop: '16px' }}
      >
        重试
      </Button>
    </Empty>
  );
};

export default ErrorContent;