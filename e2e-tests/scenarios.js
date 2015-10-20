(function(){

'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /view3 when location hash/fragment is empty', function() {
    browser.get('index.html'); //PS: added then removed app/ (no changes for now)
    expect(browser.getLocationAbsUrl()).toMatch("/view3");
  });


  describe('view1', function() {

    beforeEach(function() {
      browser.get('index.html#/view1');
    });


    it('should render view1 when user navigates to /view1', function() {
      expect(element.all(by.css('[ui-view] p')).first().getText()).
        toMatch(/partial for view 1/);
    });

  });


  describe('view2', function() {

    beforeEach(function() {
      browser.get('index.html#/view2');
    });


    it('should render view2 when user navigates to /view2', function() {
      expect(element.all(by.css('[ui-view] p')).first().getText()).
        toMatch(/This is the partial for view 2/);
    });

  });
});

})();