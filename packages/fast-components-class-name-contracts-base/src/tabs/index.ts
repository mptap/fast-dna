/**
 * The class name contract for the tabs component
 */
export interface TabsClassNameContract {
    /**
     * The root of the tabs component
     */
    tabs?: string;

    /**
     * The tab panels
     */
    tabs_tabPanels?: string;

    /**
     * The tab list
     */
    tabs_tabList?: string;
}

export interface TabClassNameContract {
    /**
     * The root of the tab components
     */
    tab?: string;

    /**
     * The active tab modifier
     */
    tab__active?: string;
}

export interface TabPanelClassNameContract {
    /**
     * The root of the tab panel component
     */
    tabPanel?: string;

    /**
     * The hidden tab panel modifier
     */
    tabPanel__hidden?: string;
}
