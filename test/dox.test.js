
/**
 * Module dependencies.
 */
requirejs.config({
  paths: {
    marked: '../lib/components/marked/lib/marked',
    api: '../lib/api'
  },
  urlArgs: "bust=" +  (new Date()).getTime()
});
require(['../lib/dox', './components/chai/chai'], function(dox, chai){
  chai.should();
  mocha.setup('bdd');
  function fixture(path, fn) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', path, true);
    //xhr.setRequestHeader('Accept', 'application/vnd.github-blob.raw');
    xhr.onload = function(e){
      console.log(this);
      fn(e, this.response);
    };
    xhr.send();
  }



  describe("dox", function(){
    describe('the version of dox', function(){
      it("should be of the form '/^\d+\.\d+\.\d+$/", function(){
        dox.version.should.match(/^\d+\.\d+\.\d+$/);
      });
    });
    
    
    describe('.parseComments() blocks', function(){
      it("should return something like: ", function(done){
        fixture('fixtures/a.js', function(err, str){
          console.log(str);
          var comments = dox.parseComments(str)
            , file = comments.shift()
            , version = comments.shift();
          //it("should have a property ignore", function(){
            file.should.have.property('ignore', true);
          //});
          file.description.full.should.equal('<p>A<br />Copyright (c) 2010 Author Name <Author Email><br />MIT Licensed</p>');
          file.description.summary.should.equal('<p>A<br />Copyright (c) 2010 Author Name <Author Email><br />MIT Licensed</p>');
          file.description.body.should.equal('');
          file.tags.should.be.empty;

          version.should.have.property('ignore', false);
          version.description.full.should.equal('<p>Library version.</p>');
          version.description.summary.should.equal('<p>Library version.</p>');
          version.description.body.should.equal('');
          version.tags.should.be.empty;
          done();
        });
      });
    });
  });

  mocha.run();
});