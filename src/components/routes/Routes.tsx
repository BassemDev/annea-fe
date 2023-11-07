import React from "react";
import { Route, Switch } from "react-router-dom";

import { PATH_ROUTES } from "../../constants/pathRoutes";
import { App } from "../app/App";
import { NotFound } from "../notFound/NotFound";
import { Header } from "../header/Header";
import { IndicatorEditor } from "../indicatorEditor/IndicatorEditor";
import { IndicatorCreator } from "../indicatorCreactor/IndicatorCreator";

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
