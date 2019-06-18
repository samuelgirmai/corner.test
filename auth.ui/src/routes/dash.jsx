
import GridSystem from 'views/Components/GridSystem.jsx';
import Notifications from 'views/Components/Notifications.jsx';
import UserPage from 'views/Pages/UserPage.jsx';
import Panels from 'views/Components/Panels.jsx';

import RegularForms from 'views/Forms/RegularForms.jsx';
import ExtendedForms from 'views/Forms/ExtendedForms.jsx';
import ValidationForms from 'views/Forms/ValidationForms.jsx';

import RegularTables from 'views/Tables/RegularTables.jsx';
import ExtendedTables from 'views/Tables/ExtendedTables.jsx';
import DataTables from 'views/Tables/DataTables.jsx';

//import Dashboard from 'views/AUTH/Dashboard.jsx'
import RegUserMain from 'views/AUTH/RegUserMain.jsx'
import ListUserMain from 'views/AUTH/ListUserMain.jsx'
import ListCapsMain from 'views/AUTH/ListCapsMain.jsx'
import ListLogsMain from 'views/AUTH/ListLogsMain.jsx'
import UserStats from 'views/AUTH/UserStats.jsx'
//var pages = [{ path: "/pages/user-page", name: "User Page", mini: "UP", component: UserPage }].concat(pagesRoutes);

var dashRoutes = [
    { path: "/register", name: "Registration", icon: "fa fa-id-card-o", component: RegUserMain },
    { path: "/user_list", name: "User List", icon: "fa fa-list", component: ListUserMain },
    { path: "/caps", name: "Caps List", icon: "fa fa-cogs", component: ListCapsMain },
    { path: "/stats", name: "Mini Stats", icon: "fa fa-line-chart", component: UserStats },
 { path: "/logs", name: "Logs", icon: "fa fa-eye", component: ListLogsMain },

    /*{ path: "/claim", name: "Claim", icon: "fa fa-question-circle-o", component: ClaimMain },
    { path: "/settlement", name: "Settlement", icon: "fa fa-money", component: SettlementMain },
    { path: "/dashboard", name: "Dashboard", icon: "fa fa-line-chart", component: Dashboard },*/
    /*{ path: "/panels", name: "panels", icon: "fa fa-id-card-o", component: Panels },
    { collapse: true, path: "/tables", name: "Tables", state: "openTables", icon: "pe-7s-news-paper", views:
        [{ path: "/tables/regular-tables", name: "Regular Tables", mini: "RT", component: RegularTables },
        { path: "/tables/extended-tables", name: "Extended Tables", mini: "ET", component: ExtendedTables },
        { path: "/tables/data-tables", name: "Data Tables", mini: "DT", component: DataTables }]
    },
    { collapse: true, path: "/forms", name: "Forms", state: "openForms", icon: "pe-7s-note2", views:
      [{ path: "/forms/regular-forms", name: "Regular Forms", mini: "RF", component: RegularForms },
       { path: "/forms/extended-forms", name: "Extended Forms", mini: "EF", component: ExtendedForms },
       { path: "/forms/validation-forms", name: "Validation Forms", mini: "VF", component: ValidationForms }],
    },*/
    { redirect: true, path: "/", pathTo: "/register", name: "Registration" }
];
export default dashRoutes;
