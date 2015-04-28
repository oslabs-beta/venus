describe('Calendar Spec', function() {
  it('should have .day elements', function() {
    expect(document.querySelector("div.day")).to.not.equal(null);
    expect(document.querySelectorAll("div.day").length).to.equal(2);
	});
	it('should have .week_number elements',function(){
    expect(document.querySelector(".week_number")).to.not.equal(null);
    expect(document.querySelectorAll("p.week_number").length).to.equal(2);
	});
	it('should have .challenge elements',function(){
    expect(document.querySelector(".challenge")).to.not.equal(null);
    expect(document.querySelectorAll("p.challenge").length).to.equal(2);
	});
	it('should have .goals elements',function(){
    expect(document.querySelector(".goals")).to.not.equal(null);
    expect(document.querySelectorAll("ul.goals").length).to.equal(2);
	});
	it('should have .goal elements',function(){
    expect(document.querySelector(".goal")).to.not.equal(null);
    expect(document.querySelectorAll("li.goal").length).to.equal(6);
	});
});
