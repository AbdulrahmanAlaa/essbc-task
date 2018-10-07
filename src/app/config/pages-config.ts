/**
 * holds all application routes that could be replaced in future with out cracking
 * the app
 */
export const pages = {
    home: {
        path: 'home',
        loadChildren: 'src/app/home/home.module#HomeModule',
        children: {
            user: {
                path: ''
            }
        }
    },
    userManagement: {
        path: 'users',
        loadChildren: 'src/app/user-management/user-management.module#UserManagementModule',
        children: {
            list: {
                path: ''
            },
            add: {
                path: 'add'
            },
            edit: {
                path: ':id'
            },
            delete: {
                path: 'delete/:id'
            }

        }
    }
};
