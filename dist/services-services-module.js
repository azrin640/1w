(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["services-services-module"],{

/***/ "./src/app/main/documentation/services/fuse-config/fuse-config.component.html":
/*!************************************************************************************!*\
  !*** ./src/app/main/documentation/services/fuse-config/fuse-config.component.html ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"fuse-config\" class=\"page-layout simple fullwidth docs\">\n\n    <!-- HEADER -->\n    <div class=\"header accent p-24 h-160\" fxLayout=\"row\" fxLayoutAlign=\"start center\">\n        <div fxLayout=\"column\" fxLayoutAlign=\"center start\">\n            <div fxLayout=\"row\" fxLayoutAlign=\"start center\">\n                <mat-icon class=\"secondary-text s-18\">home</mat-icon>\n                <mat-icon class=\"secondary-text s-16\">chevron_right</mat-icon>\n                <span class=\"secondary-text\">Documentation</span>\n                <mat-icon class=\"secondary-text s-16\">chevron_right</mat-icon>\n                <span class=\"secondary-text\">Services</span>\n            </div>\n            <div class=\"h2 mt-16\">Fuse Config</div>\n        </div>\n    </div>\n    <!-- / HEADER -->\n\n    <!-- CONTENT -->\n    <div class=\"content p-24\">\n\n        <p>\n            <code>Config</code> is a custom built Fuse service allows to have a granular control over the Fuse. It can\n            be used for changing theme options (layout, color etc.) by component basis.\n        </p>\n\n            <div class=\"section-title\">Usage</div>\n            <p class=\"py-8\">\n\n            <fuse-highlight lang=\"typescript\">\n                <textarea #source>\n\n                    export class SomeComponent\n                    {\n                        config: any;\n\n                        constructor(\n                            private _fuseConfigService: FuseConfigService\n                        )\n                        {\n                            // Fully customizable surroundings for this particular component\n                            this._fuseConfigService.config = {\n                                colorTheme      : 'theme-default-dark',\n                                layout          : {\n                                    style    : 'vertical-layout-1',\n                                    width    : 'fullwidth',\n                                    navbar   : {\n                                        primaryBackground  : 'fuse-navy-700',\n                                        secondaryBackground: 'fuse-navy-900',\n                                        folded             : false,\n                                        hidden             : false,\n                                        position           : 'left',\n                                        variant            : 'vertical-style-1'\n                                    },\n                                    toolbar  : {\n                                        customBackgroundColor: false,\n                                        background           : 'fuse-white-500',\n                                        hidden               : false,\n                                        position             : 'below-static'\n                                    },\n                                    footer   : {\n                                        customBackgroundColor: true,\n                                        background           : 'fuse-navy-900',\n                                        hidden               : false,\n                                        position             : 'below-fixed'\n                                    },\n                                    sidepanel: {\n                                        hidden  : false,\n                                        position: 'right'\n                                    }\n                                },\n                                customScrollbars: true\n                            });\n                        }\n\n                        onInit()\n                        {\n                            // Subscribe to config change\n                            this._fuseConfigService.config\n                                .subscribe((config) => {\n                                    this.config = config;\n                                });\n                        }\n                    }\n\n                </textarea>\n            </fuse-highlight>\n\n        </p>\n\n    </div>\n\n</div>\n\n"

/***/ }),

/***/ "./src/app/main/documentation/services/fuse-config/fuse-config.component.scss":
/*!************************************************************************************!*\
  !*** ./src/app/main/documentation/services/fuse-config/fuse-config.component.scss ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21haW4vZG9jdW1lbnRhdGlvbi9zZXJ2aWNlcy9mdXNlLWNvbmZpZy9mdXNlLWNvbmZpZy5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/main/documentation/services/fuse-config/fuse-config.component.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/main/documentation/services/fuse-config/fuse-config.component.ts ***!
  \**********************************************************************************/
/*! exports provided: FuseConfigServiceDocsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FuseConfigServiceDocsComponent", function() { return FuseConfigServiceDocsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var FuseConfigServiceDocsComponent = /** @class */ (function () {
    /**
     * Constructor
     */
    function FuseConfigServiceDocsComponent() {
    }
    FuseConfigServiceDocsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'fuse-config-service-docs',
            template: __webpack_require__(/*! ./fuse-config.component.html */ "./src/app/main/documentation/services/fuse-config/fuse-config.component.html"),
            styles: [__webpack_require__(/*! ./fuse-config.component.scss */ "./src/app/main/documentation/services/fuse-config/fuse-config.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], FuseConfigServiceDocsComponent);
    return FuseConfigServiceDocsComponent;
}());



/***/ }),

