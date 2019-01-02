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


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

         it('each feed must have an URL', function() {
            allFeeds.forEach(function(element) {
                expect(element.url).toBeDefined();
            })
         })

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('each feed must have name and it cannot be empty', function() {
            allFeeds.forEach(function(element) {
                expect(element.name).toBeDefined();
                expect(element.name.length).not.toBe(0);
            })
        })
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        var menu;
        beforeEach(function() {
            menu = document.querySelector('body');
        });

        it('should be hidden as default setting', function() {
            let classes = menu.getAttribute('class');
            expect(classes.includes('menu-hidden')).toBe(true);
        });
        /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('should change state when the icon is clicked', function() {
            let icon = document.querySelector('.icon-list');
            icon.click();
            let newMenu = document.querySelector('body');
            let classes = newMenu.getAttribute('class');
            expect(classes.includes('menu-hidden')).toBe(false);

            icon.click();
            newMenu = document.querySelector('body');
            classes = newMenu.getAttribute('class');
            expect(classes.includes('menu-hidden')).toBe(true);
        });

    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            })
        })


        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('should have at least a single .entry element', function(done) {
            let links = document.querySelectorAll('.feed a.entry-link');
            expect(links.length).not.toBe(0);
            done();
        })
    })

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        var loadBefore,
            loadAfter;

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        beforeAll(function(done) {
            loadFeed(0, function() {
                loadBefore = document.querySelectorAll('.feed a.entry-link');
                console.log(loadBefore);
                done();
            });
        });

        beforeEach(function(done) {
            loadFeed(2, function() {
                done();
            });
        });

        it('should actually change the content', function(done) {
            loadAfter = document.querySelectorAll('.feed a.entry-link');
            console.log(loadAfter);
            let min = Math.min(...[loadAfter.length, loadBefore.length]);
            for (let link = 0; link < min; link++) {
                expect(loadBefore[link].href).not.toBe(loadAfter[link].href);
            }
            done();
        });
    });

}());
