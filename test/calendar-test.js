describe('Calendar Spec', function() {
  var length = schedule.length;
  var number_of_goals = schedule.reduce(function(prev, curr) {
     return prev + curr.goals.length;
  },0);
  it('should have ' +length +' .day elements', function() {
    expect(document.querySelector(".day")).to.not.equal(null);
    expect(document.querySelectorAll(".day").length).to.equal(length);
	});
	it('should have ' +length +' .week_number elements',function(){
    expect(document.querySelector(".week_number")).to.not.equal(null);
    expect(document.querySelectorAll(".week_number").length).to.equal(length);
	});
  it('should have ' +length +' .unit elements',function(){
    expect(document.querySelector(".unit")).to.not.equal(null);
    expect(document.querySelectorAll(".unit").length).to.equal(length);
  });
	it('should have ' +length +' .challenge elements',function(){
    expect(document.querySelector(".challenge")).to.not.equal(null);
    expect(document.querySelectorAll(".challenge").length).to.equal(length);
	});
	it('should have ' +length +' .goals elements',function(){
    expect(document.querySelector(".goals")).to.not.equal(null);
    expect(document.querySelectorAll(".goals").length).to.equal(length);
	});
	it('should have ' +number_of_goals +' .goal elements',function(){
    expect(document.querySelector(".goal")).to.not.equal(null);
    expect(document.querySelectorAll(".goal").length).to.equal(number_of_goals);
	});
});

mocha.globals();
mochaPhantomJS.run();
