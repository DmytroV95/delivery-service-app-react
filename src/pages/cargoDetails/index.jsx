import useLocationSearch from "misc/hooks/useLocationSearch";
import {useMemo} from "react";
import getMessages from "./intl";
import IntlProvider from "misc/providers/IntlProvider";
import CargoDetails from "./containers/CargoDetails";
import {Provider} from "react-redux";
import configureStore from "../../misc/redux/configureStore";
import rootReducer from "./reducers"
import {composeWithDevTools} from "@redux-devtools/extension";

const store = configureStore(rootReducer, composeWithDevTools())

function Index() {
  const { lang } = useLocationSearch();
  const messages = useMemo(() => getMessages(lang), [lang]);
  return (
      <Provider store={store} >
    <IntlProvider messages={messages}>
      <CargoDetails />
    </IntlProvider>
      </Provider>
  );
}

export default Index;
