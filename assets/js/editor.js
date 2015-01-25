/**
 * 编辑博文相关功能
 */
require(['octokit', 'jquery', 'marked', 'Article'], function(Octokit, $, marked, Article) {
  var dashboard = $('#editor-dashboard');
  var editor = $('#editor');
  var output = $('#editor-preview');

  var gh = new Octokit({
    token: "16541b7301e9f414c4f73e357a6917913fb983e8"
  });


  /**
   * branch content 相关
   */
  var repo = gh.getRepo('wangyuzju', 'blog');
  var branch = repo.getBranch("gh-pages");
  var article = null;
  branch.contents(dashboard.find(".file-path").text())
    .then(function(contents) {
      console.log(contents)
      article = new Article(contents);

      // 只插入正文信息
      editor.val(article.getContent());
      renderHtml();
    });



  //var Article = function(src){
  //  this.extractConf()
  //};
  //
  //Article.prototype.extractConf = function(){
  //
  //};

  function renderHtml() {
    console.log('render...')

    var raw = editor.val();

    console.log(raw);

    var compiled = marked(raw);

    console.log(compiled);

    output.html(compiled);
  }

  /**
   * editor 相关
   */
  editor.on("input", function(){
    renderHtml();
  })
});
