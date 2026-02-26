export type MenuItem = {
  label: string;
  description?: string;
  action: () => void;
};

export type MenuGroup = {
  id: string;
  label: string;
  items: MenuItem[];
};

type TranslateFn = (key: string) => string;

type MenuActions = {
  toHome: () => void;
  toProperties: () => void;
  toAbout: () => void;
  toContact: () => void;
  toPhilosophy: () => void;
  toInvest: () => void;
  toNeighborhood: () => void;
  toValuation: () => void;
  toInsights: () => void;
  openAgentPortal: () => void;
  openPartnerModal: () => void;
};

export function buildMenuGroups(t: TranslateFn, actions: MenuActions): MenuGroup[] {
  return [
    {
      id: 'discover',
      label: t('menuOverlay.groups.discover'),
      items: [
        { label: t('nav.home'), action: actions.toHome },
        { label: t('nav.properties'), action: actions.toProperties },
        { label: t('nav.about'), action: actions.toAbout },
        { label: t('nav.contact'), action: actions.toContact },
      ],
    },
    {
      id: 'invest',
      label: t('menuOverlay.groups.invest'),
      items: [
        { label: t('philosophy.sectionTitle'), action: actions.toPhilosophy },
        { label: t('investment.eyebrow'), action: actions.toInvest },
        { label: t('neighborhood.eyebrow'), action: actions.toNeighborhood },
        { label: t('nav.valuation'), action: actions.toValuation },
        { label: t('nav.insights'), action: actions.toInsights },
      ],
    },
    {
      id: 'private',
      label: t('menuOverlay.privateArea'),
      items: [
        {
          label: t('menuOverlay.agentPortalTitle'),
          description: t('menuOverlay.agentPortalDescription'),
          action: actions.openAgentPortal,
        },
        {
          label: t('menuOverlay.partnerPortalTitle'),
          description: t('menuOverlay.partnerPortalDescription'),
          action: actions.openPartnerModal,
        },
        {
          label: t('menuOverlay.dataLabPortalTitle'),
          description: t('menuOverlay.dataLabPortalDescription'),
          action: actions.openPartnerModal,
        },
      ],
    },
  ];
}
