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
    app.controller('MainController', function ($scope, $compile) {
        $scope.refresh = function() {
            console.log('I am here');
            var e = angular.element(viewport.querySelectorAll('.fullStacktrace'));

            angular.forEach(e, function(e1){

                var element = angular.element(e1);

                var match = element.text().match(/canopy-image\(([^)]+)\)/);
                if (match) {
                    var text = match[1];
                    element.text(element.text().replace(/canopy-image\(([^)]+)\)/, ""));
                    var a = '<button ng-click="showImage(\'' + text + '\')">Click me!</button>';
                    element.prepend("<img class='tmp' src='data:image/gif;base64," + text + "' /><br><br><br>");
                }

            });
        };

        $scope.showImage = function(s) {
            console.log("I am about to show image");
            console.log(s);
        }
    });

    var myDirective = document.createElement('my-directive');
    viewport.appendChild(myDirective);

    app.directive('myDirective', function() {
        return {
            restrict: 'EA',
            replace: true,
            template: '<button ng-click="refresh()">Show Screenshots for Open Stacktraces</button>'
        };
    });

    angular.bootstrap(html, [name], []);
});
