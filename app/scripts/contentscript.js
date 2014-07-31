'use strict';

window.addEventListener("load", function() {
    var name = 'CanopyScreenShotter';
    var app = angular.module(name, []);

    var html = document.querySelector('html');
    html.setAttribute('ng-app', '');
    html.setAttribute('ng-csp', '');

    var viewport = document.getElementById('tst_group_build_fail');
    if (!viewport){
        return;
    }
    viewport.setAttribute('ng-controller', 'MainController');
    app.controller('MainController', function ($scope) {});

    var e = angular.element(viewport.querySelector('.fullStacktrace'));
    console.log('found collection:');
    console.log(e);

    e.append("<div my-directive></div>");

//    var myDirective = document.createElement('div');
//    myDirective.setAttribute('my-directive', '');
//    viewport.appendChild(myDirective);

    app.directive('myDirective', function() {
        return {
            restrict: 'EA',
            replace: true,
            template: '<button>hello!</button>'
        };
    });

    angular.bootstrap(html, [name], []);
});
