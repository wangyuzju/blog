/**
 * 编辑博文相关功能
 */
require(['octokit', 'jquery', 'marked', 'Article', 'ace', '_'], function(Octokit, $, marked, Article, ace, _) {
  console.log(ace);
  // @see [how to use ace]{@link http://ace.c9.io/#nav=howto}
  aceEditor = ace.edit("ace-editor");
  aceEditor.setTheme("ace/theme/monokai");
  aceEditorSession = aceEditor.getSession();
  aceEditorSession.setMode("ace/mode/markdown");
  aceEditorSession.setUseWrapMode(true);


  function setEditorContent(str){
    aceEditor.setValue(str);
  }


  var operationPanel = $('#editor-dashboard');
  var editor = $('#editor');
  var editorDashboard = $('#editorDashboard');
  var outputContainer = $('#editor-preview');
  var output = $('#editor-preview-content');

  var gh = new Octokit({
    token: "16541b7301e9f414c4f73e357a6917913fb983e8"
  });


  /**
   * branch content 相关
   */
  var repo = gh.getRepo('wangyuzju', 'blog');
  var branch = repo.getBranch("gh-pages");
  var article = null;
  branch.contents(operationPanel.find(".file-path").text())
    .then(function(contents) {
      //console.log(contents)
      article = new Article(contents);

      setEditorContent(article.getContent());
      // 只插入正文信息
      renderCompiledHtml();
    });


  /**
   * 进入编辑模式，打开编辑面板，
   */
  function enterEditMode(){
    editorDashboard.foundation('reveal','open');

    //@see [how-to-disable-scrolling-temporarily]{@link
    //     http://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily}
    $('body').css('overflow', 'hidden');
  }

  // 恢复 overflow: auto, 允许滚动
  $(document).on('close', '[data-reveal]', function () {
    $('body').css('overflow', 'auto');
  });

  /**
   * 保存编辑
   */
  editorDashboard.find('.save').on('click', function(){
    console.log(article.getArticle());
  });

  operationPanel.find('.js-edit-page').on('click', function(){
    enterEditMode();
    return false;
  });
  //var Article = function(src){
  //  this.extractConf()
  //};
  //
  //Article.prototype.extractConf = function(){
  //
  //};

  function renderCompiledHtml() {
    console.log('render...')

    var raw = aceEditor.getValue();
    // 更新文章内容
    article.setContent(raw);

    //console.log(raw);

    var compiled = marked(raw);


    //console.log(compiled);

    output.html(compiled);
  }

  /**
   * editor 相关
   */
  editor.on("input", function(){
  })
  aceEditor.getSession().on('change', function(e) {
    // e.type, etc
    renderCompiledHtml();
  });


  /**
   * track output html with input markdown src
   */
  aceEditorSession.on("changeScrollTop", _.debounce(function (top){
    var viewportFirstRow = aceEditor.getFirstVisibleRow();
    var viewportLastRow = aceEditor.getLastVisibleRow();

    var targetRow = Math.floor((viewportFirstRow + viewportLastRow) / 2 );
    var tokens = [];

    //do{
    //  var identify = $.trim(tokens[tokens.length - 1]);
    //  console.log(output.find('*:contains("'+ identify + '")'));
    //} while(!tokens.length);

    while( !tokens.length ){
      tokens = aceEditorSession.getTokens(++targetRow);
    }

    // find matched compiled dom tag
    var token = tokens[tokens.length - 1];
    var identify = $.trim(token.value);
    var matched = output.find('*:contains("'+ identify + '")')[0];

    // do scroll
    if(matched){
      console.log(matched);
      outputContainer[0].scrollTop = matched.offsetTop - 100 > 0 ?
                        matched.offsetTop - 100 : 0;
      console.log(matched.scrollTop)
    }

  }, 16));
});
