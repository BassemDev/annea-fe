import React from "react";
import { Route, Switch } from "react-router-dom";

import { PATH_ROUTES } from "./constants/pathRoutes";
import { App } from "./components/app/App";
import { NotFound } from "./components/notFound/NotFound";
import { Header } from "./components/header/Header";
import { IndicatorEditor } from "./components/indicatorEditor/IndicatorEditor";

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
        <Route component={NotFound} />
      </Switch>
    </>
  );
};