/***/ "./src/app/main/documentation/services/fuse-splash-screen/fuse-splash-screen.component.html":
/*!**************************************************************************************************!*\
  !*** ./src/app/main/documentation/services/fuse-splash-screen/fuse-splash-screen.component.html ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"splash-screen\" class=\"page-layout simple fullwidth docs\">\n\n    <!-- HEADER -->\n    <div class=\"header accent p-24 h-160\" fxLayout=\"row\" fxLayoutAlign=\"start center\">\n        <div fxLayout=\"column\" fxLayoutAlign=\"center start\">\n            <div fxLayout=\"row\" fxLayoutAlign=\"start center\">\n                <mat-icon class=\"secondary-text s-18\">home</mat-icon>\n                <mat-icon class=\"secondary-text s-16\">chevron_right</mat-icon>\n                <span class=\"secondary-text\">Documentation</span>\n                <mat-icon class=\"secondary-text s-16\">chevron_right</mat-icon>\n                <span class=\"secondary-text\">Services</span>\n            </div>\n            <div class=\"h2 mt-16\">Fuse Splash Screen</div>\n        </div>\n    </div>\n    <!-- / HEADER -->\n\n    <!-- CONTENT -->\n    <div class=\"content p-24\">\n\n        <p>\n            <code>Splash screen</code> is a custom Fuse service that allows to have a control on the splash screen.\n        </p>\n\n        <div class=\"section-title\">Usage</div>\n        <p class=\"py-8\">\n\n            <fuse-highlight lang=\"typescript\">\n                <textarea #source>\n\n                    export class SomeComponent implements OnInit\n                    {\n                        constructor(\n                            private _fuseSplashScreenService: FuseSplashScreenService\n                        ) {}\n\n                        ngOnInit()\n                        {\n                            this._fuseSplashScreenService.show();\n\n                            setTimeout(() => {\n                                this._fuseSplashScreenService.hide();\n                            }, 3000);\n                        }\n                    }\n\n                </textarea>\n            </fuse-highlight>\n\n        </p>\n\n    </div>\n\n</div>\n\n"

/***/ }),

/***/ "./src/app/main/documentation/services/fuse-splash-screen/fuse-splash-screen.component.scss":
/*!**************************************************************************************************!*\
  !*** ./src/app/main/documentation/services/fuse-splash-screen/fuse-splash-screen.component.scss ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21haW4vZG9jdW1lbnRhdGlvbi9zZXJ2aWNlcy9mdXNlLXNwbGFzaC1zY3JlZW4vZnVzZS1zcGxhc2gtc2NyZWVuLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/main/documentation/services/fuse-splash-screen/fuse-splash-screen.component.ts":
/*!************************************************************************************************!*\
  !*** ./src/app/main/documentation/services/fuse-splash-screen/fuse-splash-screen.component.ts ***!
  \************************************************************************************************/
/*! exports provided: FuseSplashScreenServiceDocsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FuseSplashScreenServiceDocsComponent", function() { return FuseSplashScreenServiceDocsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var FuseSplashScreenServiceDocsComponent = /** @class */ (function () {
    /**
     * Constructor
     */
    function FuseSplashScreenServiceDocsComponent() {
    }
    FuseSplashScreenServiceDocsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'fuse-splash-screen-service-docs',
            template: __webpack_require__(/*! ./fuse-splash-screen.component.html */ "./src/app/main/documentation/services/fuse-splash-screen/fuse-splash-screen.component.html"),
            styles: [__webpack_require__(/*! ./fuse-splash-screen.component.scss */ "./src/app/main/documentation/services/fuse-splash-screen/fuse-splash-screen.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], FuseSplashScreenServiceDocsComponent);
    return FuseSplashScreenServiceDocsComponent;
}());



/***/ }),

/***/ "./src/app/main/documentation/services/services.module.ts":
/*!****************************************************************!*\
  !*** ./src/app/main/documentation/services/services.module.ts ***!
  \****************************************************************/
/*! exports provided: ServicesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServicesModule", function() { return ServicesModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _fuse_shared_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fuse/shared.module */ "./src/@fuse/shared.module.ts");
/* harmony import */ var _fuse_components_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fuse/components/index */ "./src/@fuse/components/index.ts");
/* harmony import */ var app_main_documentation_services_fuse_config_fuse_config_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/main/documentation/services/fuse-config/fuse-config.component */ "./src/app/main/documentation/services/fuse-config/fuse-config.component.ts");
/* harmony import */ var app_main_documentation_services_fuse_splash_screen_fuse_splash_screen_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/main/documentation/services/fuse-splash-screen/fuse-splash-screen.component */ "./src/app/main/documentation/services/fuse-splash-screen/fuse-splash-screen.component.ts");








var routes = [
    {
        path: 'fuse-config',
        component: app_main_documentation_services_fuse_config_fuse_config_component__WEBPACK_IMPORTED_MODULE_6__["FuseConfigServiceDocsComponent"]
    },
    {
        path: 'fuse-splash-screen',
        component: app_main_documentation_services_fuse_splash_screen_fuse_splash_screen_component__WEBPACK_IMPORTED_MODULE_7__["FuseSplashScreenServiceDocsComponent"]
    }
];
var ServicesModule = /** @class */ (function () {
    function ServicesModule() {
    }
    ServicesModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                app_main_documentation_services_fuse_config_fuse_config_component__WEBPACK_IMPORTED_MODULE_6__["FuseConfigServiceDocsComponent"],
                app_main_documentation_services_fuse_splash_screen_fuse_splash_screen_component__WEBPACK_IMPORTED_MODULE_7__["FuseSplashScreenServiceDocsComponent"]
            ],
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes),
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatIconModule"],
                _fuse_shared_module__WEBPACK_IMPORTED_MODULE_4__["FuseSharedModule"],
                _fuse_components_index__WEBPACK_IMPORTED_MODULE_5__["FuseHighlightModule"]
            ]
        })
    ], ServicesModule);
    return ServicesModule;
}());



/***/ })

}]);
//# sourceMappingURL=services-services-module.js.map