import { WithRouterStatics } from "react-router";

export type IScreen = {
    handle?: string,
    title: string,
    component: JSX.Element,
    listed?: boolean,

}

export type IApplet = {
    handle: string,
    title: string,
    icon: JSX.Element | null,
    component: JSX.Element,
    screens: IScreen[],
};