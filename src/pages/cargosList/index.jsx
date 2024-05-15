import React, {useMemo} from 'react';
import CargosList from "./containers/CargosList";
import useLocationSearch from "../../misc/hooks/useLocationSearch";
import getMessages from "../cargoDetails/intl";
import IntlProvider from "../../misc/providers/IntlProvider";
import {Provider} from "react-redux";
import configureStore from "../../misc/redux/configureStore";
import rootReducer from "./reducers"
import { composeWithDevTools } from "@redux-devtools/extension";

const store = configureStore(rootReducer, composeWithDevTools())

export default function Index() {
    const {lang} = useLocationSearch();
    const messages = useMemo(() => getMessages(lang), [lang]);
    return (
        <Provider store={store} >
            <IntlProvider messages={messages}>
                <CargosList/>
            </IntlProvider>
        </Provider>
    );
}
