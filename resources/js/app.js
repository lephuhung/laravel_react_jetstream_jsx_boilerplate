require ('./bootstrap')
import {App} from "@inertiajs/inertia-react";
import {createRoot} from "react-dom/client";
import {InertiaProgress} from '@inertiajs/progress';
import 'antd/dist/antd.css';
const element= document.getElementById('app');
const root = createRoot(element);

root.render(
    <App
        initialPage={JSON.parse(element.dataset.page)}
        resolveComponent={name => import(`./Pages/${name}`).then(module => module.default)}
    />
)

InertiaProgress.init({color: '#4B5563'});
