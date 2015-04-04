casper.test.begin("Calendar Spec", 12, function(test) {
  casper.start('index.html', function() {
    test.assertExists('.day','.day element exists');
    test.assertElementCount('div.day', 2, '2 .day elements are present');
  });

  casper.then(function(){
    test.assertExists('.week_number','.week_number element exists');
    test.assertElementCount('p.week_number', 2, '2 .week_number elements are present');
  });

  casper.then(function(){
    test.assertExists('.weekday','.weekday element exists');
    test.assertElementCount('p.weekday', 2, '2 .weekday elements are present');
  });

  casper.then(function(){
    test.assertExists('.challege','.challege exists');
    test.assertElementCount('p.challege', 2, '2 .challege elements are present');
  });

  casper.then(function(){
    test.assertExists('.goals','.goals exists');
    test.assertElementCount('ul.goals', 2, '2 .goals ul elements are present');
  });

  casper.then(function(){
    test.assertExists('.goal','.goal exists');
    test.assertElementCount('li.goal', 6, '6 .goal li elements are present');
  });

  casper.run(function() {
    test.done();
  });
});