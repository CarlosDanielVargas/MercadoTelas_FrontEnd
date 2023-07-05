import {createApp, reactive} from 'vue';
import {createRouter, createWebHistory} from 'vue-router';

import store from './store';
import App from './App.vue';
import Home from './components/Home-component.vue';
import UserProfile from './components/UserProfile.vue';
import InventoryTable from './components/Lists/InventoryTableCopy.vue';
import BarsGraphic from './components/BarsGraphic.vue';


//--Vistas transaccionales--
import Entry from './components/Transactional/Inventory-Entry.vue';
import Transfer from './components/Transactional/Inventory-Transfer.vue';
import Output from './components/Transactional/Inventory-Output.vue'

//--Editar--
import EditCategory from './components/Edits/EditCategory.vue';
import EditSubcategory from './components/Edits/EditSubcategory.vue';
import EditBrand from './components/Edits/EditBrand.vue';
import EditDesign from './components/Edits/EditDesign.vue';
import EditWarehouse from './components/Edits/EditWarehouse.vue';

//--Enlistar--
import ListCategory from './components/Lists/ListCategory.vue';
import ListSubcategory from './components/Lists/ListSubcategory.vue';
import ListBrand from './components/Lists/ListBrand.vue';
import ListDesign from './components/Lists/ListDesign.vue';
import ListWareHouse from './components/Lists/ListWarehouse.vue';
import ListArticle from './components/Lists/ListArticle.vue';
import ListUser from './components/Lists/ListUsers.vue';
import ListTransaction from "./components/Lists/ListTransaction.vue";

//--Articulos relacionadas--
import ViewArticle from './components/Details/ViewArticle.vue';
import AddArticle from './components/Adds/AddArticle.vue';
import AddCategory from './components/Adds/AddCategory.vue';
import AddBrand from './components/Adds/AddBrand.vue';
import AddSubcategory from './components/Adds/AddSubcategory.vue';
import AddDesign from './components/Adds/AddDesign.vue';
import AddWareHouse from './components/Adds/AddWareHouse.vue';
import EditArticle from './components/Edits/EditArticle.vue';

//--Login--
import LoginUser from './components/Login/LoginUser.vue';
import RegisterUser from './components/Login/RegisterUser.vue';
import SendEmail from './components/Login/SendEmail.vue';
//import ResetPassword from './components/Login/ResetPassword.vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/custom-bootstrap.scss';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '',
            redirect: '/login',
        },
        {
            path: '/',
            component: '/login',
        },
        {
            path: '/login',
            component: LoginUser,
        },
        {
            component: App,
            meta: {requiresAuth: true},
        },
        {
            path: '/home',
            component: Home,
            meta: {requiresAuth: true},
            children: [
                {
                    path: 'barsGraphic',
                    component: BarsGraphic,
                    meta: {requiresAuth: true},
                },
            ]
        },
        {path: '/userProfile', component: UserProfile, meta: {requiresAuth: true},},
        {path: '/entry', component: Entry, meta: {requiresAuth: true}},
        {path: '/transfer', component: Transfer, meta: {requiresAuth: true}},
        {path: '/output', component: Output, meta: {requiresAuth: true}},
        {path: '/inventory', component: InventoryTable, meta: {requiresAuth: true},},
        {path: '/items/new', name: 'AddArticle', component: AddArticle, meta: {requiresAuth: true},},
        {path: '/categories/new', name: 'AddCategory', component: AddCategory, meta: {requiresAuth: true},},
        {path: '/subcategories/new', name: 'AddSubcategory', component: AddSubcategory, meta: {requiresAuth: true},},
        {path: '/brands/new', name: 'AddBrand', component: AddBrand, meta: {requiresAuth: true},},
        {path: '/designs/new', name: 'AddDesign', component: AddDesign, meta: {requiresAuth: true},},
        {path: '/warehouses/new', name: 'AddWarehouse', component: AddWareHouse, meta: {requiresAuth: true},},
        {path: '/items', name: "Items", component: ListArticle, meta: {requiresAuth: true},},
        {path: '/categories', component: ListCategory, meta: {requiresAuth: true},},
        {path: '/subcategories', component: ListSubcategory, meta: {requiresAuth: true},},
        {path: '/brands', component: ListBrand, meta: {requiresAuth: true},},
        {path: '/designs', component: ListDesign, meta: {requiresAuth: true},},
        {path: '/warehouses', component: ListWareHouse, meta: {requiresAuth: true},},
        {path: '/users', component: ListUser, meta: {requiresAuth: true},},
        {path: '/users/new', name: 'AddUser', component: RegisterUser, meta: {requiresAuth: true},},
        {path: '/login', component: LoginUser,},
        {path: '/sendEmail', component: SendEmail,},
        {
            path: '/items/edit/:id',
            name: 'EditArticle',
            component: EditArticle,
            props: true,
            meta: {requiresAuth: true},
        },
        {path: '/items/:id', name: 'ViewArticle', component: ViewArticle, meta: {requiresAuth: true},},
        {
            path: '/categories/edit/:id',
            name: 'EditCategory',
            component: EditCategory,
            props: true,
            meta: {requiresAuth: true},
        },
        {
            path: '/subcategories/edit/:id',
            name: 'EditSubcategory',
            component: EditSubcategory,
            props: true,
            meta: {requiresAuth: true},
        },
        {
            path: '/warehouses/edit/:id',
            name: 'EditWarehouse',
            component: EditWarehouse,
            props: true,
            meta: {requiresAuth: true},
        },
        {path: '/brands/edit/:id', name: 'EditBrand', component: EditBrand, props: true, meta: {requiresAuth: true},},
        {
            path: '/designs/edit/:id',
            name: 'EditDesign',
            component: EditDesign,
            props: true,
            meta: {requiresAuth: true},
        },
        {path: '/transactions', name: 'ListTransaction', component: ListTransaction, meta: {requiresAuth: true},},
    ]
});

const app = createApp(App);
app.use(store);
app.use(router);


// Agregar un guardia de navegación para verificar la autenticación en las rutas con requiresAuth: true
router.beforeResolve((to, from, next) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    console.log(store.state.isLoggedIn);

    if (!store.state.isLoggedIn && requiresAuth) {
        next('/login');
    } else {
        next();
    }
});

const state = reactive({
    navbarTitle: 'Inicio'
});

app.config.globalProperties.$state = state;

app.mount('#app');
