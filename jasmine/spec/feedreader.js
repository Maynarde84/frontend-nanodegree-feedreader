/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
	describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
		it('are defined', function() {
        	expect(allFeeds).toBeDefined();
        	expect(allFeeds.length).not.toBe(0);
		});
	});
		
	//Test suite to make sure that a url + name has been defined and is not empty.
	describe('URL + Name defined', function(){
		allFeeds.forEach(function(allFeeds){
			it('url not empty', function(){
				expect(allFeeds.url).toBeDefined();
				expect(allFeeds.length).not.toBe(0);
			});
			it('name not empty', function(){
				expect(allFeeds.name).toBeDefined();
				expect(allFeeds.length).not.toBe(0);
			});
		});
	});
	
	//Test suite to makes sure the menu is hidden by default, and changes
	//visibility when the menu icon is clicked
	describe('The menu', function(){
		it('is hidden by default', function(){
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});
		it('changes visibility when icon is clicked', function(){
			$('.menu-icon-link').trigger('click');
			expect($('body').hasClass('menu-hidden')).toBe(false);
			$('.menu-icon-link').trigger('click');
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});
	});
	
	//Test stuite to makes sure "loadFeed" function is called and completes,
	//then checks to make sure there is at least one .entry in the .feed container
	describe('Initial Entries', function() {
		beforeEach(function(done){
			loadFeed(0, done);
		});
		it("one entry present", function(done){
			expect($('.feed').length).toBeGreaterThan(0);
			expect($('.entry').length).toBeGreaterThan(0);
			done();
		});
	});
	//Test suite to see if when a new feed is loaded by the loadFeed function that
	//the content changes.
	describe('New Feed Selection', function(){
		var firstFeed;
		var secondFeed;
		beforeEach(function(done){
			$('.feed').empty();
			loadFeed(0, function() {
				firstFeed = $('.feed').html();
				loadFeed(1, done);
			});
		});
		it('new feed is loaded and content changes', function(done){
			secondFeed = $('.feed').html();
			expect(firstFeed).not.toBe(secondFeed);
			done();
        });
		afterAll(function(done) {
			loadFeed(0, done);
		});
	});
}());
