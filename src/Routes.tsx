import React from "react";
import { Route, Switch } from "react-router-dom";

import { PATH_ROUTES } from "./constants/pathRoutes";
import { App } from "./components/app/App";
import { NotFound } from "./components/notFound/NotFound";
import { Header } from "./components/header/Header";
import { IndicatorEditor } from "./components/indicatorEditor/IndicatorEditor";
import { IndicatorCreator } from "./components/indicatorCreactor/IndicatorCreator";

export const Routes: React.FunctionComponent = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path={PATH_ROUTES.home} component={App} />
        <Route
          exact
          path={PATH_ROUTES.editorPage}
          component={IndicatorEditor}
        />
        <Route
          exact
          path={PATH_ROUTES.creatorPage}
          component={IndicatorCreator}
        />
        <Route component={NotFound} />
      </Switch>
    </>
  );
};
