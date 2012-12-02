
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
    
    fixture('fixtures/a.js', function(err, str){
      describe('.parseComments() blocks', function(){
        var comments = dox.parseComments(str, {raw: true})
          , file = comments.shift()
          , version = comments.shift();
        it("should have a property ignore", function(){
          file.should.have.property('ignore', true);
        });
        it("the description should equal A\nCopyright (c) 2010 Author Name <Author Email>\nMIT Licensed", function(){
          file.description.full.should.equal('A\nCopyright (c) 2010 Author Name <Author Email>\nMIT Licensed');
        });
        it("the description summary should be the same", function(){
          file.description.summary.should.equal('A\nCopyright (c) 2010 Author Name <Author Email>\nMIT Licensed');
        });
        it("the description body should be ''", function(){
          file.description.body.should.equal('');
        });
        it("the tags should be empty", function(){
          file.tags.should.be.empty;
        })

        it("the version shouldn't have an ignore property", function(){
          version.should.have.property('ignore', false);
        });
        it("the description should be equal to 'Library version.'", function(){
          version.description.full.should.equal('Library version.');
        });
        it('the version summary should be the same', function(){
          version.description.summary.should.equal('Library version.');
        });
        it('the version body should be empty', function(){
          version.description.body.should.equal('');
        });
        it('the version tags should be empty', function(){
          version.tags.should.be.empty;
        })
      });

    });
  });

  mocha.run();
});