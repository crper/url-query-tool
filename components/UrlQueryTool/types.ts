// 定义URL参数类型
export interface UrlParam {
    key: string;
    value: string;
    isOriginal?: boolean; // 标记是否为原始参数
}

// 定义站点信息类型
export interface SiteInfo {
    domain: string;
    protocol: string;
    path: string;
}

// 组件属性类型
export interface UrlQueryToolProps {
    className?: string;
    mode?: 'popup' | 'sidebar';
}

// 常量定义
export const DEFAULT_SITE_INFO: SiteInfo = {
    domain: '',
    protocol: '',
    path: ''
};

export const TAB_KEYS = {
    FUNCTION: 'function',
    ABOUT: 'about'
};