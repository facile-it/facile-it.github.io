'use strict';
(function () {
   var CookieMonitor = function () {
      this._agentSupportsLocalStorage = typeof localStorage !== 'undefined';

      if (this._agentSupportsLocalStorage) {
         this._newUser = !localStorage.getItem('facile-it-engr-cookie-law-visited');
         this._acceptedCookies = !!localStorage.getItem('facile-it-engr-cookie-law-accepted');
      }
   };

   CookieMonitor.prototype.shouldShowTooltip = function () {
      if ( ! this._agentSupportsLocalStorage) {
         return true;
      }
      return this._newUser && ! this._acceptedCookies;
   };

   CookieMonitor.prototype.acceptPolicy = function () {
      this._agentSupportsLocalStorage && localStorage.setItem('facile-it-engr-cookie-law-accepted', true);
   };

   CookieMonitor.prototype.visit = function () {
      this._agentSupportsLocalStorage
         && this._newUser
         && localStorage.setItem('facile-it-engr-cookie-law-visited', true);
   };

   $(window.document).ready(function () {
      var monitor = new CookieMonitor();
      monitor.visit();

      var cookieBlock = $('#cookie-law');
      cookieBlock.find('.button').click(function () {
         monitor.acceptPolicy();
         cookieBlock.hide();
      });

      if (monitor.shouldShowTooltip()) {
         $('#back-to-top').css('bottom', cookieBlock.css('height'));
         cookieBlock.show();
      }
   });
})();
