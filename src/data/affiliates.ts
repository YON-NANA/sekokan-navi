export interface AffiliateItem {
  id: string;
  name: string;
  url: string;
  trackingPixelUrl: string;
  description?: string;
}

export const AFFILIATES: Record<string, AffiliateItem> = {
  nousen: {
    id: "nousen",
    name: "能セン",
    url: "https://px.a8.net/svt/ejp?a8mat=4BEFL1+4NWA56+5TS8+5YJRM",
    trackingPixelUrl: "https://www16.a8.net/0.gif?a8mat=4BEFL1+4NWA56+5TS8+5YJRM",
    description: "資格合格支援スクール【能セン】",
  },
  dokugaku: {
    id: "dokugaku",
    name: "独学サポート事務局",
    url: "https://px.a8.net/svt/ejp?a8mat=4BEFL1+4M3ZBU+4ASS+64RJ6",
    trackingPixelUrl: "https://www10.a8.net/0.gif?a8mat=4BEFL1+4M3ZBU+4ASS+64RJ6",
    description: "施工管理技士の経験記述・論文対策なら【独学サポート事務局】",
  },
} as const;

export const affiliatesList: AffiliateItem[] = Object.values(AFFILIATES);

export function getAffiliate(id: string): AffiliateItem | undefined {
  return AFFILIATES[id];
}
