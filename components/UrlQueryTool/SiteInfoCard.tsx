import { Card, Tag, Tooltip, Typography } from '@douyinfe/semi-ui';
import { FC } from 'react';
import { SiteInfo } from './types';

interface SiteInfoCardProps {
  siteInfo: SiteInfo;
}

const SiteInfoCard: FC<SiteInfoCardProps> = ({ siteInfo }) => {
  const { Text } = Typography;

  return (
    <Card
      title="站点信息"
      style={{ marginBottom: '16px' }}
      headerStyle={{ backgroundColor: 'var(--semi-color-primary-light-default)' }}
    >
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Text type="secondary">域名</Text>
          <div>
            <Tag color="blue" size="large">{siteInfo.domain || '-'}</Tag>
          </div>
        </div>
        <div>
          <Text type="secondary">协议</Text>
          <div>
            <Tag color="green" size="large">{siteInfo.protocol || '-'}</Tag>
          </div>
        </div>
        <div>
          <Text type="secondary">路径</Text>
          <div>
            <Tooltip content={siteInfo.path}>
              <Tag color="purple" size="large">
                {siteInfo.path ? (siteInfo.path.length > 15 ? siteInfo.path.substring(0, 15) + '...' : siteInfo.path) : '-'}
              </Tag>
            </Tooltip>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SiteInfoCard;